<template>
  <div class="red">vue3leftcycle.VUE *******************</div>
  <vue3leftcycleChildren />
</template>
<script setup name="vue3leftcycle">
import vue3leftcycleChildren from './vue3leftcycleChildren.vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onBeforeUnmount } from 'vue'
import MyClass from './vue3leftcycleClass.js'
const myclas = new MyClass('王二小', 44)
myclas.sayHello()

// let showFather = new Father();

onBeforeMount(() => {
  console.log('父组件======>>onBeforeMount')
})
onMounted(() => {
  console.log('父组件=========>>onMounted')
})
onBeforeUpdate(() => {
  console.log('父组件==========>>>onBeforeUpdate')
})
onBeforeUnmount(() => {
  console.log('父组件==========>>>onBeforeUnmount')
})
</script>
