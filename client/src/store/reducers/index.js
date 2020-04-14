import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'

import ui from './ui'
import { overviewReducer as overview, stationMapReducer as stationMap } from './fetch'

export default history =>
  combineReducers({
    router: connectRouter(history),
    ui,
    fetch: combineReducers({
      OVERVIEW: overview,
      STATIONMAP: stationMap,
    }),
  })
