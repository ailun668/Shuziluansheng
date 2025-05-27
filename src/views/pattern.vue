<template>
  <div>
    <h1>Javascript 设计模式</h1>
    {{ name3 }} ===
    <input type="text" v-model="name3" />
    {{ userName }}<input type="text" v-model="userName" />
    <input type="text" v-model="password" />
    <input type="text" v-model="code" />
    <button @click="fun()">点击测试一个按钮</button>
    <div class="box">
      <h1>CSS v-bind</h1>
    </div>
    <el-select v-model="color" placeholder="Select" size="large" style="width: 240px">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>

<script setup>
import { onMounted, onBeforeMount, computed, ref } from 'vue';
import patter, { Employee, Employee2, name3, showname } from '../pattern/pattern.js';

const {
  exportObject: { userName, password, code },
} = patter;
let color = ref('red');
const options = [
  {
    value: 'red',
    label: '红色',
  },
  {
    value: 'blue',
    label: '蓝色',
  },
  {
    value: 'yellow',
    label: '黄色',
  },
];

// 类模式 ********
const employ = new Employee('类模式--:王五', '20', '10000');
const employ2 = new Employee2('类模式--:李四', 66);
const employee = new Employee('构造器模式--:张三', '20', '10000');
onMounted(() => {
  //构造器模式 ********
  employee.sayName();
  employee.sayAage();
});

const form = computed(() => ({
  userName: userName.value,
  password: password.value,
  code: code.value,
}));

const fun = () => {
  console.log(userName.value, '=====呸呸呸');

};
</script>

<style lang="scss" scoped>
.box {
  background: v-bind(color);
  padding: 5px;
  border-radius: 4px;
}
</style>