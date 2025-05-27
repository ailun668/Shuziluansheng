import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { Loading } from '../components/sui/index.js'
import router from '@/router'

// const app = createApp();
// app.use(router);
//推荐使用setup 函数方式
export const userStore = defineStore(
  'usedata',
  () => {
    const count = ref(0)
    const stutent = ref({
      age: 10,
      name: '张大大',
      sex: '西家婆',
    })
    const countvalue = (parmts) => {
      parmts == 0 ? (count.value -= 12) : (count.value += 12)
    }
    const checkout = () => {
      stutent.value.age = '1222'
      stutent.value.name = '1222'
      stutent.value.sex = '1222'
      Loading.show()
      setTimeout(() => {
        Loading.dismiss()
        router.push({
          name: 'login',
        })
        // Vue.prototype.router.push({
        //   name: 'login',
        // });
      }, 1500)
    }
    //可以添加计算属性 ***************
    let Computedage = computed(() => stutent.value.age)

    return {
      Computedage,
      count,
      countvalue,
      stutent,
      checkout,
    }
  },
  //数据可存储化
  {
    persist: {
      enabled: true,
      strategies: [
        {
          //自定义名称
          key: 'useUserStore',
          //只对name 做私有化存储
          // paths: ['name', 'age'],
          storage: localStorage,
        },
      ],
    },
    //第二种存储 *************
    // persist: true,
  },
)

export default function useHooks() {
  let uselook = ref('测试数据')
  class useClass {
    constructor(name) {
      this.name = name
    }
    getuseer() {
      uselook.value = `${this.name} ：来自北京`
    }
  }
  {
    return {
      uselook,
      useClass,
    }
  }
}
