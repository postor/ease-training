import { connect } from 'react-redux'
import getPath from './get-path'
export default pathObj => Comp => connect(state => getProps(state, pathObj))(Comp)


function getProps(state, pathObj) {
  let props = {}
  for (let [key, value] of Object.entries(pathObj)) {
    props[key] = getPath(state, value)
  }
  return props
}