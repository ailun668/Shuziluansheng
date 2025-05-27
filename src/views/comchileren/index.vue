<template>
  <div class="component">组件通信 *******************</div>
  username:{{ username }} <input type="text" v-model="username" /> password:{{ password }}
  <input type="text" v-model="password" />

  <indextemp v-model:username="username" />

  <div>-----dex</div>
  <input type="text" v-model="ceshi.name" />
  <input type="text" v-model="ceshi.age" />
  <comIndex :ceshi="ceshi" v-model:username="username" v-model:password="password" @function4="function4">
    <p>组件的一种方法 *************</p>
  </comIndex>
  <hr />

  <div>
    <b style="color: red">******这个重点学习看</b><br />
    父组件显示：@update:modelValuecar: {{ car }}
    <input v-model="car.name" />
    <input v-model="car.age" />
  </div>
  <comIndex :car="car" :setcar="setcar" @update:modelValue="car.name = $event" @childEvent="handchildEvent">
    <p>组件的二种方法 *************</p>
  </comIndex>
</template>

<script setup>
//异步组件方法
import { ref, provide, defineAsyncComponent } from 'vue';
import comIndex from './combox/index.vue';
import indextemp from './combox/indextemp.vue';
let ceshi = ref({
  name: 'ceshi',
  age: 18,
});

let username = ref('姓名');
let password = ref('测试一个密码');
let car = ref({
  name: '我是一辆汽车',
  age: 33,
});
provide('MONEY', ceshi.value);
provide('username', username);
provide('inject', username);

function setcar (par) {
  username.value = par;
}

function handchildEvent () {
  alert(122);
}

//事件方法
function function4 (parts) {
  ceshi.value = parts;
  username.value = parts.name;
  password.value = parts.age;

  // alert(`子调取父亲：${JSON.stringify(parts)}');
}
</script>

<style lang="scss" scoped>
.comIndex {
  border: 2px solid blue;
  padding: 4px;
  margin: 10px;
}

p {
  color: aqua;
  font-size: 30px;
}
</style>
