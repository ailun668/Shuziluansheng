export default function baseURL() {
  if (window.SANGO_REQUEST_BASE_URL) {
    return window.SANGO_REQUEST_BASE_URL
  }
  return window.SANGO_AMS_URL
}

// console.log(BASE_URL, '============PPPPPPPPPPP')
// console.log(env, '=======路由地址')

// let env = process.env.NODE_ENV
// const config = {
//   development: {
//     // url: '/API', // 开发环境URL,
//     url: 'http://192.168.110.243:9990', // 生产环境URL,
//   },
//   production: {
//     url: 'http://192.168.110.243:9990', // 生产环境URL,
//   },
//   test: {
//     url: 'http://192.168.110.243:9990', // 测试环境URL
//   },
// }

// export default {
//   url: config[env].url,
// }
