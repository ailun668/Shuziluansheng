import _ from 'lodash'
function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}
/**
 * 合并覆盖对象
 * @param {} source  来源对象
 * @param {} target  被覆盖的对象
 * @returns {}
 */
const mergeObject = (source = {}, target = {}) => {
  const keys = [...Object.keys(source), ...Object.keys(target)]
  let obj = {}
  for (let k of keys) {
    const v = source[k]
    if (isObject(v) && isObject(target[k])) {
      obj[k] = _.merge(v, target[k])
    } else {
      obj[k] = _.isUndefined(target[k]) ? v : target[k]
    }
  }
  return obj
}
/**
 * 合并仪表盘的配置项
 */
export const initChartOptions = (source, target) => {
  return mergeObject(source, target)
}

// TODO 返回target除了except中记录的key之外的数据作为计算属性
const createComputeds = (target = {}, except = [] || '') => { }

// 创建仪表盘的色值对应关系
const colorsMap = {
  'L-A': '#E58F4B', // 低限 一般告警
  'LL-A': '#E83643', //低低限 最高报警
  'H-A': '#E58F4B', // 高限 一般告警
  'HH-A': '#E83643', // 高高限 最高报警
}

// 创建仪表盘的显示值的色值对应关系
const valueColorsMap = {
  'L-A': '#E58F4B', // 低限 一般告警
  'LL-A': '#ff3918', //低低限 最高报警
  'H-A': '#E58F4B', // 高限 一般告警
  'HH-A': '#ff3918', // 高高限 最高报警
  NORMAL: '#fff', // 正常色值
}
// 创建仪表盘的显示值的粗细
const valueColorWeight = {
  normal: 500,
  weight: 600,
}
// 遍历循环需要顺序
const rangeLvl = ['LL-A', 'L-A', 'H-A', 'HH-A']
/**
 *
 * @param {num[]} arr
 * @returns 返回数组差值
 */
const getDiff = (arr) => {
  return Math.abs(arr[1] - arr[0])
}
const setDefaultOptions = (options) => {
  options.normalColor = options?.normalColor || '#3D7CB6'
  options.lineColor = options?.lineColor || '#424052'
  options.valueColor = options?.valueColor || '#fff'
  valueColorsMap['NORMAL'] = options.valueColor
  return options
}
/**
 *
 * @param {Object[]} alarmRanges  告警范围
 * @param {String} range 数据范围
 * @param {Object} otherOptions 用于加入其他属性配置 函数传参保持只有三个
 * @param {string} otherOptions.normalColor 正常值的颜色
 * @param {string} otherOptions.lineColor 线条的颜色
 * @param {number} otherOptions.fieldValue 仪表盘的值
 * @returns {Object} 返回包含多个颜色配置的对象
 * @returns {string} returns.progress 进度条的颜色
 * @returns {Array[]} returns.colors 仪表盘的分段颜色
 * @returns {string} returns.valueColor 仪表盘值的颜色
 * @returns {string} returns.valueWeight 仪表盘值的粗细
 */
export const createChartColors = (alarmRanges, range = null, otherOptions = {}) => {
  // otherOptions 给默认值
  otherOptions = setDefaultOptions(otherOptions)
  let { fieldValue, normalColor, lineColor, valueColor } = otherOptions
  let valueWeight = valueColorWeight.normal

  if (range === null)
    return {
      progress: normalColor,
      colors: [[1, lineColor]],
      valueColor,
      valueWeight,
    }
  range = range.split(',').map(Number)
  const diff = getDiff(range)
  // 没有告警范围 返回默认颜色
  if (!alarmRanges) {
    // 超出设置的范围
    if (fieldValue && (fieldValue > range[1] || fieldValue < range[0])) {
      valueColor = valueColorsMap['HH-A']
      valueWeight = valueColorWeight.weight
    }
    return {
      progress: normalColor,
      colors: [[1, lineColor]],
      valueColor,
      valueWeight,
    }
  }
  let map = {},
    arr = [],
    progress = 0,
    min = range[0]
  alarmRanges.forEach((item) => {
    // 特殊处理null的情况
    if (item.alarmRange[0] === null) {
      item.alarmRange[0] = range[0]
    }
    if (item.alarmRange[1] === null) {
      item.alarmRange[1] = range[1]
    }
    map[item.alarmType] = item.alarmRange.map(Number)
  })
  // 设置每个阶段的颜色
  function setColor(nums, color, level) {
    const num = getDiff(nums)
    const result = num / diff
    progress += result
    min = nums[1]
    arr.push([progress, color])
    setTextColor(nums, level)
  }
  // 设置正常范围颜色
  function setNormal(nums) {
    const minNum = nums[0]
    // 如果相等或者大于代表中间没有差值
    if (min >= minNum) return
    setColor([min, minNum], normalColor)
  }
  // 设置仪表字体颜色
  function setTextColor(nums, level) {
    if (fieldValue === null || fieldValue === undefined) return
    const value = Number(fieldValue)
    // 非数字 例如：###
    if (isNaN(value)) return
    // 超出设置的范围
    if (value > range[1] || value < range[0]) {
      valueColor = valueColorsMap['HH-A']
      valueWeight = valueColorWeight.weight
      return
    }
    // 不在范围内
    if (!level) return
    // LL时左闭右闭
    if (level === rangeLvl[0]) {
      if (value < nums[0] || value > nums[1]) return
    }
    // L时检测LL，存在则左开右闭，不存在左闭右闭
    if (level === rangeLvl[1]) {
      if (map[rangeLvl[0]]) {
        if (value <= nums[0] || value > nums[1]) return
      } else {
        if (value < nums[0] || value > nums[1]) return
      }
    }
    // H时检测HH，存在则左闭右开，不存在左闭右闭
    if (level === rangeLvl[2]) {
      if (map[rangeLvl[3]]) {
        if (value < nums[0] || value >= nums[1]) return
      } else {
        if (value < nums[0] || value > nums[1]) return
      }
    }
    // HH时左闭右闭
    if (level === rangeLvl[3]) {
      if (value < nums[0] || value > nums[1]) return
    }
    valueColor = level ? valueColorsMap[level] : valueColorsMap['NORMAL']
    valueWeight = level ? valueColorWeight.weight : valueColorWeight.normal
  }
  // 从小到大循环固定顺序  设置色值和区间
  for (let k of rangeLvl) {
    if (map[k]) {
      // 中间若有差值则设置正常颜色
      setNormal(map[k])
      setColor(map[k], colorsMap[k], k)
    }
  }
  // 补齐数组最后不是范围不是1的情况
  if (arr[arr.length - 1][0] !== 1) {
    arr.push([1, normalColor])
  }
  return {
    progress: 'rgba(0,0,0,0)', // 进度条不要颜色
    colors: arr,
    valueColor,
    valueWeight,
  }
}

const DEFAULT_VALUE = {
  fieldValue: '',
  unit: '',
  range: '0, 2000',
}

export const createComputed = (c) => {
  return c || DEFAULT_VALUE
}
