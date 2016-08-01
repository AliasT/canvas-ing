var canvas    = document.querySelector('#canvas')
var stage     = new createjs.Stage(canvas)
var container = new createjs.Container()


/* 表盘 */
class ClockBoard extends createjs.Container {
  constructor() {
    super()
    this.setUp()
  }

  setUp () {
    let i = 1
    while (i <= 12) {
      var rotation = (i - 3) / 12 * Math.PI * 2
      var text = new createjs.Text(`${i}`)
      text.textAlign = "center"
      text.textBaseLine = "middle"
      var h = text.getMeasuredHeight()
      var w = text.getMeasuredWidth()
      text.x =  Math.floor(Math.cos(rotation) * 100)
      text.y =  Math.floor(Math.sin(rotation) * 100) - h / 4

      // text.rotation = rotation
      this.addChild(text)
      i++
    }

    var s = new createjs.Shape()
    s.graphics.beginStroke('black').arc(0, 0, 110, 0, Math.PI * 2, false)
    s.graphics.beginStroke('black').arc(0, 0, 2, 0, Math.PI * 2, false)
    this.addChild(s)
  }
}

/**
 * 指针
 */
class Pointer extends createjs.Shape {
  constructor (color, len) {
    super()
    this.color    = color
    this.len      = len
  }

  rotate (rotation) {
    this.rotation = (rotation - 90) / 180 * Math.PI
    const x = Math.cos(this.rotation) * this.len
    const y = Math.sin(this.rotation) * this.len
    this.graphics.clear()
    this.graphics.beginStroke(this.color).moveTo(0, 0).lineTo(x, y)
  }
}


var hourPointer   = new Pointer('black', 40)
var minutePointer = new Pointer('black', 60)
var secondPointer = new Pointer('red', 80)
var board         = new ClockBoard()

container.addChild(board, hourPointer, minutePointer, secondPointer)

container.x = 250
container.y = 250

stage.addChild(container)

function tick () {
  const  d = new Date()
  const r1 = d.getSeconds()
  const r2 = d.getMinutes() + r1 / 60
  const r3 = d.getHours() + r2 / 60

  secondPointer.rotate(Math.floor(r1 / 60 * 360))
  minutePointer.rotate(Math.floor(r2 / 60 * 360))
  hourPointer.rotate(Math.floor(r3 / 12 * 360))
  stage.update()
}

createjs.Ticker.setFPS(60)
createjs.Ticker.addEventListener('tick', tick)


