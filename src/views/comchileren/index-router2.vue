<template>
  <div class="index_router2">
    <IndexRouter title="我是头部  中心">
      <template #header="parmts">
        <div>
          <b style="color: red"> 作用域插槽===== {{ parmts }}</b>
        </div>
      </template>
      <template #body>
        <div style="color: brown">我是中心</div>
      </template>
    </IndexRouter>
    <IndexRouter title="我是图片">
      <template #img>
        <div>我是底部</div>
        <img src="@/assets/images/logo.png" style="width: 100px" />
      </template>
    </IndexRouter>
    <IndexRouter title="我是文本">
      <!-- <template v-slot="img">
        <p style="font-size: 30px; color: red">我是图片位置 ******</p>
      </template>

      <template #text>
        <div>我是中心</div>
        <p>import ChildComponent from './ChildComponent.vue';</p>
      </template> -->
    </IndexRouter>
  </div>
  <div>
    <p>点击显示高亮否则不高亮</p>
    <!-- <ul>
      <li
        v-for="(item, index) in acList"
        :key="index"
        :class="item.active ? 'active ' : ''"
        @click.stop="acClass(item, acList)"
      >
        {{ item.name }}
        <el-switch v-model="item.active" />
      </li>
    </ul> -->
    <h1>组件方式的 provide && inject</h1>
    <input
      v-for="(item, index) in acList2"
      :key="index"
      type="text"
      v-model="item.name"
    />
    <ul>
      <router2com></router2com>
    </ul>
  </div>
</template>

<script setup>
import { ref, provide } from "vue";
import IndexRouter from "./rotuer_routerSlot.vue";
import router2com from "./index-router2com.vue";

import { useRoute } from "vue-router";
import { acClass, acList } from "./data.js";
let acList2 = ref([
  { name: "张三", age: 18, sex: "男", active: false },
  { name: "李四", age: 19, sex: "女", active: false },
  { name: "王五", age: 20, sex: "男", active: false },
]);
provide("acList2", acList2);
provide("activeFun", activeFun);

function activeFun(item) {
  if (item.active) {
    item.active = false;
  } else {
    acList2.value.forEach((item) => {
      item.active = false;
    });
    item.active = true;
  }
}
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
.active {
  font-weight: 600;
  font-size: 30px;
}
.index_router2 {
  display: flex;
  justify-content: space-between;

  .commentbox {
    flex: 1;
  }
}
</style>
