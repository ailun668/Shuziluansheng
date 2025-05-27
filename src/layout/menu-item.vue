<template>
  <template v-for="item in items" :key="item">
    <el-sub-menu :index="item?.path" v-show="item.children?.length > 0">
      <!-- <template #title>
        <el-icon v-show="menuStore.isCollapse">
          <svg width="17" height="17" viewBox="0 0 48 48" fill="none" v-if="menuStore.isCollapse">
            <use :href="`#${item?.meta?.icon || 'manager'}`" />
          </svg>
        </el-icon>
        <span style="text-transform: Capitalize">
          {{ (item.meta?.title) }}</span>
      </template> -->
      <template #title>
        <el-icon v-show="menuStore.isCollapse">
          <Menu />
        </el-icon>
        <span class="title">{{ item.meta?.title }}</span>
      </template>
      <MenuItem :items="item.children" />
    </el-sub-menu>
    <el-menu-item :index="item?.path" v-show="(!item.children || item.children?.length === 0) && !item?.meta?.isHideInMenu">
      <!-- <el-icon v-show="menuStore.isCollapse">
        <svg width="17" height="17" viewBox="0 0 48 48" fill="none" v-if="item.meta.icon && menuStore.isCollapse">
          <use :href="`#${item?.meta?.icon}`" />
        </svg>
      </el-icon> -->
      <el-icon v-show="menuStore.isCollapse">
        <Menu />
      </el-icon>
      <template #title>
        <span style="text-transform: Capitalize"> {{ item.meta?.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>
<script setup>
import MenuItem from './menu-item.vue'
import menuCollapse from '@/store/module/menu'
// import Auth from "@/libs/auth/index.js";

const menuStore = menuCollapse()
defineProps({
  items: { type: Array, default: [] },
})

/**
 * 检查一个节点和它的所有子节点
 * @param {*} node
 * @param {*} callback
 */
function checkNodeAndChildren(node, callback) {
  // 检查当前节点
  // console.log(node);
  callback(node)

  // 检查子节点
  if (node.children) {
    for (var i = 0; i < node.children.length; i++) {
      checkNodeAndChildren(node.children[i], callback)
    }
  }
}

/**
 * 是否含有任何 显示在侧边栏 并且有权限访问的子节点
 * @returns {boolean}
 */
function hasAnyDisplayChild(node) {
  return true
  if (!node) {
    return false
  }

  if (!node.children || node.children?.length === 0) {
    return false
  }

  // 如果这个菜单自己没权限，就所有子节点都不展示了
  if (node?.meta?.isHideInMenu) {
    return false
  }

  // if (!Auth.hasPermission(node?.meta?.permissionCode)) {
  //   return false;
  // }

  let hasPermission = false
  let isAnySubmenuDisplay = false

  checkNodeAndChildren(node, (e) => {
    if (node === e) {
      return
    }

    // if (Auth.hasPermission(e?.meta?.permissionCode)) {
    //   hasPermission = true;
    // }
    if (e?.meta?.isHideInMenu !== true) {
      isAnySubmenuDisplay = true
    }
  })

  return hasPermission && isAnySubmenuDisplay
}
</script>
<style lang="scss" scoped>
.img-icon {
  max-width: 18px;
  max-height: 18px;
}
</style>
