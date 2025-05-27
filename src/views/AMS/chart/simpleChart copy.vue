<template>
  <div ref="chartRef"></div>
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
    type: [Number, String],
    default: 0,
  },
  options: {
    type: Object,
    default: () => {
      return {}
    },
  },
  color: {
    type: [String, Array],
    default: '#4189C7',
  },
})
let chartRef = ref(null)
let chart = ref(null)
let defineOpt = {}
const renderChart = () => {
  initOption()
  const option = {
    series: [
      {
        ...defineOpt,
        data: [
          {
            value: props.value,
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
  const opt = {
    type: 'gauge',
    startAngle: 200,
    endAngle: -20,
    min: 0,
    max: 100,
    progress: {
      show: true,
      width: 8,
      roundCap: true,
      itemStyle: {
        color: props.color,
      },
    },
    axisLine: {
      roundCap: true,
      lineStyle: {
        width: 8,
        color: [
          [0, '#424052'],
          [1, '#424052 '],
        ],
      },
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
    anchor: {
      show: false,
    },
    pointer: {
      show: false,
    },
    title: {
      show: false,
    },
    detail: {
      valueAnimation: true,
      formatter: function () {
        return `{value|${IOERROR(props.value)}}{unit| ${props.unit}}` // 自定义格式
      },
      textStyle: {
        fontWeight: 500,
        distance: 0,
      },
      offsetCenter: [0, '35%'],
      rich: {
        value: {
          color: '#B7BAC3',
          fontSize: 20, // 数据字号
        },
        unit: {
          fontSize: 12, // 单位字号
          color: '#B7BAC3',
        },
      },
    },
  }
  defineOpt = initChartOptions(opt, props.options)
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
