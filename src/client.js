/**
 * # Client
 */

import 'babel-polyfill'

import React from 'react'
import useScroll from 'scroll-behavior/lib/useStandardScroll'
import ReactDOM from 'react-dom'
import { browserHistory as _browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { Root } from './containers'
import routes from './routes'
import createStore from './store/create'

const browserHistory = useScroll(() => _browserHistory)()
const store = createStore(browserHistory, window.__STATE__ || {})
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Root store={store} history={history} routes={routes} type='client' />,
  document.getElementById('container')
)
