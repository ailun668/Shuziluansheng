<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    size="large"
  >
    <el-sub-menu index="2" size="large">
      <template #title>第一章</template>
      <el-menu-item
        v-for="(item, index) in threeArray"
        :key="index"
        :index="item.name"
        @click="checkurl(item)"
      >
        {{ item.name }}
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>第二章</template>
      <el-menu-item index="3-1">item one</el-menu-item>
      <el-menu-item index="3-2">item two</el-menu-item>
      <el-menu-item index="3-3">item three</el-menu-item>
    </el-sub-menu>
  </el-menu>
  <component :is="active"></component>
  <!-- <Threedemo />  -->
  <!-- <div ref="threeScene" class="threeScene"></div> -->
</template>

<script setup>
import { ref, onMounted, reactive, shallowRef, markRaw } from 'vue';

import three0 from './three/index.vue';
import three1 from './three/index_1.vue';
import three2 from './three/index_2.vue';
import three3 from './three/index3.vue';
import rtsp from './video.vue';

const active = shallowRef(three1);

const activeIndex = ref('1');
const threeArray = reactive([
  {
    name: '1-1',
    com: markRaw(three0),
  },
  {
    name: '第一个场景',
    com: markRaw(three1),
  },
  {
    name: '材质和光照',
    com: markRaw(three2),
  },
  {
    name: 'three3',
    com: markRaw(three3),
  },
  {
    name: 'RTSP 播放',
    com: markRaw(rtsp),
  },
]);

const checkurl = (path) => {
  active.value = path.com;
  // 处理点击事件
};
</script>

<style scoped>
.threeScene {
  width: 100vh;
  height: 100vh;
}

/* 可以在这里添加样式 */
</style>
