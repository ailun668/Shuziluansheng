<template>
  <div>
    <div id="threeBox" ref="threescene">11</div>
  </div>
</template>

<script setup>
import * as THREE from 'three';
import { WebGLRenderer } from 'three';
import { ref, onMounted } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import dat from 'dat.gui';

const width = 200;
const height = 200;
const obj1 = {
  width,
  height,
  area() {
    return this.width * this.height;
  },
};

let threescene = ref(null);

onMounted(() => {
  //创建相机
  const camera = new THREE.PerspectiveCamera(45, window.innerHeight / window.innerWidth, 0.1, 1000);
  camera.position.set(0, 0, 10);

  //创建一个场景
  const scene = new THREE.Scene();

  //创建渲染器
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  threescene.value.appendChild(renderer.domElement);

  //添加辅助坐标系
  const axesHelper = new THREE.AxesHelper(10);
  scene.add(axesHelper);

  const width = 0.2;
  const height = 0.1;
  const depth = 0.3;
  const geometry2 = new THREE.BoxGeometry(width, height, depth);
  const material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube2 = new THREE.Mesh(geometry2, material2);
  cube2.position.set(1, 0, 0);
  scene.add(cube2);

  //创建一个立方体、  //创建材质 、  //创建一个网格
  const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
  const material = new THREE.MeshBasicMaterial({ color: 0x33aa88 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  //创建一个圆锥体
  const coneGeometry = new THREE.ConeGeometry(0.1, 0.4, 19);
  const coneMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const cone = new THREE.Mesh(coneGeometry, coneMaterial);
  // cone.position.set(2, 1, 1);
  scene.add(cone);

  //创建一个圆柱体
  const color = '0xffffff';
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);

  //创建一个轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  //创建一个gui控制器
  const gui = new dat.GUI();
  gui.add(cube.position, 'x', -5, 5, 0.01);
  gui.add(cube.position, 'y', -5, 5, 0.01);
  gui.add(cube.position, 'z', -5, 5, 0.01);

  //渲染场景
  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cone.position.set(1, 1, 0);
    cone.rotation.x += 0.02;
    cone.rotation.z += 0.01;
    cube2.rotation.x += 0.01;
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
});
</script>

<style lang="scss" scoped></style>
