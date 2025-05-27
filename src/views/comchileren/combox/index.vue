<template>
  <div class="bbb" style="margin: 20px">
    <slot></slot><br />
    <b> {{ ceshi }} </b>
    <div v-if="username">
      <el-button
        type="primary"
        size="small"
        @click="
          emit('function4', {
            name: '测试一个组件',
            age: username,
          })
        "
        >子调取父亲</el-button
      >

      <el-button type="primary" size="small" @click="chileren"
        >点击 chileren</el-button
      >
      <div>
        用户名：{{ username }}
        <input
          type="text"
          :value="username"
          @input="emit('update:username', $event.target.value)"
        />
        {{ password }} 密码：<input
          type="text"
          :value="password"
          @input="emit('update:password', $event.target.value)"
        />
      </div>
    </div>
    <div></div>
    <!-- 组件二 **************** -->
    <div v-if="car">
      <div>
        car:{{ car }}
        <el-button type="primary" size="small" @click="setcar(122)"
          >点击 setcar</el-button
        >
        <el-button type="primary" size="small" @click="setcar2()"
          >点击方法二</el-button
        >
      </div>
      <div>
        @update:modelValuecar：
        <input
          type="text"
          :value="car.name"
          @input="emit('update:modelValue', $event.target.value)"
        />

        父亲的传值：{{ injectValue }}
      </div>
    </div>
  </div>
</template>

<script setup name="routerindex">
import { defineProps, defineEmits, inject, watch } from "vue";
defineProps(["ceshi", "username", "password", "car", "setcar"]);
let emit = defineEmits([
  "function4",
  "update:username",
  "update:password",
  "update:modelValue",
  "childEvent",
]);

let injectValue = inject("inject");

function chileren() {
  //调用父组件方法
  emit("function4", {
    name: "ceshi",
    age: 18,
  });
}

let setcar2 = () => {
  emit("childEvent");
};
</script>
