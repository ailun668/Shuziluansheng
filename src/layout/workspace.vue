<template>
  <div class="workspace">
    <router-view class="workspace-router-view" />
  </div>
</template>

<style scoped>
.workspace {
  height: 100%;
  overflow-y: auto;
  width: 100vw;
  overflow-x: hidden;
}
.workspace-router-view {
  height: 100%;
  width: 100vw;
}
</style>
