<template>
  <div class="printdemo">
    <div style="margin-bottom: 6px; padding: 5px">
      <p style="font-size: 26px">{{ dataAll.sku }} {{ dataAll.cas }}</p>
      <p style="font-size: 26px">{{ dataAll.productName }}</p>
      <svg class="vue-barcode-element" />
    </div>
  </div>
</template>
<script>
import JsBarcode from 'jsbarcode'
let app = {}
let data = {}
export default {
  name: 'printdemo',
  props: ['dataAll'],
  data() {
    app = this
    return data
  },
  methods: {
    sing() {
      // this.$router.go(0)
      JsBarcode(this.$el.querySelector('.vue-barcode-element'), this.dataAll.sku, {
        format: 'code128',
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
      })
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.sing()
    })
  },
}
</script>
<style scoped>
p {
  margin: 5px 0;
  padding: 0px;
}
</style>
