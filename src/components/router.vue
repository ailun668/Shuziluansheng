<template>
  <div class="routercom">
    <div style="border: 3px solid blue; margin-bottom: 10px">
      <el-row>
        <el-col :span="12"> <img :src="getAssetsFile('logo.png')" v-bind="addclass" /></el-col>
        <el-col :span="12">
          <el-tag type="success" @click="checklang">点击翻译</el-tag>
          {{ $t('Login') }}
          {{ $t('GoLogin') }}
          <el-tag type="primary" @click="ElMessagefun">点击全局1</el-tag>
          <el-tag @click="alert4()">全局事件2</el-tag>
          <el-tag type="primary" @click="alert33"> 点击全局3</el-tag>

          <p>全局数据=:{{ ceshishuju }} <input type="text" v-model="ceshishuju" /></p>

          全局变量 =={{ Visual }}
          <input v-model="Visual" placeholder="请输入内容" />
          <br />
          <input type="text" v-model="assembly['key']" />
          <br />
          测试全局数据 ceshi: {{ ceshi }}
          <input type="text" v-model="ceshi" />
          <br />
        </el-col>
      </el-row>
    </div>
    <el-tag @click="router.push(`/demo`)">进入系统</el-tag>
    <!-- <el-tag v-for="item in parmts.routes" :key="item.path" @click="router.push(item.path)"
      :type="activeRoute === item.path ? 'success' : ''">
      {{ item.meta.title }}
    </el-tag> -->
  </div>
  <el-input v-model="Visual" placeholder="请输入内容"></el-input>
</template>
<script setup name="Router2">
import { getAssetsFile, List } from '@/utils/util.js'
import { reactive, ref, onMounted, getCurrentInstance, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
let language = ref()
const { proxy } = getCurrentInstance()
const router = useRouter()
let {
  options: { routes },
} = router
const addclass = reactive({
  class: 'imgwidth',
})
//定义显示全局数据
const ceshishuju = ref(proxy.assembly['key'])

//点击翻译
const checklang = () => {
  // proxy.$i18n.locale = proxy.$i18n.locale == "zh" ? "en" : "zh";
  // localStorage.setItem("lang", proxy.$i18n.locale);
  proxy.checklangfun()
  // proxy.alert33();
}
// 点击全局事件  *******
const alert4 = () => {
  proxy.alert33()
}
const ElMessagefun = () => {
  proxy.ElMessage()
}
//点击全局en

const activeRoute = ref('')
router.afterEach((to) => {
  activeRoute.value = to.path
})
const parmts = reactive({
  routes: undefined,
  path: undefined,
})
onMounted(() => {
  //设置默认语音
  language.value = localStorage.getItem('lang') || 'en'
  proxy.$i18n.locale = language.value
  localStorage.setItem('lang', language.value)
  parmts.routes = router.options.routes
})
</script>
<style lang="scss" scoped>
// .imgwidth {
//   width: 80%;
// }
.routercom {
  .el-tag--light {
    cursor: pointer;
    margin: 0 2px;
  }
}
</style>
