<template>
  <div ref="chart"></div>
</template>
<script>
import { debounce } from '@/utils/util.js'
import { truncateString, IOERROR } from '@/utils/status.js'
import { isEqual } from 'lodash'
import { createChartColors } from '../common'
export default {
  props: {
    parmts: {
      type: Object,
      default: () => {},
    },
    value: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: '',
    },
    unit: {
      type: String,
      default: '',
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 360,
    },
    size: {
      type: Number,
      default: 18,
    },
    color: {
      type: Array,
      default: [
        [0.65, '#17B0C3'],
        [0.85, '#E58F4B'],
        [1, '#E83643'],
      ],
    },
    splitNumber: {
      type: Number,
      default: 5,
    },
    radiusvalue: {
      type: Number,
      default: 100,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      truncateString,
      IOERROR,
      chart: void 0,
      resizeEvent: void 0,
      // 是否在视图中显示
      isIntersecting: true,
      // IntersectionObserver 实例
      observer: null,
    }
  },
  mounted() {
    this.initObserver()
    this.$nextTick(() => {
      this.initChart()
      // document.addEventListener(
      //   'toggleMenu',
      //   (this.resizeEvent = () => {
      //     setTimeout(() => {
      //       this.chart.resize()
      //     }, 200)
      //   }),
      // )
    })
  },
  methods: {
    inViewRender() {
      // 仅当在视图中可见才允许被渲染
      this.isIntersecting && this.renderChart()
    },
    renderChart() {
      const chartColors = createChartColors(this.data?.valueAlarmRangeVo?.alarmRanges, this.data?.range, {
        lineColor: '#424052',
        fieldValue: this.data?.fieldValue,
      })
      const splitNumber = this.data?.splitNumber || this.splitNumber
      const option = {
        grid: {
          left: 0,
          top: '0%',
          right: 0,
          bottom: 0,
        },
        series: [
          {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            min: this.min,
            max: this.max,
            center: ['50%', '70%'],
            radius: `${this.radiusvalue}%`,
            splitNumber,
            progress: {
              // 进度条
              show: true,
              roundCap: true,
              width: 11,
              itemStyle: {
                color: chartColors.progress,
              },
            },
            pointer: {
              // 指针
              itemStyle: {
                color: '#B7BAC3',
              },
              offsetCenter: [0, '15%'],
              length: '85%',
              icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
            },
            axisLine: {
              // 仪表盘
              roundCap: true,
              lineStyle: {
                width: 11,
                color: chartColors.colors,
              },
            },
            axisTick: {
              // 刻度线
              length: 6,
              distance: 0,
              show: false,
              lineStyle: {
                width: 6,
                color: '#99b1cd',
              },
            },
            splitLine: {
              // 刻度线
              length: 7,
              distance: 0,
              show: true,
              lineStyle: {
                color: '#4d4b5d',
                width: 6,
              },
            },
            axisLabel: {
              show: true,
              color: '#99b1cd',
              distance: 16, // 刻度线
              textStyle: {
                textAlign: 'center',
                offsetCenter: [0, '60%'],
                fontSize: 12,
                color: '#969797',
              },
              formatter: function (value) {
                return parseInt(value)
              },
            },
            title: {
              show: false,
            },
            detail: {
              textStyle: {
                fontWeight: chartColors.valueWeight,
                distance: 0,
                fontSize: this.size, // 将字体大小调整为10，可以根据实际需求调整
              },
              offsetCenter: [0, '32%'],
              valueAnimation: true,
              formatter: () => {
                const valuePart = IOERROR(this.value)
                const unitPart = this.unit ? ` {unitStyle|${this.unit}}` : ''
                return `${valuePart}${unitPart}`
              },
              rich: {
                unitStyle: {
                  fontSize: 14,
                  color: '#BEBEBE',
                },
              },
              color: chartColors.valueColor,
            },
            data: [
              {
                value: IOERROR(this.value),
              },
            ],
          },
          // 饼图
          // {
          //   type: 'pie',
          //   tooltip: {
          //     show: true,
          //   },
          //   hoverAnimation: false,
          //   legendHoverLink: false,
          //   radius: ['0%', '7%'],
          //   center: ['50%', '50%'],
          //   label: {
          //     normal: {
          //       show: false,
          //     },
          //   },
          //   labelLine: {
          //     normal: {
          //       show: false,
          //     },
          //   },
          //   data: [
          //     {
          //       value: 20,
          //       itemStyle: {
          //         normal: {
          //           color: '#A5BAD8',
          //         },
          //       },
          //     },
          //   ],
          // },
        ],
      }
      // 浏览器在重绘的空隙时间里来更新数据
      requestAnimationFrame(() => {
        this.chart.setOption(option)
      })
    },
    initChart() {
      this.chart = echarts.init(this.$refs.chart)
      this.renderChart()
      this.resizeChart = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.resizeChart)
    },

    formatNameForWrap(title, maxLength) {
      let formattedTitle = ''
      while (title.length > maxLength) {
        formattedTitle += title.substring(0, maxLength) + '\n' // 添加换行符
        title = title.substring(maxLength)
      }
      formattedTitle += title // 添加最后一部分
      return formattedTitle
    },

    initObserver() {
      this.observer = new IntersectionObserver((entries) => {
        if (!entries[0]) return
        const entrie = entries[0]
        this.isIntersecting = entrie.isIntersecting
      })
      this.observer.observe(this.$refs.chart)
    },
  },

  beforeUnmount() {
    document.removeEventListener('toggleMenu', this.resizeEvent)
    window.removeEventListener('resize', this.resizeChart)
    this.chart?.dispose()

    if (!!this.observer) {
      this.observer.unobserve(this.$refs.chart)
      this.observer = null
    }
  },
  beforeRouteLeave(to, from, next) {
    next()
    window.removeEventListener('resize', this.resizeChart)
  },
  watch: {
    value: {
      handler() {
        this.inViewRender()
      },
    },
    title: {
      handler() {
        this.inViewRender()
      },
    },
    parmts: {
      handler(newval, oldval) {
        if (isEqual(newval, oldval)) return
        this.inViewRender()
      },
      // immediate: true,
      // deep: true,
    },
  },
}
</script>
