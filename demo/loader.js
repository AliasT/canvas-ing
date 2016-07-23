import tick from "../src/tick"

var canvas = document.querySelector('#canvas')

var stage = new createjs.Stage(canvas)

var container = new createjs.Container()

container.x = 150
container.y = 150

var shape = new createjs.Shape()
var g = shape.graphics

var ease = createjs.Ease.quadInOut

var startAngle = 0
var endAngle = 360



container.addChild(shape)

stage.addChild(container)


var t = tick (0, 360, 1000, createjs.Ease.quadOut)

function draw () {
  g.clear()

  var result = t(arguments[0].timeStamp)

  if(!result) {
    createjs.Ticker.removeEventListener('tick', draw)
    return
  }

  g.setStrokeStyle(5).beginStroke("#d14").arc(100, 100, 100, startAngle , result/ 180 * Math.PI, false)

  stage.update()
}

createjs.Ticker.setFPS(60)
createjs.Ticker.addEventListener("tick", draw);



