<template>
  <div style="border-top: 3px solid blue; padding-top: 20px">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="yellow" style="border: 3px solid blue; padding: 3px; margin-top: 20px">
          <div style="color: blue; padding: 10px; margin-bottom: 20px">
            Event bus 全局 组件通信技术 **********************
            <P>$bus 全局事件派发</P>
            <div>
              <el-button type="primary" @click="Busent" size="small">全局组件事件派发</el-button>
            </div>

            <el-input v-model="text" size="small" style="width: 240px" placeholder="Please input" />
            <el-button type="primary" @click="handler" size="small">Event bus 点击给我的父亲送</el-button>
            <el-button type="primary" @click="SGBUS2" size="small">Event bus2 点击给我的父亲送</el-button>
          </div>

          <p class="red">通过ref 点击改变 组件 实例</p>
          <el-button type="primary" size="small" @click="cccComponent()"> 点击 获取 c.vue 组件实例 *********** </el-button>
        </div>
        <div style="border: 2px solid blue">
          <h1 style="font-weight: 600; font-size: 20px">Pinia ********************</h1>
          <P>count:{{ count }}</P>
          <p>userinfoData:{{ userinfoData }}</p>
          <el-input v-model="count" style="width: 240px" placeholder="Please input" />
          <button @click="handClick">Pinia点击修改</button>
          <button @click="userInfoshow.$reset">Pinia重置</button>
          <button @click="userInfoshow.changeInfo((count += 1))">Pinia 修改</button>
          <hr />
        </div>
      </el-col>

      <el-col :span="12">
        <div style="border: 2px solid blue">
          <p style="font-size: 30px">c.vue 组件 通信 ***************</p>
          <comboxC ref="cccCom">
            <template #sgmain> </template>
            <template v-slot="scoped">
              <div>我是C.vue 默认插槽</div>
              {{ scoped.$cccvue }}<br />
              <h2 :class="scoped.$cccvue.age > 120 ? 'acitve' : ''">age: {{ scoped.$cccvue.age }}</h2>
            </template>

            <template #top>
              <h1 class="top">我是头部 组件</h1>
            </template>
            <template #left="scoped">
              <h1>我是左边 :{{ scoped.name2.age }}</h1>
            </template>
            <template #right>
              <h1>我是右边</h1>
            </template>
          </comboxC>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { ref, getCurrentInstance, onMounted } from 'vue'
import comboxC from '../combox/c.vue'
import $bus from '../../utils/mitt'
const { proxy } = getCurrentInstance()
import useInfoStore from '../../store/module/userinfo'
let userInfoshow = useInfoStore()
let { count, userinfoData } = storeToRefs(userInfoshow)
//Piania ******
//Pinia 修改
const handClick = () => {
  userInfoshow.$patch({
    count: count.value + 1,
  })
  userInfoshow.$patch({
    userinfoData: {
      name: '张呜呜呜呜三',
      age: 222,
      sex: '22222',
    },
  })
  console.log(userInfoshow?.userinfoData, '=====LLLL')
}
//eventBus 事件派发 ************************>>>>>>>>
const Busent = () => {
  $bus.emit('send', '事件派发')
}
//mitt ************
let text = ref('我在测试一个数据')
const handler = () => {
  $bus.emit('send', text.value)
}
const SGBUS2 = () => {
  $bus.emit('send2', text.value)
}
let cccCom = ref()
function cccComponent() {
  cccCom.value.updateage()
}

onMounted(() => {
  $bus.on('mittemitfun', (val) => {
    console.log(val)
    text.value = val
  })
})
</script>

<style lang="scss" scoped>
h1 {
  font-weight: 600;
  font-size: 16px;
  color: red;
}
.top {
  text-align: center;
  font-size: 30px;
  color: red;
}
h2.acitve {
  font-size: 40px;
  color: red;
  transition:
    opacity 0.5s,
    transform 0.5s,
    -webkit-transform 0.5s;
}
</style>
