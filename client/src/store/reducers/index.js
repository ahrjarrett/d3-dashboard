import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'

import ui from './ui'
import fetch from './fetch'

export default history =>
  combineReducers({
    router: connectRouter(history),
    ui,
    fetch,
  })
