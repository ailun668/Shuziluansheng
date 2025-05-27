<template>
  <div>
    <el-button type="primary" @click="chlidPrint">打印</el-button>
    <dPrintCode ref="printCode"></dPrintCode>
  </div>
</template>

<script>
import dPrintCode from './component/index.vue'
export default {
  name: 'monitor',
  components: {
    dPrintCode,
  },
  methods: {
    chlidPrint() {
      const printData = [
        { sku: 'sku-01', productName: '衬衫-01' },
        { sku: 'sku-02', productName: '衬衫-02' },
        { sku: 'sku-01', productName: '衬衫-01' },
        { sku: 'sku-02', productName: '衬衫-02' },
        { sku: 'sku-01', productName: '衬衫-01' },
        { sku: 'sku-02', productName: '衬衫-02' },
        { sku: 'sku-01', productName: '衬衫-01' },
        { sku: 'sku-02', productName: '衬衫-02' },
        { sku: 'sku-01', productName: '衬衫-01' },
        { sku: 'sku-02', productName: '衬衫-02' },
        { sku: 'sku-01', productName: '衬衫-01' },
        { sku: 'sku-02', productName: '衬衫-02' },
      ]
      this.$refs.printCode.init(printData)
    },
  },
  mounted() {
    let time = setTimeout(() => {
      this.chlidPrint()
    }, 3000)
  },
}
</script>
