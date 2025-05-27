<template>
  <div>
    <el-button type="success" size="mini" @click="gotobck">点击回去</el-button>
    <h1>测试一个详情页面</h1>
    <h1>当前ID是： {{ userId }}</h1>
  </div>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();
const route = useRoute();

let userId = ref(0);
userId.value = route.params.id;
const gotobck = () => {
  router.push("/home");
};
</script>
