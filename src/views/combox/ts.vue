<template>
  <div class="red">************ TS vue Props*****************</div>
  <div v-for="(item, index) in person" :key="index">
    name: {{ item.name }} age:
    <el-input v-model="item.age" placeholder="请输入内容" style="width: 100px"></el-input>
    sex:
    <el-select v-model="item.sex" placeholder="请选择" style="width: 100px">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-button type="primary" @click="getPerson(index)">获取新数据</el-button>
  </div>
  <div class="blue">
    defineProps *******************************
    <p>
      {{ MYcar }}
    </p>
    <p>{{ name }}</p>
  </div>
</template>

<script setup name="ts">
// import { type Persons } from "./index.ts"
import { reactive, watchEffect, watch, defineProps, withDefaults } from 'vue';

defineProps(['MYcar', 'name']);
// withDefaults(name(), {
//   name: () => "测试个数据";
// })

const options = [
  {
    value: 0,
    label: '女',
  },
  {
    value: 1,
    label: '男',
  },
  {
    value: 2,
    label: '动物',
  },
];
let person = reactive([
  {
    name: '王大大',
    age: 12,
    sex: 0,
  },
  {
    name: '王大大2',
    age: 122,
    sex: 1,
  },
]);
function getPerson(index) {
  console.log(person[index], '=====最新数据');
}
watch(
  () => {
    return person;
  },
  (value) => {
    console.log(value, 'Select 监听=====>>>');
  },
  {
    deep: true,
  },
);
</script>
