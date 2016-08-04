/**
 * # Sagas
 */

import { wpSagas } from './wordpress'

export default function * () {
  yield [
    ...wpSagas
    // your sagas go here, e.g. fork(someSagaGenerator)
  ]
}
