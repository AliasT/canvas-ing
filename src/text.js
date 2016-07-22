import Shape from "./shape"

export default class Text extends Shape {
  constructor (text, font, color) {
    super(text, font, color)

    this.text         = text
    this.font         = font
    this.color        = color

    this.textAlign    = 'left'
    this.textBaseline = 'top'
    this.method       = "fill",

    this.x            = 0
    this.y            = 0
  }

  setCanvas (canvas) {
    this._canvas = canvas
    this._ctx    = this._canvas.getContext('2d')
  }
  _setText () {
    this._ctx.textAlign               = this.textAlign
    this._ctx.textBaseline            = this.textBaseline
    this._ctx.font                   = this.font
    this._ctx[this.method + "Style"] = this.color

  }

  // set textAlign (textAlign) {
  //   this._ctx.textAlign = textAlign
  // }

  render () {
    this._setText()
    debugger
    this._ctx[this.method + "Text"](this.text, this.x, this.y)
    // this._ctx.restore()
  }
}
