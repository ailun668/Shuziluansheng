//接口请求方法封装

import service from '@/axios/service.js'
import service2 from '@/axios/service2.js'
import service3 from '@/axios/service3.js'

// const urls = {
//   development: '/users', // 开发环境URL
//   test: 'http://localhost:3000', // 测试环境URL
//   production: 'http://localhost:3000', // 生产环境URL
// };
// // 获取当前环境
// const getEnvironment = (): string => {
//   if (process.env.NODE_ENV === 'production') {
//     return 'production';
//   } else if (process.env.NODE_ENV === 'development') {
//     return 'development';
//   } else {
//     return 'test';
//   }
// };

// let { baseURL } = baseURL;

//get 请求
// get 用 parmts
export function getAJAX(data: any) {
  return new Promise((resolve, reject) => {
    service({
      url: `/users`,
      method: 'post',
      data: data,
    }).then((res) => {
      resolve(res)
    })
  })
}
export function getData(params: any) {
  return service({
    url: `/users`,
    method: 'get',
  })
}
export function postdaa(data: any) {
  return service({
    url: `/shipDict`,
    method: 'get',
    data,
  })
}

//  return service({
//    url: '/v1/offshore/userLogout',
//    params,
//    method: 'get',
//  });
//POST 请求
export function postAJAX(params: any) {
  return service2.get('/shipDict', params)
  // return service({
  //   url: `/shipDict`,
  //   method: 'get',
  //   params,
  // });
}
export function postDelete(params: any) {
  // return service3({
  //   url: `/shipDict/${params}`,
  //   method: 'delete',
  //   // params,
  // });
  return service2.delete(`/shipDict/${params}`)
  // return service({
  //   url: `/shipDict/${params}`,
  //   method: 'delete',
  // })
}
//登录
export function sglogin(params: any) {
  return service2.post('/shipDict', params)
}

//demo
export function demo(params: any) {
  return service2.post('/api/device/alive_list', params)
}

// 使用方法// 登录
//  Login ({ commit }, userInfo:object) {
//     return new Promise((resolve, reject) => {
//       login(userInfo).then(res => {
//         const tokenStr = res.data.data.tokenHead + res.data.data.token;
//         sessionStorage.setItem('yunToken',tokenStr);
//         commit('SET_TOKEN', tokenStr)
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },
//    store.dispatch('Login',{username,password}).then(res=>{
//        router.push("/");
//    }).catch(err=>{
//        message.error(err);
//    })
