<template>
  <!-- {{size}} -->
  <div ref="chart"></div>
</template>
<script>
import { debounce } from '@/utils/util.js'
import { truncateString, IOERROR } from '@/utils/status.js'
import { isEqual } from 'lodash'
import { createChartColors } from '@/views/AMS/common.js'

export default {
  props: {
    parmts: {
      type: Object,
      default: () => {},
    },
    value: {
      type: [Number, String],
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
      default: 85,
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
        fieldValue: this.data?.fieldValue,
      })
      const splitNumber = this.data?.splitNumber || this.splitNumber
      const option = {
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        },
        series: [
          {
            type: 'gauge',
            splitNumber,
            min: this.min,
            max: this.max,
            center: ['50%', '50%'],
            radius: `${this.radiusvalue}%`,
            // startAngle: 180,
            // radius: '80%',
            // endAngle: 0,
            itemStyle: {
              color: '#fff',
              // shadowColor: '',
              // shadowBlur: 3,
              // shadowOffsetX: 2,
              // shadowOffsetY: 2,
            },
            progress: {
              show: true,
              width: 11,
              itemStyle: {
                color: chartColors.progress,
              },
            },
            pointer: {
              length: '75%',
              width: 5,
              offsetCenter: [0, '5%'],
              itemStyle: {
                color: '#99b1cd ',
              },
            },
            axisTick: {
              // 刻度线
              length: 6,
              distance: 0,
              show: false,
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
            axisLine: {
              roundCap: false, // 去除圆角
              lineStyle: {
                width: 11,
                color: chartColors.colors,
              },
            },
            //修改图表的刻度颜色
            axisLabel: {
              show: true,
              color: '#fff',
              distance: 14,
              textStyle: {
                textAlign: 'center',
                offsetCenter: [0, '160%'],
                fontSize: 12,
                color: '#969797',
              },
              formatter: function (value) {
                return parseInt(value)
              },
            },
            title: {
              offsetCenter: [20, '100%'],
              fontWeight: 500,
              fontSize: this.size,
              color: '#969797',
            },
            detail: {
              textStyle: {
                fontWeight: chartColors.valueWeight,
                distance: 0,
                fontSize: this.size, // 将字体大小调整为10，可以根据实际需求调整
              },
              valueAnimation: true, // 开启数值动画效果
              offsetCenter: [0, '85%'],
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
          {
            type: 'pie',
            tooltip: {
              show: true,
            },
            hoverAnimation: false,
            legendHoverLink: false,
            radius: ['0%', '7%'],
            center: ['50%', '50%'],
            label: {
              normal: {
                show: false,
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: 20,
                itemStyle: {
                  normal: {
                    color: '#A5BAD8',
                  },
                },
              },
            ],
          },
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
