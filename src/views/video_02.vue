<template>
  <div class="wrap">
    <!-- <video
      class="video"
      muted
      autoplay
      preload="auto"
      controls="controls"
      ref="player"
      width="500px"
      height="250px"
      id="myFlvVideo"
    ></video> -->
    <!-- <video
      class="video"
      muted
      autoplay
      preload="auto"
      controls="controls"
      src="http://192.168.111.136:8888/stream/h1/"
      width="500px"
      height="250px"
    ></video> -->
    <iframe src="http://192.168.111.136:8888/live/123/" style="width: 80%; height: 600px"></iframe>
  </div>
</template>

<script>
import flvjs from 'flv.js'; // 引入flvjs
export default {
  data() {
    return {
      player: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.createVideo();
    });
  },
  methods: {
    destoryVideo() {
      this.player.pause();
      this.player.unload();
      this.player.detachMediaElement();
      this.player.destroy();
      this.player = null;
    },
    createVideo() {
      // 如果浏览器支持flvjs，则执行相应的程序
      // console.log(flvjs.isSupported(), '======00');
      if (flvjs.isSupported()) {
        var videoElement = document.getElementById('myFlvVideo');
        // 准备监控设备流地址
        const url = 'http://192.168.111.136:8888/stream/h1/';
        // 创建一个flvjs实例
        // 下面的ws://localhost:8888换成你搭建的websocket服务地址，后面加上设备流地址
        this.player = flvjs.createPlayer(
          {
            type: 'flv',
            isLive: true,
            hasAudio: false,
            url: 'ws://127.0.0.1:8812/' + url,
            // hasAudio: false,
          },
          {
            deferLoadAfterSourceOpen: false,
            cors: true, // 是否跨域
            enableWorker: true, // 是否多线程工作
            enableStashBuffer: false, // 是否启用缓存
            stashInitialSize: 128, // 缓存大小(kb)  默认384kb
            autoCleanupSourceBuffer: true, // 是否自动清理缓存
          },
        );
        if (this.$refs.player) {
          // this.player.attachMediaElement(this.$refs.player);
          this.player.attachMediaElement(this.$refs.player);
          this.player.load();
          this.player.play();
          // 报错重连
          this.player.on(flvjs.Events.ERROR, (errType, errDetail) => {
            console.log(errType, '====errtype');
            console.log(errDetail, '====errdetail');
            if (this.player) {
              this.destoryVideo();
              this.createVideo();
            }
          });
          // let controller = this.player._transmuxer._controller;
          // let wsLoader = controller._ioctl._loader;
          // var oldWsOnCompleteFunc = wsLoader._onComplete;
          // wsLoader._onComplete = function () {
          //   if (!controller._remuxer) {
          //     controller._remuxer = {
          //       flushStashedSamples: function () {
          //         // _this.loadingVisiable = false;
          //         console.log('flushStashedSamples');
          //       },
          //     };
          //   }
          //   oldWsOnCompleteFunc();
          // };
        } else {
          console.log(this.$refs.player, '=====未找到元素');
        }
        // console.log(this.$refs.player, '======元素');
        // this.player.attachMediaElement(this.$refs.player);
        // console.log(this.player, '=========111');
        this.player.on('error', (e) => {
          console.log(e, '========2222');
        });
        // 将实例挂载到video元素上面
        // try {
        //   // 开始运行加载 只要流地址正常 就可以在h5页面中播放出画面了
        //   this.player.load();
        //   this.player.play();
        //   //********* */
        //   let controller = this.player._transmuxer._controller;
        //   let wsLoader = controller._ioctl._loader;
        //   var oldWsOnCompleteFunc = wsLoader._onComplete;
        //   wsLoader._onComplete = function () {
        //     if (!controller._remuxer) {
        //       controller._remuxer = {
        //         flushStashedSamples: function () {
        //           // _this.loadingVisiable = false;
        //           console.log('flushStashedSamples');
        //         },
        //       };
        //     }
        //     oldWsOnCompleteFunc();
        //   };
        // } catch (error) {
        //   console.log(11111, '===catch');
        //   console.log(error, '==============222');
        // }
      }
    },
  },

  beforeDestroy() {
    this.destoryVideo();
    // 页面销毁前 关闭flvjs
    // this.player.destroy();
  },
};
</script>

<style lang="scss" scoped>
body,
center {
  padding: 0;
  margin: 0;
}

.v-container {
  width: 640px;
  height: 360px;
  border: solid 1px red;
}

video {
  width: 100%;
  height: 100%;
}
</style>

