<template>
  <div id="BarChart" ref="BarChart"></div>
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
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  boforeMount() {
    window.removeEventListener('resize', resizeEvent)
  },
  methods: {
    initChart() {
      if (this.xData.length == 0 || this.yDataList.length == 0) {
        return
      }
      const BarChart = echarts.init(this.$refs.BarChart)
      let xData = this.xData
      let yData = this.yDataList
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 0,
          top: '40px',
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
        dataZoom: [
          {
            type: 'inside',
            realtime: true,
            startValue: 0,
            endValue: 10, // 初始显示index0-30的数据,可根据你的数据量设置
            filterMode: 'none',
            minValueSpan: 1,
          },
          {
            show: true,
            height: 0.5,
            bottom: 8,
            start: 0,
            end: 10,
            barBorderRadius: 1,
            textStyle: {
              //去掉两端文字显示
              color: 'rgba(0,0,0,0)',
            },
          },
        ],
        xAxis: [
          {
            type: 'category',
            data: xData,
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            type: 'bar',
            barMaxWidth: '60',
            data: yData,
            label: {
              show: true,
              position: 'top', // 在每个条形的顶部显示标签
            },
            itemStyle: {
              // 设置每一列的颜色
              color: '#7bcecc',
            },
          },
        ],
      }
      // option.series = [];
      // xData.forEach((item, index) => {
      //     option.series.push({
      //         name: item,
      //         type: "bar",
      //         barMaxWidth: "60",
      //         data: [yData[index]],
      //         label: {
      //             show: true,
      //             position: "top", // 在每个条形的顶部显示标签
      //         },
      //         // itemStyle: {
      //         //     // 设置每一列的颜色
      //         //     color: "#7bcecc",
      //         // },
      //     });
      // });
      option && BarChart.setOption(option)
      window.addEventListener(
        'resize',
        (resizeEvent = () => {
          clearTimeout(timer)
          timer = setTimeout(() => {
            BarChart.resize()
          })
        }),
      )
    },
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
#BarChart {
  width: 100%;
  height: 95%;
}
</style>
