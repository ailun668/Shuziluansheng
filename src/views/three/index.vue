<template>
  <div ref="threeScene" class="threeScene"></div>
</template>
  
  <script setup>
import { ref, onMounted } from 'vue';
import * as THREE from 'three';
import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';

const threeScene = ref(null);

onMounted(() => {
  // 创建场景
  const scene = new Scene();
  // 创建相机
  const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  // 创建渲染器
  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  threeScene.value.appendChild(renderer.domElement);

  // 添加一个立方体
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // 设置相机位置
  camera.position.z = 5;

  // 渲染场景
  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();
});
</script>
  
  <style scoped>
.threeScene {
  width: 100vh;
  height: 100vh;
}
/* 可以在这里添加样式 */
</style>
  