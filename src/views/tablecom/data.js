export const formData = [
  {
    field: 'Time',
    label: 'Date',
    slot: 'weekDatePick',
  },
  {
    field: 'createTime',
    label: '航次',
    type: 'input',
  },
  {
    field: 'publish',
    label: '状态',
    type: 'input',
  },
]

export const data = [
  {
    createTime: '2023-09-02 23:00:00',
    publish: 122,
    foodName: 'Main e',
    foodName: 3333,
    foodType: 'sangoai_SL4_D_03',
    foodUnit: 44,
    imgPath: '4444',
    updateBy: 4444,
  },
]

export const column = [
  { prop: 'createTime', label: '时间', align: 'center' },
  { prop: 'publish', label: '状态', align: 'center', slots: 'publish' },
  { prop: 'foodName', label: '名称', align: 'center' },
  { prop: 'foodName', label: '名称', align: 'center' },
  { prop: 'foodType', label: '类型', align: 'center' },
  { prop: 'foodUnit', label: '单位', align: 'center' },
  { prop: 'imgPath', label: '图片', align: 'center', slots: 'imgPath' },
  { prop: 'price', label: '价格', align: 'center' },
  { prop: 'updateBy', label: '合计', align: 'center' },
  {
    prop: 'options',
    label: '操作',
    width: '300',
    fixed: 'right',
    slots: 'options',
    align: 'center',
  },
]
