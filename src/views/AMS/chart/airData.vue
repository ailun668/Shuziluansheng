<template>
  <div class="content" @click="handleRange">
    <p class="title">{{ data.title }}</p>
    <div class="con">
      <div class="chart">
        <div class="empty-chart" v-if="!data.range">
          <div class="pill"></div>
          <div class="tips">
            Meter view unavailable;<br />
            please set range.
          </div>
        </div>
        <template v-else>
          <cylinderChart class="chart-comp" :data="data" :value="data.fieldValue"></cylinderChart>
        </template>
      </div>
      <div class="data">
        <div class="data-cell">
          <p>Pressure:</p>
          <p :class="classMap[alarmType]">{{ IOERROR(data.fieldValue) }} {{ data.unit }}</p>
        </div>
        <div class="data-cell">
          <p>Alarm:</p>
          <p :class="classMap[alarmType]">{{ labelMap[alarmType] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { watch, ref } from 'vue'
import { IOERROR } from '@/utils/status.js'
import cylinderChart from './cylinder.vue'
import _ from 'lodash'
const props = defineProps({
  data: {
    type: Object,
    dafault: () => { },
  },
})
const classMap = {
  'LL-A': 'LL-A',
  'L-A': 'L-A',
  'HH-A': 'HH-A',
  'H-A': 'H-A',
  'Exceed Range': 'Exceed',
}
const labelMap = {
  'LL-A': 'Low Low',
  'L-A': 'Low',
  'HH-A': 'High High',
  'H-A': 'High',
  'Exceed Range': 'Exceed Range',
  NORMAL: 'NORMAL',
}
const getAlarmRangeLevel = (value, serverData) => {
  let alarmType = 'NORMAL'
  if (value === null) return ''
  if (_.isNaN(Number(value))) return '###'
  if (!serverData) return '###'
  value = Number(value)
  const range = (_.get(serverData, ['range'], '') || '').split(',').map(Number)
  if (range.length !== 2) return '###'
  // 超出范围标红
  if (value > range[1]) {
    return 'Exceed Range'
  }
  if (value < range[0]) {
    return 'Exceed Range'
  }
  const alarmRanges = _.get(serverData, ['valueAlarmRangeVo', 'alarmRanges'], [])
  if (alarmRanges.length == 0) return 'NORMAL'
  for (let item of alarmRanges) {
    const alarmRange = item.alarmRange
    const [min, max] = alarmRange
    if (item.alarmType === 'LL-A' || item.alarmType === 'L-A') {
      if (value > Number(min) && value <= Number(max)) {
        alarmType = item.alarmType
        break
      }
    }
    if (item.alarmType === 'H-A') {
      if (value >= Number(min) && value < Number(max)) {
        alarmType = item.alarmType
        break
      }
    }
    if (item.alarmType === 'HH-A') {
      if (value >= Number(min) && value < Number(range[1])) {
        alarmType = item.alarmType
        break
      }
    }
  }
  return alarmType
}
const alarmType = ref('')
watch(
  () => props.data,
  (val) => {
    alarmType.value = getAlarmRangeLevel(val.fieldValue, val)
  },
  {
    immediate: true,
    deep: true,
  },
)
const emit = defineEmits(['handRange'])
const handleRange = () => {
  emit('handleRange', props.data)
}
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  color: #fff;
  position: relative;
  padding-top: 30px;
  box-sizing: border-box;

  .title {
    text-align: center;
    font-size: 22px;
    position: absolute;
    left: 0;
    top: 0;
    line-height: 30px;
    text-align: center;
    width: 100%;
  }

  .con {
    display: flex;

    .data {
      font-size: 20px;
      width: calc(100% - 260px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      .H-A,
      .L-A {
        color: #e58f4b;
      }

      .HH-A,
      .LL-A,
      .Exceed {
        color: #ff3918;
      }

      .data-cell {
        margin-bottom: 40px;

        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }
  }
}

.chart {
  width: 260px;
  height: 340px;
  position: relative;

  .empty-chart {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 10px 0;

    .pill {
      width: 120px;
      height: 80%;
      position: relative;
      border-radius: 60px;
      overflow: hidden;
      background-image: linear-gradient(0deg, #424052 -0.25%, #424052 100.75%);
    }

    .tips {
      color: var(--main-warn-color);
      font-size: 16px;
      line-height: 16px;
      display: flex;
      text-align: center;
      align-self: center;
      vertical-align: bottom;
    }
  }

  :deep(.chart-comp) {
    height: 100%;
    width: 100%;
  }

  :deep(.render) {
    .content {
      border: 0 none;
      padding: 0;
    }
  }
}
</style>
