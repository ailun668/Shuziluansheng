<template>
  <div class="flex sgchannels">
    <div class="toobar">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable class="Channels">
      </el-input>

      <el-scrollbar :style="scrollbarheight - 200">
        <el-tree class="filter-tree" :data="data" :props="defaultProps" default-expand-all
          :filter-node-method="filterNode" ref="tree" indent="4" @node-click="handleNodeClick">
        </el-tree></el-scrollbar>
    </div>
    <div class="churlbox" :style="wh">
      <h3>视频信息： {{ urlparmts }}</h3>
      <iframe :src="url" frameborder="0" style="height: 98vh; width: 80%"></iframe>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
let url = ref('http://192.168.110.192:8888/live/test2/');
let tree = ref();
let filterText = ref('');
let scrollbarheight = ref('');
let chanList = [
  'http://127.0.0.1:8888/Channels/101',
  'http://127.0.0.1:8888/Channels/102',

  "http://192.168.110.201:8888/Channels/101",
  "http://192.168.110.201:8888/Channels/102",
  // 'http://127.0.0.1:8888/Channels/103',
  // 'http://127.0.0.1:8888/Channels/104',
  // 'http://127.0.0.1:8888/Channels/105',
  // 'http://127.0.0.1:8888/Channels/106',
  // 'http://127.0.0.1:8888/Channels/107',
  // 'rtsp://admin:kexun1999@192.168.0.64:554/Streaming/Channels/801',
  // "rtsp://admin:kexun1999@192.168.0.64:554/Streaming/Channels/901",
  // "rtsp://admin:kexun1999@192.168.0.64:554/Streaming/Channels/1001",
  // "rtsp://admin:kexun1999@192.168.0.64:554/Streaming/Channels/1101",
  // "rtsp://admin:kexun1999@192.168.0.64:554/Streaming/Channels/1201",
  // "rtsp://admin:kexun1999@192.168.0.64:554/Streaming/Channels/1301",
  // "rtsp://admin:kexun1999@192.168.0.64:554/Streaming/Channels/1401",
  // "rtsp://admin:kexun1999@192.168.0.64:554/Streaming/Channels/1501",
  // "rtsp://admin:kexun1999@192.168.0.64:554/Streaming/Channels/1601",
  // "rtsp://admin:kexun1999@192.168.0.64:554/Streaming/Channels/1701",
  // "rtsp://admin:kexun1999@192.168.0.64:554/Streaming/Channels/1801",
  // "rtsp://admin:kexun1999@192.168.0.64:554/Streaming/Channels/1901",
  // "rtsp://admin:kexun1999@192.168.0.64:554/Streaming/Channels/2001",
  // "rtsp://admin:kexun1999@192.168.0.64:554/Streaming/Channels/2101",
  // "rtsp://admin:kexun1999@192.168.0.64:554/Streaming/Channels/2201",
  // "rtsp://admin:kexun1999@192.168.0.64:554/Streaming/Channels/1201",
  // "rtsp://admin:kexun1999@192.168.0.64:554/Streaming/Channels/1301",
  // "rtsp://admin:kexun1999@192.168.0.64:554/Streaming/Channels/1401",
  // "rtsp://admin:kexun1999@192.168.0.64:554/Streaming/Channels/1501",
  // "rtsp://admin:kexun1999@192.168.0.64:554/Streaming/Channels/1601",
  // "rtsp://admin:kexun1999@192.168.0.64:554/Streaming/Channels/1701",
  // "rtsp://admin:kexun1999@192.168.0.64:554/Streaming/Channels/1801",
  // "rtsp://admin:kexun1999@192.168.0.64:554/Streaming/Channels/1901",
  // "rtsp://admin:kexun1999@192.168.0.64:554/Streaming/Channels/2001",
  // "rtsp://admin:kexun1999@192.168.0.64:554/Streaming/Channels/2101",
  // "rtsp://admin:kexun1999@192.168.0.64:554/Streaming/Channels/2201",
];

let data = ref([
  {
    id: 1,
    label: 'JANA 503 Channels',
    children: [],
  },
]);
let urlparmts = reactive({});
const getLastChannelNumber = (rtspUrl) => {
  const match = rtspUrl.match(/Channels\/(\d+)$/);
  return match ? match[1] : null;
};
chanList.forEach((item, index) => {
  data.value[0].children.push({
    id: index,
    label: getLastChannelNumber(item),
    url: item,
  });
});
let defaultProps = ref({
  children: 'children',
  label: 'label',
});
const handleNodeClick = (data) => {
  url.value = data.url;
  urlparmts = data;
};
const filterNode = (value, data) => {
  if (!value) return true;
  return data.label.includes(value);
};
watch(
  () => filterText.value,
  (newval) => {
    if (tree.value) {
      tree.value.filter(newval);
    }
  },
);

const scrollbarheightfun = () => {
  const body = document.body;
  const html = document.documentElement;
  const height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight,
  );
  scrollbarheight.value = height - 120;
};
const wh = computed(() => {
  return {
    height: scrollbarheight.value,
    width: 100 + '%',
  };
});
onMounted(() => {
  scrollbarheightfun();
  window.onresize = () => {
    scrollbarheightfun();
  };
});
</script>
<style lang="scss" coped>
.filter-tree {
  padding-bottom: 10px;
}

.flex {
 
  display: flex;

  .Channels {
    margin: 6px 0;
  }

  .toobar {
    width: 15%;
    margin-right: 8px;
  }

  .churlbox {
    flex: 1;
    width: 100%;
    height: 100%;
  }
}

.el-scrollbar__thumb {
  background: #257baf !important;
}

.el-scrollbar__bar.is-horizontal {
  height: 12px !important;
}

.el-scrollbar__bar.is-vertical {
  width: 6px !important;
}
</style>
