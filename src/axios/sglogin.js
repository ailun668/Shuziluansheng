//接口请求方法封装

import service2 from '@/axios/service2.js'

import baseURL from '@/utils/serviceUrl'
let baseurl = baseURL.baseURL
console.log(baseurl, '======KKKK')

export default class sgaxios {
  static sglogin = (params) => {
    return service2.post('/shipDict', params)
  }
}

// let { baseURL } = baseURL;

//get 请求
// get 用 parmts
// export function getAJAX(data: any) {
//   return new Promise((resolve, reject) => {
//     service({
//       url: `/users`,
//       method: 'post',
//       data: data,
//     }).then((res) => {
//       resolve(res)
//     })
//   })
// }
// export function getData(params: any) {
//   return service({
//     url: `/users`,
//     method: 'get',
//   })
// }
// export function postdaa(data: any) {
//   return service({
//     url: `/shipDict`,
//     method: 'get',
//     data,
//   })
// }

// //  return service({
// //    url: '/v1/offshore/userLogout',
// //    params,
// //    method: 'get',
// //  });
// //POST 请求
// export function postAJAX(params: any) {
//   return service2.get('shipDict', params)
//   // return service({
//   //   url: `/shipDict`,
//   //   method: 'get',
//   //   params,
//   // });
// }
// export function postDelete(params: any) {
//   // return service3({
//   //   url: `/shipDict/${params}`,
//   //   method: 'delete',
//   //   // params,
//   // });
//   return service2.delete(`/shipDict/${params}`)
//   // return service({
//   //   url: `/shipDict/${params}`,
//   //   method: 'delete',
//   // })
// }
// //登录
// export function sglogin(params: any) {
//   return service2.post('/shipDict', params)
// }
