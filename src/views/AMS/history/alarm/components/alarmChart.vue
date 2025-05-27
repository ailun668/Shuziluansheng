<template>
  <div id="alarmChart" ref="alarmChart"></div>
</template>

<script>
let timer
let resizeEvent
import { timestampToUtcFormat } from '@/utils/comment.js'
export default {
  name: 'alarmChart',
  props: {
    params: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      colorList: ['#93abbf', '#6D7DEB', '#46BCF5', '#B2B2EB', '#64FA39', '#97DEFF', '#3795BD'],
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  methods: {
    isEmptyObject(obj) {
      return Object.keys(obj).length === 0 && obj.constructor === Object
    },

    initChart() {
      if (Object.keys(this.params).length === 0) {
        return
      }
      const alarmList = this.params.titleTypeList
      const dataList = this.params.chart.sort((a, b) => {
        return a[0].ts - b[0].ts
      })
      const dataStyleList = []
      const xData = dataList?.map((item) => {
        return timestampToUtcFormat(item[0].ts, 'HH:mm')
      })
      for (let i = 0; i < alarmList?.length; i++) {
        let arr = []
        dataList?.forEach((dataItemList) => {
          const matchingData = dataItemList.find((data) => data.alarmTitle === alarmList[i])
          if (matchingData) {
            arr.push(matchingData.total)
          } else {
            arr.push(0)
          }
        })
        //依次放入不同的颜色
        dataStyleList.push(this.getTemplate(alarmList[i], this.colorList[i % this.colorList.length], arr))
      }

      const alarmChart = echarts.init(this.$refs.alarmChart)
      const option = {
        backgroundColor: '',
        title: {
          text: '',
          subtext: '',
          x: '50%',
          textStyle: {
            color: '#000',
            fontSize: '22',
          },
          subtextStyle: {
            color: '#90979c',
            fontSize: '16',
          },
        },
        // tooltip: {
        //   trigger: 'axis',
        //   axisPointer: {
        //     type: 'shadow',
        //     textStyle: {
        //       color: '#000',
        //     },
        //   },
        // },
        grid: {
          borderWidth: 0,
          top: '6%',
          left: '5%',
          right: '5%',
          bottom: '10%',
          textStyle: {
            color: '#020b26',
          },
        },
        legend: {
          show: true,
          x: '9%',
          top: '2%',
          textStyle: {
            color: '#020b26',
          },
          data: alarmList,
          type: 'scroll',
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#90979c',
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitArea: {
              show: false,
            },
            axisLabel: {
              interval: 0,
            },
            data: xData,
          },
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: '#020b26',
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
            },
            splitArea: {
              show: false,
            },
          },
        ],
        dataZoom: [
          {
            show: true,
            height: 10,
            xAxisIndex: [0],
            bottom: 10,
            start: 30,
            end: 100,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle: {
              color: '#d3dee5',
            },
            textStyle: {
              //去掉两端文字显示
              color: 'rgba(0,0,0,0)',
            },
            borderColor: '#90979c',
            barBorderRadius: 1,
          },
          {
            //滚动
            type: 'inside',
            show: true,
            height: 1,
            start: 1,
            end: 5,
            minValueSpan: 1,
          },
        ],
        series: dataStyleList,
      }
      option && alarmChart.setOption(option)
      window.addEventListener(
        'resize',
        (resizeEvent = () => {
          clearTimeout(timer)
          timer = setTimeout(() => {
            alarmChart.resize()
          }, 40)
        }),
      )
    },
    getTemplate(equipName, color, data) {
      return {
        name: equipName,
        type: 'bar',
        barWidth: 'auto',
        barMaxWidth: 60,
        stack: '-',
        barGap: '20%',
        itemStyle: {
          normal: {
            barBorderRadius: 1,
            color: color,
            label: {
              show: true,
              textStyle: {
                color: '#fff',
              },
              position: 'inside',
              formatter: function (p) {
                return p.value > 0 ? p.value : ''
              },
            },
          },
        },
        data: data,
      }
    },
  },
  boforeMount() {
    window.removeEventListener('resize', resizeEvent)
  },
  watch: {
    '$i18n.locale': {
      handler(newVal, oldVal) {
        this.initChart()
      },
      immediate: false,
      deep: true,
    },
    params: {
      handler(newVal, oldVal) {
        this.initChart()
      },
      immediate: false,
      deep: true,
    },
  },
}
</script>

<style scoped>
#alarmChart {
  width: 100%;
  height: calc(100% - 100px);
}
</style>
