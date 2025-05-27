// 创建pinia实例
// store/index.ts
import { reactive, ref } from 'vue'
import { defineStore, storeToRefs, createPinia } from 'pinia'
import modal from '../utils/plugins/modal'
export const testStore = defineStore('testStore', {
  state: () => {
    return {
      isCheck: true,
      namepina: 'Pinia 数据',
      count: localStorage.getItem('count') ? Number(localStorage.getItem('count')) : 12,
      book: {
        name: '测试',
        author: '测试',
      },
    }
  },
  actions: {
    alerttext(txt, type) {
      modal.msg(txt, type)
      this.count *= 2
    },
    testCount() {
      this.count *= 2
      this.namepina += 'BB'
    },
  },
  getters: {
    getcount(state) {
      return state.count * 2 + state.namepina
    },
    target() {
      return '2333==='
    },
    getbook(state) {
      return state.book + '=='
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'useStore',
        storage: localStorage,
      },
    ],
  },
})
