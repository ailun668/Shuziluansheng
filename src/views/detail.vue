<template>
  <van-button type="primary" @click="router.back()">返回</van-button>

  {{ $route.query }}
  <div class="Detail">
    <div>code: {{ code }}</div>
    <div>msg: {{ msg }}</div>
    <div>count: {{ count }}</div>
  </div>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
const route = useRoute();

let { query: { code, msg, count } } = route;
const router = useRouter();
</script>

<style scoped lang="scss">
.sangoai-comment {
  text-align: center;
  padding: 20px 0px;

  img {
    width: 150px;
    margin: 0 auto;
  }
}
</style>
