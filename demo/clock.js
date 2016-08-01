var canvas    = document.querySelector('#canvas')
var stage     = new createjs.Stage(canvas)
var container = new createjs.Container()

const PI2 = Math.PI * 2

/* 表盘 */
class ClockBoard extends createjs.Container {
  constructor() {
    super()
    this.setUp()
  }

  setUp () {


    var s = new createjs.Shape()
    var g = s.graphics
    g.beginFill('#1d2140').arc(0, 0, 120, 0, PI2, false)
    g.beginFill('#151636').arc(0, 0, 140, 0, PI2, false)
    g.beginStroke('#17092b').arc(0, 0, 115, 0, Math.PI * 2, false)
    this.addChild(s)
    let i = 1
    while (i <= 12) {
      var rotation = (i - 3) / 12 * Math.PI * 2
      var text = new createjs.Text(`${i}`, "12px", "#fff")
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

  }
}

/**
 * 指针
 */
class Pointer extends createjs.Shape {
  constructor (color, len, radius) {
    super()
    this.color    = color
    this.len      = len
    this.radius   = radius

    // 单位向量
    this.r1 = 0
    this.r2 = 0
  }

  rotate (rotation) {
    this.rotation = (rotation - 90) / 180 * Math.PI

    const r1 = Math.cos(this.rotation)
    const r2 = Math.sin(this.rotation)

    this.r1 = r1
    this.r2 = r2

    const x = r1 * this.len
    const y = r2 * this.len

    const x1 = 10 * (-r1)
    const y1 = 10 * (-r2)
    this.graphics.clear()
    this.graphics
      .beginStroke(this.color)
      .setStrokeStyle(2)
      .moveTo(x1, y1)
      .lineTo(0, 0)
      .beginFill(this.color)
      .arc(0, 0, this.radius, 0, PI2, false)
      .moveTo(0, 0)
      .lineTo(x, y)
  }
}


class SecondPointer extends Pointer {
  rotate (rotation, dis) {
    super.rotate(rotation)
    const d1 = dis * this.r1
    const d2 = dis * this.r2
    this.graphics.beginFill(this.color).moveTo(d1, d2).arc(d1, d2, 1, 0, PI2, false)
  }
}


var hourPointer   = new Pointer('#fff', 40, 3)
var minutePointer = new Pointer('grey', 60, 0)
var secondPointer = new SecondPointer('#ff0f6c', 90, 2)
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

  secondPointer.rotate(Math.floor(r1 / 60 * 360), 115)
  minutePointer.rotate(Math.floor(r2 / 60 * 360))
  hourPointer.rotate(Math.floor(r3 / 12 * 360))
  stage.update()
}

createjs.Ticker.setFPS(60)
createjs.Ticker.addEventListener('tick', tick)


