<template>
  <div class="container" ref="containnerRef">喂喂喂</div>
</template>
<script setup>
//所有Three项目都起源于这三个元素
//1、场景(用来放画面上看到的物体)
// 2、摄像机(类似于眼睛)
//创建一些模型（人，桌子椅子，楼房...）
// 3、渲染器(把上面的场景和摄像机 还有其他物体渲染到页面的一个工具)
import { ref, onMounted } from 'vue';
import { AxesHelper, Color, Scene, PerspectiveCamera, WebGLRenderer, PlaneGeometry } from 'three';
import * as THREE from 'three';

const containnerRef = ref(null);

// 创建场景
const scene = new THREE.Scene();

// 创建透视相机
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
// 设置相机位置
camera.position.set(-30, 40, 30);
// 设置相机目标
camera.lookAt(scene.position);

// 创建渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
// 设置渲染器背景颜色
renderer.setClearColor(new Color(0x000000));
// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// 添加坐标轴帮助
const axes = new THREE.AxesHelper(20);
scene.add(axes);

// 创建一个网格对象
const planeGeometry = new THREE.SphereGeometry(4);
const MeshBasicMaterial = new THREE.MeshBasicMaterial({
  color: 0xcccccc,
  wireframe: false,
});
const plane = new THREE.Mesh(planeGeometry, MeshBasicMaterial);

plane.position.set(20, -4, 5);
scene.add(plane);

// 定义一个BoxGeometry对象，用于创建一个立方体
const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
// 定义一个MeshBasicMaterial对象，用于设置立方体的材质
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: false,
});
// 定义一个Mesh对象，用于创建一个立方体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.castShadow = true;
// 设置立方体的位置
// 设置立方体的位置
cube.position.set(1, 4, 2);
// 将立方体添加到场景中
scene.add(cube);

onMounted(() => {
  window.addEventListener(
    'resize',
    () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    },
    false,
  );

  // 将渲染器添加到容器引用中
  containnerRef.value.appendChild(renderer.domElement);
  // 渲染场景和相机
  renderer.render(scene, camera);
});
</script>
<style scoped>
.container {
  width: 100vh;
  height: 100vh;
  background-color: aqua;
}
</style>