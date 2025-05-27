<template>
  <div style="margin: 30px; border: 4px solid blue">
    <div class="red">****************indextemp 组件****************</div>
    <p>
      username:{{ username }} <br />
      username 子组件定义赋值：{{ internalvalue }}
      <br />
      Inject username 数据显示 ===:{{ loadusernamevalue }}
    </p>

    <button type="button" @click="onClick()">点击修改</button>
    <input type="text" v-model="internalvalue" />
  </div>
</template>

<script setup>
import { ref, watch, inject, defineEmits, watchEffect, defineProps } from "vue";
const props2 = defineProps(["username"]);

const emit = defineEmits(["update:username"]);

const internalvalue = ref(props2.username);

//provide
const usernamevalue = inject("username");
const loadusernamevalue = ref(usernamevalue);

watchEffect(() => {
  internalvalue.value = props2.username;
});
watch(usernamevalue, (newval) => {
  loadusernamevalue.value = newval;
});
function onClick() {
  emit("update:username", "我在测试一个修改");
}
</script>
