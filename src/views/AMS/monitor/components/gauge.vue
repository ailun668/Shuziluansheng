<template>
  <div ref="chart"></div>
</template>
<script>
import { debounce } from '@/utils/util.js'
export default {
  props: {
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
    color: {
      type: Array,
      default: [
        [0.7, '#0c151e'],
        [1, '#fd666d'],
      ],
    },
    splitNumber: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      chart: void 0,
      resizeEvent: void 0,
    }
  },
  mounted() {
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
    initChart() {
      this.chart = echarts.init(this.$refs.chart)
      const option = {
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        },
        series: [
          {
            axisTick: {
              length: 6,
              splitNumber: 5,
              distance: 0,
            },
            splitLine: {
              length: 10,
              distance: 2,
            },
            axisLine: {
              lineStyle: {
                width: 5,
                color: this.color,
              },
            },
            axisLabel: {
              show: true,
              distance: 6,
              textStyle: {
                textAlign: 'center',
                offsetCenter: [0, '160%'],
                fontSize: 12,
              },
            },

            splitNumber: this.splitNumber,
            min: this.min,
            max: this.max,
            type: 'gauge',
            title: {
              offsetCenter: [0, '100%'],
              fontWeight: 600,
              fontSize: 16,
            },
            detail: {
              textStyle: {
                distance: 0,
                fontSize: 15,
              },
              valueAnimation: true,
              formatter: (value) => {
                return value.toFixed(2) + this.unit
              },
              color: 'inherit',
            },
            data: [
              {
                value: this.value,
                name: this.title,
              },
            ],
          },
        ],
      }
      this.chart.setOption(option)
      this.resizeChart = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.resizeChart)
    },
  },

  beforeUnmount() {
    document.removeEventListener('toggleMenu', this.resizeEvent)
    window.removeEventListener('resize', this.resizeChart)
    this.chart?.dispose()
  },
  beforeRouteLeave(to, from, next) {
    next()
    window.removeEventListener('resize', this.resizeChart)
  },
  watch: {
    value: {
      handler() {
        this.initChart()
      },
    },
    title: {
      handler() {
        this.initChart()
      },
    },
  },
}
</script>
