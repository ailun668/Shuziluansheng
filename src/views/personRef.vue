<template>
  <div class="component">Ref 组件例子********************</div>
  <el-button @click="handleClick">点击</el-button>
  <b class="bbb">父组件传递的数据:</b>{{ children }}
</template>
<script setup name="personRef">
import { ref, reactive, toRefs, defineExpose } from "vue";
let person = reactive({
  name: "小明",
  age: 18,
  sex: "男",
});
let personRef = ref({
  name: "小明",
  age: 18,
  sex: "男",
});
let children = reactive({});

function handleClick (obj) {
  alert(JSON.stringify(obj), "=============父组件船体的数据:obj");
  // console.log(person, '===========>>>>>子组件调用');
}
//子组件传值***************
defineExpose({ person, handleClick, personRef });
</script>
