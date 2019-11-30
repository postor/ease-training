import { connect } from 'react-redux'

export default pathObj => Comp => connect(state => getProps(state, pathObj))(Comp)

function getPath(obj, path) {
  if (path === '') return obj
  let arr = path.split('.'), t = obj
  for (let i = 0; i < arr.length; i++) {
    t = t[arr[i]]
    if (t === undefined) return t
  }
  return t
}

function getProps(state, pathObj) {
  let props = {}
  for (let [key, value] of Object.entries(pathObj)) {
    props[key] = getPath(state, value)
  }
  return props
}