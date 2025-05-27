<template>
  <div class="menu-wrapper flex flex-justify-between hide-in-print">
    <div class="slidebar" v-if="isshow">
      <el-menu
        :collapse-transition="false"
        :unique-opened="true"
        background-color="#001529"
        text-color="#fff"
        class="menu"
        :collapse="menuStore.isCollapse"
        :default-active="route.path"
        @select="select"
      >
        <el-menu-item>
          <!----->
          <p class="logo" @click="isshow = false">切换</p>
          <!-- <img class="logo" src="../assets/images/logo.png" @click="isshow = false" /> -->
          <!-- <template v-if="!menuStore.isCollapse" #title>
					<span style="margin-left: 8px">SANGOAI X-Tree</span>
				</template> -->
        </el-menu-item>
        <MenuItem :items="routerStore.routers" />
      </el-menu>
    </div>
    <div class="slidebar" v-else>
      <p class="logo" @click="isshow = true">切换</p>
      <div class="pd4 tl">
        <el-card @click="sgrouterlink('monitor')" :body-class="[v.type, 'elcardClass']" shadow="hover" v-for="(v, i) in alarmList" :key="'k_' + i">
          {{ v.label }}_{{ i }}
          <span class="label">{{ v.value }}</span>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import menuCollapse from '@/store/module/menu'
import routerModule from '@/store/module/router'
import MenuItem from './menu-item.vue'
const menuStore = menuCollapse()
const routerStore = routerModule()
const router = useRouter()
const route = useRoute()
let isshow = ref(false)

const alarmList = [
  { type: 'a1', label: 'DG', value: '01' },
  { type: '', label: 'DG', value: '01' },
  { type: '', label: 'DG', value: '01' },
  { type: '', label: 'DG', value: '01' },
  { type: '', label: 'DG', value: '01' },
  { type: '', label: 'DG', value: '01' },
  { type: '', label: 'DG', value: '01' },
  { type: '', label: 'DG', value: '01' },
  { type: '', label: 'DG', value: '01' },
  { type: '', label: 'DG', value: '01' },
  { type: '', label: 'DG', value: '01' },
  { type: '', label: 'DG', value: '01' },
  { type: '', label: 'DG', value: '01' },
  { type: '', label: 'DG', value: '01' },
  { type: '', label: 'DG', value: '01' },
  { type: '', label: 'DG', value: '01' },
  { type: '', label: 'DG', value: '01' },
  { type: '', label: 'DG', value: '01/33' },
]

const select = (path) => {
  router.push(path)
}
let ev
onUnmounted(() => {
  window.removeEventListener('resize', ev)
})
onMounted(() => {
  window.addEventListener(
    'resize',
    (ev = () => {
      if (window.innerWidth <= 1200) {
        menuStore.isCollapse = true
      } else {
        menuStore.isCollapse = false
      }
    }),
  )
})
</script>
<style lang="scss" scoped>
v-deep .el-card__body {
  display: flex;
}
.pd4 {
  font-weight: 600;
}

.menu-wrapper {
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  transition: all 0.32s;
  border-radius: 5px;
  width: 188px;
  background-color: $bgcolor;

  /* box-shadow: 1px 0 4px rgba(0, 0, 0, 0.28); */
}

.slidebar {
  padding-top: 6px;
  text-align: center;
  padding: 10px;
  border-left: 0px;
  color: #fff;
  overflow: auto;
  width: 100%;
  .el-card {
    margin-bottom: 10px;
    cursor: pointer;
    --el-card-padding: 10px;
    .a1 {
      display: flex;
    }
  }
}

.isCollapse {
  width: 200px;
  overflow: hidden;
}

.menu:not(.el-menu--collapse) {
  min-width: 220px;
  overflow-y: auto;
}

.logo {
  width: 170px;
  object-fit: contain;
}

.menu {
  user-select: none;
  height: 100%;
  border-right: none;
}

/* :deep(.el-sub-menu),
:deep(.el-menu-item) {
  height: 45px;
} */

:deep(.el-menu-item.is-active) {
  background: var(--el-color-primary);
  color: #ffffff;
}
</style>
