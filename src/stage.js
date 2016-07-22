export default class Stage {
  constructor (canvas) {
    this._ctx = canvas.getContext('2d')
    this._canvas = canvas
    this.children = []
  }

  addChild (child) {
    var c = document.createElement('canvas')
    c.height = this._canvas.height;
    c.width = this._canvas.width;

    child.setCanvas(c)
    this.children.push(child)
  }

  update () {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)
    for (let child of this.children) {
      // debugger
      child.clear().render()
      this._ctx.drawImage(child._canvas, 0, 0)    // 这里的两个参数是和儿子的transform对应起来的
    }
  }
}
