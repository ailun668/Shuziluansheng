import { ref, App, createApp } from 'vue'
import { get } from 'lodash'
import pinia from '@/store/index'
import service from './service.ts'
import router from '@/router'
import modal from './plugins/modal.js'
// 获取当前路由信息
// const currentRoute = window.vm.$route;
// console.log('Current Route:', currentRoute);
// // 获取当前路由路径
// const currentPath = window.vm.$route.path;
// console.log('Current Path:', currentPath);

let html = ref<string>('<div><h1>1</h1></div>')
const app = createApp(html)
app.use(router)
let assembly = {
  Data: {
    key: '测试',
  },
  QQEEE: [1, 23, 4, 5],
  // alert(x?: number | string): any {
  alert(x: any) {
    console.log(`轮询如果没有登录就退出登录****:` + x)
  },
  alert3(): void {
    alert('测试一个提交')
  },
  Allalert(v: string): void {
    alert(v)
  },
}
//mixins 方法***********
const indextemp = {
  methods: {
    suddess() {
      alert('minxins')
    },
    suddData() {
      alert('全局')
    },
    //路由跳转   传参
    Roterquery(x: any) {
      router.push({
        path: '/axiosRouter3',
        query: {
          id: x,
        },
      })
    },
    //返回路由方式
    fanhuiluyou(x: any) {
      return x
    },
    //GET 获取数据
    getAJAX3(params2: any) {
      // service.get("/users/users").then((res: any) => {
      //     console.log(res);
      //     if (res.code == 0) {
      //         // proxy.$message.error(res.data);
      //     } else {
      //         if (x) {
      //             //   proxy.$message.info(res.statusText);
      //         }
      //         // state.getDATA = res.data;
      //         //console.log(res.data);
      //     }
      // });
      service
        .get('/users/users', {
          params: { id: params2 },
        })
        .then((res: any) => {
          console.log(res, params2)
          pinia.state.list = res
          console.log('WWWWWWWWWWWWWWWWWW')
          // resolve(res);
          if (200 == res.status) {
            pinia.state.list = res.data
            //resolve(res.data);
          } else {
            pinia.state.list = res.data
            alert(`全局提示:${res.data}`)
          }
        })
    },
  },
  data() {
    return {
      L05i2: require('@/assets/images/2.png'),
      L05i3: require('@/assets/images/3.png'),
    }
  },
  mounted() {
    alert(333)
  },
}
export { indextemp, assembly }
// 这里可以注册组件
// import Drawer from "./components/drawer.vue";
// app.component("Drawer", Drawer);
export default {
  install: (app: App, options: any) => {
    setInterval(() => {
      console.log('全局定时器：：：' + assembly.Data)
    }, 1500)
    setInterval(() => {
      assembly.alert(99999999)
    }, 15000)
    app.config.globalProperties.alert5555555555 = () => {
      alert('提示一下')
    }
    // ******************  app.mixin *******************
    app.mixin({
      data() {
        return {
          QuanjuTtile: '全局',
          Visual: '',
          networkData: [
            {
              title: 'Ethernet',
              url: 'Ethernet',
            },
          ],
        }
      },
      methods: {
        // 全局提示
        ElMessage(type: any, txt: any) {
          modal.msg(type, txt)
        },

        quanjufangfa() {
          this.QuanjuTtile = '全局方法数据被改变了****'
        },
      },
      watch: {
        //计算苏醒
        QuanjuTtile(val, oldval) {
          this.Visual = val + '** 我是计算后的数据'
        },
      },
    })
  },
  //Main.js   Mixin ***************
  methods: {
    sgrouterlink(pash: any) {
      router.push(pash)
    },
    getHeight() {
      const parent = get(this.$refs.table, '$el.parentElement')
      if (!parent) {
        return
      }
      const ph = parent.getBoundingClientRect().height
      const pah = this.$refs?.pagination?.getBoundingClientRect().height
      this.tableheight = parseInt(String(ph - pah))
    },
    //全局点击事件
    alert33() {
      //全局pinia
      // this.Visual = pinia.state.value.testStore.namepina;
      console.log(pinia.state.value.usedata.count, '======lll')
      alert(`VUE3 全局点击事件 pinia===, ${pinia.state.value.usedata.count}`)
    },
    // 全局翻译
    checklangfun() {
      this.$i18n.locale = this.$i18n.locale == 'zh' ? 'en' : 'zh'
      localStorage.setItem('lang', this.$i18n.locale)
    },

    checklang() {},
  },
  data() {
    return {
      height: 0,
      tableheight: 0,
      Visual: '==',
    }
  },
}
