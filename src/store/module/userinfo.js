import { defineStore } from 'pinia'

let useInfoStore = defineStore('info', {
  state: () => {
    return {
      //定义一个学生对象
      userinfoData: {
        name: `王小小`,
        age: `12`,
        sex: `女`,
        hobby: `杭州`,
      },
      count: `班级数据量`,
    }
  },
  getters: {},
  actions: {
    //修改学生信息
    changeInfo(newInfo) {
      this.count += newInfo
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

export default useInfoStore
