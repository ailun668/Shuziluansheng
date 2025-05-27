<template>
  <div class="component">子 组件生命周期</div>
  <h1>Hooks 求和：{{ sum }} <input type="text" v-model="sum" /> comPut:{{ comPut }}</h1>
  text2:{{ text2 }} text2:<input v-model="text2" />
  <button @click="sumfun">Hooks 求和</button>

  <div style="border: 3px solid blue; padding: 5px 0; margin-top: 40px">
    <h1 style="color: red; font-size: 30px">第二种Hooks 写法 *****************</h1>
    <button @click="sumfun2">相互调用</button>
    <input type="text" v-model="HOOKname" />
    Hoos 数据 {{ HOOKname }}
    <button @click="axiosObj.sumhook">Hooks 方法</button>
  </div>
  <el-button type="success" @click="asyncfun">try-catch-finally的执行顺</el-button>
  <el-button type="success" @click="thycatch">thycatch</el-button>
</template>
<script setup name="vue3leftcycleChildren">
import { onBeforeMount, onMounted } from 'vue'
import sumhook from './vue3hook/sumhook.js'
const { sum, sumfun, text2, comPut } = sumhook()
// 第二种Hooks 写法 *************
import axioshook from './vue3hook/axioshook.js'

const { axiosClass, HOOKname } = axioshook()
const axiosObj = new axiosClass(sum, '王二小')

let sumfun2 = () => {
  axiosObj.setName()
  console.log(HOOKname, '==========HOOKNAME')
}

// async await 方法 **********
async function asyncfun() {
  let qbs = null
  try {
    qbs = await new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(33)
      })
    })
  } catch (err) {
    alert(err)
  } finally {
    console.log(qbs, '========122')
  }
}

const obj = { name: 'John', age: 30, sex: 'man' }
const thycatch = () => {
  try {
    console.log(obj.add)
  } catch (err) {
    console.log(err, '==========')
  } finally {
    console.log(obj.address)
  }
}
onBeforeMount(() => {
  console.log('子组件=========>>onBeforeMount')
})
onMounted(() => {
  console.log('子组件=========>>onMounted')
})
</script>
