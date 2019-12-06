export default function getPath(obj, path) {
  if (path === '') return obj
  let arr = path.split('.'), t = obj
  for (let i = 0; i < arr.length; i++) {
    t = t[arr[i]]
    if (t === undefined) return t
  }
  return t
}
