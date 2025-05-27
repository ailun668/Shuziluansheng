<template>
  <div v-bind="objectofattrs">
    <p>动态class</p>
  </div>
  <el-row class="tac">
    <el-col :span="8">
      <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="select">
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <location />
            </el-icon>
            <span>Navigator One</span>
          </template>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon>
            <document />
          </el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon>
            <setting />
          </el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup>
const objectofattrs = {
  id: 'container',
  class: 'wrapper',
}
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath, '========11')
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath, '========22')
}

const select = (key, path) => {
  console.log(key, path, '========33')
}
</script>
<style scss scoped>
#container {
  font-size: 20px;
  color: red;
  border-bottom: 1px solid blue;
}
</style>
