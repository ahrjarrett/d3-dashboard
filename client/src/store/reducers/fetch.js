import * as T from '../types'
import { combineReducers } from 'redux'

const stateInitializer = {
  pending: false,
  error: null,
  data: null,
}

const initialState = () => ({
  STATIONMAP: { ...stateInitializer },
  OVERVIEW: { ...stateInitializer },
})

export default function createFetchReducer(slice, initialState) {
  return function(state = initialState, { type, payload }) {
    switch (type) {
      case `T.${slice}_SET_PENDING`:
        return { ...state, pending: payload }
      case `T.${slice}_SET_ERROR`:
        return { ...state, error: payload }
      case `T.${slice}_SET_DATA`:
        return { ...state, data: payload }
      case `T.${slice}_RESET`:
        return initialState
      default:
        return state
    }
  }
}

export const overviewReducer = createFetchReducer('OVERVIEW', stateInitializer)
export const stationMapReducer = createFetchReducer('STATIONMAP', stateInitializer)
