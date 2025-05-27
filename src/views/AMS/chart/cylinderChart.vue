<template>
  <div ref="chartRef"></div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { debounce } from '@/utils/util.js'
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
    default: () => {},
  },
})
let chartRef = ref(null)
let chart = ref(null)
const renderChart = () => {
  // 浏览器在重绘的空隙时间里来更新数据
  requestAnimationFrame(() => {
    const option = initOption()
    chart.value.setOption(option, true)
  })
}
const resizeChart = debounce(() => {
  if (chart.value) {
    renderChart()
  }
}, 100)
const initOption = () => {
  let [start, end] = props.data.range.split(',').map(Number)
  let value = Math.abs(props.value / (end - start)) * 100
  if (value >= 100) {
    value = 100
  }
  var dataList = [
    {
      value,
      max: 100,
      headColor1: 'rgba(66,185,131,1)',
      headColor2: 'rgba(149,219,188,1)',
      upBarColor: 'rgba(162,230,192,0.5)',
      bottomBarColor: 'rgba(66,185,131,1)',
    },
  ]
  // 头部数据
  let topData = dataList.map((item) => {
    return {
      name: '',
      value: item.max,
      symbolPosition: 'end',
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: item.headColor1,
              },
              {
                offset: 1,
                color: item.headColor2,
              },
            ],
            false,
          ),
        },
      },
    }
  })
  // 底部立体柱子
  let bottomBar = dataList.map((item) => {
    return {
      value: item.value,
      itemStyle: {
        normal: {
          color: item.bottomBarColor,
        },
      },
    }
  })
  // 底下圆片
  let bottomCircle = dataList.map((item) => {
    return {
      name: '',
      value: item.max,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: item.headColor1,
              },
              {
                offset: 1,
                color: item.headColor2,
              },
            ],
            false,
          ),
        },
      },
    }
  })
  // 中间圆片
  let middleCircle = dataList.map((item) => {
    return {
      name: '',
      value: item.value,
      symbolPosition: 'end',
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: item.headColor1,
              },
              {
                offset: 1,
                color: item.headColor2,
              },
            ],
            false,
          ),
        },
      },
    }
  })
  // 上边的柱子
  let upBar = dataList.map((item) => {
    return {
      name: item.name,
      value: item.max - item.value,
      itemStyle: {
        normal: {
          color: item.upBarColor,
        },
      },
    }
  })
  return {
    tooltip: {
      show: false,
    },
    grid: {
      bottom: '8%',
      top: '10%',
      right: '0%',
      left: '0%',
    },
    xAxis: {
      data: [''],
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    yAxis: {
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
    series: [
      // 头
      {
        name: '',
        type: 'pictorialBar',
        coordinateSystem: 'cartesian2d',
        symbolSize: [220, 45],
        symbolOffset: [0, -20],
        z: 12,
        data: topData,
      },
      //底部立体柱
      {
        stack: '1',
        type: 'bar',
        coordinateSystem: 'cartesian2d',
        silent: true,
        barWidth: 220,
        data: bottomBar,
        itemStyle: {
          normal: {
            color: {
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              type: 'linear',
              global: false,
              colorStops: [
                {
                  //第一节下面
                  offset: 0,
                  color: 'rgba(0,255,245,0.5)',
                },
                {
                  offset: 1,
                  color: '#43bafe',
                },
              ],
            },
          },
        },
      },
      //最底下的圆片
      {
        name: '',
        type: 'pictorialBar',
        coordinateSystem: 'cartesian2d',
        symbolSize: [220, 30],
        symbolOffset: [0, 16],
        z: 12,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(89,211,255,1)',
              },
              {
                offset: 1,
                color: 'rgba(23,237,194,1)',
              },
            ]),
          },
        },
        data: bottomCircle,
      },
      // 中间圆片
      {
        name: '',
        type: 'pictorialBar',
        coordinateSystem: 'cartesian2d',
        symbolSize: [220, 42],
        symbolOffset: [0, -20],
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(89,211,255,1)',
                },
                {
                  offset: 1,
                  color: 'rgba(23,237,194,1)',
                },
              ],
              false,
            ),
          },
        },
        z: 12,
        data: middleCircle,
      },
      //上部立体柱
      {
        stack: '1',
        type: 'bar',
        coordinateSystem: 'cartesian2d',
        itemStyle: {
          normal: {
            color: '#3E8BE6',
            opacity: 0.7,
          },
        },
        label: {
          show: false,
          position: 'top', //top / left / right / bottom / inside / insideLeft / insideRight / insideTop / insideBottom / insideTopLeft / insideBottomLeft / insideTopRight / insideBottomRight
          distance: 20,
          color: '#FFFE00',
          fontSize: 12,
          formatter: function (item) {
            return item.value + '%'
          },
        },
        silent: true,
        data: upBar,
      },
    ],
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
<style lang="scss" scoped>
.mimic-box {
  color: #fff;
}
</style>
