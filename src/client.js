/* global __DEVTOOLS__:false */

import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import useScroll from 'scroll-behavior/lib/useStandardScroll'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import createStore from './redux/create'
import routes from './routes'

const _browserHistory = useScroll(() => browserHistory)()
const store = createStore(_browserHistory, window.__data)
const history = syncHistoryWithStore(_browserHistory, store)
const contentElem = document.getElementById('content')

const component = (
  <Router history={history}>
    {routes}
  </Router>
)

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('./containers/DevTools/DevTools')

  const root = (
    <Provider store={store} key='provider'>
      <div>
        {component}
        <DevTools />
      </div>
    </Provider>
  )

  ReactDOM.render(root, contentElem)
} else {
  const root = (
    <Provider store={store} key='provider'>
      {component}
    </Provider>
  )

  ReactDOM.render(root, contentElem)
}

if (process.env.NODE_ENV !== 'production') {
  window.React = React // Enable debugger

  if (
    !contentElem ||
    !contentElem.firstChild ||
    !contentElem.firstChild.attributes ||
    !contentElem.firstChild.attributes['data-react-checksum']
  ) {
    console.error(
      'Server-side React render was discarded. ' +
      'Make sure that your initial render does not contain any client-side code.'
    )
  }
}
