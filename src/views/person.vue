<template>
  <el-row :gutter="24">
    <el-col :span="12">
      <el-button type="success" size="mini" @click="fun2">点击事件</el-button>
      <el-button type="success" size="mini" @click="fun3">数据相加</el-button>
      <el-button type="success" size="mini" @click="fun4">防抖节流</el-button>
      <el-button type="success" size="mini" @click="fun5">修改reactive</el-button>
      <P>bb: {{ bb }} ==</P>
      <p>QQ: {{ qq }}</p>
      <p>
        OBJ: {{ OBJ }}
        <br />
        ====== {{ obj.OBJ }}
      </p>
      <p>{{ BOJ2 }}</p>
      <el-input v-model="OBJ" placeholder="Please input" />
      <el-input v-model="BOJ2" placeholder="Please input" />

      <p class="red">Computed ********************************** ***************************************************</p>
      <p>
        姓:
        <input type="text" v-model="bb" />
      </p>
      <p>
        名：
        <input type="text" v-model="cc" />
      </p>
      <p>全名：{{ first_name }}</p>
      <b style="font-weight: 600; color: #951919">Computed 计算属性:</b>
      {{ total }}
      <p class="red">Pinia ********************************** ***************************************************</p>
      <el-button type="success" size="mini" @click="Pinion()"> Pinia 点击事件</el-button>
      ={{ pinia.count }}= {{ pinia.getcount }} ==={{ pinia.namepina }}== {{}}
      <p class="red">Watch 练习 ****************************************************</p>
      watchVal: {{ qq.watchVal }}
      <br />
      watchVal2: {{ qq.watchVal2 }}
      <br />
      ag:{{ qq.ag }}
      <br />

      <p class="red">Reactive 定义数据 ********</p>
      {{ obj.OBJ }}
      <input type="text" v-model="obj.OBJ" placeholder="Please input" />
      <div>
        <el-button type="success" size="mini" @click="Watchfun()">Watch事件</el-button>
      </div>
      <H1 class="red">其他练习 ****************************************************</H1>
      <el-button type="success" size="mini" @click="funlist()">点击事件===</el-button>
    </el-col>
    <el-col :span="12">
      ====
      <br />
      ====
      {{ obj.obj3 }}
      <el-input v-model="obj.obj3[0].code" placeholder="Please input"></el-input>
      <van-grid>
        <van-grid-item v-for="(item, index) in obj.obj3" :key="index" icon="photo-o" :text="item.code">
          <template #default="scoped">
            <van-empty :image-size="40" />
            <el-input v-model="item.code" placeholder="Please input" />
          </template>
        </van-grid-item> </van-grid
      >*********** 组件 *********** compu:
      <br />
      compu： {{ compu }}
      <el-button @click="comfun">修改computed</el-button>
      <el-button @click="comfun2">修改computed2</el-button>
      <br />
      <Persincom />
    </el-col> </el-row
  >------------------------------------- --------------
</template>
<script setup name="person">
import { reactive, ref, toRefs, computed, watch } from 'vue'
import Persincom from './personReactiveWatch.vue'
import { data2, Animal } from './data.js'
import { debounce, convertToTimestamp } from '@/utils/util.js'
//PINIA 写法
import { testStore } from '../store/testStore.js'
const pinia = testStore()
// Pinia ************************************************
let Pinion = debounce(() => {
  pinia.testCount()
})
// ES6 类的方法*********************
let newAnimal = new Animal(data2[0], data2[0]['code'], { data2 })
let get = newAnimal.genome()

//点击延时 ****
const fun3 = debounce((value) => {
  bb.value += 5
})

console.log(get, '=========ES6类的显示')

// Ref 定义数据 *******************
let qq = ref({
  code: 'code',
  name: '测试效果',
  ag: 12,
  watchVal: '----',
})
let bb = ref('张')
let cc = ref('三')

// Reactive定于数据 ************************************
let obj = reactive({
  OBJ: 'Reactive 数据格式',
  BOJ2: '数据格式调整一下 ',
  obj3: data2,
})

// toRefs 修改数据 *********************************
let { OBJ, BOJ2 } = toRefs(obj)
console.log(OBJ, '===========222')
console.log(BOJ2, '===========222')

// computed **********************
let first_name = computed(() => {
  return bb.value + cc.value
})

// Computed 修改设置
let total = computed({
  get() {
    return bb.value + cc.value
  },
  set(val) {
    bb.value = val
    cc.value = val
  },
})
// computed get() set()
let compu = computed({
  get() {
    return BOJ2
  },
  set(val) {
    BOJ2.value = val
  },
})
const comfun = () => {
  compu.value += 'ttttt'
}
const comfun2 = () => {
  BOJ2.value += 12
}
watch(
  () => obj.BOJ2,
  (newval, odlval) => {
    console.log(newval, '====GGGG')
  },
)

//Computed 修改计算属性 ******************************
function funlist() {
  total.value += 99
}
function Watchfun() {
  qq.value.ag += 12
}

//WATCH ******************************
watch(total, (newval, oldval) => {
  console.log(newval)
  qq.value.watchVal = newval
})
//watch 深度监听 *************
watch(
  bb,
  (newval, oldval) => {
    qq.value.watchVal2 = newval
  },
  {
    deep: true,
    immediate: true,
  },
)
watch(
  qq,
  (newval, oldval) => {
    console.log(newval, '==========111')
  },
  {
    deep: true,
    immediate: true,
  },
)
// Reactive 数据监听
watch(obj, (newval, oldval) => {
  console.log(newval, '==========')
})

//点击修改Ref  *****************8
function fun2() {
  bb.value += 2
  OBJ.value += '999'

  //这个重点看ref 也可以对象***************
  qq.value = {
    code: '122',
    name: 'ccc',
    ag: 13,
  }
}

//修改reacite   Object.assign ********************** ************8
const fun4 = () => {
  bb.value += 2
  Object.assign(obj.obj3, [
    {
      code: 'ttttt',
      msg: 'ttttt',
      count: 33,
    },
    {
      code: 'ggggg',
      msg: 'gggg',
      count: 55,
    },
  ])
}

const fun5 = debounce(() => {
  Object.assign(obj.obj3, [
    {
      code: 33333,
      msg: '2222',
      count: 1,
    },
    {
      code: 5555,
      msg: '55555',
      count: 1,
    },
  ])
})
</script>
<style lang="scss" scoped>
::v-deep .van-empty__description {
  font-size: 12px;
}
</style>
