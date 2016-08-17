  let canvas = document.querySelector('#canvas')
  var ctx    = canvas.getContext('2d')

  const W = canvas.width
  const H = canvas.height

  const radius = 50
  const PI2    = Math.PI * 2


  const pa = {
    x: 500,
    y: 200,
    radius: 50
  }

  var pb = {
    radius: 20,
    setPos (x, y) {
      this.x = x
      this.y = y
    }
  }

  // 变形
  function getTransformX(pa, pb) {
    const relY = pb.y - pa.y
    const relX = pb.x - pa.x

    return Math.atan2(relY, relX)
  }

  function getMid (pa, pb) {
    return {
      x: (pa.x + pb.x) / 2,
      y: (pa.y + pb.y) / 2
    }
  }

  function drawCircle (o, color) {
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.arc(o.x, o.y, o.radius, 0, PI2)
    ctx.fill()
  }

  function getDis (p1, p2) {
    const disX = Math.pow(p1.x - p2.x, 2)
    const disY = Math.pow(p1.y - p2.y, 2)
    return Math.sqrt(disX + disY)
  }


  function getR (h, halfDis) {
    return Math.sqrt(Math.pow(h, 2) + Math.pow(halfDis, 2))
  }

  function pow (n) {
    return function (x) {
      return Math.pow(x, n)
    }
  }

  var pow2 = pow(2)

  function get (p) {
    return p >= 1 ? 1 : p
  }
  // 外切圆到轴线的垂直高度
  function getOuter (pa, pb, r0) {
    const d1  = pa.radius + r0
    const d2  = pb.radius + r0
    const dis = getDis(pa, pb)


    var a = Math.acos((pow2(d1) + pow2(dis) - pow2(d2)) / ( 2 * d1 * dis))
    var b = Math.acos((pow2(d2) + pow2(dis) - pow2(d1)) / ( 2 * dis * d2))
    var c = Math.acos((pow2(d1) + pow2(d2) - pow2(dis)) / ( 2 * d1 * d2))

    a = get(a)
    b = get(b)
    c = get(c)

    console.log(c)
    const sina  = Math.sqrt(1 - pow2(a))
    const angle = Math.acos(a)

    return {
      h: d1 * sina,
      x: d1 * a,
      a: a,
      b: b,
      c: c
    }
  }

  function mousemove (e) {
    pb.setPos(e.pageX, e.pageY)
    update()
  }

  function update (x, y) {
    ctx.clearRect(0, 0, W, H)
    draw()
  }

  const r0 = 100

  function draw () {
    drawCircle(pa, 'blueviolet')
    drawCircle(pb)

    const r     = getTransformX(pa, pb)
    const outer = getOuter(pa, pb, r0)
    const h     = outer.h
    const angle = outer.c

    ctx.save()
    // if (h >= r0) {
    //   ctx.restore()
    //   return
    // }
    // 上下文转移到轴线位置上
    ctx.translate(pa.x, pa.y)
    ctx.rotate(-r)
    ctx.translate(outer.x, 0)
    ctx.save()

    ctx.strokeStyle = 'green'
    ctx.beginPath()

    ctx.translate(0, -h)
    ctx.rotate(outer.b)
    ctx.arc(0, 0, r0, 0, outer.c, false)

    ctx.restore()
    ctx.translate(0, h)
    ctx.rotate(- outer.b - outer.c)
    ctx.arc(0, 0, r0, 0, outer.c, false)
    ctx.stroke()

    ctx.restore()
    ctx.restore()
  }

  canvas.addEventListener('mousemove', mousemove)
