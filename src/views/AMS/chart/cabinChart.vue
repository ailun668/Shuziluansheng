<!-- 舱容 -->
<template>
  <div class="container">
    <div class="content">
      <template v-if="!showEmptyChart">
        <div class="pill">
          <div class="bg" :style="{ height: height + '%' }"></div>
          <div class="perce" :style="{ top: perceTop }">{{ percentage }}%</div>
        </div>
        <div class="dialog" :style="{ top: dialogTop }" ref="dialog">
          <div class="n1" v-for="(item, inx) in options.slice(1)" :key="item.fieldKey" :style="{
            color: createChartColors(item?.valueAlarmRangeVo?.alarmRanges, item?.range, {
              fieldValue: item?.fieldValue,
              valueColor: '#32bdff',
            }).valueColor,
          }">
            <span>{{ item?.prefix || prefixList[inx] }}：</span>
            <span>{{ IOERROR(item.fieldValue) }}</span>
            <span class="unit">{{ item.unit }}</span>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="pill"></div>
        <div class="tips">
          Meter view unavailable;<br />
          please set range.
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { IOERROR } from '@/utils/status.js'
import { computed, ref, watch } from 'vue'
import { createChartColors } from '../common'
const props = defineProps({
  data: {
    type: Object,
    default: () => { },
  },
  options: {
    type: Array,
    default: () => [],
  },
  value: {
    type: [Number, String],
    default: 0,
  },
  unit: {
    type: String,
    default: '',
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 360,
  },
  prefixList: {
    type: Array,
    default: ['H', 'V'],
  },
})
const hasServerPercent = computed(() => {
  let has = false
  props.options.forEach((item) => {
    if (item?.unit === '%') {
      has = true
    }
  })
  return has
})
const serverPercent = computed(() => {
  let percent = null
  props.options.forEach((item) => {
    if (item?.unit === '%') {
      percent = item.fieldValue
    }
  })
  return IOERROR(percent) == '###' ? 0 : Number(percent).toFixed(2)
})
const showEmptyChart = computed(() => {
  // 舱容的第一个是百分比，第二个是值，第三个是容量
  return props.data?.range === null
})
const percentage = computed(() => {
  if (hasServerPercent.value) {
    return serverPercent.value
  }
  if (props.max === props.min) {
    return 0
  }
  let rawPercentage = ((props.value - props.min) / (props.max - props.min)) * 100
  return props.value > 0 ? parseFloat(rawPercentage.toFixed(1)) : 0
})
let dialog = ref(null)
let height = ref(0)
let dialogTop = ref(0)
let perceTop = ref(0)
const setDialogTop = () => {
  // 获取高度
  const dialogHeight = dialog.value?.getBoundingClientRect()?.height || 48
  const val = percentage.value
  if (val > 95) {
    dialogTop.value = '0%'
  } else if (val < 15) {
    dialogTop.value = `calc(100% - ${dialogHeight}px)`
  } else {
    // 百分比由下往上   dialog由上往下  高度为100-percentage-自身高度一半
    dialogTop.value = `calc(${100 - val}% - ${dialogHeight / 2}px)`
  }
}
const setBgHeight = (val) => {
  height.value = val
  if (val > 100) {
    height.value = 100
  }
}
const setPerceTop = () => {
  if (height.value > 90) {
    perceTop.value = '9%'
  } else if (height.value < 15) {
    perceTop.value = 'calc(85% + 2px)'
  } else {
    perceTop.value = `calc(100% - ${height.value}% + 2px)`
  }
}
// 监听百分比 同时设置侧边显示栏的top和量程高度
watch(
  percentage,
  (newval, oldval) => {
    setBgHeight(newval)
    setDialogTop()
    setPerceTop()
  },
  { immediate: true, deep: true },
)
</script>

<style lang="scss" scoped>
$pill-left: 20%;
$pill-width: 60px;

.container {
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 600px;
  display: flex;

  .tips {
    color: var(--main-warn-color);
    font-size: 12px;
    line-height: 16px;
    flex: 1;
    padding-left: 21%;
    display: flex;
    text-align: center;
    align-self: center;
    vertical-align: bottom;
  }

  .content {
    width: 100%;
    height: 80%;
    position: relative;
    top: 20%;
    display: flex;

    .pill {
      width: $pill-width;
      height: 100%;
      position: relative;
      top: 0%;
      left: $pill-left;
      border-radius: 30px;
      overflow: hidden;
      background: #424052;
    }
  }
}

.bg {
  position: absolute;
  width: 100%;
  height: 0%;
  font-size: 16px;
  transform: rotateX(180deg);
  transform-origin: bottom;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  z-index: 8;
  text-align: center;
  transition: height 0.5s ease;
  bottom: 0;
  transform: translateZ(25px);
  background-image: linear-gradient(0deg, #3d7cb6 -0.25%, #16bcad 100.75%);
  transition: all 0.5s ease;
}

.perce {
  z-index: 10;
  position: relative;
  text-align: center;
  width: 100%;
  position: absolute;
  transition: all 0.5s ease;
}

.dialog {
  padding: 5px;
  border-radius: 5px;
  display: inline-block;
  text-align: center;
  background: #424052;
  stroke-width: 1px;
  stroke: rgba(151, 151, 151, 0.29);
  color: #32bdff;
  font-size: 14px;
  font-weight: 600;
  position: absolute;
  text-align: left;
  transition: top 0.5s ease;
  left: calc($pill-left + $pill-width + 15px);

  .unit {
    padding-left: 4px;
    color: #8ea7c2;
    font-size: 12px;
  }
}

.dialog:before {
  content: '';
  position: absolute;
  left: -16px;
  top: 50%;
  transform: translateY(-50%);
  border: 10px solid transparent;
  border-right: 6px solid #424052;
}
</style>
