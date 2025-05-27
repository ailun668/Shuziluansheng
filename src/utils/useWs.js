import Ws from '@/axios/ws.js'
import { isFunction, isArray, isString } from 'lodash'
import { onUnmounted, ref } from 'vue'
/**
 * WebSocket管理
 * @param {Object} options - 初始化选项
 * @param {string} options.clientId - 客户端ID
 * @param {string} options.topic - 默认订阅主题
 * @param {number} options.qos - QoS等级（默认1）
 * @param {Function} callback - 收到消息时的回调
 */
export default function useWs(
  options = {
    clientId: '',
    topic: '',
    qos: 1,
  },
  callback,
) {
  let ws = ref(null) // WebSocket实例
  const { clientId, topic: defaultTopic, qos } = options
  const isFun = isFunction(callback)
  let messageQueue = [] // 消息队列
  let isProcessing = false
  let currentTopic = defaultTopic // 当前订阅的主题

  // 处理单条消息
  const dealMessage = async (msg) => {
    try {
      const data = JSON.parse(msg.message.toString())
      if (isFun) {
        if (isArray(currentTopic) && currentTopic.includes(msg.topic)) {
          await callback(data, msg.topic)
          return Promise.resolve()
        }
        if (isString(currentTopic) && msg.topic === currentTopic) {
          await callback(data, msg.topic)
          return Promise.resolve()
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  // 消息队列处理
  const processQueue = async () => {
    if (isProcessing) return
    isProcessing = true
    while (messageQueue.length > 0) {
      const msg = messageQueue.shift() // 从队列中取出消息
      if (messageQueue.length === 0) {
        isProcessing = false
      }
      try {
        await dealMessage(msg) // 异步处理
      } catch (e) {
        console.error('Error processing message:', e)
      }
    }
  }
  // 提取消息处理函数
  const handleMessage = (res) => {
    messageQueue.push(res) // 将消息添加到队列
    processQueue() // 触发队列处理
  }
  // 连接WebSocket并订阅初始主题
  const connect = () => {
    ws.value = new Ws(clientId)
    ws.value.connect(currentTopic, qos).then(() => {
      // 订阅成功后，绑定消息处理函数
      ws.value?.message(handleMessage)
    })
  }
  connect()

  // 重新连接
  const reconnect = async () => {
    if (!ws.value) return
    try {
      await ws.value.disconnect()
    } finally {
      ws.value = null
      connect()
    }
  }

  // 断开连接
  const disconnect = () => {
    if (ws.value) {
      ws.value.disconnect()
      ws.value = null
    }
  }

  // 动态切换主题
  const changeTopic = async (topic) => {
    if (!(!ws.value || topic === currentTopic)) {
      try {
        // 取消订阅当前主题
        await ws.value.unsubscribe(currentTopic)
        messageQueue = []
        isProcessing = false
        // 更新主题并订阅新主题
        currentTopic = topic
        await ws.value.subscribe(currentTopic, qos)
        return Promise.resolve()
      } catch (e) {
        console.error('Error changing topic:', e)
      }
    }
  }

  onUnmounted(() => {
    disconnect()
  })
  return {
    ws,
    reconnect,
    disconnect,
    changeTopic,
  }
}

// 多设备ws推送50次后重新请求http保持心跳   ws60s会超时  1s一次
export const multiWsMaxCount = 50
