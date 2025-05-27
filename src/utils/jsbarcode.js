import jsbarcode from 'jsbarcode'
export default function renderBarcode(el, value, options) {
  const ops = {
    // format: 'CODE128',
    // lineColor: '#000',
    // width: 2,
    // height: 40,
    // displayValue: false,
    // margin: 0,
    // ...options,
    format: 'CODE128',
    lineColor: '#000',
    background: '#dedede',
    width: 2,
    height: 80,
    fontSize: 26,
    displayValue: true,
    // text:"456",//覆盖显示的文本
    // fontOptions: "bold", //使文字加粗体或变斜体
    // font: "fantasy", //设置文本的字体
    textAlign: 'center', // 设置文本的水平对齐方式
    textPosition: 'bottom', // 设置文本的垂直位置
    textMargin: 5, // 设置条形码和文本之间的间距
    margin: 15, // 设置条形码周围的空白边距
  }
  jsbarcode(el, value, ops)
}
