<template>
  <div class="sgaitocombox">
    <Header />
    <!-- <alarmlist /> -->
    <div class="layout flex">
      <Menu v-show="false" />
      <section class="main flex">
        <Container />
      </section>
    </div>
  </div>
</template>
<script setup>
import Header from '@/layout/header.vue'
import Menu from '@/layout/menu.vue'
import Container from '@/layout/container.vue'
</script>
<style lang="scss" scoped>
.sgaitocombox {
    background: var(--main-page-bg);
  width: 100%;
  height: 100%;
}

.layout {
  display: flex;
  height: calc(100% - 80px);
}

.main {
  // background: $bgcolor;
  background: #091019;
  flex: 1;
  overflow: hidden;
  flex-direction: column;

}
</style>
