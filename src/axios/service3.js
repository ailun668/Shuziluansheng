import axios from 'axios';

import { ElMessage, ElMessageBox, ElNotification, ElLoading } from 'element-plus'

import store from '@/store'


const service = axios.create({
  baseURL: "/API",
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*', // 设置允许跨域请求的来源，可以是具体的域名或通配符 *
    'Content-Type': 'application/json', // 设置请求的数据格式为 JSON
  },
})

service.interceptors.request.use((config) => {
  // 在这里设置请求头
  let token = localStorage.getItem('LoginSetToken')
  if (token) {
    config.headers.token = token
    // config.headers['Access-Control-Allow-Origin'] =  '*'
  }
  return config
}, (error) => {
  return Promise.reject(error)
}
)

service.interceptors.response.use((response) => {
  // 响应返回
  if (response.status == '200') {
    if (response.data.code == '200') {
      return response.data
    } else if (response.data.code == '100007') {
      // token不对或者过期跳转到登录页面
      ElMessage.error(response.data.msg)
      window.location.href = '/'
    } else {
      ElMessage.error(response.data.msg)
      return response.data
    }
  } else {
    ElMessage.error(response.data.msg)
  }
}, (error) => {
  return error
}
)
export default service
