
  let canvas = document.querySelector('#canvas')
  var ctx    = canvas.getContext('2d')

  const W = canvas.width
  const H = canvas.height

  const radius = 50
  const PI2    = Math.PI * 2


  const pa = {
    x: 100,
    y: 200
  }

  var pb = {
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
    ctx.arc(o.x, o.y, radius, 0, PI2)
    ctx.fill()
  }

  function getDis (p1, p2) {
    const disX = Math.pow(p1.x - p2.x, 2)
    const disY = Math.pow(p1.y - p2.y, 2)
    return Math.sqrt(disX + disY)
  }

  function getC (center, h) {
    return {
      top: center.y + h,
      bottom: center.y - h
    }
  }

  function getR (h, halfDis) {
    return Math.sqrt(Math.pow(h, 2) + Math.pow(halfDis, 2))
  }

  function mousemove (e) {
    pb.setPos(e.pageX, e.pageY)
    update()
  }

  function update (x, y) {
    ctx.clearRect(0, 0, W, H)
    draw()
  }

  const h   = 200

  function draw () {
    drawCircle(pa, 'blueviolet')
    drawCircle(pb)

    const r = getTransformX(pa, pb)

    ctx.save()

    const mid = getMid(pa, pb)
    const dis = getDis(pa, pb)

    // 外切圆到两个圆心距离
    const Dis = getR(h, dis/2)

    const c     = getC(mid, h)
    const angle = Math.acos(h/Dis)

    ctx.translate(mid.x, mid.y)
    ctx.rotate(r)

    const rc = Dis - radius
    if (rc >= h ) {
      ctx.restore()
      return
    }

    ctx.strokeStyle = 'green'
    ctx.save()
    ctx.beginPath()

    ctx.transform(1, 0, 0, 1, 0, -h)
    ctx.rotate(Math.PI / 2 - angle)
    ctx.arc(0, 0, rc, 0, 2 * angle, false)
    ctx.restore()

    // ctx.beginPath()
    ctx.transform(1, 0, 0, 1, 0, h)
    ctx.rotate(- Math.PI / 2 - angle)
    ctx.arc(0, 0, rc, 0, 2 * angle, false)
    ctx.fill()

    ctx.restore()
    ctx.restore()
  }


  canvas.addEventListener('mousemove', mousemove)
