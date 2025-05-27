import axios from 'axios'
import { Toast } from '@/components/sui/index'
import { includes } from 'lodash'
import BASE_URL from './serviceUrl'
let BASEURL = BASE_URL()
console.log(BASEURL, '============333')
let sourceCancel = void 0
export default class http {
  static pendHttpList = []
  static http(url, params, method, headers) {
    const CancelToken = axios.CancelToken
    sourceCancel && sourceCancel({ code: 888 })
    const instance = axios.create({
      timeout: 20000,
      // baseURL: '/API',
      // baseURL: params?.data?.client_id ? authBaseURL : weatherBaseURL,
    })

    const match = !params.data?.ignoreRepeatRquest && this.pendHttpList?.find((item) => item.method === method && item.url === url)

    const data = {
      url: BASEURL + url,
      // url,
      responseType: 'json',
      method,
      withCredentials: false,
      headers: { ...headers },
      cancelToken:
        match &&
        new CancelToken((cancel) => {
          sourceCancel = cancel
        }),
    }
    Object.assign(data, params)
    !match && this.pendHttpList.push({ url, method })
    return new Promise((resolve, reject) => {
      instance(data)
        .then(async (res) => {
          resolve(res.data)
        })
        .catch((error) => {
          console.log(error)
          reject(error)
          if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) return Toast.error({ message: '请求超时~！' })
          if (error.message && error.message.code === 888) return console.error(`${url}已被拦截器关闭`)

          if (includes(error?.toString(), '9999999')) return
          Toast.error({ message: '网络不给力！' })
        })
        .finally(() => {
          const index = this.pendHttpList.findIndex((item) => item.url === url)
          this.pendHttpList.splice(index, 1)
        })
    })
  }

  static post(url, data, headers = {}) {
    return this.http(url, { data }, 'post', headers)
  }

  static get(url, params, headers = {}) {
    return this.http(url, { params }, 'get', headers)
  }

  static put(url, data) {
    return this.http(url, { data }, 'put')
  }

  static delete(url, params) {
    return this.http(url, { params }, 'delete')
  }
}
