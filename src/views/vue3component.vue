<template>
  <div>
    <slot></slot>
    <h1>
      modelValue :{{ modelValue }} == isShow:{{ isShow }} 子组件的位置 ****** newname:{{ newname }}
    </h1>

    name:{{ name }}
    <button type="button" @click="onIsshow()">子改父0</button>
    <button type="button" @click="onUpdate()">子改父1</button>
    <button type="button" @click="onsetfun()">子改变父亲2</button>
    <button type="button" @click="emit('getname', '子改变父亲3')">子改变父亲3</button>
    <button type="button" @click="updateChildren()">子改变父亲 5</button>

    <button type="button" @click="getamefun('子改变父亲4')">子改变父亲4</button>

    <div>
      <p style="font-size: 20px; font-weight: 600">显示父组件数据</p>
      <p>inject: {{ Providename }}===</p>
      children：{{ children }} <br />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, defineExpose, inject, computed } from 'vue';

const emit = defineEmits(['update:name', 'getname']);

// const props = defineProps({
//   name: {
//     type: String,
//     default: '',
//   },
//   modelValue: {
//     type: String,
//     default: () => {},
//   },
// });

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Boolean,
    default: () => {},
  },
});

const Providename = inject('Providename');
const getamefun = inject('getame');

let children = ref({
  name: 'name',
  age: 'age',
});

let newname = props.name;

const isShow = computed(() => {
  return props.modelValue;
});

watch(
  () => props.name,
  (newval, oldval) => {
    console.log(newval, '=====');
  },
);
function ceshialert() {
  alert('父调取子方法');
}
//子改变父亲
let abc = 1;
function onUpdate() {
  emit('update:name', (abc += 1));
}
function onIsshow() {
  emit('update:modelValue', !props.modelValue);
}
function onsetfun() {
  emit('getname', '传递一个数据');
}

function updateChildren() {
  emit('getname', '子改变父亲测试一个数据的改变');
}

//子组件暴露哪些可以访问
defineExpose({
  ceshialert,
  children,
});
</script>
