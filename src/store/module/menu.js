import { defineStore } from 'pinia'

const menu = defineStore('menuCollapse', {
  state: () => {
    return {
      isCollapse: false,
      currentRoute: false,
      alarmlistisshow:false,
    }
  },
  actions: {
    toggle() {
      this.isCollapse = !this.isCollapse
    },
    getRoutepath(path) {
      // let routerInclude = ['/alarm',"/config","/system","/history"]
      // this.currentRoute = routerInclude.includes(path)
      // this.alarmlistisshow=routerInclude.includes(path)
    },
    getAlarmlistisshow(val){
      // let routerInclude = ['/alarm']
      // this.alarmlistisshow=routerInclude.includes(path)
    }
  },
})

export default menu
