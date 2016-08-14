
var canvas = document.querySelector('#canvas')
var ctx    = canvas.getContext('2d')

const w = window.screen.availWidth
const h = window.screen.availHeight

const MAX_OFFSET_X = w
const MAX_OFFSET_Y = 100

canvas.width  = w
canvas.height = h

ctx.fillStyle = "blueviolet"

var ismoving = false
var cpx      = 0
var cpy      = 0

var tick = null

function easing (t) {
  return Math.pow(t, 2)
}

function getTick (oldProp, targetProp, delay, easingFunc) {
  var t1 = Date.now()
  return function (t2) {
    var changed = targetProp - oldProp                    // 属性变化值
    var ratio   = (t2 - t1)/ delay                       // 时长比率
    var newProp = oldProp + easingFunc(ratio) * changed   // 新的属性
    return newProp
  }
}

function draw (cx, cy) {
  ctx.clearRect(0, 0, w, h)
  ctx.beginPath()
  ctx.moveTo(w, 0)
  ctx.lineTo(w, h)
  ctx.lineTo(0, h)
  ctx.lineTo(0, 0)
  ctx.quadraticCurveTo(cx, cy, w, 0)
  ctx.fill()
}

function move () {
  cpy = tick(Date.now())
  console.log(cpy)
  draw(cpx, cpy)
  if (cpy <= 0) {
    ismoving = false
    return
  }

  requestAnimationFrame(move)
}

function touchmove (e) {
  e.preventDefault()
  if (ismoving) { return }
  cpy = e.touches[0].pageY
  cpx = e.touches[0].pageX
  cpx = cpx >= MAX_OFFSET_X ? MAX_OFFSET_X : cpx
  cpy = cpy >= MAX_OFFSET_Y ? MAX_OFFSET_Y : cpy
  draw(cpx, cpy)
}

function touchend (e) {
  ismoving = true
  tick = getTick(cpy, 0, 70, easing)
  move()
}

canvas.addEventListener('touchmove', touchmove)
canvas.addEventListener('touchend', touchend)
