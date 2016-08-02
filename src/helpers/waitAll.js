import { join, fork } from 'redux-saga/effects'

export default function waitAll (sagas) {
  return function * () {
    const tasks = yield sagas.map(([ saga, action ]) => fork(saga, action))
    yield tasks.map(join)
  }
}
