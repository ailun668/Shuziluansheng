import { defineStore } from 'pinia'

const routerStore = defineStore('routerTabs', {
  state: () => {
    return {
      // routers: window.localStorage.routers ? reactive(JSON.parse(window.localStorage.routers)) : [],
      routers: [],
      routerTabs: window.localStorage.routerTabs ? JSON.parse(window.localStorage.routerTabs) : [],

      messageValue: 0,
      getMsgCetner: 0,
    }
  },
  actions: {
    addMessageValue() {
      this.messageValue++
    },
    addGetMsgCenter() {
      this.getMsgCetner++
    },
    clearMessageValue() {
      this.messageValue = 0
    },
    setRouters(routers) {
      this.routers = routers

      window.localStorage.routers = JSON.stringify(this.routers)
    },

    add(h) {
      if (!h.meta?.title) return
      let existRouteInfo = this.routerTabs.find((item) => item.path === h.path)
      if (existRouteInfo) {
        // 这里是为了处理之前打开的页面参数跟后面打开的页面参数不同导致的问题
        // 比如第一次打开 /a?id=1 页面，
        // 第二次打开 /a?id=2 页面，
        // 如果这里不做处理的话，参数就不会变，还是id=1的页面
        if (existRouteInfo.fullPath !== h.fullPath) {
          existRouteInfo.fullPath = h.fullPath
        }

        return
      }
      this.routerTabs.push({
        meta: {
          title: h.meta.title,
        },
        path: h.path,
        fullPath: h.fullPath,
      })

      window.localStorage.routerTabs = JSON.stringify(this.routerTabs)
    },

    close(index) {
      this.routerTabs.splice(index, 1)
      window.localStorage.routerTabs = JSON.stringify(this.routerTabs)
    },
    closeLeft() {},
    closeRight() {},
    closeOthers(index) {
      const currentRouter = JSON.stringify(this.routerTabs[index])
      this.routerTabs = [JSON.parse(currentRouter)]
      window.localStorage.routerTabs = JSON.stringify(this.routerTabs)
    },
    closeAll() {
      this.routerTabs = []
      window.localStorage.routerTabs = JSON.stringify(this.routerTabs)
    },
  },
})

export default routerStore
