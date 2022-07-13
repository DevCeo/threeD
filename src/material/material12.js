import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// ------ MeshMatcapMaterial ------

export default function example() {
  // texture image loading manager
  const loadingManager = new THREE.LoadingManager();
  loadingManager.onStart = () => {
    console.log("load start");
  };
  // 이미지가 하나하나 로드될때마다 발생
  loadingManager.onProgress = (img) => {
    console.log(img + " load");
  };
  // 이미지가 다 로드되었을 때
  loadingManager.onLoad = () => {
    console.log("load finish");
  };
  loadingManager.onError = () => {
    console.log("load error");
  };

  //texture image load
  const textureLoader = new THREE.TextureLoader(loadingManager);
  const matcapTexture = textureLoader.load("/texture/matcap/material3.jpg");
  // Renderer
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // Scene
  const scene = new THREE.Scene();
  //   scene.background = new THREE.Color("white");

  // Camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.y = 1.5;
  camera.position.z = 4;
  scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight("white", 0.5);
  const directionalLight = new THREE.DirectionalLight("white", 1);
  directionalLight.position.set(1, 1, 2);
  scene.add(ambientLight, directionalLight);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);

  // Mesh
  //   const geometry = new THREE.SphereGeometry(1, 64, 64);
  const geometry = new THREE.ConeBufferGeometry(1, 2, 128);
  const material = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const delta = clock.getDelta();

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener("resize", setSize);

  draw();
}
