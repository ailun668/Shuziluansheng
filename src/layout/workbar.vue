<template>
  <div class="tabs hide-in-print" ref="tabs" id="target">
    <div
      v-for="(item, index) in routerStrore.routerTabs"
      :key="item.path"
      @click="linkTo(item, $event)"
      @click.right="contextmenu(item, index, $event)"
      class="tab-item flex flex-align-center"
      :class="{ active: route.path === item.path }"
    >
      <div style="padding: 0 4px">
        {{ item.meta?.title }}
      </div>
      <svg
        v-if="routerStrore.routerTabs.length > 1"
        @click.stop="close(index)"
        class="close"
        width="18"
        height="18"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14 14L34 34" stroke="currentColor" stroke-width="2" stroke-linecap="butt" stroke-linejoin="miter" />
        <path d="M14 34L34 14" stroke="currentColor" stroke-width="2" stroke-linecap="butt" stroke-linejoin="miter" />
      </svg>
    </div>
  </div>
  <!-- <div class="tabs-bottom"></div> -->
</template>
<script setup>
import { watch, ref, nextTick, onMounted, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import routerTabs from '@/store/module/router'
import { Contextmenu } from '@/components/sui/index.js'
// import i18n from "@/plugins/i18n";

const routerStrore = routerTabs()
const router = useRouter()
const route = useRoute()

const tabs = ref(null)
const autoScroll = () => {
  nextTick(() => {
    const nTab = tabs.value?.querySelector('.active')
    nTab.scrollIntoView({ behavior: 'smooth', inline: 'center' })
  })
}

const contextmenu = (item, index, ev) => {
  ev.preventDefault()
  Contextmenu.create({
    ev,
    header: 'header',
    buttons: [
      {
        text: 'Close',
        disabled: routerStrore.routerTabs.length === 1,
        click: () => {
          close(index)
        },
      },
      {
        text: 'Close Others',
        disabled: routerStrore.routerTabs.length === 1 || item.path !== route.path,
        click: () => {
          routerStrore.closeOthers(index)
        },
      },
      // {
      //     text: "Close Left",
      //     click: (e) => {
      //         console.log(e);
      //     },
      // },
      // {
      //     text: "Close Right",
      //     click: (e) => {
      //         console.log(e);
      //     },
      // },
    ],
  })
}

watch(routerStrore, () => autoScroll(), {
  immediate: true,
  deep: true,
})
watch(route, () => {
  autoScroll()
})
watchEffect(() => {
  autoScroll()
})
onMounted(() => autoScroll())

const linkTo = (item, $event) => {
  router.push(item.fullPath || item.path)
}
const close = (index) => {
  const routerTabs = routerStrore.routerTabs
  const preIndex = index - 1
  const nextIndex = index + 1
  if (route.path === routerTabs[index].path && index === 0) {
    router.replace(routerTabs[nextIndex].path)
  } else if (route.path === routerTabs[index].path && index > 0) {
    router.replace(routerTabs[preIndex].path)
  }
  routerStrore.close(index)
}

// const getRouteName = (name) => {
//   return i18n.global.te("routerName." + name)
//     ? i18n.global.t("routerName." + name)
//     : i18n.global.t(name);
// };
</script>
<style scoped>
.tabs {
  user-select: none;
  width: 100%;
  height: 40px;
  display: flex;
  /* border-bottom: 1px solid #d1d1d1; */
  padding: 10px 10px 0 10px;
  background: #f6f6f6;
  gap: 6px;
  overflow-y: hidden;
  overflow-x: auto;
}

.tabs-bottom {
  position: relative;
  z-index: 1;
  background: #ffffff;
  width: 100%;
  height: 1px;
}

.tab-item {
  position: relative;
  height: 100%;
  border-bottom-color: transparent;
  border-radius: 6px 6px 0 0;
  height: 100%;
  /* background: #e9e9e9; */
  background: #fff;
  border: 1px solid #e5e5e5;
  box-shadow: 0 0 4px #e5e5e5;
  border-bottom: none;
  padding: 0 8px 0 8px;
  color: #333333;
  cursor: pointer;
  transition: all 0.15s;
  font-size: 13px;
  gap: 4px;
  white-space: nowrap;
  text-transform: capitalize;
}

.active {
  box-shadow: 0 0 4px #e5e5e5;
  border-color: var(--el-color-primary);
  background: var(--el-color-primary);
  color: #fff;
}

.tab-item:hover {
  color: var(--el-color-primary);
}

.active:hover {
  color: #ffffff;
}

.close {
  width: 12px;
  transition: 0.1s;
}

.close:hover {
  transform: scale(1.4);
}
</style>
