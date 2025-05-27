// 创建pinia实例
// store/index.ts
import { createPinia } from 'pinia'
//引入持久化插件
import piniaPluginPersist from 'pinia-plugin-persist'
const pinia = createPinia()
//使用插件
pinia.use(piniaPluginPersist)

export default pinia
