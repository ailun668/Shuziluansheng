<template>
  <div id="app" class="sangoai-comment">
    <!-- <RouterLink v-if="routerishsow" /> -->
    <!-- <RouterView /> -->
    <el-config-provider size="small" :locale="locale">
      <router-view />
      <StagewiseToolbar v-if="isDev" :config="stagewiseConfig" />
    </el-config-provider>
  </div>
</template>
<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { computed, getCurrentInstance, onMounted, inject } from 'vue'
import { initThemes } from '@/utils/theme'
import { useRoute } from 'vue-router'

const stagewiseConfig = inject('stagewiseConfig', { plugins: [] })
const isDev = computed(() => process.env.NODE_ENV === 'development')
const { proxy } = getCurrentInstance()
const route = useRoute()
let routerishsow = computed(() => {
  return route.name != 'newsoft' && route.name != 'Any'
})

// 初始化主题
initThemes()

const locale = computed(() => {
  return proxy.$i18n.locale == 'zh' ? zhCn : en
})
onMounted(() => {
  initThemeColor()
  // 动态获取实际文档宽高并设置body缩放系数
  // 基准大小
  const baseSize = 14
  // 设置 rem 函数
  function setRem() {
    // 当前页面宽度相对于 1920宽的缩放比例，可根据自己需要修改。
    const scale = document.documentElement.clientWidth / 1920
    // 设置页面根节点字体大小

    document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
  }
  // 初始化
  setRem()
  // 改变窗口大小时重新设置 rem
  window.onresize = function () {
    setRem()
  }
})
const initThemeColor = () => {
  // 初始化css主题色变量
  const themeColor = {
    '--el-color-primary': '#0c151e',
    '--el-color-primary-light-3': '#05b98a',
    '--el-color-primary-light-5': '#5dfad1',
    '--el-color-primary-light-7': '#8efcdf',
    '--el-color-primary-light-8': '#c0fded',
    '--el-color-primary-light-9': '#f1fffb',
    '--el-color-primary-dark-2': '#047d5e',
  }
  const el = document.documentElement
  for (let key in themeColor) {
    let color = themeColor[key]
    el?.style?.setProperty(key, color)
  }
}
</script>
<style lang="scss" scoped>
* {
  padding: 0px;
  margin: 0px;
}

html,
body,
#app {
  height: 100%;
  overflow: hidden;
}

nav {
  a {
    margin-right: 10px;
  }
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
