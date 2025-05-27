import { defineStore } from 'pinia'
const menu = defineStore('menuCollapse', {
  state: () => {
    return {
      isCollapse: false,
    }
  },
  actions: {
    toggle() {
      this.isCollapse = !this.isCollapse
    },
  },
})

export default menu
