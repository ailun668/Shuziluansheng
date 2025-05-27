<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconClassName" :fill="color" />
  </svg>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
  iconName: {
    type: String,
    default: true,
  },
  className: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '#fff',
  },
})
// 图标在 iconfont 中的名字
const iconClassName = computed(() => {
  return `#${props.iconName}`
})
// 给图标添加上类名
const svgClass = computed(() => {
  if (props.className) {
    return `icon svg-icon ${props.className}`
  }
  return 'icon svg-icon'
})
</script>
<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  position: relative;
  fill: currentColor;
}
</style>
