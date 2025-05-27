<template>
  <div ref="threeScene" class="threeScene"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as THREE from 'three';
import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const threeScene = ref(null);

onMounted(() => {
  // 创建场景
  const scene = new Scene();
  // 创建相机
  const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  // 创建渲染器
  const renderer = new WebGLRenderer();
  renderer.setClearColor(0x79deec);
  renderer.setSize(window.innerWidth, window.innerHeight);
  threeScene.value.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 2, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  cube.rotation.y = 2;
  cube.rotation.x = 0;
  cube.position.z = 0;
  cube.position.y += 2;

  //设置相机的位置
  camera.position.x = 8;
  camera.position.y = -3;
  camera.position.z = 5;

  const controls = new OrbitControls(camera, renderer.domElement);

  controls.enableDamping = true;

  //添加辅助坐标系
  const axesHelper = new THREE.AxesHelper(100);
  scene.add(axesHelper);

  //辅助网格
  const gridHelper = new THREE.GridHelper(20, 50);
  scene.add(gridHelper);

  function render() {
    cube.position.y += 0.02;
    if (cube.position.y > 5) {
      cube.position.y = 0;
    }

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();
});
</script>

<style scoped>
.threeScene {
  width: 100vh;
  height: 100vh;
}

/* 可以在这里添加样式 */
</style>