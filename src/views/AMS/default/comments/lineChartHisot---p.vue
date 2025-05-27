<template>
  <div id="lineChart" ref="lineChart"></div>
</template>

<script>
let timer
let resizeEvent
export default {
  name: 'lineChart',
  props: ['xAxis', 'yAxis', 'width', 'color', 'unit', 'title', 'min', 'max'],
  methods: {
    initChart() {
      const lineChart = echarts.init(this.$refs.lineChart)
      let xData = this.xAxis
      let yData = this.yAxis

      let option = {
        backgroundColor: '#080b30',
        title: {
          show: false,
          text: '多线图',
          textStyle: {
            align: 'center',
            color: '#fff',
            fontSize: 20,
          },
          top: '5%',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(0, 255, 233,0)',
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(255, 255, 255,1)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(0, 255, 233,0)',
                  },
                ],
                global: false,
              },
            },
          },
        },
        grid: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 0,
          top: '6%',
          left: '5%',
          right: '1%',
          bottom: '8%', //也可设置left和right设置距离来控制图表的大小
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            axisLine: {
              show: true,
            },
            splitArea: {
              // show: true,
              color: '#f00',
              lineStyle: {
                color: '#f00',
              },
            },
            axisLabel: {
              show: false,
              margin: 20,
              textStyle: {
                fontSize: 20,
                color: 'rgba(255,255,255,1)',
              },
              // formatter: function (params) {
              //   console.log(params)
              //   return '2021.11.' + params
              // },
            },
            splitLine: {
              show: false,
            },
            boundaryGap: false,
            data: [
              '1',
              '2',
              '3',
              '4',
              '5',
              '6',
              '7',
              '8',
              '9',
              '10',
              '11',
              '12',
              '13',
              '14',
              '15',
              '16',
              '17',
              '18',
              '19',
              '20',
              '21',
              '22',
              '23',
              '24',
              '25',
              '26',
              '27',
              '28',
              '29',
              '30',
              '31',
              '32',
              '33',
              '34',
              '35',
              '36',
              '37',
              '38',
              '39',
              '40',
              '41',
              '42',
              '43',
              '44',
              '45',
              '46',
              '47',
              '48',
              '49',
              '50',
              '51',
              '52',
              '53',
              '54',
              '55',
              '56',
              '57',
              '58',
              '59',
              '60',
              '61',
              '62',
              '63',
              '64',
              '65',
              '66',
              '67',
              '68',
              '69',
              '70',
              '71',
              '72',
              '73',
              '74',
              '75',
              '76',
              '77',
              '78',
              '79',
              '80',
              '81',
              '82',
              '83',
              '84',
              '85',
              '86',
              '87',
              '88',
              '89',
              '90',
              '91',
              '92',
              '93',
              '94',
              '95',
              '96',
              '97',
              '98',
              '99',
              '100',
              '101',
              '102',
              '103',
              '104',
              '105',
              '106',
              '107',
              '108',
              '109',
              '110',
              '111',
              '112',
              '113',
              '114',
              '115',
              '116',
              '117',
              '118',
            ],
          },
        ],

        yAxis: [
          {
            min: this.min,
            max: this.max,
            type: 'value',
            name: this.unit,
            nameGap: 8,
            nameLocation: 'end',
            // max: 140,
            splitNumber: 4,
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#fff'],
                opacity: 0.06,
              },
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              margin: 20,
              textStyle: {
                fontSize: 20,
                color: 'rgba(255,255,255,1)',
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            // name: '注册总量',
            // type: 'line',
            // smooth: true, //是否平滑
            // showAllSymbol: true,
            // // symbol: 'image://./static/images/guang-circle.png',
            // symbol: 'circle',
            // symbolSize: 2,

            min: 0,
            splitNumber: 6,
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

            // lineStyle: {
            //   normal: {
            //     color: '#FFBC0D',
            //     shadowColor: 'red',
            //     shadowBlur: 0,
            //     shadowOffsetY: 5,
            //     shadowOffsetX: 5,
            //   },
            // },
            label: {
              show: false, //圆点上方数值
              position: 'top',
              textStyle: {
                color: 'rgb(218 255 232)',
                fontSize: 11,
              },
            },
            // itemStyle: {
            //   color: '#FFBC0D',
            //   borderColor: 'rgb(108,78,0)',
            //   borderWidth: 1,
            //   shadowColor: 'rgba(0, 0, 0, 0)',
            //   shadowBlur: 0,
            //   shadowOffsetY: 2,
            //   shadowOffsetX: 2,
            // },

            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(255,188,13, 0.4)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(255,188,13, 0)',
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            data: yData,
          },
        ],
      }

      option && lineChart.setOption(option)
      // var startNumber = 0
      // 有多少条数据
      // var xAxisDatalen = xData.length
      // // len的值,可以根据你的数量量设置,不要超过xAxisDatalen的值,不然不会动
      // var len = 5,
      //   timer = null,
      //   setTime = 1000
      // timer && clearInterval(timer)
      // timer = setInterval(function () {
      //   if (startNumber === xAxisDatalen - len) {
      //     startNumber = 0
      //   }
      //   lineChart.dispatchAction({
      //     type: 'dataZoom',
      //     startValue: startNumber,
      //     endValue: startNumber + len,
      //   })
      //   startNumber++
      // }, setTime)

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
    // '$i18n.locale': {
    //   handler(newVal, oldVal) {
    //     this.initChart()
    //   },
    // },
    xAxis: {
      handler(newVal, oldVal) {
        this.initChart()
      },
      deep: true,
    },
    yAxis: {
      handler(newVal, oldVal) {
        this.initChart()
      },
      deep: true,
    },
    // min: {
    //   handler(newVal, oldVal) {
    //     this.initChart()
    //   },
    //   deep: true,
    // },
    // max: {
    //   handler(newVal, oldVal) {
    //     this.initChart()
    //   },
    //   deep: true,
    // },
  },
}
</script>

<style scoped>
#lineChart {
  width: 100%;
  height: 100%;
}
</style>
