/**
 * # Webpack Isomorphic Tools Config
 *
 * https://github.com/halt-hammerzeit/webpack-isomorphic-tools
 */

var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')

module.exports = {
  webpack_assets_file_path: './static/dist/webpack-assets.json',
  assets: {
    images: {
      extensions: [
        'jpeg',
        'jpg',
        'png',
        'gif'
      ],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    fonts: {
      extensions: [
        'woff',
        'woff2',
        'ttf',
        'eot'
      ],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    style_modules: {
      extensions: [
        'scss'
      ],
      filter: function (module, regex, options, log) {
        return options.development
          ? WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log)
          : regex.test(module.name)
      },
      path: function (module, options, log) {
        return options.development
          ? WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log)
          : module.name
      },
      parser: function (module, options, log) {
        return options.development
          ? WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log)
          : module.source
      }
    }
  }
}
