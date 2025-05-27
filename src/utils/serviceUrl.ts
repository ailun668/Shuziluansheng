const urls = {
  development: '/users', // 开发环境URL
  test: 'http://localhost:3000', // 测试环境URL
  production: 'http://localhost:3000', // 生产环境URL
}
const env = process.env.NODE_ENV
console.log(env, '============ENV')
const config = {
  development: {
    baseURL: '/API', // 开发环境URL,
    // baseURL: 'http://localhost:3000', // 生产环境URL,
  },
  production: {
    baseURL: 'http://localhost:3000', // 生产环境URL,
  },
  test: {
    baseURL: 'http://localhost:3000', // 测试环境URL
  },
  // production: 'http://localhost:3000', // 生产环境URL,
  // test: 'http://localhost:3000', // 测试环境URL
}

export default {
  baseURL: config[env].baseURL,
}

// const getEnvironment = (): string => {
//   if (process.env.NODE_ENV === 'production') {
//     return 'production';
//   } else if (process.env.NODE_ENV === 'development') {
//     return 'development';
//   } else {
//     return 'test';
//   }
// };

// export let serviceUrl = urls[getEnvironment()];
