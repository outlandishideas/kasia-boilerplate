/**
 * Run all `sagas` until they are complete.
 * @param {Object} store Enhanced redux store with `runSaga` method
 * @param {Array} sagas Array of saga operations
 * @returns {Promise}
 */
export default function runSagas (store, sagas) {
  return sagas.reduce((promise, saga) => {
    return promise.then(() => store.runSaga(saga).done)
  }, Promise.resolve())
}
