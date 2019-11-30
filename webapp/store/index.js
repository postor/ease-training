import reduxHelper from 'next.js-redux-helper'
import wrapper from 'next.js-redux-helper/dest/wrapper'
import * as immutable from 'object-path-immutable'

const reducers = {
  SET: setObj,
  DEL: setObj,
  MERGE: setObj,
}

const initStore = reduxHelper(reducers, typeof window === 'undefined'
  ? {}
  : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const reduxWrapper = wrapper(initStore)

export default reduxWrapper

function setObj(state = {}, { type = 'SET', path = 'wiredpath', value }) {
  let t = type.toLowerCase()
  if (immutable[t]) return immutable[t](state, path, value)
  return state
}