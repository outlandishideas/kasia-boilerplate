import Kasia from 'kasia'
import WP from 'wpapi'

import config from './config'

const { kasiaSagas, kasiaReducer } = Kasia({
  WP: new WP({ endpoint: config.wordpress })
})

export {
  kasiaSagas as wpSagas,
  kasiaReducer as wpReducer
}
