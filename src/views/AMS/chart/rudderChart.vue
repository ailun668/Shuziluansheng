<template>
  <div class="w-full h-full" ref="chartRef"></div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { debounce } from '@/utils/util.js'
import { initChartOptions } from '../common'
import { IOERROR } from '@/utils/status.js'
import { isEqual } from 'lodash'
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
  data: {
    type: Object,
    default: () => { },
  },
})
let chartRef = ref(null)
let chart = ref(null)
let defineOpt = {
  opt1: {},
  opt2: {},
}
const renderChart = () => {
  // 浏览器在重绘的空隙时间里来更新数据
  requestAnimationFrame(() => {
    initOption()
    let option = {
      series: [defineOpt.opt1, defineOpt.opt2, defineOpt.opt3],
    }
    chart.value.setOption(option, true)
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
  const obj = {
    type: 'gauge',
    progress: {
      show: false,
      width: 11,
    },
    radius: '82%',
    center: ['50%', '45%'],
    pointer: {
      show: false,
    },
    splitNumber: 6,
    axisTick: {
      show: false,
    },
    splitLine: {
      // 刻度线
      length: 8,
      distance: 0,
      lineStyle: {
        color: '#4d4b5d',
        width: 4,
      },
    },
    axisLabel: {
      distance: 14,
      color: '#999',
      fontSize: 12,
    },
    title: {
      show: false,
    },
    detail: {
      show: false,
    },
  }
  defineOpt = {
    opt1: initChartOptions(
      {
        startAngle: -90,
        endAngle: 90,
        min: 180,
        max: 0,
        axisLine: {
          lineStyle: {
            width: 11,
            color: [[1, '#ff0f00']],
          },
        },
        ...obj,
      },
      optArr[0],
    ),
    opt2: initChartOptions(
      {
        startAngle: 90,
        endAngle: -90,
        min: 0,
        max: 180,
        axisLine: {
          lineStyle: {
            width: 11,
            color: [[1, '#0ea609']],
          },
        },
        ...obj,
      },
      optArr[1],
    ),
    opt3: {
      radius: '82%',
      center: ['50%', '45%'],
      type: 'gauge',
      startAngle: -90,
      endAngle: 270,
      min: -180,
      max: 180,
      progress: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      title: {
        show: false,
      },
      pointer: {
        show: true,
        itemStyle: {
          color: '#B7BAC3',
        },
        length: '70%',
        icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
      },
      detail: {
        textStyle: {
          color: '#fff',
          fontWeight: 'normal',
          distance: 10,
          fontSize: 18,
        },
        valueAnimation: true, // 开启数值动画效果
        offsetCenter: [0, '40%'],
        formatter: () => {
          const valuePart = IOERROR(props.value)
          const unitPart = props.unit ? ` {unitStyle|${props.unit}}` : ''
          return `${valuePart}${unitPart}`
        },
        rich: {
          unitStyle: {
            fontSize: 14,
            color: '#BEBEBE',
          },
        },
      },
      data: [
        {
          value: IOERROR(props.value),
        },
      ],
    },
  }
}
const initChart = () => {
  chart.value = echarts.init(chartRef.value)
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
watch(
  () => props.value,
  () => {
    inViewRender()
  },
  {
    deep: true,
    immediate: true,
  },
)
</script>
<style scoped lang="scss">
.w-full,
.h-full {
  width: 100%;
  height: 100%;
}
</style>
