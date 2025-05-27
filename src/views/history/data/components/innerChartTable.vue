<template>
  <div class="innerChartTable">
    <div class="chartbox">
      <div class="echartbox">
        <template v-if="showLineChart">
          <LineChart :xData="lineChartXData" :yDataList="analogKeyChartData" />
        </template>
        <template v-else>
          <el-empty :image-size="130" />
        </template>
      </div>
      <div class="echartbox">
        <template v-if="showBarChart">
          <BarChart :xData="barChartXData" :yDataList="switchingKeyChartData" style="margin: 0px auto" />
        </template>
        <template v-else>
          <el-empty :image-size="130" />
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { timestampToUtcFormat } from '@/utils/comment.js'
import LineChart from './lineChart.vue'
import BarChart from './BarChart.vue'
import Api from '@/axios/monitor.js'
import { IOERROR } from '@/utils/status.js'
export default {
  name: 'innerChartTable',
  props: {
    equipImo: {
      type: String,
      default: '',
    },
    parmts: {
      type: Object,
      default: () => {
        return {
          deviceCode: '',
          startTs: '',
          endTs: '',
        }
      },
    },
  },
  data() {
    return {
      data: [],

      switchChart: false,
      //图的x轴数据
      lineChartXData: [],
      barChartXData: [],
      //图的Y轴数据
      analogKeyChartData: [],
      switchingKeyChartData: [],
      selectDate: [],
      showLineChart: false,
      showBarChart: false,
      showNoData: true,
      loading: false,
    }
  },
  components: {
    LineChart,
    BarChart,
  },
  watch: {
    parmts: {
      handler(newVal, oldVal) {
        this.device_chart()
      },
      deep: true,
      immediate: true,
    },
  },

  methods: {
    device_chart() {
      const { deviceCode, startTs, endTs } = this.parmts
      const parmts = {
        deviceCode,
        startTs,
        endTs,
      }

      Api.device_chart(parmts).then((res) => {
        if (res.data?.data.length > 0) {
          // 有数据才展示
          if (res.data?.analogKey.length > 0) {
            //处理模拟量
            this.lineChartXData = []
            this.analogKeyChartData = []
            this.lineChartXData = res.data?.data.map((item) => timestampToUtcFormat(item.ts))
            this.analogKeyChartData = this.handleChartData(res.data?.analogKey, res.data?.data)
            if (this.analogKeyChartData.length > 0) {
              //有数据就展示
              this.showLineChart = true
            }
            //返回的是降序时间序列，现改成升序
            this.lineChartXData.reverse()
          }
          if (res.data?.switchingKey.length > 0) {
            //开关量 统计报错1 出现次数
            let temp = res.data.switchingKey.reduce((pre, item) => {
              res.data.data.forEach((childItem) => {
                if (childItem[item.key] == 1) {
                  if (item.name in pre) {
                    pre[item.name]++
                  } else {
                    pre[item.name] = 1
                  }
                }
              })
              return pre
            }, {})

            //数据初始化
            this.barChartXData = []
            this.switchingKeyChartData = []
            for (let item in temp) {
              this.barChartXData.push(item)
              this.switchingKeyChartData.push(temp[item])
            }
            //有data不一定有数据因为展示的数据为报警时展示，所以有可能有数据但都是不报警
            //此时应该显示no data

            if (this.switchingKeyChartData.length > 0) {
              this.showBarChart = true
            } else {
              this.barChartXData = []
              this.switchingKeyChartData = []
              this.showBarChart = false
            }
            // this.$ref.LineChart.initChart()
          }
        } else {
          //显示 空页面
          this.showNoData = true
        }
      })
    },

    handleChartData(target, data) {
      if (target && data) {
        target?.forEach((item) => {
          item.yData = data.map((childItem) => {
            return IOERROR(childItem[item.key])
          })
          //返回的是降序时间序列，现改成升序
          item.yData.reverse()
        })
        return target
      }
      return []
    },
  },
}
</script>

<style scoped>
.innerChartTable {
  width: 100%;
  height: 100%;
}
.chartbox {
  width: 100%;
  height: 100%;

  gap: 4px;
  height: 100%;
  display: flex;
  /* justify-content: space-between; */
  flex-direction: column;
}
.chartbox .echartbox {
  width: 100%;
  height: calc(100% / 2);
  background-color: #fff;
}
</style>
