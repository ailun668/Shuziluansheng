<template>
  <el-row :gutter="24">
    <el-col :span="12">
      <div style="border: 3px solid blue">
        <input type="text" v-model="info.name" />
        <input type="text" v-model="info.age" />
        <button type="button" @click="getRef">父组件Ref 调取子方法</button>

        <p>watch ***************</p>
        name: {{ name }} abc:{{ age }} name：
        <div>
          <input type="text" v-model="name" />
          <input type="text" v-model="age" />
          <el-switch v-model="vmodle" active-color="#13ce66" inactive-color="#ff4949" active-text="组件v-model 打开" inactive-text="组件v-model 关闭 ">
          </el-switch>
        </div>
      </div>
      <vue3component ref="vue3Ref" v-model="vmodle" v-model:name="name" @getname="getame" style="border: 4px solid blue; padding: 10px; margin: 10px">
        <p>插槽这是子组件 *******</p>
      </vue3component>
    </el-col>
    <el-col :span="12" style="border: 1px solid blue">
      <p style="color: red">personwatchEffect.vue 重点学习看看 ***********</p>
      <el-button type="primary" @click="watchFund"> 父亲 Ref 方式父组件获取子通信</el-button>
      <el-button type="primary" @click="watcheffect.countage()">父亲 ref 获取子通信</el-button>
      <personwatchEffect ref="watcheffect" v-model="vmodle" />
    </el-col>
  </el-row>
</template>

<script setup>
import vue3component from './vue3component.vue';
import personwatchEffect from './personwatchEffect.vue';
import { ref, watch, onMounted, provide } from 'vue';
let name = ref('我的名词');
let age = ref('年龄');
let vmodle = ref(true);

let vue3Ref = ref(null);
let watcheffect = ref();
let info = ref({
  name: '唱歌',
  age: 12,
});
//跨级组件传值，可以传递方法也可以传递数据
provide('Providename', name);
provide('getame', getame);

provide('checkout', checkout);

//父获取子
const watchFund = () => {
  watcheffect.value.countage();
  console.log(watcheffect.value.isShow, '======>>>>');
};

function checkout () {
  vmodle.value = !vmodle.value;
}
let abc = 1;
function getame (parmts) {
  abc += 1;
  name.value = `${parmts}=${abc}`;
}
// let timer = setInterval(() => {
//   name.value += 1;
//   if (name.value.length > 10) {
//     name.value = "A";
//   }
// }, 2000);

//子调取父的方法
function getRef () {
  vue3Ref.value.ceshialert();
}
//监听多个数据变化
watch(
  [name, age],
  ([newname, newage], [oldname, oldage]) => {
    console.log(newname, newage);
  },
  {
    immediate: true,
    deep: true,
  },
);

//watch REF 回调只监听一个数据变化
watch(
  () => info.value.age,
  (newval, oldval) => {
    console.log(newval, newval);
  },
  {
    deep: true,
  },
);
</script>

<style lang="scss" scoped>
p {
  font-weight: 600;
  font-size: 20px;
  color: red;
}
</style>
