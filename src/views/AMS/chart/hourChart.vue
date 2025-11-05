<template>
  <div class="hour-chart">
    <div class="value-box">
      <div class="value">
        <div class="block-value">{{ blockNum }}</div>
        <el-statistic :value="outputValue" group-separator="" v-if="value"></el-statistic>
      </div>
    </div>
    <div class="unit">{{ unit }}</div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useTransition } from '@vueuse/core'
const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  unit: {
    type: String,
    default: '',
  },
  length: {
    type: Number,
    default: 7,
  },
})
const source = computed(() => {
  const value = Number(props.value)
  if (isNaN(value)) {
    return 0
  }
  return value
})
const getGlockNum = () => {
  const value = Math.round(props.value)
  const l = value ? String(value).length : 0
  const len = props.length - l - 1
  return '0'.repeat(len)
}
const blockNum = ref(getGlockNum())
const outputValue = useTransition(source, {
  duration: 500,
  onStarted() {
    blockNum.value = getGlockNum()
  },
})
</script>
<style lang="scss" scoped>
.hour-chart {
  display: flex;
  justify-content: center;
  width: auto;
  align-items: flex-end;

  .value-box {
    width: 187px;
    border-radius: 5px;
    height: 74px;
    background: var(--monitor-hour-chart-background);
    box-shadow: 0px -1px 2px 0px var(--monitor-hour-chart-shadow) inset;
    font-size: 48px;
    font-weight: 700;
    box-sizing: border-box;
    padding: 0 18px;

    .value {
      display: flex;
      align-items: center;
      height: 100%;
      width: 100%;
      // overflow: hidden;
    }

    .block-value {
      color: var(--monitor-hour-chart-block-color);
    }

    :deep(.el-statistic) {
      .el-statistic__content {
        font-size: 48px;
        font-weight: 700;
        color: var(--monitor-num-chart-num-color);
      }
    }
  }

  .unit {
    font-size: 50px;
    color: var(--monitor-num-chart-unit-color);
    margin-left: 8px;
  }
}
</style>
