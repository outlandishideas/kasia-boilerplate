/* global global:false, __dirname:false, __DEVELOPMENT__:false */
/**
 * # Server
 */

import { createMemoryHistory } from 'history'
import { match, useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import path from 'path'
import http from 'http'
import pify from 'pify'
import React from 'react'
import Express from 'express'
import favicon from 'serve-favicon'
import compression from 'compression'
import PrettyError from 'pretty-error'
import ReactDOM from 'react-dom/server'

import {
  makePreloaderSaga as makeWpPreloaderSaga
} from 'kasia/util'

import {
  fetchThemeLocation,
  makePreloader as makeWpMenusPreloaderSaga
} from 'kasia-plugin-wp-api-menus'

import { Root } from './containers'
import { Error } from './components'
import { Html, runSagas } from './helpers'
import { createStore, WP } from './store'
import config from './config'
import routes from './routes'

if (!config.port) {
  console.error('==> ERROR: No port environment variable')
  console.error('==> ERROR: Exiting...')
  process.exit()
}

const app = new Express()
const pretty = new PrettyError()
const server = new http.Server(app)

app.use(compression())
app.use(favicon(path.join(__dirname, '../static/favicon.ico')))
app.use(Express.static(path.join(__dirname, '..', 'static')))

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    global.webpackIsomorphicTools.refresh()
  }

  const location = req.originalUrl
  const history = useRouterHistory(createMemoryHistory)({})
  const store = createStore(history, {})

  syncHistoryWithStore(history, store)
  history.replace(req.originalUrl)

  pify(match, { multiArgs: true })({ history, routes, location })
    .then((result) => {
      const [ redirectLocation, renderProps ] = result

      if (redirectLocation) {
        res.redirect(redirectLocation.pathname + redirectLocation.search)
        return
      }

      if (!renderProps) {
        res.status(404).send('Not found')
        return
      }

      const preloaders = [
        makeWpPreloaderSaga(renderProps.components, renderProps),
        makeWpMenusPreloaderSaga(WP, fetchThemeLocation('primary'))
      ]

      return runSagas(store, preloaders).then(() => {
        const rootProps = { renderProps, history, routes, store }
        const root = <Root {...rootProps} type='server' />

        global.navigator = { userAgent: req.headers['user-agent'] }

        const document = ReactDOM.renderToString(
          <Html
            assets={global.webpackIsomorphicTools.assets()}
            component={root}
            store={store} />
        )

        res.send('<!doctype html>\n' + document)
      })
    })
    .catch((error) => {
      console.error('==> ROUTER ERROR:', pretty.render(error))

      const document = ReactDOM.renderToString(
        <Html
          noscript
          assets={global.webpackIsomorphicTools.assets()}
          component={<Error code={500} />}
          store={store} />
      )

      res.status(500).send('<!doctype html>\n' + document)
    })
})

server.listen(config.port, (err) => {
  if (err) {
    console.error(err)
    return
  }

  console.info('==> %s started at http://%s:%s', config.app.title, config.host, config.port)
})
