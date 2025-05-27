//存储化数据
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const alarms = defineStore(
  'alarms',
  () => {
    let audioEl = ref(null)
    let isplay = ref(false)

    const playAudio = () => {
      if (isplay.value == false) {
        audioEl.value.play()
        isplay.value = true
      } else {
        audioEl.value.pause()
        isplay.value = false
      }
    }
    const stopAudio = () => {
      audioEl.value.pause()
      isplay.value = false
    }
    return {
      isplay,
      audioEl,
      playAudio,
      stopAudio,
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'amsalarms',
          storage: localStorage,
        },
      ],
    },
  },
)

// 第一个参数是应用程序中 store 的唯一 id
export default defineStore('sangoai', {
  state: () => {
    return {
      name: 'name',
      age: 18,
      tage: 'updata all data',
      Duty: 'Duty',
      Status: 'NOT NO DUTY',
      routerlinks: [
        { type: 'danger', label: 'Monitor', url: '/' },
        { type: 'success', label: 'Echarts', url: '/Echarts' },
        { type: 'success', label: 'Alarm', url: '/alarm' },
        { type: 'success', label: 'History', url: '/history' },
        { type: 'danger', label: 'Config', url: '/config' },
        // { type: 'info', label: 'System', url: '/system' },
        // { type: 'primary', label: 'Monitor_list', url: '/monitor' },
      ],
    }
  },
  actions: {
    changeName(val) {
      this.name += val || 10
      console.log('122121212')
    },
    changeAge() {
      alert(`点击提示`)
      this.age += 24
    },
    handleCommand(command) {
      this.Duty = command
    },
    handStatus(command) {
      this.Status = command
    },
  },

  persist: {
    strategies: [
      {
        key: 'amsuser',
        storage: localStorage,
      },
    ],
    enabled: true,
  },
})
