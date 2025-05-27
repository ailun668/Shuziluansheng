<template>
  <div class="sgaitocombox">
    <Header />
    <alarmlist />
    <div class="layout flex">
      <Menu v-show="false" />
      <section class="main flex">
        <Container />
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sgaitocombox {
    background: var(--main-page-bg);
  width: 100%;
  height: 100%;
}
.layout {
  display: flex;
  height: calc(100% - 340px);
}

.main {
  background: $bgcolor;
  border: 1px solid #797979;
  border-radius: 5px;
  flex: 1;
  padding: 10px;
  overflow: hidden;
  flex-direction: column;
  margin: 0 12px;
}
</style>
<script setup>
import alarmlist from '../layout/alarmlist.vue'
import Header from '../layout/header.vue'
import Menu from '../layout/menu.vue'
import Container from '../layout/container.vue'
</script>
