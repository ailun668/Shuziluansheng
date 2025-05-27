<template>
  <li v-for="(item, index) in acList2" :key="index" @click="activeFun(item)">
    {{ item.name }} <el-switch v-model="item.active" />
  </li>
</template>

<script setup>
import { defineProps, inject } from "vue";
const acList2 = inject("acList2");
const activeFun = inject("activeFun");
</script>

<style lang="scss" scoped>
ul {
  li {
    cursor: pointer;
    background: #d3d3d3;
    font-size: 16px;
    border-bottom: 2px solid blue;
  }
}
</style>
