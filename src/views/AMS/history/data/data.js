export const formData = [
  {
    field: 'EquipmentName',
    label: ' ',
    slot: 'equipmentName',
  },
  {
    field: 'itemName',
    label: 'ITEM NAME',
    type: 'input',
  },
  {
    field: 'time',
    label: ' ',
    slot: 'daterange',
  },
]

export const data = [

]

export const column = [
  { prop: 'createTime', label: 'Time(GMT)', align: 'center' },
  { prop: 'publish', label: 'RUNNING HOURS(HOUR)', align: 'center', slots: 'publish' },
  { prop: 'foodName', label: 'COOLANT PRESSURE(BAR)', align: 'center' },
  { prop: 'foodName', label: 'COOLENT TEMPERATURE(℃)', align: 'center' },
  { prop: 'foodType', label: 'START AIR PRESSURE(BAR)', align: 'center' },
  { prop: 'foodUnit', label: 'SEA WATER PRESSURE(BAR)', align: 'center' },
  { prop: 'imgPath', label: 'DE BEARING TEMPERATURE(℃)', align: 'center', slots: 'imgPath' },
  { prop: 'price', label: 'NDE BEARING TEMPERATURE(℃)', align: 'center' },
  // {
  //   prop: 'options',
  //   label: '操作',
  //   width: '300',
  //   fixed: 'right',
  //   slots: 'options',
  //   align: 'center',
  // },
]
