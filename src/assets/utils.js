function transposePolyrect (coordinate, sep = '|') {
  var arr = []
  let pattern = /\d+(\.\d+)?/g
  if (typeof coordinate === 'string') {
    let temp = coordinate.split(sep)
    temp.forEach((t) => {
      if (t) {
        let re = []
        let mat = t.match(pattern)
        if (mat) {
          for (var i = 1; i < mat.length; i += 2) {
            var x = parseFloat(mat[i - 1])
            var y = parseFloat(mat[i])
            re.push([x, y])
          }
          arr.push(re)
        }
      }
    })
  } else {
    console.warn('经纬度格式有误:', coordinate)
  }
  return arr
}

function exportPolyrect (data) {

  return data.map((item) => {
    let arr = ''
    item.list.map((item, index) => {
      let Str = ''
      item.map((item) => {
        let str = `${item[0]},${item[1]};`
        Str = Str + str
      })
      if (index > 0) {
        arr = arr + '|' + Str
      } else {
        arr = arr + Str
      }
    })
    return {
      name: item.name,
      list: arr,
    }
  })
}

function color16 () {//十六进制颜色随机
  var r = Math.floor(Math.random() * 16);
  var g = Math.floor(Math.random() * 16);
  var b = Math.floor(Math.random() * 16);
  // if (r <= 16 || g <= 16 || b <= 16) { color16() }
  var color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
  return color;
}
export {
  transposePolyrect,
  color16,
  exportPolyrect
}