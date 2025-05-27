<template>
  <div>
    {{ title }} <span>{{ smalltitle }}</span>
  </div>
  <section class="product">
    <slot class="flexbox" name="box" :namebox="name"></slot>
    <slot :namebox="name"></slot>
  </section>
</template>

<script setup>
import { reactive } from 'vue';

let name = reactive({
  //完善一个名字的对象
  name: '张三',
  name1: '李四',
  name2: '王五',
  name3: '赵六',
  name4: '钱七',
});
defineProps({
  title: {
    default: '',
    type: String,
  },
  smalltitle: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
/* 全局样式 */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  background-color: #f1f1f1;
  padding: 10px;
  text-align: center;
}

nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
}

nav li {
  margin-right: 10px;
}

nav a {
  text-decoration: none;
}

nav a:hover {
  color: #ccc;
}

main {
  padding: 20px;
}

.product {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}

img {
  width: 100%;
  height: auto;
}
span {
  font-size: 12px;
  color: rgb(117, 235, 84);
}
button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 2px 2px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

footer {
  background-color: #f1f1f1;
  padding: 10px;
  text-align: center;
}

/* 手机屏幕样式 */
@media (max-width: 600px) {
  .product {
    flex-direction: row;
  }
}
</style>
