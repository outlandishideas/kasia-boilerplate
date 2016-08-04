/**
 * # Html
 *
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the `server.js` file.
 */

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom/server'
import Helmet from 'react-helmet'
import serialize from 'serialize-javascript'

export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object,
    noscript: PropTypes.bool
  }

  render () {
    const { assets, component, store, noscript } = this.props

    const head = Helmet.rewind()
    const stylesHtml = require('../theme/global.scss')._style
    const dataHtml = 'window.__STATE__=' + serialize(store.getState())
    const content = component ? ReactDOM.renderToString(component) : ''

    return (
      <html lang='en-gb'>
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <link rel='shortcut icon' href='/favicon.ico' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />

          {/* styles for production */}
          {Object.keys(assets.styles).map((style, key) =>
            <link href={assets.styles[style]} key={key} media='screen, projection'
                  rel='stylesheet' type='text/css' charSet='UTF-8'/>
          )}

          {/* styles for development */}
          {Object.keys(assets.styles).length === 0
            ? <style dangerouslySetInnerHTML={{ __html: stylesHtml }}/>
            : null}
        </head>
        <body>
          <div id='container' dangerouslySetInnerHTML={{ __html: content }}/>
          {!noscript && <script dangerouslySetInnerHTML={{ __html: dataHtml }} charSet='UTF-8' />}
          {!noscript && <script src={assets.javascript.main} charSet='UTF-8' />}
        </body>
      </html>
    )
  }
}
