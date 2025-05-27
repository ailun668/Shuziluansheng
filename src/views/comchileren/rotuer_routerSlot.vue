<template>
  <div class="commentbox">
    标题 == {{ title.title }}
    <div>==== {{ $slots.tableBody }} ==== .tableBody</div>
    <div class="title">
      <div v-if="$slots.header">
        ==== slots.header
        <slot name="header" :shuju="youxi"></slot>
      </div>

      <slot name="body"></slot>
      <slot name="footer"></slot>
      <slot name="img" style="width: 50px"> </slot>
      <slot name="text"></slot>
    </div>
  </div>
</template>

<script setup name="routerSlot">
import { defineProps, ref } from "vue";

let title = defineProps(["title"]);
let youxi = ref({
  name: "测试游戏",
  age: 18,
});
</script>

<style lang="scss" scoped>
.title {
  background-color: antiquewhite;
  color: black;
  font-weight: 600;
}

.commentbox {
  border: 3px solid #ccc;
}
</style>
