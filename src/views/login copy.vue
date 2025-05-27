<template>
  <div class="aaa">
    <RouterLink></RouterLink>
    <el-row>
      <el-col :span="8">
        <p><b>外部全局数据</b> ：{{ ceshi }}</p>
        <el-button type="primary" @click="layer">点击提示</el-button>
        <el-button type="primary" @click="toastopen">toastopen 提示</el-button>

        <el-button type="primary" @click="Login"> 路由跳转 </el-button>

        <el-button type="primary" @click="message"> 外部导入一个提示 </el-button>

        <el-button type="success" @click="$router.push('/home')">点击跳转</el-button>
        <div>
          <el-button type="primary" @click="ajax_post"> 接口测试 GET 1 </el-button>
          <el-button type="primary" @click="getDatay"> 接口2 GET 2</el-button>
          <el-button type="primary" @click="POSTData"> 接口 POST 3</el-button>
          <el-button type="primary" @click="POST2"> POST 4 </el-button>
        </div>

        <DIV style="border: 2px solid red; padding: 10px">
          <el-button type="primary" @click="comfun">获取子组件</el-button>
          <p>showval:{{ showval }} ====== datavalue:{{ datavalue }}</p>
          <button @click="getdatavalue">获取数据</button>
          <vue3APIVue ref="vue3apivue">
            <div>{{ datavalue }}</div>
          </vue3APIVue>
        </DIV>
      </el-col>

      <el-col :span="16">
        <p>全局数据: {{ assembly }}</p>
        <p>{{ QuanjuTtile }}</p>
        <el-button type="primary" @click="Routerfun('/')">二级路由</el-button>
        <el-button type="primary" @click="Routerfun('loginChildren')"> 二级路由Children </el-button>
        <el-button type="primary" @click="sgrouterlink('/amslogin')">SANGO 登录</el-button>
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
console.log(window.ipConfig.baseUrl, '==============测试数据开始 ')
import RouterLink from '../components/router.vue'
import { ref } from 'vue'
import { showToast, showSuccessToast, showFailToast } from 'vant'
import { getAJAX, getData, postAJAX, postdaa } from '@/axios/login.ts'
import vue3APIVue from './vue3API.vue'
import { useMouse } from './vue3API.js'
const { x, y, datavalue } = useMouse()
import { assembly } from '@/utils/sangoai'
import { useRouter } from 'vue-router'
import { Loading, Toast } from '@/components/sui/index.js'
const router = useRouter()

console.log(import.meta.env, '======环境变量11')
console.log(process.env.NODE_ENV, '======环境变量22')

let vue3apivue = ref()
const ceshi = assembly
const username = ref('')
const password = ref('')
const show = ref(false)
const tagid = ref(null)
const value = ref('选项5')
let showval = ''

const layer = () => {
  Loading.show()

  setTimeout(() => {
    Loading.dismiss()
  }, 3000)
}

const toastopen = () => {
  Toast.success({
    message: '成功提示',
    position: 'center',
    duration: 3000,
  })
}

const toastopen2 = () => {
  Toast.fail({
    message: '失败提示',
    position: 'center',
    duration: 3000,
  })
}

const toastopen3 = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  })
}

function getdatavalue() {
  console.log(datavalue.value, '=======>>>>')
}

function comfun() {
  console.log(vue3apivue.value.checked, '=====MMM')
}

const Routerfun = (parmts) => {
  router.push(parmts)
  // router.push({
  //   name: 'Home',
  // });
}

const Login = () => {
  router.push({
    name: 'Home',
  })
}

const loginw = async () => {
  return new Promise((resolve, reject) => {
    resolve('测试一个成功的数据')
  })
}

const setTargetIndex = (parmts) => {
  console.log(parmts, '==================')
}

const message = () => {
  assembly.alert3()
}

const showPopup = () => {
  show.value = true
}

const ajax_post = () => {
  let parmts = {
    name: '11',
    phone: '222',
    email: '22',
  }
  getAJAX(parmts)
    .then((res) => {
      if (res.code == 0) {
        showToast('12121212')
      }
    })
    .catch((err) => {
      console.log(err, '=======1111')
      showSuccessToast('Error')
    })
    .finally((err) => {
      console.log(err, '===========finally')
    })
}

const getDatay = () => {
  getData({}).then((res) => {
    tagid.value = res[res.length - 1]
    console.log(tagid.value, '=============UUUU')
  })
}

const POSTData = () => {
  postAJAX({
    username: 'SangoAdmin',
    password: 'SangoAdmin',
    code: '1222',
  }).then((res) => {
    console.log(res, '=============1111')
  })
}

const POST2 = () => {
  postdaa({
    username: 'SangoAdmin',
    password: 'SangoAdmin',
    code: '1222',
  }).then((res) => {
    console.log(res, '=============2222')
  })
}
</script>
<style scoped lang="scss">
.sangoai-comment {
  text-align: center;
  padding: 20px 0px;

  img {
    width: 150px;
    margin: 0 auto;
  }
}
</style>
