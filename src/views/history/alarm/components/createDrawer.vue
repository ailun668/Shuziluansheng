<template>
  <el-drawer v-model="drawer" :direction="direction" :before-close="handlesave" :append-to-body="true" size="50%">
    <template #header>
      <h4>{{ title }}</h4>
    </template>
    <template #footer>
      <el-button @click="handlesave" type="primary">OK</el-button>
    </template>
    <div class="drawer-body">
      <el-form ref="form" :inline="true" :model="formData" :size="size" label-width="120px">
        <el-form-item label="Alarm Name">{{ formData.alarmName }}</el-form-item>
        <el-form-item label="Group">{{ formData.group }}</el-form-item>
        <el-form-item label="Alarm Type">{{ formData.alarmType }}</el-form-item>
        <el-form-item label="Alarm Time">{{ timestampToUtcFormat(formData.alarmTime) || '~' }}</el-form-item>
        <el-form-item label="Ack. Time">{{ timestampToUtcFormat(formData.ackTime) || '~' }}</el-form-item>
        <el-form-item label="End Time">{{ timestampToUtcFormat(formData.endTime) || '~' }}</el-form-item>

        <el-form-item label="ITEM 1">{{ formData.alarmThresholdFieldInfoList[0].itemName }}</el-form-item>
        <el-form-item label="I/O">{{ formData.alarmThresholdFieldInfoList[0].io }} </el-form-item>
        <el-form-item label="Channel"> {{ formData.alarmThresholdFieldInfoList[0].channel }} </el-form-item>
        <el-form-item label="Threshold"> {{ formData.alarmThresholdFieldInfoList[0].threshold }} </el-form-item>
        <el-form-item label="Value"> {{ formData.alarmThresholdFieldInfoList[0].value }} </el-form-item>
        <el-form-item label="Unit"> {{ formData.alarmThresholdFieldInfoList[0].unit }} </el-form-item>
      </el-form>
    </div>
    <div style="width: 95%; height: 300px; margin: 0px auto; border: 1px solid #ccc">
      <lineChart :xAxis="item.xAxis" :yAxis="item.yAxis" :title="item.title" :unit="item.unit" :color="item.rgbColor" />
    </div>
    <p style="height: 30px"></p>
    <!-- <el-form ref="form" :inline="true" :model="formData" :size="size" label-width="120px">
      <el-form-item label="Alarm Name">{{ formData.alarmName }}</el-form-item>
      <el-form-item label="Group">{{ formData.group }}</el-form-item>
      <el-form-item label="Alarm Type">{{ formData.alarmType }}</el-form-item>
      <el-form-item label="Alarm Time">{{ formData.alarmTime }}</el-form-item>
      <el-form-item label="Ack. Time">{{ formData.ackTime }}</el-form-item>
      <el-form-item label="End Time">{{ timestampToUtcFormat(formData.endTime) }}</el-form-item>

      <el-form-item label="ITEM 1">{{ formData.alarmThresholdFieldInfoList[0].itemName }}</el-form-item>
      <el-form-item label="I/O">{{ formData.alarmThresholdFieldInfoList[0].io }} </el-form-item>
      <el-form-item label="Channel"> {{ formData.alarmThresholdFieldInfoList[0].channel }} </el-form-item>
      <el-form-item label="Threshold"> {{ formData.alarmThresholdFieldInfoList[0].threshold }} </el-form-item>
      <el-form-item label="Value"> {{ formData.alarmThresholdFieldInfoList[0].value }} </el-form-item>
      <el-form-item label="Unit"> {{ formData.alarmThresholdFieldInfoList[0].unit }} </el-form-item>
    </el-form>
    <div style="width: 85%; height: 300px; margin: 0px auto; border: 1px solid #ccc">
      <lineChart :xAxis="item.xAxis" :yAxis="item.yAxis" :title="item.title" :unit="item.unit" :color="item.rgbColor" />
    </div> -->
  </el-drawer>
</template>
<script>
import lineChart from './lineChart.vue'
import Api from '@/axios/monitor.js'
import { timestampToUtcFormat } from '@/utils/comment.js'
export default {
  props: {
    direction: {
      type: String,
      default: 'rtl',
    },
  },
  data() {
    return {
      timestampToUtcFormat,
      size: 'default',
      pageNo: 1,
      pageSize: 10,
      total: 0,
      drawer: false,
      formData: {
        publish: '',
        foodName: '',
      },
      title: 'CreateVoyage',
      isADD: false,

      item: {
        title: 'WindSpeed10m',
        // unit: 'm/s',
        unit: '',
        rgbColor: '136, 154, 216',
        xAxis: [],
        yAxis: [],
      },
    }
  },
  methods: {
    handlesave() {
      this.drawer = false
      this.$emit('refreshList')
    },
    open(row = {}) {
      this.title = 'Alarm Detail'
      let { sessionId,deviceCode } = row
      Api.alarm_details({
        sessionId,
        deviceCode,
      }).then((res) => {
        if (res.code == 200) {
          this.drawer = true
          this.formData = res.data
          const xAxis = []
          const yAxis = []
          let itemKey = res.data?.alarmThresholdFieldInfoList.map((item) => {
            return item.itemKey
          })
          // let classifiedData = res?.data?.data.reduce((accumulator, item) => {
          //   itemKey.forEach((key) => {
          //     if (item.hasOwnProperty(key)) {
          //       if (!accumulator[key]) {
          //         accumulator[key] = []
          //       }
          //       accumulator[key].push(item)
          //     }
          //   })
          //   return accumulator
          // }, {})
          // let classifiedData = itemKey.reduce((accumulator, key) => {
          //   // 使用filter方法筛选出包含当前key的对象
          //   let filteredItems = res?.data?.data.filter((item) => item.hasOwnProperty(key))
          //   // 将筛选出的对象添加到累加器中
          //   accumulator[key] = filteredItems
          //   return accumulator
          // }, {})

          let classifiedData = itemKey.map((key) => {
            // 使用filter方法筛选出包含当前key的对象
            let filteredItems = res?.data?.data.filter((item) => item.hasOwnProperty(key))
            // 将筛选出的对象添加到新数组中
            return filteredItems
          })
          classifiedData.forEach((item, index) => {
            item.forEach((item) => {
              xAxis.push(timestampToUtcFormat(item.ts))
              yAxis.push(item[itemKey[0]])
            })
          })
          this.item.xAxis = xAxis
          this.item.yAxis = yAxis
        } else {
          this.$message.error(res.msg)
        }
      })

      // this.formData = temp
    },
  },
  computed: {},
  components: {
    lineChart,
  },
}
</script>
