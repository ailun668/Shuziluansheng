<template>
  <div id="LineChart" ref="LineChart"></div>
</template>

<script>
let timer
let resizeEvent
export default {
  props: {
    xData: {
      type: Array,
      default: [],
    },
    yDataList: {
      type: Array,
      default: [],
    },
  },
  methods: {
    initChart() {
      const LineChart = echarts.init(this.$refs.LineChart)
      const xData = this.xData
      const option = {
        grid: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 0,
          top: '70px',
          left: '35px',
          right: '35px',
          bottom: '10px',
          containLabel: true,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999',
            },
          },
        },
        legend: {
          orient: 'horizontal',
          padding: [10, 0, 10, 0],
          top: '15',
          textStyle: {
            color: '#000',
            fontSize: '16',
          },
          type: 'scroll', // 设置图例为滚动类型
          pageIconSize: 20, // 设置翻页按钮的图标大小
          pageTextStyle: {
            color: '#000',
            fontSize: 12,
          },
          pageButtonGap: 10, // 设置翻页按钮与图例项之间的间距
          pageData: 5, // 设置每页显示的图例项数量
          selected: {}, // 图例项的显示状态
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: false,
            },
            interval: 1,
            axisLabel: {
              color: '#000',
              fontSize: '1rem',
            },
            axisLine: {
              show: false,
            },
            data: xData,
          },
        ],
        yAxis: [
          {
            min: 0,
            type: 'value',
            name: '',
            axisLabel: {
              formatter: '{value} ',
            },
            axisLabel: {
              textStyle: {
                //坐标轴颜色
                color: '#000',
                fontSize: '1rem',
              },
            },
            //坐标轴线样式
            splitLine: {
              show: true,
              lineStyle: {
                type: 'solid', //solid实线;dashed虚线
                color: 'rgba(36, 173, 254, 0.2)',
              },
            },
          },
        ],
        series: [],
        dataZoom: [
          {
            type: 'inside',
            realtime: true,
            startValue: 0,
            endValue: xData.length || 100, // 初始显示index0-30的数据,可根据你的数据量设置
            filterMode: 'none',
            minValueSpan: 1,
          },
          {
            show: true,
            height: 0.5,
            bottom: 10,
            start: 0,
            end: 10,
            barBorderRadius: 1,
            textStyle: {
              //去掉两端文字显示
              color: 'rgba(0,0,0,0)',
            },
          },
        ],
      }
      this.yDataList?.forEach((item, index) => {
        option.series?.push({
          name: item.name,
          min: 0,
          splitNumber: 10,
          data: item.yData,
          type: 'line',
          smooth: true,
        })
        if (index < 3) {
          option.legend.selected[item.name] = true // 默认显示前三个图例项
        } else {
          option.legend.selected[item.name] = false // 其余图例项默认不显示
        }
      })
      option && LineChart.setOption(option)
      window.addEventListener(
        'resize',
        (resizeEvent = () => {
          clearTimeout(timer)
          timer = setTimeout(() => {
            LineChart.resize()
          })
        }),
      )
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  boforeMount() {
    window.removeEventListener('resize', resizeEvent)
  },
  watch: {
    '$i18n.locale': {
      handler(newVal, oldVal) {
        this.initChart()
      },
      deep: true,
    },
    yDataList: {
      handler(newVal, oldVal) {
        this.initChart()
      },
      deep: true,
    },
    xData: {
      handler(newVal, oldVal) {
        this.initChart()
      },
      deep: true,
    },
  },
}
</script>

<style scoped>
#LineChart {
  width: 100%;
  height: 100%;
}
</style>
