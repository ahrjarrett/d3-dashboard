import { useEffect, useReducer, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as R from 'ramda'

import * as T from '../store/types'
import * as actions from '../store/actions'

const sendErrorToLoggingService = console.log

export { useGRPs } from './useGRPs'

export function useFetch(url, stateString, config) {
  const storeState = useSelector(state => ({
    pending: state.fetch[stateString].pending,
    error: state.fetch[stateString].error,
    data: state.fetch[stateString].data,
  }))
  const dispatch = useDispatch()
  const setPending = pending => dispatch(actions.setPending(stateString, pending))
  const setError = error => dispatch(actions.setError(stateString, error))
  const setData = data => dispatch(actions.setData(stateString, data))
  const reset = () => dispatch(actions.reset(stateString))

  async function fetchData() {
    setPending(true)
    try {
      const response = await fetch(url, { ...config })
      const data = await response.json()
      setData(data)
    } catch (e) {
      sendErrorToLoggingService(e)
      setError(e)
    } finally {
      setPending(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return [storeState, dispatch, optionalArgs => fetchData(optionalArgs)]
}

export function useAutofocus(elementId) {
  const inputRef = useRef(elementId)
  useEffect(() => {
    inputRef.current = document.getElementById(elementId)
  }, [elementId])
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  })
  return inputRef.current
}

export function useFocus() {
  const { focusedElement } = useSelector(state => state.ui)
  return useAutofocus(focusedElement)
}
