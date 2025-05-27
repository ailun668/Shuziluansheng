<template>
  <div class="num-chart" :class="getClassName()">
    <div class="value" :style="styleColor"> {{ hanfun(value) }}</div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
  value: {
    type: Number,
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
const styleColor = computed(() => {
  if (props.value === 0) {
    return 'background:rgb(142, 148, 145);color: #fff;'
  }
  return 'background:#cf3c4f;color: #fff;'
});
function hanfun(num) {
  switch (num) {
    case 0:
      return 'Normal'
    case 1:
      return 'Low'
    default:
      return 'NO SIGNAL'
  }
}
</script>
<style lang="scss" scoped>
.num-chart {
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: baseline;

  .value {
    padding: 3px;
    border-radius: 4px;
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
