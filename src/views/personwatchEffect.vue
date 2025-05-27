<template>
  <div class="component">watchEffect 组件例子********************</div>
  <button @click="checkout()"></button>
<el-button type="primary" @click="checkout">Inject子改变父亲</el-button>

  isShow ： {{ isShow }}==== modelValue： {{ modelValue }}

  <b class="bbb">年龄:</b>{{ age }}
  <br />
  <b class="bbb">watchEffect name :</b>{{ watchEffectval.name }}

<p>  watchEffectval: <input type="text" name="watchEffect" v-model="watchEffectval.name" ></input></p>
  <p>age:<input type="text" v-model="age"></input></p>
  <b class="bbb">watchEffectval age:</b>{{ watchEffectval.age }}
  <div>
    <button @click="updateAge">更新年龄</button>
  </div>
  <div style="border: 1px dashed rgb(147, 15, 218); margin: 10px 0"></div>
  <div v-if="isShow">
    <p>显示隐藏我的客户</p>
    <p>显示隐藏我的客户</p>
    <p>显示隐藏我的客户</p>
    <p>显示隐藏我的客户</p>
  </div>
</template>

<script setup name="personwatchEffect">
import {
  ref,
  watchEffect,
  reactive,
  defineExpose,
  watch,
  inject,
  defineProps,
  computed,
} from 'vue';

let age = ref(12);
let show = ref(true);
const props = defineProps({
  modelValue: {
    type: String,
    default: () => {},
  },
});
let watchEffectval = reactive({
  name: 'ASDFASDFASDFASDF',
  age: 88,
});

const isShow = computed(() => {
  return props.modelValue;
});

const checkout = inject('checkout');

let countage = () => {
  age.value++;
  show.value = false;
};
function updateAge() {
  watchEffectval.name += 'TT';
}
watch(age, (newval, oldval) => {
  console.log(newval, '====娃哈哈');
});
watch(watchEffectval, (newval, oldval) => {
  console.log(newval, '====娃哈哈');
});

watchEffect(() => {
  if (age.value > 20) {
    alert('发布数据....');
    show.value = true;
  }
  setTimeout(() => {
    age.value = 0;
  }, 20000);
});

// defineExpose({
//   countage,
//   age,
// });
defineExpose({
  countage,
  age,
  isShow,
});
</script>
