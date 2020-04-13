import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import ErrorBoundary from './components/ErrorBoundary'
import Router from './components/Router'
import configureStore from './store/configureStore'
import * as serviceWorker from './serviceWorker'

const history = createBrowserHistory()
const store = configureStore(history)

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary name={'RootErrorBounary'}>
      <ConnectedRouter history={history}>
        <Router />
      </ConnectedRouter>
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
