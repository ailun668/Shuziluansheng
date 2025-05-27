<template>
	<el-button type="primary" @click="userPinia.countfun">
		点击按钮 ({{ userPinia.count }}) -- {{ userPinia.age }}==
		{{ userPinia.doubleCount }} ==
		{{ userPinia.countage }}
	</el-button>

	<!-- <el-button type="primary">
    {{ age }}== {{ count }}== {{ doubleCount }} ==={{ countage }}
  </el-button> -->
	<!-- <el-button type="primary" @click="countfun">点击Pinia解构</el-button> -->
</template>

<script setup>
import { ref } from 'vue';
import { userCounterStore } from '@/store/count.js';
import { storeToRefs } from 'pinia';
const userPinia = userCounterStore();

//解构赋值
// let { count, age } = storeToRefs(userCounterStore);
// console.log(count, '响应式数据====');

// console.log(userPinia, `数据显示区域`);
// 方法还是在以前的方法里面解构
// const { countfun } = userPinia;
</script>

<style lang="scss" scoped></style>
