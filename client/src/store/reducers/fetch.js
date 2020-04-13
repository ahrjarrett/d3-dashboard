import * as T from '../types'
import { combineReducers } from 'redux'

const initialState = {
  pending: false,
  error: null,
  data: null,
}

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case T.SET_PENDING:
      return { ...state, pending: payload }
    case T.SET_ERROR:
      return { ...state, error: payload }
    case T.SET_DATA:
      return { ...state, data: payload }
    default:
      return state
  }
}
