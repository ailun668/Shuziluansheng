<template>
  <div class="w-full h-full" ref="chart"></div>
</template>
<script>
import { debounce } from '@/utils/util.js'
import { truncateString, IOERROR, IOERROR_DEFAULT } from '@/utils/status.js'
import { isEqual } from 'lodash'
import { createChartColors } from '../common'
export default {
  props: {
    parmts: {
      type: Object,
      default: () => {},
    },
    value: {
      type: [Number, String],
      default: 100,
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
    radiusvalue: {
      type: Number,
      default: 100,
    },
    color: {
      type: Array,
      default: [
        [0.25, '#b8d5dd'],
        [0.65, '#b8d5dd'],
        [0.85, '#4089cc'],
        [1, '#ea363e'],
      ],
    },
    splitNumber: {
      type: Number,
      default: 10,
    },
    fontSize: {
      type: Number,
      default: 27,
    },
    isInteger: {
      type: Boolean,
      default: false,
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
      var dataArr = 100
      const chartColors = createChartColors(this.parmts?.valueAlarmRangeVo?.alarmRanges, this.parmts?.range, {
        fieldValue: this.parmts?.fieldValue,
      })
      const option = {
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
        },
        // backgroundColor: '#021434',
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%',
        },
        series: [
          {
            name: '最外部进度条',
            type: 'gauge',
            center: ['50%', '50%'],
            radius: '100%',
            splitNumber: 100,
            axisLine: {
              lineStyle: {
                color: [
                  [
                    dataArr / 10,
                    new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                      {
                        offset: 0,
                        color: 'rgba(145,207,255,0)',
                      },
                      {
                        offset: 0.5,
                        color: 'rgba(145,207,255,0.2)',
                      },
                      {
                        offset: 1,
                        color: 'rgba(145,207,255,1)',
                      },
                    ]),
                  ],
                  [1, 'rgba(28,128,245,.0)'],
                ],
                width: 3,
              },
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            itemStyle: {
              show: false,
            },
            detail: {
              show: false,
            },
            title: {
              //标题
              show: false,
            },
            data: [
              {
                name: 'title',
                value: dataArr,
              },
            ],
            pointer: {
              show: false,
            },
            animationDuration: 4000,
          },
          {
            name: '内部阴影',
            type: 'gauge',
            center: ['50%', '50%'],
            radius: '100%',
            z: 4,
            splitNumber: 110,
            axisLine: {
              lineStyle: {
                color: [
                  [
                    dataArr / 10,
                    new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                      {
                        offset: 0,
                        color: 'rgba(145,207,255,0)',
                      },
                      {
                        offset: 0.5,
                        color: 'rgba(145,207,255,0.1)',
                      },
                      {
                        offset: 1,
                        color: 'rgba(145,207,255,0.3)',
                      },
                    ]),
                  ],
                  // [1, 'rgba(28,128,245,.0)'],
                ],
                width: 110,
              },
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            itemStyle: {
              show: false,
            },
            detail: {
              valueAnimation: true, // 开启数值动画效果
              offsetCenter: [0, '80%'],
              formatter: () => {
                const value = IOERROR(this.value)
                const valuePart = value == IOERROR_DEFAULT ? IOERROR_DEFAULT : this.isInteger ? Math.floor(value) + '' : value
                const unitPart = this.unit
                return `{a|${valuePart || '-'}\n} {b|${unitPart}}`
              },
              rich: {
                a: {
                  fontSize: this.fontSize, // value的字体大小
                  lineHeight: 20, // 可以根据需要调整行高
                  color: chartColors.valueColor,
                  fontWeight: chartColors.valueWeight,
                },
                b: {
                  color: '#BEBEBE',
                  fontSize: 14, // 单位的字体大小
                },
              },
            },
            title: {
              //标题
              show: false,
            },
            data: [
              {
                name: 'title',
                value: IOERROR(this.value),
              },
            ],
            pointer: {
              show: false,
            },
          },
          {
            name: '内部圈',
            type: 'gauge',
            center: ['50%', '50%'],
            radius: '250%',
            z: 2,
            min: this.min,
            max: this.max,
            splitNumber: 10,
            radius: '80%',
            axisLine: {
              lineStyle: {
                color: chartColors.colors,
                width: 3,
                shadowColor: 'rgba(145,207,255,.5)',
                shadowBlur: 6,
                shadowOffsetX: 0,
              },
            },
            tooltip: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            itemStyle: {
              show: false,
            },
            detail: {
              show: false,
            },
            title: {
              //标题
              show: false,
            },
            data: [
              {
                name: 'title',
                value: IOERROR(this.value),
              },
            ],
            itemStyle: {
              normal: {
                color: '#A5BAD8',
              },
            },
            //指针
            pointer: {
              show: true,
              length: '95%',
              radius: '90%',
              width: 8, //指针粗细
            },
            animationDuration: 4000, // 动画时间
          },
          {
            name: '内部刻度',
            type: 'gauge',
            center: ['50%', '50%'],
            radius: '100%',
            min: this.min,
            max: this.max,
            splitNumber: 10, //刻度数量
            startAngle: 225, //开始角度
            endAngle: -45, //结束角度
            axisLine: {
              show: false,
              lineStyle: {
                width: 5,
                color: [[1, '#1087e2']],
              },
            },
            axisLabel: {
              show: true,
              color: '#fff',
              distance: 10, //刻度文字距离刻度线的距离
              textStyle: {
                textAlign: 'center',
                offsetCenter: [0, '180%'],
                fontSize: 12,
                color: '#B7BAC3',
              },
            },

            axisTick: {
              show: true,
              splitNumber: 7,
              lineStyle: {
                color: '#B7BAC3',
                width: 1,
              },
              length: 4,
            }, //刻度样式
            splitLine: {
              show: true,
              length: 4,
              lineStyle: {
                color: '#b5c9eb',
              },
            },
            detail: {
              show: false,
            },
            pointer: {
              show: false,
            },
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
