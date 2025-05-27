const ws = `192.168.110.236:8083`;
class Ws {
    // 客户端
    client = void 0;
    constructor(clientId) {
        this.client = mqtt.connect(`ws://${ws}/mqtt`, {
            clientId,
            username: '',
            password: ''
        });
    }
    // 订阅主题 创建连接
    connect = (topic) => {
        return new Promise((resolve) => {
            this.client.on('connect', res => {
                this.client.subscribe(topic, { qos: 0 });
                resolve(true);
            });

        });

    };
    // 处理错误
    error = (err) => {
        return new Promise((resolve) => {
            this.client.on('error', err => {
                this.client.end();
                resolve(true);
            });
        });

    };
    // 重连
    reconnect = (err) => {
        return new Promise((resolve) => {
            this.client.on('reconnect', err => {
                this.client.end();
                resolve(true);
            });
        })
    };
    // 接收消息
    message = (func) => {
        this.client.on('message', (topic, message, packet) => {
            func({ topic, message, packet });
        });
    };
    // 断开连接
    disconnect = (err) => {
        if (this.client.connected) {
            try {
                this.client.end(false, () => {
                    console.log("disconnected successfully");
                });
            } catch (error) {
                console.log("disconnect error:", error);
            }
        }
    }
}

export default Ws;
