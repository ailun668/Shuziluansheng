import { createApp, provide, inject, reactive } from 'vue'
import App from './App.vue'
const app = createApp(App)

// 在开发模式下集成 stagewise 工具栏
if (process.env.NODE_ENV === 'development') {
    import ('@stagewise/toolbar-vue').then(({ StagewiseToolbar }) => {
        app.component('StagewiseToolbar', StagewiseToolbar)
        const stagewiseConfig = {
            plugins: []
        }
        app.provide('stagewiseConfig', stagewiseConfig)
    })
}

import './assets/style/reset.scss'
import './components/sui/index.css'
import './assets/style/Elementresult.css'
import router from './router/index.js'
import pinia from './store/index.js'
import i18n from './utils/lang/index.js'
import { getTitle } from './utils/lang/index.js'


import { createPinia } from 'pinia'
const pinia2 = createPinia()
app.use(pinia2)

import Ws from "./axios/ws.js";

import './index.css'
import './assets/style/reset.scss'
import './components/sui/index.css'
import './assets/style/Elementresult.css'
//ICONFON
import './assets/style/iconfont/iconfont.css'

//色系库
import './assets/theme/index.scss'
import './assets/style/element.scss'



// 全局组件插入
import SangoCom from './libs/index.js'
app.use(SangoCom)

//全局JS 方案
import sangoai from './utils/sangoai.ts'
app.use(sangoai)
app.mixin(sangoai)
import { assembly } from './utils/sangoai.ts'

//全局pinia
import { testStore } from './store/testStore'
const sgtestStore = testStore()

import PubSub from 'pubsub-js'
app.use(PubSub)
import mitt from 'mitt'
app.config.globalProperties.$emitt = mitt()

app.config.globalProperties.$Ws = Ws;


app.config.globalProperties.getTitle = getTitle;
app.config.globalProperties.$router = router
app.config.globalProperties.$route = router.currentRoute
app.config.globalProperties = {
    assembly: assembly.Data,
    ceshi: 'data',
    routerpath: null,
    size: 'default',
    sgtestStore: sgtestStore,
}


import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

app.use(ElementPlus, { size: 'default', zIndex: 3000 })

window.vm = app.use(pinia).use(i18n).use(router).mount('#app')