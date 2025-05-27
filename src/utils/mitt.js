import mitt from 'mitt'
const $bus = mitt()
export default $bus

// mitt的事件名 统一管理避免修改遗漏
export const mittEventName = {
    HANDLERALLFUN: 'handlerallfun',
    SENDDEVICECODE: 'senddevicecode',
    // 后端ws推送 更新相关api
    DEVICE_DUTY_API: 'DEVICE_DUTY_API',
    //  PMS 点击切换跳转
    MONITOR_ROUTER_PMS: 'MONITOR_ROUTER_PMS',
    // 同步UTC时间
    CONFIG_LODUTC: 'CONFIG_LODUTC',
    // 开始请求后端接口
    REQUEST_BEGIN: 'REQUEST_BEGIN',
    // 通知页面刷新
    PAGE_RELOAD: 'PAGE_RELOAD',
}

