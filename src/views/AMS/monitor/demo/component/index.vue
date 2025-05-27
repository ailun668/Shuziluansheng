<template>
  <el-dialog title="打印" :close-on-click-modal="false" v-model="visible" width="40%" class="print-dialog" @closed="closed" append-to-body>
    <!-- 	<div id="imgcode"  ref="printDiv">
			<v-js-barcode v-for="(item,index) in dataAll" :dataAll="item" :key="index" :value="item.code" :text="item.code"
				:text1="item.cas" :text2="item.username" :text3="item.name" :valid="true" />
		</div>
		<span slot="footer" class="dialog-footer">
				<el-button class="topTheme-btn" @click="printDivfun" v-preventReClick>确定</el-button>
		</span> -->

    <!-- <el-button class="topTheme-btn" @click="dataFormSubmit" v-print="'#imgcode'" v-preventReClick>确定</el-button> -->

    <div id="printDiv" ref="printDiv" style="height: 400px; overflow: auto">
      <printDemo v-for="(item, index) in dataAll" :key="index" :dataAll="item" />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" size="medium" @click="printDivfun">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import JsBarcode from 'jsbarcode'
import printDemo from './printDemo.vue'
export default {
  name: 'PrintCode',
  data() {
    return {
      loading: false,
      visible: false,
      dataAll: [],
    }
  },
  components: {
    printDemo,
  },
  methods: {
    printDivfun() {
      let obj = this.$refs.printDiv
      var newWindow = window.open()
      var docStr = obj.innerHTML
      newWindow.document.write(docStr)
      newWindow.print()
      setTimeout(function () {
        newWindow.close()
      }, 20)
      // window.print();
      this.$emit('refreshDataList')
      this.visible = false
    },
    init(data) {
      this.dataAll = ''
      this.visible = true
      this.$nextTick(() => {
        // JsBarcode('#barcode', '1647845459886054', {
        // 	format: 'code128',
        // 	lineColor: '#000',
        // 	background: '#dedede',
        // 	width: 2,
        // 	height: 80,
        // 	displayValue: true
        // })
        this.dataAll = data
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.visible = false
    },
    closed() {
      this.dataAll = ''
      this.loading = false
    },
  },
}
</script>

<style lang="scss">
.print-dialog {
  .el-dialog {
    margin-top: 7vh !important;

    .el-dialog__body {
      max-height: 75vh;
      overflow: auto;
    }
  }
}
</style>
