// 组合式API Pinia 方法
import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
export const userWebStore = defineStore(
  'userCounter',
  () => {
    const web = reactive({
      title: 'title',
      url: 'url',
    })
    const user = ref(1000)
    // 方法 ****
    const userAdd = () => {
      user.value++
    }

    return {
      web,
      user,
      userAdd,
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          //自定义名称
          key: 'useUserStore',
          //只对name 做私有化存储
          paths: ['name', 'age'],

          storage: localStorage,
        },
      ],
    },
  },
)
