import * as types from '../types'

const initialState = { focusedElement: null }

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case types.TOGGLE_FOCUS:
      return { ...state, focusedElement: payload }
    default:
      return state
  }
}
