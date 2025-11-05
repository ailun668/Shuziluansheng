<template>
  <div class="yacht-scene-container">
    <canvas ref="canvas" />
    <div v-if="loading" class="loading-overlay">
      <div class="loading-text">{{ loadingProgress }}%</div>
    </div>
    <div class="controls-info" v-if="!loading">
      <div class="control-tip">鼠标拖动: 旋转视角</div>
      <div class="control-tip">滚轮: 缩放</div>
      <div class="control-tip">右键拖动: 平移</div>
    </div>
    <!-- 添加交互模式切换按钮 -->
    <div class="interaction-controls" v-if="!loading">
      <button 
        :class="['mode-button', { active: interactionMode === 'orbit' }]"
        @click="setInteractionMode('orbit')"
      >
        轨道控制
      </button>
      <button 
        :class="['mode-button', { active: interactionMode === 'inspect' }]"
        @click="setInteractionMode('inspect')"
      >
        检查模式
      </button>
    </div>
    <!-- 添加部件信息显示 -->
    <div v-if="hoveredPart" class="part-info">
      {{ hoveredPart.name }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// 引用DOM元素
const canvas = ref(null);
const loading = ref(true);
const loadingProgress = ref(0);
const interactionMode = ref('orbit'); // 交互模式：'orbit' 或 'inspect'
const hoveredPart = ref(null); // 当前悬停的部件

// Three.js 相关变量
let scene, camera, renderer, controls;
let yacht, water;
let animationFrameId;
let raycaster, mouse;
let originalMaterials = new Map(); // 存储原始材质
let highlightMaterial = null;

// 初始化Three.js场景
const initScene = () => {
  // 创建场景
  scene = new THREE.Scene();
  
  // 设置简单的背景色
  scene.background = new THREE.Color(0x87CEEB); // 天空蓝色背景

  // 初始化射线和鼠标位置
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  
  // 初始化高亮材质
  highlightMaterial = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
    transparent: true,
    opacity: 0.5,
    emissive: 0x00ff00,
    emissiveIntensity: 0.2
  });

  // 创建相机
  const container = canvas.value.parentElement;
  const aspect = container.clientWidth / container.clientHeight;
  camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
  camera.position.set(0, -10, 0); // 将相机移动到正上方
  camera.lookAt(0, 0, 0); // 相机朝向原点

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    antialias: true,
    alpha: true
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; // 添加色调映射，提高视觉效果
  renderer.toneMappingExposure = 1.2; // 增加曝光度
  renderer.outputColorSpace = THREE.SRGBColorSpace; // 使用sRGB色彩空间提高颜色准确性

  // 添加轨道控制器
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // 启用阻尼效果
  controls.dampingFactor = 0.05;
  controls.minDistance = 2; // 允许无限接近
  controls.maxDistance = 800; // 允许无限远离
  controls.enablePan = true;
  controls.autoRotate = false; // 关闭自动旋转，因为是俯视图
  controls.maxPolarAngle = Math.PI / 3; // 限制相机仰角，保持俯视效果
  controls.minPolarAngle = 0; // 允许完全俯视
  
  // 添加环境光和方向光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  
  // 主方向光 - 模拟太阳光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
  directionalLight.position.set(5, 10, 5);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048; // 提高阴影质量
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  directionalLight.shadow.bias = -0.0001; // 减少阴影失真
  scene.add(directionalLight);
  
  // 添加环境半球光 - 更好的环境光效果
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);
  
  // 添加一个补光，使游艇更加明亮
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
  fillLight.position.set(-5, 3, -5);
  scene.add(fillLight);
  
  // 创建水面
  createWater();
  
  // 加载游艇模型
  loadYachtModel();
  
  // 添加事件监听器
  setupEventListeners();
};

// 创建水面
const createWater = () => {
  // 创建水面几何体 - 增加细分以获得更好的波浪效果
  const waterGeometry = new THREE.PlaneGeometry(100, 100, 128, 128);
  
  // 创建水面材质 - 调整为更平静、更真实的水面效果
  const waterMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x0066aa, // 更深的蓝色，更像真实的水
    transparent: true,
    opacity: 0.9,
    roughness: 0.05, // 降低粗糙度，使水面更光滑
    metalness: 0.3, // 增加金属度，提高反射效果
    reflectivity: 1.0,
    clearcoat: 0.8, // 增加清漆层效果
    clearcoatRoughness: 0.05,
    side: THREE.DoubleSide
  });
  
  // 创建水面网格
  water = new THREE.Mesh(waterGeometry, waterMaterial);
  water.rotation.x = -Math.PI / 2; // 水平放置
  water.position.y = -0.05; // 调整水面位置
  water.receiveShadow = true;
  scene.add(water);
  
  // 添加水面反射光
  const waterLight = new THREE.PointLight(0x0077be, 0.3, 10);
  waterLight.position.set(0, 0.2, 0);
  scene.add(waterLight);
};

// 加载游艇模型
const loadYachtModel = () => {
  const loader = new GLTFLoader();
  loader.load(
    // '/wuyuanwan.glb',
    //  '/wuyuanwan_jingji.glb',
    //'/wuyuanwan.glb', // 模型路径，位于 public 目录下
     '6.gltf',
    (gltf) => {
      yacht = gltf.scene;
      yacht.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          
          // 提高材质质量
          if (child.material) {
            child.material.roughness = 0.4; // 调整粗糙度
            child.material.metalness = 0.6; // 增加金属感
            child.material.envMapIntensity = 1.2; // 增加环境贴图强度
            
            // 如果是船体，增加光泽度
            if (child.name.toLowerCase().includes('hull') || 
                child.name.toLowerCase().includes('body')) {
              child.material.clearcoat = 0.8;
              child.material.clearcoatRoughness = 0.2;
            }
          }
        }
      });
      
      // 调整模型大小和位置
      yacht.scale.set(1.2, 1.2, 1.2); // 增大模型尺寸到1.2倍
      yacht.position.y = 0.05; // 放在水面上方一点
      yacht.position.z = 0;
      yacht.position.x = 0;
      yacht.rotation.y = Math.PI / 4; // 旋转模型，使其更好地展示
      
      scene.add(yacht);
      loading.value = false; // 加载完成
    },
    (xhr) => {
      loadingProgress.value = Math.round((xhr.loaded / xhr.total) * 100);
      console.log(loadingProgress.value + '% 模型加载中');
    },
    (error) => {
      console.error('模型加载错误:', error);
      loading.value = false;
    }
  );
};

// 设置交互模式
const setInteractionMode = (mode) => {
  interactionMode.value = mode;
  if (mode === 'orbit') {
    controls.enabled = true;
  } else {
    controls.enabled = false;
  }
};

// 处理鼠标移动
const onMouseMove = (event) => {
  if (interactionMode.value !== 'inspect') return;
  
  const rect = canvas.value.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  // 更新射线
  raycaster.setFromCamera(mouse, camera);

  // 检测射线与模型的交点
  if (yacht) {
    const intersects = raycaster.intersectObject(yacht, true);
    
    // 恢复所有部件的原始材质
    yacht.traverse((child) => {
      if (child.isMesh) {
        resetMaterial(child);
      }
    });

    if (intersects.length > 0) {
      const intersectedObject = intersects[0].object;
      // 保存原始材质
      if (!originalMaterials.has(intersectedObject.uuid)) {
        originalMaterials.set(intersectedObject.uuid, intersectedObject.material.clone());
      }
      // 应用高亮材质
      intersectedObject.material = highlightMaterial;
      // 更新悬停部件信息
      hoveredPart.value = {
        name: intersectedObject.name || '未命名部件',
        position: intersects[0].point
      };
    } else {
      hoveredPart.value = null;
    }
  }
};

// 重置材质
const resetMaterial = (object) => {
  if (originalMaterials.has(object.uuid)) {
    object.material = originalMaterials.get(object.uuid);
  }
};

// 设置事件监听器
const setupEventListeners = () => {
  canvas.value.addEventListener('mousemove', onMouseMove);
  canvas.value.addEventListener('click', onModelClick);
  
  // 双击暂停/继续自动旋转
  canvas.value.addEventListener('dblclick', () => {
    if (interactionMode.value === 'orbit') {
      controls.autoRotate = !controls.autoRotate;
    }
  });
  
  // 键盘控制
  window.addEventListener('keydown', (event) => {
    if (!yacht) return;
    
    const speed = 0.1;
    switch(event.key) {
      case 'ArrowUp':
        yacht.position.z -= speed;
        break;
      case 'ArrowDown':
        yacht.position.z += speed;
        break;
      case 'ArrowLeft':
        yacht.position.x -= speed;
        yacht.rotation.y += 0.05;
        break;
      case 'ArrowRight':
        yacht.position.x += speed;
        yacht.rotation.y -= 0.05;
        break;
    }
  });
};

// 处理模型点击事件
const onModelClick = (event) => {
  // 计算鼠标在归一化设备坐标中的位置
  const rect = canvas.value.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  // 更新射线
  raycaster.setFromCamera(mouse, camera);

  // 检测射线与模型的交点
  if (yacht) {
    const intersects = raycaster.intersectObject(yacht, true);
    if (intersects.length > 0) {
      const intersect = intersects[0];
      
      // 计算新的相机位置
      const point = intersect.point;
      const offset = new THREE.Vector3(0, 5, 5); // 设置相机偏移
      const newPosition = new THREE.Vector3().copy(point).add(offset);
      
      // 使用GSAP或自定义动画来平滑移动相机
      const duration = 1000; // 动画持续时间（毫秒）
      const startPosition = camera.position.clone();
      const startTime = Date.now();
      
      function animateCamera() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 使用缓动函数使动画更平滑
        const easeProgress = easeInOutQuad(progress);
        
        camera.position.lerpVectors(startPosition, newPosition, easeProgress);
        camera.lookAt(point);
        
        if (progress < 1) {
          requestAnimationFrame(animateCamera);
        }
      }
      
      animateCamera();
    }
  }
};

// 缓动函数
const easeInOutQuad = (t) => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

// 动画循环
const animate = () => {
  animationFrameId = requestAnimationFrame(animate);
  
  // 更新控制器
  controls.update();
  
  // 添加水面波动效果 - 创建更真实的水波纹
  if (water) {
    const time = Date.now() * 0.00008; // 波纹速度
    const waterVertices = water.geometry.attributes.position.array;
    
    // 创建多层波纹叠加效果
    for (let i = 0; i < waterVertices.length; i += 3) {
      const x = waterVertices[i];
      const z = waterVertices[i + 2];
      
      // 计算到中心点的距离
      const distance = Math.sqrt(x * x + z * z);
      
      // 基础波纹幅度 - 距离越远波纹越小
      const baseAmplitude = Math.max(0.01, 0.05 / (1 + distance * 0.05));
      
      // 游艇周围的波纹
      const boatDistance = Math.sqrt(Math.pow(x, 2) + Math.pow(z, 2));
      const boatWaveAmplitude = boatDistance < 5 ? 0.02 * Math.max(0, 1 - boatDistance / 5) : 0;
      
      // 随机波纹 - 模拟自然水面的不规则性
      const randomOffset = Math.sin(x * 0.5 + z * 0.5) * 0.005;
      
      // 风吹波纹 - 模拟风吹过水面的效果
      const windEffect = Math.sin(x * 0.02 + z * 0.01 + time * 0.5) * 0.01;
      
      // 涟漪效果 - 模拟水面上的小涟漪
      const rippleEffect = 
        Math.sin(x * 2 + time * 2) * 0.002 * Math.exp(-0.1 * Math.abs(x)) +
        Math.sin(z * 2 + time * 2.5) * 0.002 * Math.exp(-0.1 * Math.abs(z));
      
      // 组合所有波纹效果
      waterVertices[i + 1] = 
        // 基础大波浪
        Math.sin(x * 0.05 + time) * baseAmplitude * 0.4 + 
        Math.sin(z * 0.04 + time * 0.7) * baseAmplitude * 0.5 +
        // 中等波浪
        Math.sin(x * 0.1 + z * 0.1 + time * 1.1) * baseAmplitude * 0.3 +
        // 游艇周围波纹
        (boatWaveAmplitude * Math.sin(boatDistance * 2 + time * 2)) +
        // 随机波纹
        randomOffset +
        // 风吹波纹
        windEffect +
        // 涟漪效果
        rippleEffect;
    }
    
    water.geometry.attributes.position.needsUpdate = true;
    water.geometry.computeVertexNormals(); // 重新计算法线，使光照更自然
  }
  
  // 如果游艇模型已加载，可以添加轻微的上下浮动效果
  if (yacht) {
    const time = Date.now() * 0.001;
    yacht.position.y = 0.05 + Math.sin(time * 0.4) * 0.01; // 减小浮动幅度，使其更平稳
    yacht.rotation.z = Math.sin(time * 0.25) * 0.002; // 减小摇晃幅度
    yacht.rotation.x = Math.sin(time * 0.3) * 0.001; // 添加前后轻微摇晃
  }
  
  // 渲染场景
  renderer.render(scene, camera);
};

// 窗口大小调整处理
const handleResize = () => {
  const container = canvas.value.parentElement;
  const width = container.clientWidth;
  const height = container.clientHeight;
  
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  
  renderer.setSize(width, height);
};

// 组件挂载时初始化
onMounted(() => {
  initScene();
  animate();
  
  // 添加窗口大小调整监听
  window.addEventListener('resize', handleResize);
});

// 组件卸载前清理资源
onBeforeUnmount(() => {
  if (canvas.value) {
    canvas.value.removeEventListener('mousemove', onMouseMove);
    canvas.value.removeEventListener('click', onModelClick);
  }
  
  // 清理材质
  originalMaterials.forEach(material => material.dispose());
  originalMaterials.clear();
  if (highlightMaterial) {
    highlightMaterial.dispose();
  }
  
  cancelAnimationFrame(animationFrameId);
  window.removeEventListener('resize', handleResize);
  
  // 清理Three.js资源
  if (renderer) {
    renderer.dispose();
  }
  
  if (scene) {
    scene.traverse((object) => {
      if (object.geometry) {
        object.geometry.dispose();
      }
      
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose());
        } else {
          object.material.dispose();
        }
      }
    });
  }
});
</script>

<style scoped>
.yacht-scene-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.loading-text {
  color: white;
  font-size: 24px;
  font-weight: bold;
}

.controls-info {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
  z-index: 5;
}

.control-tip {
  margin: 2px 0;
}

.interaction-controls {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 8px;
  border-radius: 4px;
  z-index: 5;
}

.mode-button {
  background-color: transparent;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin: 0 8px;
}

.mode-button.active {
  font-weight: bold;
}

.part-info {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
  z-index: 5;
}
</style> 