// import button from './button.vue'
// import cat from './cat.vue'
import Table from './table.vue'
// import Drawer from './drawer.vue'
const components = {
  // ButtonComponent: button,
  // cat,
  // Drawer,
  Table,
}
export default {
  //这里实现组件开发
  install(app) {
    for (let com in components) {
      app.component(com, components[com])
    }
  },
}
