<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="12">
        <h1>Pinia :{{ namepina }}</h1>
        <el-button type="primary" @click="testCount()">Pinia 事件</el-button>
        <el-button type="primary" @click="sgtestStore.alerttext('提示', 'error')">全局提示</el-button>
        <el-button type="primary" @click="sgrouterlink('/home')">跳转HOME</el-button>
        <el-button type="primary" @click="sgrouterlink('/')">全局登录</el-button>
        <el-button type="primary" @click="ElMessage('成功', 'success')"> 成功 {{ QuanjuTtile }} </el-button>

        <el-button type="primary" @click="axiosfun()"> 接口请求</el-button>
      </el-col>
      <el-col :span="12">
        <div style="text-align: left; background: #fff; display: flex; flex-wrap: wrap; gap: 20px">
          <Echartsdemo :params="paramsdata" max="1000" v-for="(item, index) in 3" :key="index" style="height: 300px; width: 30%"></Echartsdemo>
        </div>
        <!-- <Menu /> -->
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState, mapActions } from 'pinia'
import Echartsdemo from './echartscom/index.vue'
import Menu from './Menu.vue'
import { testStore } from '@/store/testStore.js'
import { demo } from '@/axios/login.ts'
export default {
  name: 'FuelChart',
  components: {
    Echartsdemo,
    Menu,
  },

  data() {
    return {
      paramsdata: { name: '加油速度', unit: 'm³/hrs', value: '20.00', max: 1000, langunt: 'FuelingRate' },
      paramts: {
        name: '测试数据',
        age: 1222,
      },
    }
  },
  mounted() {
    setInterval(() => {
      this.paramsdata.value = Math.floor(Math.random() * 1000)
    }, 3000)
  },
  computed: {
    ...mapState(testStore, ['namepina']),
  },
  methods: {
    axiosfun() {
      demo({}).then((res) => {
        console.log(res)
      })
    },

    ...mapActions(testStore, ['testCount']),
    btn(path) {
      this.$router.push(path)
    },
    testStore1() {
      const Store = testStore()
      Store.count += 2
      Store.namepina = '我是pinaiafun'
    },
  },
}
</script>
<!-- <script setup name="demo">
import Echarts from './echarts/index.vue'
import { reactive, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import Menu from './Menu.vue'
const { proxy } = getCurrentInstance()
proxy.sgtestStore.alerttext('提示', 'error')

const router = useRouter()
const paramts = reactive({
  name: '测试数据',
  age: 1222,
})
const btn = (path) => {
  router.push(path)
}
</script> -->
<!-- <script>
import Echarts from './echarts/index.vue'

export default {
  name: 'Echartsname',
  components: {
    Echarts,
  },
  data() {
    return {
      QuanjuTtile: '全局标题',
      paramts: {
        name: '测试数据',
        age: 1222,
      },
    }
  },
}
</script> -->
