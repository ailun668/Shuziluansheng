<template>
  <div class="w-full h-full container" ref="chart">
    <div class="bg">
      <div class="persent">

        <div class="persent-value" :style="{ height: valueLine.percent }"></div>
        <div class="hh-line line" :style="{ top: hhLine.percent }" v-show="hhLine.value">
          <span>{{ hhLine.value }}</span>
        </div>
        <div class="h-line line" :style="{ top: hLine.percent }" v-show="hLine.value">
          <span>{{ hLine.value }}</span>
        </div>
        <div class="l-line line" :style="{ top: lLine.percent }" v-show="lLine.value">
          <span>{{ lLine.value }}</span>
        </div>
        <div class="ll-line line" :style="{ top: llLine.percent }" v-show="llLine.value">
          <span>{{ llLine.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import _ from 'lodash'
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
let valueLine = ref({})
let llLine = ref({})
let lLine = ref({})
let hLine = ref({})
let hhLine = ref({})
const setLineData = (data, value, measure, customFn) => {
  // 如果值为undefined或者非数字，则不显示
  if (_.isUndefined(value) || _.isNaN(Number(value))) {
    data.value.value = false
    return
  }
  const { start, height } = measure
  data.value.value = value
  const diff = value - start
  const percent = _.isFunction(customFn) ? customFn(diff, height) : ((1 - diff / height) * 100).toFixed(2) + '%'
  data.value.percent = percent
}
const setLines = (alarmRanges, measure) => {
  let map = {}
  alarmRanges.forEach((item) => {
    map[item.alarmType] = item.threshold
  })
  setLineData(llLine, map['LL-A'], measure)
  setLineData(lLine, map['L-A'], measure)
  setLineData(hLine, map['H-A'], measure)
  setLineData(hhLine, map['HH-A'], measure)
  setLineData(valueLine, props.value, measure, (diff, height) => {
    return ((diff / height) * 100).toFixed(2) - 15 + '%'
  })
}
const initChart = () => {
  if (!_.isString(props.data.range)) return
  let range = props.data.range.split(',').map(Number)
  if (range.length !== 2) return
  const [start, end] = range
  const height = end - start
  if (height <= 0) return
  const alarmRanges = _.get(props.data, 'valueAlarmRangeVo.alarmRanges', [])
  if (alarmRanges.length) {
    setLines(alarmRanges, {
      start,
      end,
      height,
    })
  }
}
watch(
  () => props.value,
  () => {
    initChart()
  },
  {
    immediate: true,
    deep: true,
  },
)
</script>
<style lang="scss" scoped>
// .w-full,
// .h-full {
//   width: 70%;
//   height: 70%;
// }

.container {
  position: relative;

  .bg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 172px;
    height: 326px;
    background: url('@/assets/images/cylinder.png') no-repeat center center;

    .persent {
      position: absolute;
      left: 7px;
      top: 5px;
      width: 158px;
      height: 290px;
      border-radius: 68px 67px 70px 70px;
      overflow: hidden;

      .persent-value {
        transition: all 0.5s;
        background: linear-gradient(270deg, #0c52a9 10%, #5ea7d3 60.89%, #309adc 100%);
        position: absolute;
        left: 1px;
        bottom: 0;
        width: 155px;
        height: 0;
      }

      .line {
        width: 156px;
        height: 2px;
        position: absolute;
        left: 1px;
        font-size: 16px;

        span {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -20px;
        }
      }

      .hh-line,
      .ll-line {
        background: #ff3918;
        color: #ff3918;
      }

      .h-line,
      .l-line {
        background: #e58f4b;
        color: #e58f4b;
      }
    }
  }
}
</style>
