export default function tick (oldProp, targetProp, delay, easingFunc) {
  var t1 = Date.now()

  return function (t2) {
    var changed = targetProp - oldProp                    // 属性变化值
    var ratio   = (t2 - t1) / delay                       // 时长比率

    if (ratio >= 1) { return false }

    var newProp = oldProp + easingFunc(ratio) * changed   // 新的属性
    return newProp
  }
}
