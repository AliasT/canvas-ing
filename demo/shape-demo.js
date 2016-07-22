import Shape from "../src/shape"
import Stage from "../src/stage"
import Text from "../src/text"

var canvas = document.querySelector('#canvas')


var stage = new Stage(canvas)
var text = new Text("hello world", "100px serial", "blue")

text.x = 20
text.y = 20


stage.addChild(text)
stage.update()






