/**
 * # Kasia Setup
 */

import { default as _WP } from 'wpapi'
import Kasia from 'kasia'
import KasiaWpMenusPlugin from 'kasia-plugin-wp-api-menus'

import config from '../config'

export const WP = new _WP({ endpoint: config.wpapi })

const { kasiaSagas, kasiaReducer } = Kasia({
  WP,
  plugins: [KasiaWpMenusPlugin]
})

export {
  kasiaSagas as wpSagas,
  kasiaReducer as wpReducer
}
