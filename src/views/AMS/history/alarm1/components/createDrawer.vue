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
// import Api from '@/axios/monitor.js'
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
      let { sessionId, deviceCode } = row;

      let res = {
        "data": {
          "alarmName": "NO.2 PROPULSION SW COOLING PUMP OUTLET PRESSURE LOW ALARM",
          "group": "COOLING WATER SYSTEM",
          "alarmType": "L-A",
          "alarmTime": 1742894828033,
          "ackTime": null,
          "endTime": 1742894828060,
          "data": [
            {
              "ts": "2025-03-25T09:27:05.000+00:00",
              "no2_propulsion_sw_cooling_pump_outlet_pressure": 0.09543829245625927
            },
            {
              "ts": "2025-03-25T09:27:06.000+00:00",
              "no2_propulsion_sw_cooling_pump_outlet_pressure": 0.4796221240845574
            },
            {
              "ts": "2025-03-25T09:27:07.000+00:00",
              "no2_propulsion_sw_cooling_pump_outlet_pressure": 0.09324670585496457
            },
            {
              "ts": "2025-03-25T09:27:08.000+00:00",
              "no2_propulsion_sw_cooling_pump_outlet_pressure": 0.49601480552443356
            },
            {
              "ts": "2025-03-25T09:27:09.000+00:00",
              "no2_propulsion_sw_cooling_pump_outlet_pressure": 0.5180718347528427
            },
            {
              "ts": "2025-03-25T09:27:10.000+00:00",
              "no2_propulsion_sw_cooling_pump_outlet_pressure": 0.19705406678360715
            },
            {
              "ts": "2025-03-25T09:27:11.000+00:00",
              "no2_propulsion_sw_cooling_pump_outlet_pressure": 0.02642416018872713
            }
          ],
          "alarmThresholdFieldInfoList": [
            {
              "itemName": "NO.2 PROPULSION SW COOLING PUMP OUTLET PRESSURE",
              "itemKey": "no2_propulsion_sw_cooling_pump_outlet_pressure",
              "channel": "B1702",
              "io": "SUCCESS",
              "threshold": "[0,0.2]",
              "value": "0.09324670585496457",
              "unit": "MPa"
            }
          ]
        }
      }


      this.drawer = true
      this.formData = res.data
      const xAxis = []
      const yAxis = []
      let itemKey = res.data?.alarmThresholdFieldInfoList.map((item) => {
        return item.itemKey
      })

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


      // Api.alarm_details({
      //   sessionId,
      //   deviceCode,
      // }).then((res) => {
      //   if (res.code == 200) {
      //     this.drawer = true
      //     this.formData = res.data
      //     const xAxis = []
      //     const yAxis = []
      //     let itemKey = res.data?.alarmThresholdFieldInfoList.map((item) => {
      //       return item.itemKey
      //     })

      //     let classifiedData = itemKey.map((key) => {
      //       // 使用filter方法筛选出包含当前key的对象
      //       let filteredItems = res?.data?.data.filter((item) => item.hasOwnProperty(key))
      //       // 将筛选出的对象添加到新数组中
      //       return filteredItems
      //     })
      //     classifiedData.forEach((item, index) => {
      //       item.forEach((item) => {
      //         xAxis.push(timestampToUtcFormat(item.ts))
      //         yAxis.push(item[itemKey[0]])
      //       })
      //     })
      //     this.item.xAxis = xAxis
      //     this.item.yAxis = yAxis
      //   } else {
      //     this.$message.error(res.msg)
      //   }
      // })

      // this.formData = temp
    },
  },
  computed: {},
  components: {
    lineChart,
  },
}
</script>
