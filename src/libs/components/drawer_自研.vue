<!-- <template>
  <el-drawer
    title="测试"
    v-model="isShow"
    :direction="direction"
    :size="drawerWidth"
    :show-close="showClose"
    :before-close="beforeClose"
    :destroy-on-close="destroyOnClose"
  >
    <template #default>
      {{ porseForm }}
      <input type="text" v-model="porseForm.pass" />
      <input type="text" v-model="porseForm.age" />
    </template>
 
    <template #footer v-if="isFooter">
      <el-button type="info" @click="close">取消</el-button>
      <el-button type="success" @click="confirm">确定</el-button>
    </template>
    <div>23232323 {{ getProvidename }}</div>
  </el-drawer>
</template> -->
<template>
  <el-drawer
    title="测试"
    v-model="isShow"
    :direction="direction"
    :size="drawerWidth"
    :show-close="showClose"
    :before-close="beforeClose"
    :destroy-on-close="destroyOnClose"
  >
    <slot> </slot>
    <slot name="box" :box="{ age: 12, name: `测试一个数据` }"></slot>
    <template #footer v-if="isFooter">
      <el-button type="info" @click="close">取消</el-button>
      <el-button type="success" @click="confirm">确定</el-button>
    </template>
  </el-drawer>
</template>
<script setup>
import { reactive, ref, computed, defineProps, watch, inject, onMounted } from 'vue'

let drawer = ref(false)

const emit = defineEmits(['update:modelValue', 'confirm'])

const props = defineProps({
  //value的值是双向绑定的，所以可以直接使用
  modelValue: {
    type: Boolean,
    default: false,
  },
  porseForm: {
    type: Object,
    default: () => ({}),
  },
  drawerWidth: {
    type: String,
    default: '30%',
  },
  direction: {
    type: String,
    direction: 'rtl',
  },
  title: {
    type: String,
    default: 'defaultTitle',
  },
  cancelText: {
    type: String,
    default: '',
  },
  confirmText: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'default',
  },
  formData: {
    type: Array,
    default: [],
  },
  formWidth: {
    type: String,
    default: '',
  },
  isFooter: {
    type: Boolean,
    default: true,
  },
  // 关闭前是否弹出确认保存的提示
  saveConfirm: {
    type: Boolean,
    default: false,
  },
  // 是否显示右上角×号
  showClose: {
    type: Boolean,
    default: true,
  },
  destroyOnClose: {
    type: Boolean,
    default: false,
  },
  // 校验规则，会被合并
  formRules: {
    type: Object,
    default: () => ({}),
  },
})

let isShow = computed(() => props.modelValue)
const getProvidename = inject('Providename')

watch(
  () => {
    return isShow
  },
  (newValue) => {
    console.log(newValue.value)
  },
  {
    immediate: true,
    deep: true,
  },
)

const beforeClose = (done) => {
  close()
  return
}

const confirm = () => {
  // close();
  emit('confirm')
}
const close = () => {
  emit('update:modelValue', !props.modelValue)
  // emit("confirm", [!props.modelValue, props.porseForm]);
}
const alertTitle = () => {
  alert(`父亲调取儿子方法`)
}

defineExpose({
  alertTitle,
})
</script>
