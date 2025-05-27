import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

// 日期格式化
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    } else if (typeof time === 'string') {
      time = time
        .replace(new RegExp(/-/gm), '/')
        .replace('T', ' ')
        .replace(new RegExp(/\.[\d]{3}/gm), '')
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

// 表单重置
export function resetForm(refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields()
  }
}

// 添加日期范围
export function addDateRange(params, dateRange, propName) {
  let search = params
  search.params = typeof search.params === 'object' && search.params !== null && !Array.isArray(search.params) ? search.params : {}
  dateRange = Array.isArray(dateRange) ? dateRange : []
  if (typeof propName === 'undefined') {
    search.params['beginTime'] = dateRange[0]
    search.params['endTime'] = dateRange[1]
  } else {
    search.params['begin' + propName] = dateRange[0]
    search.params['end' + propName] = dateRange[1]
  }
  return search
}

// 回显数据字典
export function selectDictLabel(datas, value) {
  if (value === undefined) {
    return ''
  }
  var actions = []
  Object.keys(datas).some((key) => {
    if (datas[key].value == '' + value) {
      actions.push(datas[key].label)
      return true
    }
  })
  if (actions.length === 0) {
    actions.push(value)
  }
  return actions.join('')
}

// 回显数据字典（字符串数组）
export function selectDictLabels(datas, value, separator) {
  if (value === undefined) {
    return ''
  }
  var actions = []
  var currentSeparator = undefined === separator ? ',' : separator
  var temp = value.split(currentSeparator)
  Object.keys(value.split(currentSeparator)).some((val) => {
    var match = false
    Object.keys(datas).some((key) => {
      if (datas[key].value == '' + temp[val]) {
        actions.push(datas[key].label + currentSeparator)
        match = true
      }
    })
    if (!match) {
      actions.push(temp[val] + currentSeparator)
    }
  })
  return actions.join('').substring(0, actions.join('').length - 1)
}

// 字符串格式化(%s )
export function sprintf(str) {
  var args = arguments,
    flag = true,
    i = 1
  str = str.replace(/%s/g, function () {
    var arg = args[i++]
    if (typeof arg === 'undefined') {
      flag = false
      return ''
    }
    return arg
  })
  return flag ? str : ''
}

// 转换字符串，undefined,null等转化为""
export function parseStrEmpty(str) {
  if (!str || str == 'undefined' || str == 'null') {
    return ''
  }
  return str
}

// 数据合并
export function mergeRecursive(source, target) {
  for (var p in target) {
    try {
      if (target[p].constructor == Object) {
        source[p] = mergeRecursive(source[p], target[p])
      } else {
        source[p] = target[p]
      }
    } catch (e) {
      source[p] = target[p]
    }
  }
  return source
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data, id, parentId, children) {
  let config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children',
  }

  var childrenListMap = {}
  var nodeIds = {}
  var tree = []

  for (let d of data) {
    let parentId = d[config.parentId]
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = []
    }
    nodeIds[d[config.id]] = d
    childrenListMap[parentId].push(d)
  }

  for (let d of data) {
    let parentId = d[config.parentId]
    if (nodeIds[parentId] == null) {
      tree.push(d)
    }
  }

  for (let t of tree) {
    adaptToChildrenList(t)
  }

  function adaptToChildrenList(o) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]]
    }
    if (o[config.childrenList]) {
      for (let c of o[config.childrenList]) {
        adaptToChildrenList(c)
      }
    }
  }
  return tree
}

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    var part = encodeURIComponent(propName) + '='
    if (value !== null && value !== '' && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== '' && typeof value[key] !== 'undefined') {
            let params = propName + '[' + key + ']'
            var subPart = encodeURIComponent(params) + '='
            result += subPart + encodeURIComponent(value[key]) + '&'
          }
        }
      } else {
        result += part + encodeURIComponent(value) + '&'
      }
    }
  }
  return result
}

// 验证是否为blob格式
export async function blobValidate(data) {
  try {
    const text = await data.text()
    JSON.parse(text)
    return false
  } catch (error) {
    return true
  }
}

/**
 * 将对象中无值的属性过滤掉
 * @param {*} obj
 * @returns
 */
export function filterObject(obj) {
  // 使用 Object.entries() 方法将对象转换为键值对数组
  const entries = Object.entries(obj)
  // 使用 Array.prototype.filter() 方法过滤出有值的属性
  const filteredEntries = entries.filter(([key, value]) => value !== undefined && value !== null && value !== '')
  // 使用 Object.fromEntries() 方法将键值对数组转换回对象
  const filteredObj = Object.fromEntries(filteredEntries)

  return filteredObj
}

// 时间戳转化为yyyy-mm-dd
// flag: arr:返回[yyyy,mm,dd] data:返回yyyy-mm-dd
export function formatTimestamp(timestamp, flag) {
  if (!timestamp) return
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const formattedDate = `${year}-${month}-${day}`
  const dataArr = [year, month, day]
  return flag === 'arr' ? dataArr : formattedDate
}

// 将传入的时间戳转换为 utc 时间显示
export function timestampToUtcFormat(time, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!time && time !== 0) {
    return ''
  }
  return dayjs.utc(time).format(format)
}

// utc时间转换为时间戳
// 传入的时间文本会被当成utc时间
// 例如传入 '1970-01-01' 则会被当成 utc 时间（0时区）的 1970年01月01日 则转换出来的时间戳是0
// 如果 isOver 为true，则会返回当天的23:59:59:999
export function utcDateToTimestamp(time, isOver = false) {
  if (!time) {
    return ''
  }

  if (isOver) {
    return dayjs.utc(time).endOf('day').valueOf()
  } else {
    return dayjs.utc(time).valueOf()
  }
}

export const convertToUtcTimestamp = (timestamp) => {
  return dayjs.utc(timestamp)
}

//度转度°分′
export function ToDegrees(val) {
  if (typeof val == 'undefined' || val == '') {
    return ''
  }
  var i = val.indexOf('.')
  var strDu = i < 0 ? val : val.substring(0, i) //获取度
  var strFen = 0
  var strMiao = 0
  if (i > 0) {
    var strFen = '0' + val.substring(i)
    strFen = (strFen * 60).toFixed(3)
    // i = strFen.indexOf('.');
    // if (i > 0) {
    //     strMiao = "0" + strFen.substring(i);
    //     strFen = strFen.substring(0, i);//获取分
    //     strMiao = strMiao * 60 + "";
    //     i = strMiao.indexOf('.');
    //     strMiao = strMiao.substring(0, i + 4);//取到小数点后面三位
    //     strMiao = parseFloat(strMiao).toFixed(2);//精确小数点后面两位
    // }
  }
  // return strDu + "," + strFen + "," + strMiao;    // 这里可以修改成你想要的格式例如你可以
  // return strDu + "°" + strFen + "'" + strMiao + "\"";
  return strDu + '°' + strFen + "'"
}

export const convertToDMS = (coordinate, isLatitude = false) => {
  if (!coordinate) return
  let coordinateString = coordinate.toString().trim()
  let direction = ''

  if (isLatitude) {
    direction = coordinate >= 0 ? 'N' : 'S'
  } else if (coordinateString.endsWith('N')) {
    direction = 'N'
    coordinateString = coordinateString.slice(0, -1).trim()
  } else if (coordinateString.endsWith('S')) {
    direction = 'S'
    coordinateString = coordinateString.slice(0, -1).trim()
  } else if (coordinateString.endsWith('E')) {
    direction = 'E'
    coordinateString = coordinateString.slice(0, -1).trim()
  } else if (coordinateString.endsWith('W')) {
    direction = 'W'
    coordinateString = coordinateString.slice(0, -1).trim()
  } else {
    direction = coordinate >= 0 ? 'E' : 'W'
  }

  if (coordinateString.endsWith('E') || coordinateString.endsWith('W') || coordinateString.endsWith('N') || coordinateString.endsWith('S')) {
    coordinateString = coordinateString.slice(0, -1).trim()
  }

  const absoluteCoordinate = Math.abs(parseFloat(coordinateString))
  const degrees = Math.floor(absoluteCoordinate)
  const minutes = ((absoluteCoordinate - degrees) * 60).toFixed(3)
  // const seconds = ((absoluteCoordinate - degrees - (minutes / 60)) * 3600).toFixed(3);

  return `${degrees}° ${minutes}' ${direction}`
}
