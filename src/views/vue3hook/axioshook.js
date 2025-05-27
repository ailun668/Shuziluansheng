import { ref } from 'vue'

// external.js

// 获取当前路由信息
// const currentRoute = window.vm.$route;
// console.log('Current Route:', currentRoute);

// // 获取当前路由路径
// const currentPath = window.vm.$route.path;
// console.log('Current Path:', currentPath);

export default function axiosHook() {
  let HOOKname = ref(22)
  class axiosClass {
    constructor(name, age) {
      this.name = name
      this.age = age
    }
    setName() {
      console.log(this.name.value, '=========name ')
      console.log(this.age, '=========age ')
      // this.name = name;
    }
    sumhook() {
      HOOKname.value += 7
    }
  }
  {
    return { axiosClass, HOOKname }
  }
}

//es6导出 axiosHook
