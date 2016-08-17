
/* 依赖 */
const { Shape, Container, Stage, Ticker } = createjs

/* 常量 */
const PI     = Math.PI
const PI2    = PI * 2
const PI_3_2 = 3 / 2 * PI
const PI3 = PI2 + PI

/* 动画函数 */
const easing = createjs.Ease.quadOut

function tick (oldProp, targetProp, delay, easingFunc) {
  var t1 = Date.now()

  return function (t2) {
    var changed = targetProp - oldProp                    // 属性变化值
    var ratio   = (t2 - t1) / delay                       // 时长比率

    if (ratio > 1) { return false }

    var newProp = oldProp + easingFunc(ratio) * changed   // 新的属性
    return newProp
  }
}



class Loader extends Shape {
  constructor (color, radius) {
    super()
    this.color = color
    this.radius = radius
    this.setUp()
  }

  /**
   * todo
   */
  setUp () {

  }

  /**
   * 改变rotation，透明度
   */
  animate (start, end, opacity) {
    this.graphics.clear()
    // debugger
    this.graphics.beginStroke(this.color).setStrokeStyle(8, 'round').arc(0, 0, this.radius, start, end, false)
    this.rotation += 1
  }
}

function main () {
  const canvas  = document.querySelector('#canvas')
  var stage     = new Stage(canvas)
  var container = new Container()
  var loader    = new Loader('#fff', 50)

  var start   = 0
  var end     = PI_3_2
  var opacity = 1
  var r1      = 0     // 0 ~ PI3
  var r2      = 0     // 0 ~ 1 / 6 * PI
  var t1      = tick(0, PI3, 2000, easing)
  var t2      = tick(0, 15 / 180 * PI, 2000, easing)
  var last1   = start
  var last2   = end


  canvas.style.background = "#9368e9"
  /* 容器位置 */
  container.x = 250
  container.y = 250

  /* 添加到父容器 */
  container.addChild(loader)
  stage.addChild(container)

  function animate () {
    stage.clear()


    r1 = t1(Date.now())

    if (r1 === false) {
      t1 = tick(0, PI3, 2000, easing)
      r1 = 0
    } else if (r1 <= PI_3_2) {
      start = (last1 + r1) % PI2
      last2 = end
    } else if (r1 <= PI3) {
      end = (start + r1 - PI_3_2) % PI2
      last1 = start
    }

    loader.animate(start, end, opacity)
    stage.update()
  }

  Ticker.setFPS(60)
  Ticker.addEventListener('tick', animate)
}

main()

