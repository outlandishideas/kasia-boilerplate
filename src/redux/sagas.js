import { wpSagas } from '../wordpress'

export default function * rootSaga () {
  yield wpSagas.map((saga) => saga())
}
