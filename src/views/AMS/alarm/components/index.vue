<template>
  <div>
    <el-drawer
      v-model="drawer"
      :direction="direction"
      :before-close="handleClose"
      :append-to-body="true"
      :size="drawerWidth"
      class="detail-per-day-drawer"
    >
      <template #header>
        <h4>Alarm Detail</h4>
      </template>
      <template #footer>
        <el-button @click="handleClose">{{ $t('Close') }}</el-button>
      </template>
      <div style="width: 100%; height: 300px; margin-bottom: 30px; backgrou ">
        <lineChart :xAxis="item.xAxis" :yAxis="item.yAxis" :title="item.title" :unit="item.unit" :color="item.rgbColor" />
      </div>
      <div class="alarmtxt">
      <el-row :gutter="20">
        <el-col :span="4" class="tr">Description </el-col>
        <el-col :span="16">NO.1 DG ALTERNATOR EXPANSION TANK LEVEL LOW ALARM</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4" class="tr">Alarm Type </el-col>
        <el-col :span="16">LOW</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4" class="tr">Channel </el-col>
        <el-col :span="16">DG1_3</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4" class="tr">I/O</el-col>
        <el-col :span="16">Success</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4" class="tr">Unit </el-col>
        <el-col :span="16">m3</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4" class="tr">Threshold </el-col>
        <el-col :span="16">13</el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="4" class="tr">Value </el-col>
        <el-col :span="16">33</el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="4" class="tr">Alarm Time </el-col>
        <el-col :span="16">2024-03-07 11:00:00</el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="4" class="tr">Ack. Time </el-col>
        <el-col :span="16">2024-03-07 11:00:00</el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="4" class="tr">End Time </el-col>
        <el-col :span="16">2024-03-07 11:00:00</el-col>
      </el-row>
    </div>
    </el-drawer>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { timestampToUtcFormat, utcDateToTimestamp } from '@/utils/comment.js'
import lineChart from './lineChart.vue'
// import detailDrawer from "./detailPerHourDrawer.vue";
// import Api from "@/api/voyage-fuel-report.js";
export default {
  props: {
    direction: {
      type: String,
      default: 'rtl',
    },
    drawerWidth: {
      type: String,
      default: '60%',
    },
  },
  components: {
    lineChart,
  },
  data() {
    return {
      item: {
        title: 'WindSpeed10m',
        // unit: 'm/s',
        unit: '',
        rgbColor: '136, 154, 216',
        xAxis: [
          '2024-05-26 00:00',
          '2024-05-26 01:00',
          '2024-05-26 02:00',
          '2024-05-26 03:00',
          '2024-05-26 04:00',
          '2024-05-26 05:00',
          '2024-05-26 06:00',
          '2024-05-26 07:00',
          '2024-05-26 08:00',
          '2024-05-26 09:00',
          '2024-05-26 10:00',
          '2024-05-26 11:00',
          '2024-05-26 12:00',
          '2024-05-26 13:00',
          '2024-05-26 14:00',
          '2024-05-26 15:00',
          '2024-05-26 16:00',
          '2024-05-26 17:00',
          '2024-05-26 18:00',
          '2024-05-26 19:00',
          '2024-05-26 20:00',
          '2024-05-26 21:00',
          '2024-05-26 22:00',
          '2024-05-26 23:00',
          '2024-05-27 00:00',
          '2024-05-27 01:00',
          '2024-05-27 02:00',
          '2024-05-27 03:00',
          '2024-05-27 04:00',
          '2024-05-27 05:00',
          '2024-05-27 06:00',
          '2024-05-27 07:00',
          '2024-05-27 08:00',
          '2024-05-27 09:00',
          '2024-05-27 10:00',
          '2024-05-27 11:00',
          '2024-05-27 12:00',
          '2024-05-27 13:00',
          '2024-05-27 14:00',
          '2024-05-27 15:00',
          '2024-05-27 16:00',
          '2024-05-27 17:00',
          '2024-05-27 18:00',
          '2024-05-27 19:00',
          '2024-05-27 20:00',
          '2024-05-27 21:00',
          '2024-05-27 22:00',
          '2024-05-27 23:00',
          '2024-05-28 00:00',
          '2024-05-28 01:00',
          '2024-05-28 02:00',
          '2024-05-28 03:00',
          '2024-05-28 04:00',
          '2024-05-28 05:00',
          '2024-05-28 06:00',
          '2024-05-28 07:00',
          '2024-05-28 08:00',
          '2024-05-28 09:00',
          '2024-05-28 10:00',
          '2024-05-28 11:00',
          '2024-05-28 12:00',
          '2024-05-28 13:00',
          '2024-05-28 14:00',
          '2024-05-28 15:00',
          '2024-05-28 16:00',
          '2024-05-28 17:00',
          '2024-05-28 18:00',
          '2024-05-28 19:00',
          '2024-05-28 20:00',
          '2024-05-28 21:00',
          '2024-05-28 22:00',
          '2024-05-28 23:00',
          '2024-05-29 00:00',
          '2024-05-29 01:00',
          '2024-05-29 02:00',
          '2024-05-29 03:00',
          '2024-05-29 04:00',
          '2024-05-29 05:00',
          '2024-05-29 06:00',
          '2024-05-29 07:00',
          '2024-05-29 08:00',
          '2024-05-29 09:00',
          '2024-05-29 10:00',
          '2024-05-29 11:00',
          '2024-05-29 12:00',
          '2024-05-29 13:00',
          '2024-05-29 14:00',
          '2024-05-29 15:00',
          '2024-05-29 16:00',
          '2024-05-29 17:00',
          '2024-05-29 18:00',
          '2024-05-29 19:00',
          '2024-05-29 20:00',
          '2024-05-29 21:00',
          '2024-05-29 22:00',
          '2024-05-29 23:00',
          '2024-05-30 00:00',
          '2024-05-30 01:00',
          '2024-05-30 02:00',
          '2024-05-30 03:00',
          '2024-05-30 04:00',
          '2024-05-30 05:00',
          '2024-05-30 06:00',
          '2024-05-30 07:00',
          '2024-05-30 08:00',
          '2024-05-30 09:00',
          '2024-05-30 10:00',
          '2024-05-30 11:00',
          '2024-05-30 12:00',
          '2024-05-30 13:00',
          '2024-05-30 14:00',
          '2024-05-30 15:00',
          '2024-05-30 16:00',
          '2024-05-30 17:00',
          '2024-05-30 18:00',
          '2024-05-30 19:00',
          '2024-05-30 20:00',
          '2024-05-30 21:00',
          '2024-05-30 22:00',
          '2024-05-30 23:00',
          '2024-05-31 00:00',
          '2024-05-31 01:00',
          '2024-05-31 02:00',
          '2024-05-31 03:00',
          '2024-05-31 04:00',
          '2024-05-31 05:00',
          '2024-05-31 06:00',
          '2024-05-31 07:00',
          '2024-05-31 08:00',
          '2024-05-31 09:00',
          '2024-05-31 10:00',
          '2024-05-31 11:00',
          '2024-05-31 12:00',
          '2024-05-31 13:00',
          '2024-05-31 14:00',
          '2024-05-31 15:00',
          '2024-05-31 16:00',
          '2024-05-31 17:00',
          '2024-05-31 18:00',
          '2024-05-31 19:00',
          '2024-05-31 20:00',
          '2024-05-31 21:00',
          '2024-05-31 22:00',
          '2024-05-31 23:00',
          '2024-06-01 00:00',
          '2024-06-01 01:00',
          '2024-06-01 02:00',
          '2024-06-01 03:00',
          '2024-06-01 04:00',
          '2024-06-01 05:00',
          '2024-06-01 06:00',
          '2024-06-01 07:00',
          '2024-06-01 08:00',
          '2024-06-01 09:00',
          '2024-06-01 10:00',
          '2024-06-01 11:00',
          '2024-06-01 12:00',
          '2024-06-01 13:00',
          '2024-06-01 14:00',
          '2024-06-01 15:00',
          '2024-06-01 16:00',
          '2024-06-01 17:00',
          '2024-06-01 18:00',
          '2024-06-01 19:00',
          '2024-06-01 20:00',
          '2024-06-01 21:00',
          '2024-06-01 22:00',
          '2024-06-01 23:00',
        ],
        yAxis: [
          '2.50',
          '1.85',
          '1.65',
          '1.85',
          '2.50',
          '4.65',
          '5.75',
          '5.55',
          '6.60',
          '7.40',
          '7.00',
          '6.40',
          '5.50',
          '4.50',
          '3.55',
          '3.25',
          '3.15',
          '2.40',
          '2.55',
          '2.45',
          '2.50',
          '2.95',
          '2.95',
          '3.60',
          '4.50',
          '3.50',
          '2.50',
          '2.05',
          '2.60',
          '2.80',
          '4.45',
          '4.75',
          '4.50',
          '4.20',
          '3.25',
          '2.65',
          '1.60',
          '1.10',
          '0.90',
          '1.20',
          '1.75',
          '2.10',
          '2.35',
          '2.70',
          '2.65',
          '2.85',
          '3.10',
          '3.20',
          '3.40',
          '2.35',
          '1.60',
          '1.45',
          '1.65',
          '3.10',
          '3.95',
          '4.95',
          '5.80',
          '6.70',
          '5.60',
          '4.05',
          '3.55',
          '3.75',
          '3.95',
          '4.00',
          '3.90',
          '3.90',
          '3.90',
          '3.80',
          '3.90',
          '3.90',
          '4.00',
          '3.90',
          '3.15',
          '3.45',
          '4.50',
          '5.30',
          '6.15',
          '6.40',
          '7.05',
          '7.10',
          '6.80',
          '6.20',
          '6.30',
          '5.95',
          '5.20',
          '5.20',
          '5.50',
          '5.65',
          '6.00',
          '5.60',
          '5.80',
          '4.95',
          '4.50',
          '4.00',
          '4.45',
          '4.15',
          '5.10',
          '5.15',
          '5.10',
          '5.25',
          '4.80',
          '4.70',
          '4.90',
          '5.35',
          '5.15',
          '5.10',
          '5.30',
          '5.50',
          '5.45',
          '5.70',
          '5.95',
          '6.40',
          '6.25',
          '6.05',
          '6.10',
          '5.90',
          '5.55',
          '5.35',
          '5.10',
          '4.85',
          '4.65',
          '4.50',
          '4.70',
          '5.10',
          '4.95',
          '4.95',
          '5.00',
          '5.10',
          '8.70',
          '8.85',
          '8.25',
          '8.55',
          '8.15',
          '6.70',
          '5.20',
          '4.90',
          '4.40',
          '4.30',
          '4.20',
          '3.65',
          '3.45',
          '3.50',
          '3.70',
          '3.40',
          '3.35',
          '2.40',
          '1.70',
          '1.80',
          '3.55',
          '4.40',
          '5.70',
          '6.50',
          '6.70',
          '7.05',
          '6.55',
          '6.20',
          '6.40',
          '5.45',
          '5.10',
          '4.75',
          '4.25',
          '3.65',
          '3.50',
          '4.00',
          '4.10',
          '4.15',
          '4.00',
          '4.10',
        ],
      },
      drawer: false,
      title: '',
      tableData: [],
      loading: false,
      formData: {},
      total: 0,
      pageSize: 10,
      pageNo: 1,
    }
  },
  methods: {
    timestampToUtcFormat,
    async getlist() {
      try {
        const params = {
          timeUnit: 'DAYS',
          page: true,
          pageIndex: this.pageNo,
          pageSize: this.pageSize,
        }
        this.loading = true
        if (Object.keys(this.formData).length) {
          params.startTs = this.formData.startTs
          params.endTs = this.formData.endTs
          this.loading = true
          const res = await Api.fuelConsumptionDetail(params)
          this.tableData = res.data.results || []
          this.total = res.data.total ?? 0
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    open(title, row = {}) {
      this.drawer = true
      this.title = title
      // if (Object.keys(row).length > 0) {
      //     this.formData = row;
      //     this.getlist();
      // }
    },
    handleClose() {
      this.drawer = false
    },

    handleSizeChange() {
      this.PageNo = 1
      this.getlist()
    },
    handleCurrentChange() {
      this.getlist()
    },
  },
}
</script>

<style scoped  lang="scss">
.alarmtxt{
  .el-row{
    margin-bottom: 10px;
  }
} 
.detail-per-day-drawer .drawer-body {
  height: 100%;
}
.detail-per-day-drawer .el-drawer__header {
  border-bottom: 1px solid #d1d1d1;
  padding: 20px 16px;
  margin-bottom: 10px;
}
.detail-per-day-drawer .el-drawer__header {
  border-bottom: 1px solid #d1d1d1;
  padding: 20px 16px;
  margin-bottom: 10px;
}
.detail-per-day-drawer .el-drawer__footer {
  border-top: 1px solid #d1d1d1;
  padding: 10px;
}
</style>
