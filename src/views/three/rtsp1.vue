
<template>
  <video-js
    ref="videoPlayer"
    class="video-js"
    :sources="sources"
    :options="playerOptions"
    @ready="onReady"
  ></video-js>
</template>


<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default {
  data() {
    return {
      player: null,
      sources: [
        {
          // 这里填写转换后的视频流地址，比如HLS或WebRTC流地址
          src: 'rtsp://admin:Sangoai@0201@112.47.143.54:554/Streaming/Channels/101', // 对于HLS
          type: 'application/x-mpegURL',
        },
        // 如果您的流是DASH，您需要添加相应的源和类型
        // {
        //   src: 'http://your-server.com/stream/manifest.mpd',
        //   type: 'application/dash+xml'
        // }
      ],
      playerOptions: {
        // 这里可以设置video.js的各种选项
        autoplay: true,
        muted: false,
        controls: true,
      },
    };
  },
  methods: {
    onReady() {
      this.player = videojs(this.$refs.videoPlayer);
    },
  },
  beforeDestroy() {},
  mounted() {
    this.onReady();

    // if (this.player) {
    //   this.player.dispose();
    // }
  },
};
</script>

<style>
.video-js {
  width: 640px; /* 或者您想要的任何宽度 */
  height: 360px; /* 或者您想要的任何高度 */
}
</style>