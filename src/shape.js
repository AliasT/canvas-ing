export default class Shape {
  constructor () {
    // this._canvas = document.createElement('canvas')
    // this._ctx = this._canvas.getContext('2d')
  }

  clear () {
    this._ctx.clearRect(this._canvas.width, this._canvas.height)
  }

  mergePropsToCtx () {
    for (let i = 0, n = arguments.length; i < n; i++) {
      let name = arguments[i]
      this._ctx[name] = this[name]
    }
  }
}
