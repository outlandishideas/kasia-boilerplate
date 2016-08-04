/**
 * # Reducer
 */

import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

import { wpReducer } from './wordpress'

export default combineReducers({
  routing: routerReducer,
  ...wpReducer
  // your reducers go here, e.g. user: userReducer
})
