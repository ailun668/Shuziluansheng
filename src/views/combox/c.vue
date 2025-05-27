<template>
  <div>
    <div style="margin-bottom: 6px">
      <h3>Pinia 数据显示 **********</h3>
      <p>count:{{ count }}</p>
      <p>userinfoData:{{ userinfoData }}</p>
      <button @click="infostore.changeInfo('99')">点击修改</button>
    </div>
    <hr />

    <slot name="sgmain"></slot>
    <div style="font-size: 30px; color: red">
      <div style="font-size: 40px">$bus 组件通信 *****************</div>
      mittvalue: {{ mittvalue }}
      <input type="text" v-model="mittvalue" />
      <button @click="mittleemit()">修改</button>
    </div>
    <hr />
  </div>
  <div style="border: 5px solid blue">
    <div style="border: 2px solid blue; margin: 10px">
      <slot :$cccvue="cccvue"></slot>
    </div>
    <slot name="top" class="top"></slot>
    <div style="display: flex; justify-content: space-between">
      <slot name="left" :name2="cccvue"> </slot>
      <slot name="right"> </slot>
    </div>
  </div>
  <b> ---------------------------------------------</b>

  <div style="border: 3px solid blue">
    修改数据======={{ cccvue }}
    <el-button type="primary" size="mini" @click="updateage()">修改 age 数据</el-button>
    <el-button type="primary" size="mini" @click="updatename()"> 修改 Name 数据</el-button>
    <el-button type="primary" size="mini" @click="updateall()">修改全部</el-button>
    <div>name: <input type="text" v-model="name" /></div>
    <div>age:<input type="text" v-model="age" /></div>
    <div>watchVal:<input type="text" v-model="watchVal" /></div>
    <div>cccvue.tab.ppp:<input type="text" v-model="cccvue.tab.ppp" /></div>
    <div>cccvue.tab.qqq:<input type="text" v-model="cccvue.tab.qqq" /></div>
  </div>
</template>

<script setup>
import { watch, watchEffect, reactive, toRefs, ref, defineExpose, onMounted, getCurrentInstance } from 'vue'

import $bus from '../../utils/mitt'
const { proxy } = getCurrentInstance()
let mittvalue = ref()
import { storeToRefs } from 'pinia'
import useInfoStore from '../../store/module/userinfo.js'
let infostore = useInfoStore()
let { count, userinfoData } = storeToRefs(infostore)
//pinia  *****
let cccvue = reactive({
  age: Number(111),
  name: '破婆婆',
  watchVal: 'watchEffect 数据',
  tab: {
    ppp: '第iiiii轮',
    qqq: '第二轮',
  },
})

let { age, name, watchVal } = toRefs(cccvue)

onMounted(() => {
  let time = null
  //全局组件通通信
  $bus.on('send', (val) => {
    mittvalue.value = val
    clearInterval(time)
  })
  $bus.on('send2', (val) => {
    mittvalue.value = val
  })
  time = setInterval(() => {
    mittvalue.value = '修改mittvalue'
  }, 2000)
})
//修改文件
const mittleemit = () => {
  $bus.emit('mittemitfun', mittvalue.value)
}

function updateage() {
  cccvue.age += 12
}

function updatename() {
  Object.assign(cccvue, {
    name: '修改Name 数据',
  })
}
//修改全部信息
function updateall() {
  name.value = '修改全部name'
  age.value = '修改全部age'
}
// watch *********************************
//watch 监听单个
watch(
  () => {
    return cccvue.age
  },
  (newval, oldval) => {
    console.log(newval, '====ppp')
  },
  {
    deep: true,
    immediate: true,
  },
)

watch(
  () => {
    return cccvue.name
  },
  (newval, oldval) => {
    console.log(newval, '======修改name数据')
  },
)
//监听多个
watch(
  [
    () => {
      return age.value
    },
    () => {
      return cccvue.tab.ppp
    },
  ],
  (newval, oldval) => {
    console.log(newval, oldval, '监听多个watch')
  },
)

// watchEffect****************************8
watchEffect(() => {
  console.log(watchVal.value.length, '========')
  if (watchVal.value.length > 10) {
    console.log(watchVal.value, '========')
  }
})
//组件实例导出父组件
defineExpose({
  updateage,
  cccvue,
})
</script>

<style scoped lang="scss">
h3 {
  font-size: 25px;
  color: blue;
}
</style>
