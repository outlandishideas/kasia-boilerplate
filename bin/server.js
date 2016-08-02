#!/usr/bin/env node

var fs = require('fs')
var path = require('path')

var rootDir = path.resolve(__dirname, '..')
var babelrc = fs.readFileSync('./.babelrc')

global.__CLIENT__ = false
global.__SERVER__ = true
global.__DISABLE_SSR__ = false
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'

try {
  var config = JSON.parse(babelrc)
} catch (err) {
  console.error('==>     ERROR: Error parsing .babelrc')
  console.error(err)
}

require('babel-register')(config)
require('babel-polyfill')

if (__DEVELOPMENT__ && !process.env.DEBUG) {
  var cond = require('piping')({
    hook: true,
    ignore: /(\/\.|~$|\.json|\.scss$)/i
  })

  if (!cond) {
    return
  }
}

var WebpackIsomorphicTools = require('webpack-isomorphic-tools')

var tool = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools'))
  .development(__DEVELOPMENT__)
  .server(rootDir, function () {
    require('../src/server')
  })

global.webpackIsomorphicTools = tool
