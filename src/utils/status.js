export const fomartPaystage = (type) => {
  const statemap = {
    1: '告警',
    2: '预计',
    3: '已取消',
    4: '已关闭',
    5: '已完成',
  }
  return statemap[type]
}
// 设备状态(0未激活 1异常 2在线 3离线)
export const deviceStatus = (type) => {
  const statemp = {
    0: 'amsgive',
    1: 'amsgive',
    2: '',
    3: 'amsgive',
  }
  return statemp[type]
}

export const ams_alarm = (type) => {
  switch (type) {
    case 0:
      return '#797979'
      break
    default:
      return '#a00303'
      break
  }
}

export const ams_alarm_class = (type) => {
  switch (type) {
    case 0:
      return 'normal'
      break
    default:
      return 'warn'
      break
  }
}

// 枚举: 0,1,2,OFFLINE,ONLINE,ALARM
// 枚举备注: 0 :离线 1 :在线 2 :报警/蜂鸣
// OFFLINE :离线, ONLINE :在线, ALARM :报警/蜂鸣
export const system = (type) => {
  const statemp = {
    OFFLINE: ['#dedede', 0],
    null: ['#dedede', 0],
    ONLINE: ['#dedede', 1],
    ALARM: ['#a00303', 1],
  }
  return statemp[type]
}

export const buzzerstatus = (type) => {
  const statemp = {
    OFFLINE: 'iconfontwarn',
    null: 'iconfontwarn',
    ONLINE: 'iconfonticon_security',
    ALARM: 'iconfonticon_alarm',
  }
  return statemp[type]
}

// 枚举: 0,1,2,OFFLINE,ONLINE,ALARM
// 枚举备注: 0 :离线 1 :在线 2 :报警/蜂鸣 OFFLINE :离线 ONLINE :在线 ALARM :报警/蜂鸣

export const pc_status = (type) => {
  const statemp = {
    OFFLINE: [0],
    ONLINE: [1],
  }
  if (type === null) {
    return 0
  } else {
    return statemp[type]
  }
}

//字段回显截取
export const truncateString = (str, num) => {
  var firstSpaceIndex = str.indexOf(' ')
  var prefix, suffix
  if (firstSpaceIndex !== -1) {
    // 如果找到了空格
    var prefix = str.substring(0, firstSpaceIndex)
  }
  // var prefix = str.substring(0, 5)
  var suffix = str.substring(str.length - 6)
  return prefix + ' ' + suffix
}
export const SANGO_AMS_UNIT = [
  'A',
  'bar',
  '℃',
  '°',
  'Hz',
  'H',
  'kW',
  'MPa',
  'm³/h',
  'm³',
  'm',
  'mA',
  'N·m',
  'rpm',
  'T',
  'V',
  'lb·ft',
  '％',
  'L/H',
  'KVA',
  'KVAR',
]
export const Value_Type = ['Analog', 'Switch']
export const Alarm_Type = ['None', 'HH', 'H', 'L', 'LL', 'EA']

// OINT_TABLE_TYPE,CUSTOM_TYPE
// 枚举备注:
// POINT_TABLE_TYPE :点表自动构建的告警规则 ,
// CUSTOM_TYPE :用户自定义创建的告警规则
export const alarmRuleType = (type) => {
  const statemp = {
    POINT_TABLE_TYPE: true,
    CUSTOM_TYPE: false,
  }
  return statemp[type]
}
export const IOERROR_DEFAULT = '###'
// 处理IOERROR
export const IOERROR = (type, defaultValue = IOERROR_DEFAULT) => {
  if (type == -1001 || type == -1000 || type === null || isNaN(type)) {
    return defaultValue
  } else if (type == defaultValue) {
    return type
  } else {
    return parseFloat(type).toFixed(2)
  }
}

/**
 * 开闭合区间符号 与后端保持一致
 * GT: 大于 (>)
 * GTE: 大于等于 (>=)
 * LT: 小于 (<)
 * LTE: 小于等于 (<=)
 */
export const INTERVAL_SYMBOL = {
  GT: 'GT', // 大于 >
  GTE: 'GTE', // 大于等于 >=
  LT: 'LT', // 小于 <
  LTE: 'LTE', // 小于等于 <=
  EQ: 'EQ', // 等于 =
}
// 告警类型和级别映射关系
export const ALARM_TYPE_LABEL_MAP = {
  'LL-A': 'Low Low',
  'L-A': 'Low',
  'H-A': 'High',
  'HH-A': 'High High',
}
// 值类型
export const VALUE_TYPE = {
  State: 'State',
  Switch: 'Switch',
  Analog: 'Analog',
}

// 固定常量 无信号
export const NO_SIGNAL = 'NO SIGNAL'
export const SIGNAL_ERROR = 'SIGNAL ERROR'
// 背景色对应className
export const STATUS_CLASS_MAP = {
  stop: 'status-stop-bg',
  running: 'status-running-bg',
  ready: 'status-ready-bg',
  disable: 'status-disable-bg',
  info: 'status-info-bg',
}
// 枚举颜色映射
export const enumListColorMap = {
  on: STATUS_CLASS_MAP.running,
  off: STATUS_CLASS_MAP.disable,
  stop: STATUS_CLASS_MAP.stop,
  'not ready': STATUS_CLASS_MAP.disable,
  'no signal': STATUS_CLASS_MAP.disable,
  'signal error': STATUS_CLASS_MAP.disable,
  running: STATUS_CLASS_MAP.running,
  ready: STATUS_CLASS_MAP.ready,
}
