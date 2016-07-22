import Shape from "../src/shape"
import Stage from "../src/stage"
import Text from "../src/text"

var canvas = document.querySelector('#canvas')


var stage = new Stage(canvas)
var text = new Text("hello world", "50px serial", "blue")

text.x = 20
text.y = 20


// t:时间比, 0 ----> 1
function ease(t, b, c, d) {
  return 1 - Math.pow(1-t, 2)
}



function ease2 (t) {
  return t
}

stage.addChild(text)

var start = Date.now()  // 开始时间
var total = 1000

var lastX = 400

function move () {
  stage.update()
  var now = Date.now()
  var r = (now - start) / total
  text.x = 20 + ease(r) * lastX
  // text.y = 20 + ease2(r) * lastX

  requestAnimationFrame(move)
}

requestAnimationFrame(move)
