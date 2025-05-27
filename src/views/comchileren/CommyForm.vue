<template>
  <el-form
    ref="ruleFormRef"
    :model="form2"
    :label-width="fromConfig.fromConfig.labelWidth"
    :rules="rules"
  >
    <el-form-item
      v-for="(item, index) in fromConfig.fromConfig.formItem"
      :key="`${item.label + '_' + index}`"
      :label="item.label"
      :prop="item.field"
    >
      <el-input
        v-if="item.type === 'input'"
        v-model="form2[item.field]"
        :placeholder="item.placeholder"
      ></el-input>

      <slot :name="item.slot"></slot>
    </el-form-item>
  </el-form>
  <!-- v-if="$slots.footer" -->
  <div>
    <el-button type="primary" @click="setFrom">立即创建</el-button>
    <el-button type="info" @click="resuet">取消</el-button>
    <!-- <slot name="footer"></slot> -->
  </div>
</template>
<script setup>
import {
  reactive,
  defineProps,
  defineEmits,
  watchEffect,
  watch,
  ref,
} from "vue";

let emit = defineEmits(["customEvent"]);
let ruleFormRef = ref();
const fromConfig = defineProps(["fromConfig", "rules"]);
const form2 = reactive({});

function setFrom() {
  emit("customEvent", form2 || {});
}
async function resuet(formEl) {
  for (let key in form2) {
    form2[key] = "";
  }
  emit("reset", form2 || {});
}

watch(
  () => {
    return form2;
  },
  (newval, oldval) => {
    // console.log(newval, "=================>>>>");
  },
  {
    deep: true,
    // immediate: true
  },
);
watchEffect((form2) => {});
</script>
<style lang="scss" scoped></style>
