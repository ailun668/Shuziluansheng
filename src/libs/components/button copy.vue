<template>
  <div>
    {{ formdata }}

    <p>===={{ arr }}==</p>
    <el-input v-model="formdata.data" label="文本" placeholder="请输入用户名" />
    <el-input v-model="formdata.howuer" label="文本" placeholder="请输入用户名" />
    <el-input v-model="formdata.defprop" label="文本" placeholder="请输入用户名" />
    <el-button type="primary" @click="checkout">主要按钮</el-button>

  </div>
</template>
<script setup>
import { ref, reactive, onMounted, toRefs, defineProps, markRaw, shallowRef } from 'vue';
let ceshi = ref(12);
let formdata = reactive({
  data: 999,
  howuer: 122,
  defprop: '',
});

//组件传值
const props = defineProps({
  arr: {
    type: String,
    default: '张三',
  },
});
// 组件通信
onMounted(() => {
  PubSub.subscribe('hello', (msg, data) => {
    formdata.defprop = { ...data };
  });
});

// 组件通信
function checkout () {
  console.log(122);
  PubSub.publish('checkout', formdata.defprop);
}
</script>
