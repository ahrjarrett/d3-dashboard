import { useEffect, useReducer, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as R from 'ramda'

import * as T from '../store/types'
import * as actions from '../store/actions'

const sendErrorToLoggingService = console.log

export function useFetch(url) {
  const storeState = useSelector(({ fetch }) => ({ pending: fetch.pending, error: fetch.error, data: fetch.data }))
  const dispatch = useDispatch()
  const setPending = pending => dispatch(actions.setPending(pending))
  const setError = error => dispatch(actions.setError(error))
  const setData = data => dispatch(actions.setData(data))

  async function fetchData() {
    console.log('calling fetchData')

    setPending(true)
    try {
      const response = await fetch(url)
      const data = await response.json()

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

  // useEffect(() => {
  //   if (R.equals(state, storeState)) return
  //   if (state.pending !== storeState.pending) setPending(state.pending)
  //   if (state.error !== storeState.error) setPending(state.error)
  //   if (state.data !== storeState.data) setPending(state.data)
  // })

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
