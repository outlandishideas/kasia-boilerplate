/**
 * # Client
 */

import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { Root } from './containers'
import routes from './routes'
import createStore from './store/create'

const store = createStore(browserHistory, window.__STATE__ || {})
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Root store={store} history={history} routes={routes} type='client' />,
  document.getElementById('container')
)
