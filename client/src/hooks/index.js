import { useEffect, useReducer, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as R from 'ramda'

import * as T from '../store/types'
import * as actions from '../store/actions'

const sendErrorToLoggingService = console.log

export { useGRPs } from './useGRPs'

export function useFetch(url, config) {
  const storeState = useSelector(({ fetch }) => ({ pending: fetch.pending, error: fetch.error, data: fetch.data }))
  const dispatch = useDispatch()
  const setPending = pending => dispatch(actions.setPending(pending))
  const setError = error => dispatch(actions.setError(error))
  const setData = data => dispatch(actions.setData(data))

  async function fetchData() {
    console.log('calling fetchData')

    setPending(true)
    try {
      const response = await fetch(url, { ...config })

      const data = await response.json()

      console.log('response', response)
      console.log('data', data)

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

  return storeState
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
