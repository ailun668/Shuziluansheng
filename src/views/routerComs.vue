<template>
  <div class="routercoms">
    <p class="red">*************动态组件*************</p>
    <ul>
      <li v-for="(item, index) in compag" :key="item.name" :class="index === active ? 'active' : ''"
        @click="switchcom(item, index)">
        {{ item.name }}
      </li>
    </ul>
    <div style="border: 1px sienna solid; margin-top: 10px; padding: 10px">
      <component :is="comtar"></component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, markRaw, shallowRef } from 'vue';
import BBB from './combox/b.vue';
import EEE from './combox/e.vue';
let active = ref(0);
const comtar = shallowRef(BBB);
const compag = reactive([
  {
    name: 'B组件',
    com: markRaw(BBB),
  },
  {
    name: 'E组件',
    com: markRaw(EEE),
  },
]);
const switchcom = (item, index) => {
  comtar.value = item.com;
  active.value = index;
};
</script>

<style lang="scss">
.routercoms {
  ul {
    display: flex;
    margin-left: 1px;

    li {
      cursor: pointer;
      border: 1px solid red;
      padding: 5px;
      margin-left: -1px;
    }

    li.active {
      background: blueviolet;
      color: #fff;
    }
  }
}
</style>
