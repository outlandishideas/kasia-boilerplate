/**
 * # Webpack Developer Config
 */

require('babel-polyfill')

var fs = require('fs')
var path = require('path')
var webpack = require('webpack')
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')

var iso = require('./webpack-isomorphic-tools')

var host = (process.env.HOST || 'localhost')
var port = (+process.env.PORT + 1) || 3001

var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(iso)

//---
// ## Configure Babel
// ---

try {
  var babelConfig = JSON.parse(fs.readFileSync('.babelrc'))
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.')
  console.error(err)
}

var babelDevConfig = babelConfig.env && babelConfig.env.development || {}
var babelPlugins = [].concat(babelConfig.plugins, babelDevConfig.plugins)

;(function insertReactHmrTransformPlugin () {
  var plugin = null

  for (var i = 0, len = babelPlugins.length; i < len; i++) {
    plugin = babelPlugins[i]

    if (plugin[0] && plugin[0] === 'react-transform') {
      break
    }
  }

  plugin[1].transforms.push({
    transform: 'react-transform-hmr',
    imports: ['react'],
    locals: ['module']
  })

  return plugin
})()

var babelLoaderQuery = Object.assign({}, babelConfig, babelDevConfig, {
  plugins: babelPlugins
})

delete babelLoaderQuery.env

//---
// ## Configure Webpack
//---

var scssExtract = 'style' +
  '!css' +
  '?modules' +
  '&importLoaders=2' +
  '&sourceMap' +
  '&localIdentName=[local]___[hash:base64:5]' +
  '!autoprefixer?browsers=last 2 version' +
  '!sass?outputStyle=expanded&sourceMap'

module.exports = {
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    main: [
      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
      './src/theme/global.scss',
      './src/client.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../static/dist'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'http://' + host + ':' + port + '/dist/'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel?' + JSON.stringify(babelLoaderQuery)]},
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.scss$/, loader: scssExtract },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
    ]
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: [
      '',
      '.json',
      '.js',
      '.jsx'
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true
    }),
    webpackIsomorphicToolsPlugin.development()
  ]
}
