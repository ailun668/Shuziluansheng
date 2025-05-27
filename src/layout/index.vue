<template>
  <div class="sgaitocombox">
    <Header />
    <div class="layout_res">
      <section class="main flex">
        <Container />
      </section>
    </div>
  </div>
</template>
<script setup>
import { watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import alarmlist from './alarmlist.vue'
import Header from './header.vue'
import Menu from './menu.vue'
import Container from './container.vue'
import menu from '@/store/module/menu'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
const route = useRoute()
const store = menu()
let { currentRoute, alarmlistisshow } = storeToRefs(store)
let { getRoutepath } = store
watchEffect(() => {
  getRoutepath(route.path)
})
onBeforeRouteUpdate((to, from, next) => {
  getRoutepath(to.path)
  next()
})
</script>
<style lang="scss" scoped>
.sgaitocombox {
  background: var(--main-page-bg);
  width: 100%;
  height: 100%;
}
.layout {
  display: flex;
  height: calc(100% - 85px);
}
.layout_res {
  display: flex;
  height: calc(100% - 85px);
}
.main {
  // background: $bgcolor;
  background: #0c151e;
  border-radius: 5px;
  flex: 1;
  overflow: hidden;
  flex-direction: column;
}
</style>
