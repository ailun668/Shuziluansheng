<template>
  <div class="container">
    <Workspace />
  </div>
</template>

<style scoped>
.container {
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
<script setup>
import Workbar from './workbar.vue'
import Workspace from './workspace.vue'
</script>
