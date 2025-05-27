<template>
  <div class="history">
    <div class="radio-group">
      <el-radio-group size="large" v-model="type1" @change="changeType">
        <el-radio-button label="Data" size="default" />
        <el-radio-button label="Alarm" size="default" />
      </el-radio-group>
    </div>
    <component v-bind:is="currentTabComponent" class="content"></component>
  </div>
</template>

<script>
// import DATA from './data/index.vue'
import DATA from './alarm1/index.vue'
import ALARM from './alarm/index.vue'
export default {
  name: '',
  components: {
    DATA,
    ALARM,
  },
  data() {
    return {
      currentTabComponent: 'DATA',
      type1: 'Data',
    }
  },
  methods: {
    changeType(val) {
      this.currentTabComponent = DATA
      if (val === 'Alarm') {
        this.currentTabComponent = ALARM
      }
    },
  },
}
</script>
<style lang="scss" scoped>
$h: 44px;

.history {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  .radio-group {
    box-sizing: border-box;
    height: $h;
    padding: 6px 17px;
    background: var(--main-page-bg);
  }

  .content {
    height: calc(100% - $h);
  }
}
</style>
