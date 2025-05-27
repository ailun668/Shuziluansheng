<template>
  <div class="empty-chart-box" :class="getClassName()">
    <div class="text">
      Meter view unavailable;<br />
      please set range.
    </div>
    <div class="chart">
      <simpleChart class="chart-comp" :options="setDefaultOptions()" :unit="unit" :value="value"></simpleChart>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { initChartOptions } from '../common.js'
import simpleChart from './simpleChart.vue'
let props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  // 空组件的布局（左右/上下）
  emptyDirection: {
    type: String,
    default: 'column',
  },
  // 空组件图表的配置项
  emptyChartOptions: {
    type: Object,
    default: () => ({}),
  },
})
const getClassName = () => {
  if (props.emptyDirection === 'column') return 'empty-chart-box--column'
  return 'empty-chart-box--row'
}
const setDefaultOptions = () => {
  if (props.emptyDirection === 'column') {
    return initChartOptions(
      {
        radius: '100%',
        center: ['50%', '75%'],
        progress: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            width: 10,
          },
        },
      },
      props.emptyChartOptions,
    )
  } else {
    return initChartOptions(
      {
        radius: '116%',
        center: ['50%', '60%'],
        progress: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            width: 10,
          },
        },
        detail: {
          offsetCenter: [0, '30%'],
          rich: {
            value: {
              color: '#B7BAC3',
              fontSize: 16, // 单位字号
            },
            unit: {
              fontSize: 12, // 单位字号
              color: '#B7BAC3',
            },
          },
        },
      },
      props.emptyChartOptions,
    )
  }
}
const value = computed(() => {
  return props.data?.fieldValue
})
const unit = computed(() => {
  return props.data?.unit == null ? '' : props.data?.unit
})
</script>
<style scoped lang="scss">
.empty-chart-box {
  height: 100%;
  display: flex;
  box-sizing: border-box;

  .text {
    color: var(--main-warn-color);
    font-size: 12px;
    box-sizing: border-box;
  }

  .chart {
    flex-grow: 1;

    .chart-comp {
      height: 100%;
      width: 100%;
    }
  }

  &.empty-chart-box--column {
    flex-direction: column-reverse;

    .text {
      text-align: center;
      padding-top: 10px;
      padding-bottom: 30px;
    }

    .chart {
      width: 100%;
    }
  }

  &.empty-chart-box--row {
    width: 100%;
    align-items: center;

    .text {
      width: 150px;
    }

    .chart {
      height: 100%;
    }
  }
}
</style>
