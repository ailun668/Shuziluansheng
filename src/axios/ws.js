/**
 * mqtt配置
 * ws: mqtt请求路径
 */
// 优先使用config.js文件，为空时使用环境变量中的地址
// let ws = window.SANGO_WEB_SOCKET_URL||import.meta.env.VITE_WEB_SOCKET_URL||'';

// let href = window.location.href;
// let wsURLHeader = href.includes('https')?'wss://':'ws://';
// class Ws {
//     // 客户端
//     client = void 0;
//     constructor(clientId) {
//       console.log(clientId,"=============PPPP");
//         this.client = mqtt.connect(`ws://192.168.110.244:8083/mqtt`, {
//             clientId: clientId,
//             // username: "",
//             // password: "",
//         });
//     }
const ws = `192.168.110.244:8083`
// 192.168.110.244:8083/mqtt
class Ws {
  // 客户端
  client = void 0
  constructor(clientId) {
    console.log(clientId,"===========9999");
    this.client = mqtt.connect(`ws://${ws}/mqtt`, {
      clientId,
      username: '',
      password: '',
    })
  }
  // 订阅主题 创建连接
  connect = (topic) => {
    return new Promise((resolve) => {
      this.client.on('connect', (res) => {
        this.client.subscribe(topic, { qos: 0 })
        resolve(true)
      })
    })
  }
  // 处理错误
  error = (err) => {
    return new Promise((resolve) => {
      this.client.on('error', (err) => {
        console.log(err, '============222')
        this.client.end()
        resolve(true)
      })
    })
  }
  // 重连
  reconnect = (err) => {
    console.log(err, '=========KKKK')
    return new Promise((resolve) => {
      this.client.on('reconnect', (err) => {
        console.log(err, '============333')
        this.client.end()
        resolve(111)
      })
    })
  }
  // 接收消息
  message = (func) => {
    this.client.on('message', (topic, message, packet) => {
      func({ topic, message, packet })
    })
  }
  // 断开连接
  disconnect = (err) => {
    if (this.client.connected) {
      try {
        this.client.end(false, () => {
          console.log('disconnected successfully')
        })
      } catch (error) {
        console.log('disconnect error:', error)
      }
    }
  }
}
export default Ws
