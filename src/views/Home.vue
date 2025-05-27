<template>
  <el-row :gutter="10" style="border: 3px solid #cd1f1f">
    <el-col :span="24">
      <div class="red">**************Home.vue</div>

      <p class="red">静态导入的数据是: {{ data }}</p>

      <BR />
      <h1 class="red">点击详情</h1>
      <ul>
        <li v-for="(v, i) in data" @click="todeaail(v)" :key="i">点击跳转详情 {{ v }}</li>
      </ul>
      <h1 class="red">点击详情2*****</h1>
      <ul>
        <li v-for="(v, i) in data" @click="todeaail2(v)" :key="i">点击跳转详情2 {{ v }}</li>
      </ul>
      <button @click="model = !model">
        {{ model }}
        显示A组件 父改变子的点击显示隐藏
      </button>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { data } from './router.json'
import { useRouter } from 'vue-router'
import { Loading } from '../components/sui/index.js'

const router = useRouter()
let model = ref(true)
const todeaail = (item: any) => {
  router.push({
    path: '/detail',
    query: item,
  })
}

const todeaail2 = async (item) => {
  Loading.show()
  let res = await setTimeout(() => {
    Loading.dismiss()
    router.push({
      path: `/detail2/${item.code}`,
    })
  }, 2000)

  console.log(res, '=====BBB')
}

onMounted(() => {
  console.log(model, '====')
})
</script>
<style>
ul li {
  cursor: pointer;
}
ul li:hover {
  font-weight: bold;
  color: rgb(70, 20, 0);
}
</style>
