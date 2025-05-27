<template>
  <div>
    <H1 class="red"> 这是 useUserStore 实际例子 ：：翻译{{ $t('GoLogin') }} </H1>
    <div style="border: 2px solid blue; padding: 10px">
      <p>useUserStoredemo 数据累加的结果 **************** start</p>
      userInfo： {{ count }}
      <input v-model="uselook" type="text" />
      <el-button type="success" @click="getHooks()"> <BR /> Hook方法Pinia存储</el-button>
      <el-button type="success" @click="getHooks1()"> <BR /> Hook 方法 Pinia 存储</el-button>
      <el-button type="success" @click="countvalue(0)"> 数据累加 数据 1 Pinia 存储</el-button>
      <el-button type="success" @click="countvalue(1)">数据累加2 </el-button>
      <DIV style="font-weight: 600; color: blueviolet">
        <p>Hooks *****************</p>
        <p>uselook：{{ uselook }}<br />stutent: {{ stutent }}</p>
        <p style="color: red; font-weight: 600; font-size: 22px">Pinia计算属性 Computedage ： {{ usestore.Computedage }}</p>

        <el-popconfirm
          confirm-button-text="Yes"
          cancel-button-text="No"
          :icon="InfoFilled"
          icon-color="#626AEF"
          title="Are you sure to delete this?"
          @confirm="confirmEvent"
          @cancel="cancelEvent"
        >
          <template #reference>
            <el-button type="danger"> 重点看退出登录</el-button>
          </template>
        </el-popconfirm>
      </DIV>
    </div>

    <div style="border: 3px solid blue; padding: 10px; margin: 20px 0">
      <div style="color: red; font-size: 20px; font-weight: 600">******** testStore.js Piania ************</div>

      <div>
        testStore1.namepina：
        {{ testStore1.namepina }} <br />
        testStore1.count：
        {{ testStore1.count }}
        <p>namepinia:</p>
        是否为真： === {{ testStore1.isCheck }}
        <!-- <el-checkbox :model-value="testStore1.isCheck"></el-checkbox> -->
        <el-checkbox v-model="testStore1.isCheck"></el-checkbox>
      </div>
      <p class="red">单独显示 ********* 解构赋值===> {{ namepina }}</p>
      <p>单独显示 ********* {{ book }}</p>

      <p class="red">********** action **********</p>
      <el-button type="primary" @click="pinaiafun">Pinia存储点击累加</el-button>
      <el-button type="primary" @click="testCount">Pina Action 方法</el-button>
      <el-button type="primary" @click="Patch">Patch 方法</el-button>

      <p class="red">********** getters **********</p>
      111====== {{ testStore1.getcount }}<br />
      222====== {{ testStore1.getbook }}
    </div>

    <p class="red">Pinia 持久化 start ========</p>
    {{ webstore.web.title }}
    {{ webstore.user }}
    <el-button type="primary" @click="webstore.userAdd"> 数据点击加加</el-button>

    <p class="red">Pinia持久化 end ========</p>
    <br />
    111 === {{ book }}
    <br />
    222 === {{ testStore1 }}
  </div>
  <div style="margin: 20px 0px">
    <p class="red">Pinia PiniaComponent组件 ******************</p>
    <PiniaComponent />
  </div>
</template>
<script setup>
import { ref, getCurrentInstance } from 'vue'
import PiniaComponent from './piniacomponent.vue'
import { storeToRefs } from 'pinia'
import useHooks, { userStore } from '../store/useUserStoredemo.js'
const { proxy } = getCurrentInstance()

let usestore = userStore()
let { countvalue, stutent, checkout } = usestore

//定义一个学生的参数
let students = {
  name: '王二小',
  age: 123,
}
let Stu = ref({
  name: '王二小',
  age: 222,
})
// hooks 写法 *****************************
let { count } = storeToRefs(usestore)
let { uselook, useClass } = useHooks()
let user = new useClass('王二小')
let age = 12
const getHooks = () => {
  user.getuseer()
  usestore.$patch({
    stutent: {
      name: '王二小',
      age: (age += 1),
      sex: '男',
    },
  })
}
const getHooks1 = () => {
  usestore.$patch({
    stutent: {
      name: '张大大',
      age: (age -= 1),
      sex: '西家婆',
    },
  })
}
// 退出登录
const confirmEvent = () => {
  checkout()
}

// hooks 写法  end*****************************
import { testStore } from '../store/testStore.js'
const testStore1 = testStore()
import { userWebStore } from '../store/persistedstate.js'
const webstore = userWebStore()

// subscribe 监听数据的变化
testStore1.$subscribe((mutate, state) => {
  console.log('=======22', state.book)
})
//onAction 监听action 方法
testStore1.$onAction((args) => {
  console.log('======onaction', args)
})

//单独显示这个值 //这个api 起到vue 响应
let { namepina, book } = storeToRefs(testStore1)

function pinaiafun() {
  testStore1.count += 2
  testStore1.namepina = '我是pinaiafun'

  //单独修改这个********
  testStore1.book.author = 'Pinia 数据修改*******'
}
function testCount() {
  testStore1.testCount()
  namepina.value = '单独修改这个值****'
  //单独修改
  book.value.author = '数据变改回来'
}
const Patch = () => {
  testStore1.$patch({
    book: {
      name: 'BBBBB',
      author: 'CCCCCC',
      author1: 'CCCCCC',
      author2: 'CCCCCC',
      author3: 'CCCCCC',
    },
  })

  //函数方法
  testStore1.$patch((state) => {
    if (state.count > 100) {
      // this.showDialog({message:'dddd'})
      proxy.ElMessage('success', '测试一个项目')
    }
    // console.log(state,"==============111");
  })
}
</script>
