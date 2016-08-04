/* global __DEVELOPMENT__:false, __CLIENT__:false, __DEVTOOLS__:false */
/**
 * # Create Redux Store
 */

import { createStore as _createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { persistState } from 'redux-devtools'
import createSagaMiddleware from 'redux-saga'

import { DevTools } from '../components'
import rootSaga from './sagas'
import reducer from './reducer'

export default function createStore (history, data) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history)
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [sagaMiddleware, reduxRouterMiddleware]

  const finalCreateStore = (() => {
    if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
      return compose(
        applyMiddleware(...middleware),
        persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
        window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
      )(_createStore)
    }

    return compose(applyMiddleware(...middleware))(_createStore)
  })()

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
