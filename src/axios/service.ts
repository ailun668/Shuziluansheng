//proxy axios 请求实例封装
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import { onMounted } from 'vue'
import baseURL from './serviceUrl.js'
let basurl = baseURL.baseURL
import { assembly } from '../utils/sangoai.js'
import defaultapp from '../utils/sangoai.js'
import { userStore } from '../store/useUserStoredemo.js'
let userStoredaa = userStore()

// defaultapp.methods.alert33();
// console.log(process.env.VUE_APP_API_BASE_PROXY, '================================');
// console.log(process.env, '++++++++++++++++++++++++');
//返回axios实例 AxiosInstance
console.log(basurl, '==========basurl')
const http = axios.create({
  // baseURL: `http://localhost:3000`,
  // baseURL:basurl,
  // baseURL: '/API',
  // baseURL: 'http://localhost:3000/',
  //BASE_URL:process.env.VUE_APP_URL,
  // baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
  // BASE_URL:process.env.VUE_APP_URL,
  // baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
  timeout: 4000, // 请求超时时间
  // // 解决ajax链接数据无法带token的问题
  // withCredentials: true, // 如果用的JSONP，可以配置此参数带上cookie凭证，如果是代理和CORS不用设置
  // headers: {
  //   post: {
  //     "Content-Type": "application/json; charset=utf-8",
  //   },
  //   get: {
  //     "Content-Type": "application/json; charset=utf-8",
  //   },
  // },
})
//请求拦截
//config: AxiosRequestConfig 数据类型
http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers = {
      imo: '10086',
      Authorization: `Bearer  ${userStoredaa.stutent}`,
      // Token: 'Token',
      // 'Cache-Control': 'no-cache', //请求缓存或者不缓存,
      // Authorization: localStorage.getItem('language') == 'zh' ? 'zhongwen' : 'yingwen',

      // dataType: "json",
      //'Content-Type':'application/x-www-form-urlencoded'
    }
    return config
  },
  (error) => {
    Promise.resolve(error)
  },
)
//响应返回拦截
http.interceptors.response.use(
  (response) => {
    console.log(response, '=======>>>>')
    // 这个状态码是和后端约定的
    if (response.status == 200) {
      return Promise.resolve(response.data)
    } else {
      console.log('输出数据错误', response)
      return Promise.reject(response)
    }
  },
  (error) => {
    let text = ''
    let err = JSON.parse(JSON.stringify(error))

    if (err.name == 'AxiosError') {
      text = '请检查网络再重新连接'
      // text = err.message;
    } else if (error.response.status) {
      // 请求失败
      // if (error && error.response) {
      switch (error.response.status) {
        case 400:
          // 对400错误您的处理
          text = '错误请求'
          break
        case 401:
          text = `未授权，请登录`
          break
        case 403:
          text = '拒绝访问'
          break
        case 404:
          console.log('请求错误,未找到该资源')
          text = `请求地址出错: ${error}`
          break
        case 408:
          text = `请求超时`
          break
        case 500:
          text = '服务器端出错'
          break
        case 501:
          text = '服务未实现'
          break

        case 502:
          text = '网关错误'
          break
        case 503:
          text = '服务不可用'
          break
        case 504:
          text = '网关超时'
          break
        case 505:
          text = 'HTTP版本不受支持'
          break
        default:
          // 如果以上都不是的处理
          text = 'default 没法处理了'
          break
        /* return Promise.reject(); */
      }
      return Promise.resolve(text)
    } else {
      console.log(3333)
      text = '连接服务器失败,请退出重试!'
    }
    let calltxt = {
      data: text,
      code: error.response.status,
    }
    //window.location.href = '/';
    //Vue.prototype.callgoto("/");
    //Vue.prototype.router.push("/");
    //Vue.prototype.$router.replace("/index");
    // router.push({
    //   path: "/"
    // })

    //Vue.prototype.router.replace("/");
    //this.$router.push('/')
    //this.$router.replace('/');
    //三个提示都是可以的
    // Vue.prototype.commentjs.error(text);
    // wzp.warning(calltxt);
    console.log('接口请求结果>>>>>>>>>', calltxt)

    // Vue.prototype.$toast2(`<b style="color:red">接口请求报错</b>`, 3000);
    return Promise.resolve(calltxt) // 错误放回
    //错误提醒
    // return Promise.reject(calltxt);
  },
)
export default http
