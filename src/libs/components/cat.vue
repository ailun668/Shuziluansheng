<template>
  <div> {{test}}
    <slot name="TTT"></slot>
  </div>

</template>
<script setup>
  // const props=defineProps({
  //   arr: {
  //     type: String,
  //     default: '张三'
  //   },
  //   test: {
  //     type: String,
  //     default: '张三'
  //   }
  // });
   const props=defineProps({
      arr: {
        type: String,
        default: '张三'
      },
      test: {
        type: String,
        default: '张三'
      }
   })


</script>
<style lang="scss"></style>