import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import reduxThunk from 'redux-thunk'

import createReducer from './reducers'
import { APP_NAME, APP_HOST, NODE_ENV } from '../config'

const devToolOpts = () => ({
  shouldHotReload: false,
  trace: true,
  name: APP_NAME,
})

const reduxDevToolOptions = env => ({
  trace: false,
  name: `NON-PROD: ${APP_NAME} @ ${APP_HOST}`,
})

const devOpts = { ...reduxDevToolOptions(NODE_ENV), ...devToolOpts() }

export default function configureStore(history) {
  const middlewares = [routerMiddleware(history), reduxThunk]
  const enhancers = [applyMiddleware(...middlewares)]

  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(devOpts)
      : compose

  //if (process.env.NODE_ENV !== "production") {
  //  const whyDidYouRender = require("@welldone-software/why-did-you-render/dist/no-classes-transpile/umd/whyDidYouRender.min.js");
  //  whyDidYouRender(React);
  //}

  const store = createStore(createReducer(history), {}, composeEnhancers(...enhancers))

  return store
}
