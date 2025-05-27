<template>
  <!-- v-loading="loading" -->
  <div class="content">
    <div id="weather">
      <Table
        :data="data"
        :column="column"
        :formData="formData"
        :showIndex="true"
        :selectIcon="false"
        :border="false"
        :total="total"
        :formSpan="6"
        page
        background
        @search="search"
        @pageChange="pageChange"
        @pageSizeChange="pageSizeChange"
        @reset="reset"
        ref="baseTable"
        :exportBtnShow="exportBtnShow"
      >
        <template #equipmentName>
          <el-select filterable v-model="menu.deviceCode" placeholder="select equip" style="width: 100%" @change="changeEquipement">
            <el-option v-for="(item, inx) in menu.Equipmentsurvival" :key="item.deviceName + inx" :label="item.deviceName" :value="item.deviceCode" />
          </el-select>
        </template>
        <template #daterange>
          <el-date-picker
            clearable
            v-model="selectDate"
            type="datetimerange"
            range-separator="-"
            start-placeholder="StartDate"
            end-placeholder="EndDate"
            :disabledDate="disabledDateFn"
            @change="datePickerChange"
          />
        </template>
        <template #toolbar2>
          <SGbutton btnbg :loading="loading" class="graph" :title="isGraph ? $t('datalist') : $t('graph')" @handleClick="toggleGraph">
            <svg-icon iconName="iconfontgraph"></svg-icon>
          </SGbutton>
        </template>
        <template #toolbar3>
          <SGbutton btnbg :loading="loading" iconName="iconfontexport" :title="$t('export')" @handleClick="exportAsXLSX"> </SGbutton>
        </template>
        <template #tableBody v-if="isGraph">
          <div style="height: calc(100% - 50px); width: 100%; overflow: scroll">
            <innerChartTable :parmts="parmts" />
          </div>
        </template>
      </Table>
      <el-dialog :close-on-click-modal="false" title="Export Data" v-model="dialogVisible" width="22%" :show-close="false">
        <div v-loading="loading">
          <el-date-picker :clearable="false" v-model="selectData" type="date" placeholder="Please select a date" :disabledDate="disabledDateFn">
          </el-date-picker>
          &nbsp;
          <el-button type="primary" @click="onConfirm">Confirm</el-button>
          <el-button @click="dialogVisible = false">Cancel</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { Edit, CloseBold, Tickets } from '@element-plus/icons-vue'
import { column, data, formData } from './data.js'
import { utcDateToTimestamp } from '@/utils/comment.js'
import dayjs from 'dayjs'
import innerChartTable from './components/innerChartTable.vue'
import { indextemp } from '@/utils/sangoai.ts'
import menuCollapse from '@/store/module/menu.js'
import Api from '@/axios/monitor.js'

export default {
  name: 'History',
  props: {
    startTime: {
      type: String,
      default: '',
    },
    endTime: {
      type: String,
      default: '',
    },
    filter: {
      type: Boolean,
      defautl: false,
    },
  },
  mixins: [indextemp],
  data() {
    return {
      selectData: null,
      dialogVisible: false,
      exportBtnShow: true,
      Edit,
      CloseBold,
      Tickets,
      formData,
      column: column,
      data,
      isGraph: false,
      loading: true,
      selectDate: [],

      //下拉选项
      menu: menuCollapse(),
      deviceCode: '',

      pageNo: 1,
      pageSize: 10,
      total: 0,
      parmts: {},
    }
  },
  components: {
    innerChartTable,
  },
  created() {
    let nowTime = dayjs.utc().format('YYYY-MM-DD HH:mm:ss')
    this.selectData = dayjs(nowTime).toDate()
  },
  mounted() {
    this.$nextTick(() => {
      this.api_alivelist()

      let pastTime = dayjs.utc().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss')
      let nowTime = dayjs.utc().format('YYYY-MM-DD HH:mm:ss')
      // this.selectDate = [dayjs(pastTime).toDate(), dayjs(nowTime).toDate()]

      this.deviceCode = this.menu.deviceCode
      setTimeout(() => {
        this.postdevice_data()
      }, 1000)
      // this.selectDate = [dayjs.utc().toDate(), dayjs.utc().toDate()]
    })
  },
  methods: {
    datePickerChange(val) {
      if (!val) {
        this.selectDate = []
      }
    },
    changeEquipement() {
      this.search()
    },
    exportAsXLSX() {
      this.dialogVisible = true
    },
    async onConfirm() {
      this.loading = true
      let params = {}
      params.startTs = utcDateToTimestamp(dayjs(this.selectData).format('YYYY-MM-DD'))
      params.endTs = utcDateToTimestamp(dayjs(this.selectData).format('YYYY-MM-DD'), true)
      params.deviceCode = this.menu.deviceCode
      let nowTime = dayjs.utc().format('YYYY-MM-DD HH:mm:ss')
      // console.log(dayjs(this.selectData).format('YYYYMMDD_HHmm'),)
      await Api.devicedataexport(params, 'History_Data_' + params.deviceCode + '_' + dayjs(params.endTs).utc().format('YYYYMMDD') + '_GMT')
        .then((res) => {
          this.loading = false
          this.dialogVisible = false
        })
        .catch((err) => {
          this.loading = false
        })
    },
    search(from) {
      this.pageNo = 1
      this.postdevice_data(from)
    },
    pageChange(pageNo) {
      this.pageNo = pageNo
      this.postdevice_data(this.parmts)
    },
    pageSizeChange(obj) {
      this.pageSize = obj.pageSize
      this.pageNo = obj.currentPage
      this.postdevice_data(this.parmts)
    },
    reset() {
      let pastTime = dayjs.utc().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss')
      let nowTime = dayjs.utc().format('YYYY-MM-DD HH:mm:ss')
      // this.selectDate = [dayjs(pastTime).toDate(), dayjs(nowTime).toDate()]
      this.pageNo = 1
      this.postdevice_data()
    },
    toggleGraph() {
      this.isGraph = !this.isGraph
      this.exportBtnShow = !this.exportBtnShow
    },
    postdevice_data(items) {
      this.loading = true
      try {
        const parmts = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
        }

        if (this.selectDate.length == 2) {
          if (this.selectDate[0] != '') {
            parmts.startTs = utcDateToTimestamp(dayjs(this.selectDate[0]).format('YYYY-MM-DD HH:mm:ss'))
            parmts.endTs = utcDateToTimestamp(dayjs(this.selectDate[1]).format('YYYY-MM-DD HH:mm:ss'))
          } else {
            parmts.startTs = dayjs.utc().subtract(1, 'day').valueOf()
            parmts.endTs = dayjs.utc().valueOf()
          }
        }
        parmts.deviceCode = this.menu.deviceCode

        if (items) {
          parmts.itemName = items?.itemName
        }
        this.parmts = { ...parmts }

        Api.device_data(parmts).then((res) => {
          this.loading = false
          if (res.code == 200) {
            this.total = res.data?.data?.total ?? 0
            this.processingData(res.data) //把数据转成符合表格的格式
          }
        })
      } finally {
        // this.loading = false
      }
    },
    processingData(params) {
      if (JSON.stringify(params) === '{}') {
        this.column = []
        this.data = []
        return
      }
      let tempTitle = [
        {
          prop: 'ts',
          label: 'time',
          align: 'center',
          width: '170',
          utcTime: true,
        },
      ]
      let tempColumn = params?.fieldKey || []
      for (let i = 0; i < tempColumn.length; i++) {
        let tempObj = {}
        tempObj.prop = tempColumn[i].key
        tempObj.label = tempColumn[i].name
        tempObj.align = 'center'

        tempObj.props = {
          minWidth: '200',
        }
        tempTitle.push(tempObj)
      }
      this.column = tempTitle
      if (params?.data?.records.length > 0) {
        try {
          let results = params?.data?.records.map((item) => {
            return Object.keys(item).reduce((acc, key) => {
              if (key === 'ts') {
                acc[key] = item[key]
              } else if (parseFloat(item[key]) === -1001 || parseFloat(item[key]) === -1000) {
                acc[key] = '###'
              } else {
                if (key === 'ip' || key === 'name' || key === 'location') {
                  acc[key] = item[key]
                } else {
                  acc[key] = parseFloat(item[key]).toFixed(2)
                }
              }
              return acc
            }, {})
          })
          this.data = results
        } catch (err) {
          console.log('IO', err)
        }
      } else {
        this.data = []
      }
    },
    disabledDateFn(time) {
      return utcDateToTimestamp(dayjs(time).format('YYYY-MM-DD')) > utcDateToTimestamp(dayjs(new Date()).format('YYYY-MM-DD'))
    },
  },
  watch: {
    startTime: {
      handler(newVal, oldVal) {
        //日期选择器绑定的是一个数组 selectDate
        this.selectDate[0] = newVal
      },
      deep: true,
      immediate: true,
    },
    endTime: {
      handler(newVal, oldVal) {
        this.selectDate[1] = newVal
      },
      deep: true,
      immediate: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import url('../common.scss');
</style>
