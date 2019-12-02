module.exports = class Counter {
  constructor() {
    this.obj = {}
  }

  add(x) {
    this.obj[x] = (this.obj[x] || 0) + 1
  }

  get(k) {
    if (k) return this.obj[k]
    return this.obj
  }
}