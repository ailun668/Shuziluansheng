// import button from './components/button.vue'
import cat from './components/cat.vue'
import Gauge from './components/gauge.vue'
import Gauge2 from './components/gauge2.vue'
import Table from './components/table.vue'
import Drawer from './components/drawer.vue'
import SvgIcon from './components/svgIcon.vue'
import SGbutton from './components/button.vue'

const components = {
  ButtonComponent: SGbutton,
  cat,
  Gauge,
  Gauge2,
  Table,
  Drawer,
  SGbutton,
  SvgIcon
}
//导出全局组件
export default {
  install(app) {
    for (let com in components) {
      app.component(com, components[com])
    }
  },
}
