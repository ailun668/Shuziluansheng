<template>
  <div class="print-view">
    <button v-if="showBtn" class="print_btn" @click="printSKU">打印</button>
    <ul class="print_nav">
      <li v-for="(item, index) in printData" :key="index" class="item">
        <svg id="barcode" :ref="(el) => renderBarcode(el, item.sku)"></svg>
        <div class="sku">
          <span :ref="(el) => renderSize(el)" class="text"> {{ item.sku }}== </span>
        </div>
        <p class="title">
          {{ item.productName }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'
import renderJsbarcode from '@/utils/jsbarcode.js'

// 是否显示打印按钮
const showBtn = ref(true)

// 条形码数据
const printData = reactive([
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
])

// 渲染条形码
const renderBarcode = (el, code) => {
  renderJsbarcode(el, code)
}
// 渲染条形码尺寸
const renderSize = (el) => {
  const parent = el.parentNode
  if (el.clientWidth > parent.clientWidth) {
    const scale = parent.clientWidth / el.clientWidth
    el.style.transform = `scale(${scale})`
  }
}

// 打印按钮触发
const printSKU = () => {
  showBtn.value = false
  setTimeout(() => {
    window.print()
    showBtn.value = true
  }, 100)
}
</script>

<style lang="scss" scoped>
.print-view {
  position: relative;
  margin: 0 auto;
  margin-bottom: 5mm;
  padding: 1mm 1mm;
  width: 60mm;
  height: 30mm;
  font-size: 13px;
  background-color: #fff;
  text-align: center;
  .print_btn {
    border: 1px solid #2e6da4;
    border-radius: 2px;
    width: 80px;
    height: 35px;
    font-size: 13px;
    color: #fff;
    background-color: #337ab7;
    cursor: pointer;
    margin-bottom: 20px;
  }
  .print_nav {
    list-style: none;
    padding: 0;
    margin: 0;
    .item {
      margin-bottom: 10px;

      #barcode {
        // margin-bottom: 1mm;
        margin-bottom: 0;
        width: 100%;
        height: 15mm;
        object-fit: contain;
      }

      .title {
        overflow: hidden;
        margin: 0 auto;
        width: 90%;
        height: 24px;
        font-size: 10px;
      }

      .sku {
        display: flex;
        justify-content: center;
        margin: 0 auto;
        margin-bottom: 1mm;
        width: 90%;

        span {
          font-weight: 700;
          white-space: nowrap; /* 禁止文本换行 */
          // transform: scale(0.75);
          /* 动态计算！ */
        }
      }
    }
  }
}
</style>
