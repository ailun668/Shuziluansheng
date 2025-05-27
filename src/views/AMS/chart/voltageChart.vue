<template>
  <div ref="chartRef"></div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { debounce } from '@/utils/util.js'
import { initChartOptions, createChartColors } from '../common'
import { isEqual, isNumber } from 'lodash'
import { IOERROR } from '@/utils/status.js'
let props = defineProps({
  unit: {
    type: String,
    default: '',
  },
  value: {
    type: Number,
    default: 0,
  },
  options: {
    type: [Object, Array],
    default: () => {
      return {}
    },
  },
  color: {
    type: Array,
    default: [
      [
        [0, 'rgba(255, 255, 255, 0)'],
        [1 / 3, 'rgba(255, 255, 255, 0)'],
        [2 / 3, '#3d7cb6'],
        [1, '#e83643'],
      ],
      [
        [0, '#B7BAC3'],
        [1 / 3, '#B7BAC3'],
        [2 / 3, '#B7BAC3'],
        [1, '#B7BAC3'],
      ],
    ],
  },
  data: {
    type: Object,
    default: () => ({}),
  },
})
let chartRef = ref(null)
let chart = ref(null)
let defineOpt = {
  opt1: {},
  opt2: {},
}
const drawColor = 'rgba(0,0,0,0)'
const renderChart = () => {
  let chartColors = createChartColors(props.data?.valueAlarmRangeVo?.alarmRanges, props.data?.range, {
    lineColor: drawColor,
    normalColor: drawColor,
    fieldValue: props.data?.fieldValue,
  })
  const option = {
    series: [
      defineOpt.opt1,
      {
        ...defineOpt.opt2,
        detail: {
          valueAnimation: true,
          formatter: function (value) {
            return `{value|${IOERROR(value)}}{unit| ${props.unit}}` // 自定义格式
          },
          offsetCenter: [0, '-50%'],
          rich: {
            value: {
              fontWeight: chartColors.valueWeight,
              color: chartColors.valueColor,
              fontSize: 20, // 数据字号
            },
            unit: {
              fontSize: 14, // 单位字号
              color: '#BEBEBE',
              padding: [2, 0, 0, 0],
            },
          },
        },
        data: [
          {
            value: IOERROR(props.value),
          },
        ],
      },
    ],
  }
  // 浏览器在重绘的空隙时间里来更新数据
  requestAnimationFrame(() => {
    chart.value.setOption(option)
  })
}
const resizeChart = debounce(() => {
  if (chart.value) {
    chart.value.resize()
  }
}, 100)
const initOption = () => {
  let optArr = []
  if (!Array.isArray(props.options)) {
    optArr = new Array(2).fill(props.options)
  }
  const chartColors = createChartColors(props.data?.valueAlarmRangeVo?.alarmRanges, props.data?.range, {
    lineColor: drawColor,
    normalColor: drawColor,
    fieldValue: props.data?.fieldValue,
  })

  defineOpt = {
    opt1: initChartOptions(
      {
        min: -20,
        max: 10,
        splitNumber: 3,
        type: 'gauge',
        startAngle: 150,
        endAngle: 30,
        center: ['50%', '75.2%'],
        radius: '80%',
        axisLine: {
          lineStyle: {
            width: -13,
            color: chartColors.colors,
          },
        },
        pointer: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          distance: 0,
          length: 12,
          lineStyle: {
            color: '#B7BAC3',
          },
        },
        axisLabel: {
          inside: true,
          distance: -55,
          color: '#B7BAC3',
          fontSize: 14,
        },
      },
      optArr[0],
    ),
    opt2: initChartOptions(
      {
        min: -20,
        max: 10,
        splitNumber: 3,
        type: 'gauge',
        startAngle: 150,
        endAngle: 30,
        center: ['50%', '75%'],
        radius: '80%',
        axisLine: {
          lineStyle: {
            width: 6,
            color: props.color[1],
          },
        },
        pointer: {
          itemStyle: {
            color: '#B7BAC3',
          },
          offsetCenter: [0, '-15%'],
          length: '80%',
          icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
        },
        splitLine: {
          distance: -18,
          length: 18,
          lineStyle: {
            color: '#B7BAC3',
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        title: {
          offsetCenter: [0, '-10%'],
          fontSize: 20,
        },
      },
      optArr[1],
    ),
  }
}
const initChart = () => {
  chart.value = echarts.init(chartRef.value)
  initOption()
  renderChart()
  window.addEventListener('resize', resizeChart)
}
const observer = ref(null)
// 是否在视图中显示
const isIntersecting = ref(true)
const initObserver = () => {
  observer.value = new IntersectionObserver((entries) => {
    if (!entries[0]) return
    const entrie = entries[0]
    isIntersecting.value = entrie.isIntersecting
  })
  observer.value.observe(chartRef.value)
}
const inViewRender = () => {
  // 仅当在视图中可见才允许被渲染
  isIntersecting.value && renderChart()
}
onMounted(() => {
  initObserver()
  nextTick(() => {
    initChart()
  })
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
  if (chart.value) {
    chart.value.dispose()
  }
  if (!!observer.value) {
    observer.value.unobserve(chartRef.value)
    observer.value = null
  }
})
// watch中监听到的options始终一样 加个缓存
let oldOptions = null
watch(
  () => props,
  () => {
    if (!isEqual(oldOptions, props.options)) {
      oldOptions = props.options
      initOption()
    }
    inViewRender()
  },
  {
    deep: true,
    immediate: true,
  },
)
</script>
<style scoped lang="scss"></style>
