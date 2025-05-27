<template>
  <el-row>
    <el-col :span="12">
      <P style="font-size: 40px">*********************B.vue 页面 **********************</P>
      Name: {{ name }}
      <input v-model="name" type="text" />
      <el-button type="primary" size="mini" @click="upname">修改nane 数据</el-button>

      <div>
        MYcar:{{ MYcar.cheshu }} == {{ MYcar.name }}
        <el-button type="primary" size="mini" @click="upMYcar">修改 MYcar 数据</el-button>
      </div>
      <div>
        mybar:{{ mybar }}
        <el-button type="primary" size="mini" @click="upmybar">修改upmybar 数据</el-button>
      </div>
      <div>
        Object.assgin 修改Reactive 数据<BR /> MYcar: {{ MYcar }}
        <BR />
        ******** {{ cheshu }} == {{ ttd }}
        <el-button type="primary" size="mini" @click="upReactive">修改 upReactive 数据</el-button>
        <el-button type="primary" size="mini" @click="toRefs3()">修改 toRefs 数据</el-button>
      </div>
      <div>
        修改 Ref mybar : {{ mybar }} === update: {{ mybarUpdae }}
        <el-button type="primary" size="mini" @click="upRefmybar()">修改 upRefmybar 数据</el-button>
      </div>
      <div>
        <input type="text" v-model="cheshu" />
        computedCE 字数 合计===:
        {{ computedCE }}
      </div>
      <div style="border: 1px solid yellow">
        <p>外部导入JS</p>
        <input type="text" v-model="mybar.name" />
        {{ bbb.target }} == {{ mybar.name }}
        <div class="blue">
          外部JS 的数据 :::
          {{ refdata.name }}
          <input type="text" v-model="refdata.name" />
          name:{{ name }}==
          <el-button type="primary" size="mini" @click="WATCHcheshu()">WATCH name </el-button>
        </div>
      </div>
    </el-col>
    <el-col :span="12">
      <div style="border: 3px solid blueviolet; margin-top: 10px; margin: 20px">
        <b>********* TS 子组件 **************</b>
        <TS :MYcar="MYcar" :name="name"></TS>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import './index.css';
import { ref, reactive, computed, toRefs, watch } from 'vue';
import bbb, { tagname, refdata } from './index.js';

import TS from './ts.vue';
 
let cccCom = ref();
let name = ref(233);
let MYcar = reactive({
  cheshu: 123,
  name: '宝马',
  ttd: 'pppg',
});
let { cheshu, ttd } = toRefs(MYcar);
//或者组件实例方法

function toRefs3() {
  cheshu.value += '娃哈哈';
  ttd.value += 'kkkk';
}
let computedCE = computed(() => {
  let len = ttd.value.length;
  let name = cheshu.value + ttd.value;
  return {
    len,
    name,
  };
});

function WATCHcheshu() {
  name.value += 1;
}
//解除监听 watch ****************
let updatawatch = watch(name, (newval, oldval) => {
  if (newval >= 240) {
    updatawatch();
  }
});

let mybar = ref({
  name: 12,
  age: 'bb',
});
let upname = () => {
  name.value += 'ppp';
};
function upMYcar() {
  MYcar.cheshu += '9';
}
function upmybar() {
  mybar.value.name += '测试一个数据';
  mybar.value.age += 'PPP';
}

function upReactive() {
  Object.assign(MYcar, {
    cheshu: 'ppppp',
    name: '测试数据',
  });
}
let mybarUpdae = computed(() => {
  return mybar.value.name * 3;
});
function upRefmybar() {
  mybar.value = {
    name: 888,
    age: 'PPPP',
  };
}
</script>
