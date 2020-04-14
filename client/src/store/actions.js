import * as T from './types'

export const setPending = (instanceName, payload) => ({
  type: `T.${instanceName}_SET_PENDING`,
  payload: payload,
})

export const setError = (instanceName, payload) => ({
  type: `T.${instanceName}_SET_ERROR`,
  payload,
})

export const setData = (instanceName, payload) => ({
  type: `T.${instanceName}_SET_DATA`,
  payload,
})
