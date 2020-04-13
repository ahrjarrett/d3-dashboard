import * as T from './types'

export const setPending = payload => ({
  type: T.SET_PENDING,
  payload: payload,
})

export const setError = payload => ({
  type: T.SET_ERROR,
  payload,
})

export const setData = payload => ({
  type: T.SET_DATA,
  payload,
})
