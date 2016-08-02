/* global __DEVELOPMENT__:false, __DISABLE_SSR__:false, webpackIsomorphicTools:false */

import { createMemoryHistory } from 'history';
import { match, useRouterHistory, RouterContext } from 'react-router';
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux';
import path from 'path'
import http from 'http'
import React from 'react'
import Express from 'express'
import favicon from 'serve-favicon'
import compression from 'compression'
import PrettyError from 'pretty-error'
import ReactDOM from 'react-dom/server'

import config from './config'
import routes from './routes'
import Html from './helpers/Html'
import waitAll from './helpers/waitAll'
import createStore from './redux/create'
import getPreloaders from './helpers/getPreloaders'

if (!config.port) {
  console.error('==>     ERROR: No port environment variable')
  console.error('==>     ERROR: Exiting...')
  process.exit()
}

const pretty = new PrettyError()
const app = new Express()
const server = new http.Server(app)

// Allow configuration to complete before starting the server
setTimeout(function run () {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err)
      return
    }

    console.info('----')
    console.info('==> %s started at http://%s:%s', config.app.title, config.host, config.port)
  })
})

function hydrateOnClient (res, store) {
  res.send(
    '<!doctype html>\n' +
    ReactDOM.renderToString(
      <Html assets={webpackIsomorphicTools.assets()} store={store} />
    )
  )
}

app.use(compression())
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')))
app.use(Express.static(path.join(__dirname, '..', 'static')))

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh()
  }

  const history = useRouterHistory(createMemoryHistory)({});
  const store = createStore(history, {});

  syncHistoryWithStore(history, store);
  history.replace(req.originalUrl);

  if (__DISABLE_SSR__) {
    hydrateOnClient(res, store)
    return
  }

  match({
    history,
    routes,
    location: req.originalUrl
  }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search)
      return
    }

    if (error) {
      console.error('ROUTER ERROR:', pretty.render(error))
      res.status(500)
      hydrateOnClient(res, store)
      return
    }

    if (renderProps) {
      const preloaders = getPreloaders(renderProps.components)
      const operations = preloaders.map(make => make()(renderProps))

      const render = () => {
        const component = (
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        )

        global.navigator = { userAgent: req.headers['user-agent'] }

        res.send(
          '<!doctype html>\n' +
          ReactDOM.renderToString(
            <Html assets={webpackIsomorphicTools.assets()}
                  component={component}
                  store={store} />
          )
        )
      }

      store
        .runSaga(waitAll(operations))
        .done.then(render)

      return
    }

    res.status(404).send('Not found')
  })
})
