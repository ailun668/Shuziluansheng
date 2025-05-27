<template>
  <div class="num-chart" :class="getClassName()">
    <div class="value">{{ IOERROR(value) }}</div>
    <div class="unit">{{ unit }}</div>
  </div>
</template>
<script setup>
import { IOERROR } from '@/utils/status.js'
const props = defineProps({
  value: {
    type: [Number, String],
    default: 0,
  },
  unit: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: '',
  },
})
const getClassName = () => {
  let name = ''
  if (props.size) {
    name += `num-chart-${props.size}`
  }
  return name
}
</script>
<style lang="scss" scoped>
.num-chart {
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: baseline;

  .value {
    font-size: 34px;
    font-weight: 700;
    color: var(--monitor-num-chart-num-color);
  }

  .unit {
    font-size: 18px;
    color: var(--monitor-num-chart-unit-color);
    margin-left: 5px;
  }

  &.num-chart-small {
    .value {
      font-size: 22px;
    }

    .unit {
      font-size: 14px;
      margin-left: 3px;
    }
  }
}
</style>
