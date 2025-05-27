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
  { prop: 'itemNo', label: 'ITEM NO.', align: 'center' },
  { prop: 'alarmName', label: 'ALARM NAME', align: 'left' },
  { prop: 'group', label: 'GROUP', align: 'center' },
  { prop: 'alarmType', label: 'ALARM TYPE', align: 'center' },
  { prop: 'alarmTs', label: 'ALARM TIME', align: 'center', utcTime: true },
  { prop: 'ackTime', label: 'ACK TIME', align: 'center', utcTime: true },
  { prop: 'endTime', label: 'END TIME', align: 'center', utcTime: true },
  {
    prop: 'options',
    label: 'DETAIL',
    width: '200',
    fixed: 'right',
    slots: 'options',
    align: 'center',
  },
]
