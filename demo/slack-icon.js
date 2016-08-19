      
    var canvas = document.querySelector('#canvas')
    var ctx = canvas.getContext('2d')

    function getAngle (x) {
      return x / 180 * Math.PI
    }

    var initialLen = 200
    var rotate     = 0
    var offset     = 40

    const e = function (t) { return t }


    function getTick (oldProp, targetProp, delay, easingFunc) {
      var t1 = Date.now()
      return function (t2) {
        var changed = targetProp - oldProp                    // 属性变化值
        var ratio   = (t2 - t1)/ delay                       // 时长比率
        var newProp = oldProp + easingFunc(ratio) * changed   // 新的属性
        return newProp
      }
    }

    var t = getTick(0, 360, 3000, e)

    const center = {
      x: 250,
      y: 250
    }

    var app = {
      lineWidth: 35,
      rotate: 0,
      directions: [-1, 1],
      colors: ['#ef5a84', '#9cd6e7', '#efbd63', '#8cc6b5'],

      init () {

      },

      draw (colors) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.save()
        ctx.lineCap     = 'round'
        ctx.lineWidth   = this.lineWidth
        ctx.globalCompositeOperation = 'darker'
        // ctx.globalAlpha = 0.9

        ctx.translate(center.x, center.y)     // 1
        ctx.rotate(getAngle(rotate))
        ctx.save()

        ctx.beginPath()
        ctx.strokeStyle = this.colors[0]
        ctx.translate(- offset, - initialLen / 2) // 2
        ctx.moveTo(0, 0)
        ctx.lineTo(0, initialLen)
        ctx.stroke()

        ctx.restore() // 1
        ctx.save()
        
        ctx.beginPath()
        ctx.translate(initialLen / 2, -offset)
        ctx.strokeStyle = this.colors[1]
        ctx.moveTo(0, 0)
        ctx.lineTo(-initialLen, 0)
        ctx.stroke()

        ctx.restore()
        ctx.save()
        ctx.beginPath()
        ctx.translate(offset, initialLen / 2) // 2
        ctx.strokeStyle = this.colors[2]
        ctx.moveTo(0, 0)
        ctx.lineTo(0, -initialLen)
        ctx.stroke()

        ctx.restore()
        ctx.save()
        ctx.beginPath()
        ctx.translate( -initialLen / 2, offset) // 2
        ctx.strokeStyle = this.colors[3]
        ctx.moveTo(0, 0)
        ctx.globalCompositeOperation = 'destination-over'
        ctx.lineJoin = 'round'
        ctx.lineTo(initialLen / 2, 0)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(initialLen / 2, 0)
        ctx.globalCompositeOperation = 'source-over'
        ctx.lineTo(initialLen, 0)
        ctx.stroke()

        ctx.restore()
        ctx.restore()
      },

      update () {
        rotate = t(Date.now())

        const a = Math.sin(getAngle(rotate))
        initialLen = 200 * a

        const b = Math.sin(getAngle(rotate - 90))
        offset     = 60 + b * 10

        this.draw()
        requestAnimationFrame(() => this.update())
      }
    }

    app.update()
