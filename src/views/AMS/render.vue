<template>
  <div class="render" @click="handRange">
    <div class="content" :class="getClassName()">
      <p class="title" v-if="title">{{ title }}</p>
      <div class="empty-chart" v-if="showEmptyChart">
        <emptyCom :data="data" :type="props.type" :emptyChartOptions="emptyChartOptions" :emptyDirection="emptyDirection"></emptyCom>
      </div>
      <div class="chart" v-else>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import emptyCom from './chart/empty.vue'
import _ from 'lodash'
let props = defineProps({
  title: {
    type: String,
    default: '',
  },
  data: {
    type: Object,
    default: () => ({}),
  },
  type: {
    type: String,
    default: '',
  },
  // 布局（左右/上下）
  direction: {
    type: String,
    default: 'column',
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
const emit = defineEmits(['handRange'])
const canEditList = ['cabin', 'gauge', 'voltage', 'rudder', 'pressure', 'speed', 'num']
const handRange = () => {
  // 只有仪表盘+num 能编辑
  if (!canEditList.includes(props.type)) return
  let data = _.cloneDeep(props.data)
  console.log('🚀 ~ file: render.vue:54 ~ handRange ~ props.type:', props.type)
  const showSpiltNumber = !['speed', 'cabin', 'num'].includes(props.type)
  data.customOptions = {
    showSpiltNumber,
  }
  emit('handRange', data)
}
const showEmptyChart = computed(() => {
  if (props.title.includes('Empty Chart')) {
    return true
  } else {
    return canEditList.includes(props.type) && props.type !== 'num' && props.data.range === null
  }
})
const getClassName = () => {
  if (props.direction === 'row') return 'content-row'
  return 'content-column'
}
</script>
<style lang="scss" scoped>
$h: 40px;
.render {
  height: 100%;
  box-sizing: border-box;
  padding: 3px;
  color: #fff;
  .content {
    border-radius: 14px;
    border: 2px solid rgba(210, 231, 254, 0.1);
    box-sizing: border-box;
    padding: 10px;
    height: 100%;
    display: flex;
    .title {
      font-size: 18px;
    }
    &.content-column {
      flex-direction: column;
      .title {
        line-height: 20px;
      }
      .chart {
        flex-grow: 1;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      .empty-chart {
        flex-grow: 1;
        width: 100%;
        height: 100%;
      }
    }
    &.content-row {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
