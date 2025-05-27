export const fomartPaystage = (paystatys) => {
  const statemap = {
    1: '待支付',
    2: '已支付',
    3: '已取消',
    4: '已关闭',
    5: '已完成',
  }
  return statemap[paystatys]
}

export const fom = (parmsts) => {
  const statemp = {
    1: '待支付',
    2: '已支付',
    3: '已取消',
    4: '已关闭',
    5: '已完成',
    6: '已退款',
    7: '退款中',
    8: '退款失败',
    9: '已退款',
    10: '退款失败',
  }
  return statemp[statemp]
}
