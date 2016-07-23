import tick from "../src/tick"

var canvas    = document.querySelector('#canvas')
var stage     = new createjs.Stage(canvas)
var container = new createjs.Container()
var shape     = new createjs.Shape()
var g         = shape.graphics
var easing    = createjs.Ease.quadInOut


var x = 0
var y = 0

var x1 = 0
var y1 = 0

var r1 = 0
var r2 = 0


var ta = null
var tb = null

var isDrawing = false
var status    = false

;(function setup () {
  g.beginStroke('blue')
  stage.addChild(shape)
  createjs.Ticker.setFPS(60)
})()

function drawPoint (p1, p2) {
  g.beginStroke('blue')
  g.moveTo(p1 + 2, p2)
  g.arc(p1, p2, 4, 0, Math.PI * 2, false)
  g.moveTo(p1, p2)
  stage.update()
}

stage.on('stagemousedown', function (e) {
  x1 = e.stageX
  y1 = e.stageY

  // 如果从未渲染过, 画出其实点
  if (!status) {
    status = true
    x = x1
    y = y1
    drawPoint(x, y)
    return
  }

  // 画线的中途点击了新的点
  if (isDrawing) {
    createjs.Ticker.removeEventListener('tick', move)
    x = r1
    y = r2
    drawPoint(x, y)
  }

  // 当前正在绘制路径
  isDrawing = true

  g.moveTo(x, y)

  ta = tick(x, x1, 700, createjs.Ease.linear)
  tb = tick(y, y1, 700, easing)

  function move (p) {
    r1 = ta(p.timeStamp)
    r2 = tb(p.timeStamp)

    if (r1 && r2) {
      g.lineTo(r1, r2)
      stage.update()
    } else {
      isDrawing = false
      createjs.Ticker.removeEventListener('tick', move)
      x = x1
      y = y1
      drawPoint(x, y)
    }
  }

  createjs.Ticker.addEventListener('tick', move)
})
