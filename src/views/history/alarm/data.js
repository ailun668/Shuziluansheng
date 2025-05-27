export const formData = [
  {
    field: 'deviceCodeList',
    label: ' ',
    slot: 'equipmentName',
  },
  {
    field: 'itemName',
    label: 'ALARM NAME',
    type: 'input',
  },
  {
    field: 'time',
    label: ' ',
    slot: 'daterange',
  },
]

export const data = []

export const column = [
  { prop: 'itemNo', label: 'ITEM NO.', align: 'center', width: '120' },
  { prop: 'alarmName', label: 'ALARM NAME', align: 'left' },
  { prop: 'group', label: 'GROUP', align: 'center', width: '210' },
  { prop: 'alarmType', label: 'ALARM TYPE', align: 'center', width: '150' },
  { prop: 'alarmTs', label: 'ALARM TIME', align: 'center', utcTime: true, width: '210' },
  { prop: 'ackTime', label: 'ACK TIME', align: 'center', utcTime: true, width: '210' },
  { prop: 'endTime', label: 'END TIME', align: 'center', utcTime: true, width: '210' },
  {
    prop: 'options',
    label: 'DETAIL',
    width: '200',
    fixed: 'right',
    slots: 'options',
    align: 'center',
  },
]
