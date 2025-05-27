<template>
  <div class="component">Reactive watch vue3 组件 例子</div>
  <b class="bbb">显示名称：</b>
  {{ person.name }}
  <b class="bbb">修改：</b>
  {{ person.age }} age：
  <input type="text" v-model="age" /> tigger：
  <input type="text" v-model="person.tigger" />
  <br />
  <input type="text" v-model="person.wahah" />
  <input type="text" v-model="person.duoge" />
  <button type="button" @click="reqcfun">点击事件</button>
  <button type="button" @click="Reactive">Reactive 事件2</button>
</template>

<script setup lang="ts" name="person2">
import { reactive, toRefs, watch, ref } from 'vue'
import { data2 } from './data.js'
let person = reactive({
  name: data2,
  age: '修改数据',
  tigger: 'wee',
  wahah: '修改第一个',
  duoge: '修改多个数据'
})
let qq = ref(2)
let { age } = toRefs(person)

watch(
  () => {
    return age.value
  },
  (newval, oldval) => {
    console.log('person age Watch=====', age.value)
  }
)
watch(
  () => {
    return person.tigger
  },
  (newval, oldval) => {
    console.log('person tigger Watch=====', newval)
  }
)
//深度监听 ******************
watch(
  () => person,
  (newval, oldval) => {
    console.log(newval, '==============TTTT')
  },
  {
    deep: true,
    immediate: true
  }
)
// watch 修改多个 **********************
watch(
  [() => person.wahah, () => person.duoge],
  (newval, oldval) => {
    console.log('监听修改多个', newval)
  },
  { deep: true, immediate: true }
)

function reqcfun() {
  age.value += 'Pp'
}
let Reactive = () => {
  qq.value += 3
  // person.age += '哈哈哈哈';
  Object.assign(person, {
    age: `${qq.value}== 数据的修改`
  })
}
</script>
