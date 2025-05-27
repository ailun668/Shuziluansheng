<template>
  <el-row style="height: 100%; width: 100%">
    <el-col :span="3">
      <div class="routertag" v-for="(item, index) in RouterList" :key="index"
        :class="{ active: item.url === $route.path }" @click="RouterTag(item)">
        {{ item.name }}
      </div>
    </el-col>
    <el-col :span="21" style="border: 1px solid blue">
      <div style="margin-bottom: 30px">
        外部函数方法调用：
        <el-tag type="primary">{{ fomartPaystage(1) }}</el-tag>
        &nbsp; <el-tag type="danger">{{ fomartPaystage(4) }}</el-tag>
      </div>
      <!-- <router-view></router-view> -->
    </el-col>
  </el-row>
</template>
<script setup name="Routerall">
import { reactive, watchEffect, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { fomartPaystage } from './router.js';
const router = useRouter();
const route = useRoute();

//路由跳转监听
watch(
  () => route.path,
  (newVal, oldVal) => {
    console.log(newVal, '=======路由1');
  },
);
watchEffect(() => {
  console.log(route.path, '=======路由2');
});

const RouterTag = (parmts) => {
  router.push(parmts.url);
};
const RouterList = reactive([
  {
    name: 'BUS全局组件&组件通信',
    url: '/Routers/MITT',
  },
  {
    name: '组件1',
    url: '/Routers',
  },
  {
    name: '组件二',
    url: '/Routers/routerProps2',
  },

  {
    name: '表单组件封装',
    url: '/Routers/routerProps3',
  },
  {
    name: '表格组件',
    url: '/Routers/Tablecom',
  },
  {
    name: '表格封装',
    url: '/Routers/tabcom',
  },
]);
</script>
<style lang="scss" scoped>
.active {
  background: #ccc;
}

.routertag {
  height: 35px;
  cursor: pointer;
  line-height: 35px;
}
</style>
