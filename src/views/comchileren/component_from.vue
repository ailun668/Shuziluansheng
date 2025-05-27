<template>
  <h1>表单组件封装 *****************</h1>
  <Itemfrom
    :fromConfig="fromConfig"
    @customEvent="handleMethod"
    @reset="reset"
    :rules="rules"
  >
    <template #address>
      <el-switch v-model="delivery"></el-switch>
    </template>
    <!-- <template #footer>
    </template> -->
  </Itemfrom>
</template>
<script setup>
import Itemfrom from "./CommyForm.vue";
import { reactive, ref, watch, onMounted } from "vue";
let delivery = ref(false);
let fromConfig = reactive({
  formItem: [
    {
      field: "name",
      label: "活动名称",
      type: "input",
    },
    {
      field: "address",
      label: "活动地址",
      type: "input",
    },
    {
      field: "age",
      label: "年龄",
      type: "",
      slot: "address",
    },
  ],
  labelWidth: "120px",
});

const rules = reactive({
  name: [
    {
      required: true,
      message: "请输入邮箱",
      trigger: "change",
    },
    {
      type: "email",
      message: "请输入正确邮箱",
      trigger: ["blur", "change"],
    },
  ],
  age: [
    {
      required: true,
      message: "请输入年龄",
      trigger: "change",
    },
  ],
});

onMounted(() => {
  handleMethod();
});

function handleMethod(parmts) {
  let from = { ...parmts, delivery: delivery.value };
  console.log(from);
}
const reset = (parmts) => {
  delivery.value = false;
  let from = { ...parmts, delivery: delivery.value };
};

watch(
  () => {
    return delivery.value;
  },
  (newval, oldval) => {
    // handleMethod();
  },
);

// watchEffect(() => {
//   handleMethod();
// })
</script>
<style lang="scss" scoped></style>
