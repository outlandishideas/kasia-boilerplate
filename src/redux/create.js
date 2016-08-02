/* global __DEVELOPMENT__:false, __CLIENT__:false, __DEVTOOLS__:false */

import { createStore as _createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga';

import reducer from './reducer'
import rootSaga from './sagas'

export default function createStore (history, data) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history)
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [sagaMiddleware, reduxRouterMiddleware]

  let finalCreateStore

  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools')
    const DevTools = require('../containers/DevTools/DevTools')

    middleware.push(createLogger())

    finalCreateStore = compose(
      applyMiddleware(...middleware),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
    )(_createStore)
  } else {
    finalCreateStore = compose(applyMiddleware(...middleware))(_createStore)
  }

  const store = finalCreateStore(reducer, data)

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(require('./reducer'))
    })
  }

  sagaMiddleware.run(rootSaga)

  return {
    ...store,
    runSaga: sagaMiddleware.run
  }
}
