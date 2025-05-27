// 公共方法文件

/**
 * 传入图片路径，返回提供image标签使用
 * @param url 图片在images中的路径
 * @returns
 */
export const getAssetsFile = (url) => {
  return new URL(`../assets/images/${url}`, import.meta.url).href
}
export const List = ['ceshi', 'ceshi', 'ceshi', 'ceshi', 'ceshi']
// 时间戳转化为yyyy-mm-dd
// flag: arr:返回[yyyy,mm,dd]
// flag: data:返回yyyy-mm-dd
// flag: time:返回yyyy-mm-dd HH:mm:ss
// flag: HM:返回HH:mm
export const formatTimestamp = (timestamp, flag) => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  const formattedDate = `${year}-${month}-${day}`
  const dataArr = [year, month, day]
  const timeDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  const HM = `${hours}:${minutes}`

  let resObj = {
    arr: dataArr,
    time: timeDate,
    HM: HM,
    data: formattedDate,
  }

  return flag ? resObj[flag] : formattedDate
}

// yyyy-mm-dd转化为时间戳
export const convertToTimestamp = (dateString) => {
  const [year, month, day] = dateString.split('-')
  return new Date(year, month - 1, day).getTime()
}

// 防抖
export function debounce(fn, delay) {
  var delay = delay || 200
  var timer
  return function () {
    var th = this
    var args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      timer = null
      fn.apply(th, args)
    }, delay)
  }
}
// 节流
export function _throttle(fn, interval) {
  var last
  var timer
  var interval = interval || 200
  return function () {
    var th = this
    var args = arguments
    var now = +new Date()
    if (last && now - last < interval) {
      clearTimeout(timer)
      timer = setTimeout(function () {
        last = now
        fn.apply(th, args)
      }, interval)
    } else {
      last = now
      fn.apply(th, args)
    }
  }
}
