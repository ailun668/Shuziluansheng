<template>
  <div id="lineChart" ref="lineChart"></div>
</template>

<script>
let timer
let resizeEvent
export default {
  name: 'lineChart',
  props: ['xAxis', 'yAxis', 'width', 'color', 'unit', 'title'],
  methods: {
    initChart() {
      const lineChart = echarts.init(this.$refs.lineChart)
      let xData = this.xAxis
      let yData = this.yAxis
      const option = {
        title: {
          text: '',
          textStyle: {
            color: '#000',
            fontSize: '100%',
          },
          left: '50%', // 将标题居中对齐
          textAlign: 'center', // 将标题居中对齐
        },
        grid: {
          top: '6%',
          left: '15%',
          right: '1%',
          bottom: '16%', //也可设置left和right设置距离来控制图表的大小
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
        calculable: true,
        legend: {
          orient: 'vertical',
          left: 'center',
          bottom: 'bottom',
          padding: [10, 0, 0, 0],
          //图例滚动
          //图例文字样式
          textStyle: {
            color: '#000',
            fontSize: '16',
          },
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: true,
            },
            axisLabel: {
              color: '#000',
              fontSize: '1rem',
            },
            axisLine: {
              show: true,
            },
            data: xData,
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: this.unit,
            nameGap: 8,
            nameLocation: 'end',
            // min: 0,
            // 47.5~52.5
            min: 40,
            max: 60,
            axisLabel: {
              formatter: '{value} ',
            },
            axisLabel: {
              textStyle: {
                //坐标轴颜色
                color: 'RED',
                fontSize: '1rem',
              },
            },
            //坐标轴线样式
            splitLine: {
              show: true,
              lineStyle: {
                type: 'solid', //solid实线;dashed虚线
                color: 'rgba(' + this.color + ', 0.2)',
              },
            },
          },
        ],
        series: [
          {
            data: yData,
            type: 'line',
            smooth: true, //true曲线; false折线
            itemStyle: {
              normal: {
                color: '#2c438c', //改变折线点的颜色
                lineStyle: {
                  color: 'rgba(' + this.color + ')', //改变折线颜色
                  type: 'solid',
                },
              },
            },
            areaStyle: {
              //折线图颜色半透明
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(' + this.color + ', 0.5)', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(' + this.color + ', 0.1)', // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
        ],
        dataZoom: [
          {
            type: 'slider',
            show: false,
            realtime: true,
            startValue: 0,
            endValue: 100, // 初始显示index0-30的数据,可根据你的数据量设置
            filterMode: 'none', // 过滤模式为无
            minValueSpan: 1, // 最小值跨度为1
          },
          // {
          //   type: 'inside',
          //   realtime: true,
          //   startValue: 0,
          //   endValue: xData?.length || 20, // 初始显示index0-30的数据,可根据你的数据量设置
          //   filterMode: 'none',
          //   minValueSpan: 1,
          // },
          // {
          //   show: true,
          //   height: 1,
          //   bottom: 10,
          //   start: 10,
          //   end: 10,
          //   barBorderRadius: 1,
          //   textStyle: {
          //     //去掉两端文字显示
          //     color: 'rgba(0,0,0,0)',
          //   },
          // },
        ],
      }
      option && lineChart.setOption(option)

      var startNumber = 0
      // 有多少条数据
      var xAxisDatalen = xData.length
      // len的值,可以根据你的数量量设置,不要超过xAxisDatalen的值,不然不会动
      var len = 5,
        timer = null,
        setTime = 1000
      timer && clearInterval(timer)
      timer = setInterval(function () {
        if (startNumber === xAxisDatalen - len) {
          startNumber = 0
        }
        lineChart.dispatchAction({
          type: 'dataZoom',
          startValue: startNumber,
          endValue: startNumber + len,
        });
        startNumber++
      }, setTime)

      window.addEventListener(
        'resize',
        (resizeEvent = () => {
          clearTimeout(timer)
          timer = setTimeout(() => {
            lineChart.resize()
          }, 40)
        }),
      )
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeUnmount() {
    window.removeEventListener('resize', resizeEvent)
  },
  watch: {
    '$i18n.locale': {
      handler(newVal, oldVal) {
        this.initChart()
      },
    },
    xAxis: {
      handler(newVal, oldVal) {
        this.initChart()
      },
      deep: true,
    },
  },
}
</script>

<style scoped>
#lineChart {
  width: 100%;
  height: 100%;
}
</style>
