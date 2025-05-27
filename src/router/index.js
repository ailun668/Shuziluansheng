import { createRouter, createWebHashHistory } from 'vue-router'
import routerModule from '@/store/module/router'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/AMS/Index/index.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/AMS/default/index.vue'),
      },
    ],
  },
  //新系统
  {
    path: '/newsoft',
    name: 'newsoft',
    component: () => import('@/layout/index.vue'),
    // children: routerList,
    children: [
      //AMS ROUTER START ***********
      {
        path: '/alarm',
        name: 'alarm',
        meta: {
          title: '告警',
          icon: 'machine',
        },
        component: () => import('@/views/AMS/alarm/index.vue'),
      },

      {
        path: '/Echarts',
        name: 'Echarts',
        meta: {
          title: 'Echarts',
          icon: 'machine',
        },
        component: () => import('@/views/AMS/Echarts/index.vue'),
      },
      {
        path: '/history',
        name: 'history',
        meta: {
          title: 'history',
          icon: 'machine',
        },
        component: () => import('@/views/AMS/history/index.vue'),
      },

      {
        path: '/monitor',
        name: 'monitor',
        meta: {
          title: '监控',
          icon: 'machine',
        },
        component: () => import('@/views/AMS/monitor/index.vue'),
      },
      {
        path: '/system',
        name: 'system',
        meta: {
          title: '趋势',
          icon: 'machine',
        },
        component: () => import('@/views/AMS/system/index.vue'),
      },
      {
        path: '/config',
        name: 'config',
        meta: {
          title: 'config',
          icon: 'machine',
        },
        component: () => import('@/views/AMS/config/index.vue'),
      },
     
    ],
   
  },


  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404/index.vue'),
    name: 'Any',
    meta: {
      title: '任意路由',
      hidden: true,
      isHideInMenu: true,
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      let: 0,
      top: 0,
    }
  },
})

import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach((item, to) => {
  nprogress.start()
  const routerStore = routerModule()
})
//路由后置守卫
router.afterEach((to, from, next) => {
  nprogress.done()
})

export default router
