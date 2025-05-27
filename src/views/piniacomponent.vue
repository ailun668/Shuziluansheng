<template>
  <p>
    namepinaaaaaa :{{ namepina }} ===
    <b style="color: red"> Getters:{{ getcount }} </b>
  </p>
  <p>count:{{ count }}</p>
  <p>book:{{ book }}</p>
  {{ Textore }}
  <div>
    <el-button type="primary" size="small" @click="Storefun()">修改数据</el-button>
    <el-button type="primary" size="small" @click="Storefun2()">修改数据2</el-button>
    <el-button type="primary" size="small" @click="alerttext()">解构点击事件</el-button>
  </div>
  <!-- <el-button type="primary" size="small" @click="Textore.alerttext()">Pinia 事件</el-button> -->

  <P class="red">************** 可持续化存储 ****************</P>
  <el-button type="primary" size="small" @click="USERLIST.changeName()">USER 持续化存储</el-button>
  <el-button type="primary" size="small" @click="USERLIST.changeAge()">User 持续化存储</el-button>
  <el-button type="primary" size="small" @click="updateALL()">批量修改</el-button>
  <el-button type="primary" size="small" @click="Reset()">重置 清除Pinia 数据</el-button>
  <el-button type="primary" size="small" @click="changeAge()">点击事件</el-button>
  <el-row :gutter="20">
    <el-col :span="6">Name: {{ name }}</el-col>
    <el-col :span="6">Age :{{ age }}</el-col>
    <el-col :span="6">Tage: {{ tage }}</el-col>
    <el-col :span="6">computedname:{{ computedname.value }}</el-col>
  </el-row>
</template>
<script setup name="PiniaComponent">
import { computed, getCurrentInstance } from 'vue'
import { storeToRefs } from 'pinia'
import { testStore } from '../store/testStore.js'
//alerttext 事件必须要这样才可以
const Textore = testStore()
let { alerttext } = Textore
let { namepina, book, count, getcount } = storeToRefs(Textore)

// useUserStore******************
//  如果是default 导出要这样写法**********
import vesselStore from '../store/vessel.js'
const testStore1 = vesselStore()
const { currentVessel } = storeToRefs(testStore1)

import user from '../store/module/user.js'
let USERLIST = user()
let { age, name, tage } = storeToRefs(USERLIST)

let { changeAge } = user()
//批量修改数据
let resUserList = {
  age: '测试数据3333',
  name: '批量修改333',
  tage: '批量修改数据33333',
}
function updateALL() {
  USERLIST.$patch(resUserList)
}
//重置数据
let Reset = () => {
  USERLIST.$reset()
}

let Storefun = () => {
  //函数 方法
  Textore.$patch((state) => {
    //这里可以写逻辑处理
    console.log(state, '=====11')
  })
  //第一种修改
  Textore.$patch({
    namepina: 'PP',
    book: '数据需改调整3',
  })
}
//第二种修改
function Storefun2() {
  namepina.value += 88
  Textore.book += 'OOO'
}

let computedname = computed(() => name)
</script>
