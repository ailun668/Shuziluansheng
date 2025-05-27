<template>
  <div style="border: 3px s">
    <H1>
      e.vue *************************************
      <br />
      {{ target }}
    </H1>
    <el-button type="primary" @click="Checktarget()">点击看看生命周期</el-button>
    <hr />
    <img v-for="(dog, index) in dogList" :key="index" :src="dog" />
    <el-button type="primary" @click="getAXIOS()">点击发送请求</el-button>

    <hr />
    <H1 class="rede"> <b>hooks 写法 ***********************</b></H1>
    hooks： {{ hooks }} == 扩大2 {{ hooksVal }}
    <el-button type="primary" @click="checkHooks()">点击累加Hooks</el-button>
  </div>
</template>

<script setup name="ceee">
import axios from 'axios';
import {
  ref,
  reactive,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from 'vue';
//创建
const target = ref(34);
// hooks 写法
import indexHooks from './hook.js';
let { hooks, hooksVal, checkHooks } = indexHooks();

let dogList = reactive(['https://images.dog.ceo/breeds/pembroke/n02113023_6341.jpg']);

function Checktarget() {
  target.value += 10;
}

async function getAXIOS() {
  try {
    let res = await axios.get('https://dog.ceo/api/breed/pembroke/images/random');
    dogList.push(res.data.message);
  } catch (err) {
    console.log(err);
  }
}

onBeforeMount(() => {
  console.log('beforeMount');
});
onMounted(() => {
  console.log('mounted');
});

onBeforeUpdate(() => {
  console.log('beforeUpdate', target.value);
});

onUpdated(() => {
  console.log('onUpdated', target.value);
});

onBeforeUnmount(() => {
  console.log('onBeforeUnmount 销毁', target.value);
});

onUnmounted(() => {
  target.value = 0;
  console.log('onUnmounted== 销毁完毕', target.value);
});
</script>

<style scoped>
IMG {
  width: 100px;
  margin: 0 3px;
}
</style>
