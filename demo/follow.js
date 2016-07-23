import tick from "../src/tick"


var canvas    = document.querySelector('#canvas')
var stage     = new createjs.Stage(canvas)
var container = new createjs.Container()
var shape     = new createjs.Shape()
var g         = shape.graphics
var status    = false

var x = 0
var y = 0

var x1 = 0
var y1 = 0

stage.addChild(shape)
stage.enableMouseOver()

stage.on('stagemousedown', function (e) {
  status = true
  x = e.stageX
  y = e.stageY

  g.beginStroke('#ccc')
  g.moveTo(x, y)
})


stage.on('stagemouseup', function (e) {
  status = false
})

stage.on('stagemousemove', function (e) {
  if (status) {
    x1 = e.stageX
    y1 = e.stageY

    g.lineTo(x1, y1)
    stage.update()
  }

})


