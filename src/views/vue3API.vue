<template>
  <div>
    <slot><div>开发内容-----</div> </slot>
    <hr />
    <p>鼠标的位置：{{ x }}==={{ y }}</p>
    datavalue: <input type="text" v-model="datavalue" /> {{ datavalue }}<br />

    ref( checked):
    <input type="text" v-model.number.trim="checked" /> reactive( reac):
    <input type="text" v-model="reac.count" /> {{ reac.count }}
    <el-button type="primary" @click="warn('from cannot be', $event)">Submit</el-button>
    <label><input type="checkbox" v-model="checked" /> {{ checked }}</label>
    <p>watch:{{ watchvalue }}</p>
  </div>
</template>
<script setup>
import { reactive, ref, watch, defineExpose } from 'vue';
//组合式函数
import { useMouse } from './vue3API.js';
const { x, y, datavalue } = useMouse();
let checked = ref(false);
let reac = reactive({
  count: 12,
});
let watchvalue = 0;
function warn(type, event) {
  console.log(checked.value);
  console.table(type);
  console.table(event);
}
//函数是watch
watch(
  () => checked.value + 22,
  (sum) => {
    watchvalue = sum;
  },
);
watch(checked, (newval) => {
  console.log(newval, '======>>>>');
});
watch(reac, (newval) => {
  console.log(newval, '======>>>>');
});
watch(
  () => reac.count + 2,
  (newval) => {
    console.log(newval, '===函数式');
  },
);
defineExpose({
  checked,
  reac,
});
</script>

<style lang="scss" scoped>
</style>