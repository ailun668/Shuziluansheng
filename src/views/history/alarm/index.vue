<template>
  <div class="content">
    <div id="weather">
      <Table
        :data="data"
        :column="column"
        :formData="formData"
        :showIndex="true"
        :selection="false"
        :border="true"
        :total="total"
        :isShowFilter="false"
        page,
        @search="search"
        @pageChange="pageChange"
        @pageSizeChange="pageSizeChange"
        @reset="reset"
        size="default"
        background
        ref="baseTable"
        :formSpan="6"
        :exportBtnShow="exportBtnShow"
      >
        <template #equipmentName>
          <el-select
            filterable
            v-model="deviceCode"
            placeholder="Select DeviceCode"
            style="width: 100%"
            @change="changeEquipement"
            :clearable="!isGraph"
          >
            <el-option v-for="(item, inx) in menu.Equipmentsurvival" :key="item.deviceName + inx" :label="item.deviceName" :value="item.deviceCode" />
          </el-select>
        </template>
        <template #daterange>
          <el-date-picker
            v-model="selectDate"
            :shortcuts="shortcuts"
            type="datetimerange"
            range-separator="-"
            start-placeholder="StartDate"
            end-placeholder="EndDate"
            :disabledDate="disabledDateFn"
            :clearable="false"
          />
        </template>
        <template #toolbar2>
          <SGbutton
            btnbg
            v-show="deviceCode"
            :loading="loading"
            class="graph"
            :title="isGraph ? $t('datalist') : $t('graph')"
            @handleClick="toggleGraph"
          >
            <svg-icon iconName="iconfontgraph"></svg-icon>
          </SGbutton>
        </template>
        <template #toolbar3>
          <SGbutton v-show="deviceCode" btnbg :loading="loading" iconName="iconfontexport" :title="$t('export')" @handleClick="exportAsXLSX">
          </SGbutton>
        </template>
        <template #options="{ row }"> <el-link :icon="Tickets" type="primary" @click="handleDetail(row)">View</el-link>&nbsp; </template>

        <template #tableBody v-if="isGraph">
          <div style="height: 100%; width: 100%; overflow: scroll; background-color: #fff">
            <alarmChart :params="drawerFormData" ref="alarmChart" />
          </div>
        </template>
      </Table>
    </div>
    <createDrawer ref="createVoyage" />
    <!--- @refreshList="search"-->
    <el-dialog :close-on-click-modal="false" title="Export Data" v-model="dialogVisible" width="22%" :show-close="false">
      <div v-loading="loading">
        <el-date-picker :clearable="false" v-model="selectDataexport" type="date" placeholder="Please select a date" :disabledDate="disabledDateFn">
        </el-date-picker>
        &nbsp;
        <el-button type="primary" @click="onConfirm">Confirm</el-button>
        <el-button @click="dialogVisible = false">Cancel</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { Edit, CloseBold, Tickets } from '@element-plus/icons-vue'
import { column, data, formData } from './data.js'
import { utcDateToTimestamp } from '@/utils/comment.js'
import createDrawer from './components/createDrawer.vue'
import alarmChart from './components/alarmChart.vue'
import { indextemp } from '@/utils/sangoai.ts'
import menuCollapse from '@/store/module/menu.js'
import Api from '@/axios/monitor.js'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import $bus, { mittEventName } from '@/utils/mitt'
dayjs.extend(utc)
export default {
  name: 'History',
  props: {
    filter: {
      type: Boolean,
      defautl: false,
    },
  },
  mixins: [indextemp],
  data() {
    return {
      selectDataexport: null,
      dialogVisible: false,
      exportBtnShow: true,
      //下拉选项
      menu: menuCollapse(),
      deviceCode: '',
      total: 0,
      pageNo: 1,
      pageSize: 10,
      // 数据开发记录 *******

      Edit,
      CloseBold,
      Tickets,
      formData,
      column: column,
      data,

      isGraph: false,
      loading: true,
      selectDate: ['', ''],

      drawerFormData: {},
      params: {},
      showNoData: false,

      totalAlarm: 0,
      shortcuts: [
        {
          text: 'LAST 1 HOUR',
          value: () => {
            const end = dayjs().utcOffset(0).format('YYYY-MM-DD HH:mm:ss')
            const start = dayjs().utcOffset(0).subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss')
            return [start, end]
          },
        },
        {
          text: 'LAST 1 DAY',
          value: () => {
            const end = dayjs().utcOffset(0).format('YYYY-MM-DD HH:mm:ss')
            const start = dayjs().utcOffset(0).subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss')
            return [start, end]
          },
        },
      ],
    }
  },
  created() {
    //设备存活列表
    this.api_alivelist()
    let pastTime = dayjs.utc().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss')
    let nowTime = dayjs.utc().format('YYYY-MM-DD HH:mm:ss')
    this.selectDataexport = dayjs(nowTime).toDate()

    let LODUTC = this.menu.CONFIG_LODUTC
    // const end = dayjs().utcOffset(0).format('YYYY-MM-DD HH:mm:ss')
    // const start = dayjs().utcOffset(0).subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss')
    // this.selectDate = [start, end]
    //先留着个方法,后面产品是否需要加这个功能
    // $bus.on(mittEventName.CONFIG_LODUTC, (data) => {
    //   const end = dayjs().utcOffset(data).format('YYYY-MM-DD HH:mm:ss')
    //   const start = dayjs().utcOffset(data).subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss')
    //   this.selectDate = [start, end];
    // })
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs?.baseTable?.search()
    })
  },
  components: {
    createDrawer,
    alarmChart,
  },

  methods: {
    changeEquipement() {
      this.search()
    },
    exportAsXLSX() {
      this.dialogVisible = true
    },
    async onConfirm() {
      this.loading = true
      let params = {}
      params.startTs = utcDateToTimestamp(dayjs(this.selectDataexport).format('YYYY-MM-DD'))
      params.endTs = utcDateToTimestamp(dayjs(this.selectDataexport).format('YYYY-MM-DD'), true)
      params.deviceCodeList = [this.deviceCode]
      // let nowTime = dayjs.utc().format('YYYY-MM-DD HH:mm:ss')
      await Api.alarmlistpageexport(params, 'History_Alarm_' + this.deviceCode + '_' + dayjs(params.endTs).utc().format('YYYYMMDD') + '_GMT')
        .then((res) => {
          this.dialogVisible = false
        })
        .finally(() => {
          this.loading = false
        })
    },
    search(from) {
      this.loading = true
      this.pageNo = 1
      const parmts = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      }
      // parmts.startTs = utcDateToTimestamp(dayjs(this.selectDate[0]).format('YYYY-MM-DD HH:mm:ss'))
      // parmts.endTs = utcDateToTimestamp(dayjs(this.selectDate[1]).format('YYYY-MM-DD HH:mm:ss'))

      if (this.selectDate.length == 2) {
        if (this.selectDate[0] != '') {
          parmts.startTs = utcDateToTimestamp(dayjs(this.selectDate[0]).format('YYYY-MM-DD'))
          parmts.endTs = utcDateToTimestamp(dayjs(this.selectDate[1]).format('YYYY-MM-DD'), true)
          // parmts.startTs = utcDateToTimestamp(dayjs(this.selectDate[0]).format('YYYY-MM-DD'))
          // parmts.endTs = utcDateToTimestamp(dayjs(this.selectDate[1]).format('YYYY-MM-DD'), true)
        } else {
          // parmts.startTs = utcDateToTimestamp(dayjs(dayjs.utc().toDate()).format('YYYY-MM-DD'))
          // parmts.endTs = utcDateToTimestamp(dayjs(dayjs.utc().toDate()).format('YYYY-MM-DD'), true)
          parmts.startTs = dayjs.utc().subtract(1, 'day').valueOf()
          parmts.endTs = dayjs.utc().valueOf()
        }
      }
      parmts.deviceCodeList = [this.deviceCode]
      if (from?.itemName) {
        parmts.itemName = from.itemName
      }
      this.params = parmts
      if (this.isGraph == true) {
        this.post_alarm_chart()
      } else {
        this.postalarm_list_page()
      }
    },
    //图表数据
    post_alarm_chart() {
      let { endTs, startTs, itemName } = this.params

      let deviceCode = this.params['deviceCodeList'][0]
      Api.alarm_chart({ endTs, startTs, deviceCode, itemName })
        .then((res) => {
          if (res.code == 200) {
            if (!res?.data?.chart?.length) {
              //没有数据就return掉
              this.showNoData = true
              return
            }
            this.drawerFormData = res.data || []
            this.totalAlarm = 0 //初始化求和值
            this.drawerFormData?.chart?.forEach((item) => {
              item.forEach((childItem) => {
                this.totalAlarm += childItem.total
              })
            })
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    //图表数据
    toggleGraph() {
      this.isGraph = !this.isGraph
      this.exportBtnShow = !this.exportBtnShow
      if (this.isGraph == true) {
        this.post_alarm_chart()
      }
    },

    postalarm_list_page() {
      const parmts = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      }
      // parmts.startTs = utcDateToTimestamp(dayjs(this.selectDate[0]).format('YYYY-MM-DD HH:mm:ss'))
      // parmts.endTs = utcDateToTimestamp(dayjs(this.selectDate[1]).format('YYYY-MM-DD HH:mm:ss'))

      if (this.selectDate.length == 2) {
        if (this.selectDate[0] != '') {
          parmts.startTs = utcDateToTimestamp(dayjs(this.selectDate[0]).format('YYYY-MM-DD HH:mm:ss'))
          parmts.endTs = utcDateToTimestamp(dayjs(this.selectDate[1]).format('YYYY-MM-DD HH:mm:ss'))
        } else {
          parmts.startTs = dayjs.utc().subtract(1, 'day').valueOf()
          parmts.endTs = dayjs.utc().valueOf()
        }
      }
      parmts.deviceCodeList = this.deviceCode ? [this.deviceCode] : []
      if (this.params.itemName) {
        parmts.itemName = this.params.itemName
      }
      Api.alarm_list_page(parmts)
        .then((res) => {
          if (res.code == 200) {
            this.data = res.data.results || []
            this.total = res.data?.total ?? 0
          }
        })
        .finally(() => {
          this.loading = false
        })
    },

    reset() {
      let pastTime = dayjs.utc().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss')
      let nowTime = dayjs.utc().format('YYYY-MM-DD HH:mm:ss')
      // this.selectDate = [dayjs(pastTime).toDate(), dayjs(nowTime).toDate()]
      this.pageNo = 1
      this.$refs.baseTable.search()
    },

    pageChange(pageNo) {
      this.pageNo = pageNo
      this.postalarm_list_page()
    },
    pageSizeChange(obj) {
      this.pageNo = obj.currentPage
      this.pageSize = obj.pageSize

      this.postalarm_list_page()
    },

    //详情
    handleDetail(row) {
      this.$refs.createVoyage.open(row)
    },

    disabledDateFn(time) {
      return utcDateToTimestamp(dayjs(time).format('YYYY-MM-DD')) > utcDateToTimestamp(dayjs(new Date()).format('YYYY-MM-DD'))
    },
  },
}
</script>

<style lang="scss" scoped>
@import url('../common.scss');
</style>
