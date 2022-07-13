import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// ------ 여러가지 텍스처가 적용된 큐브 ------

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
  const rightTexture = textureLoader.load("/texture/mcstyle/right.png");
  const leftTexture = textureLoader.load("/texture/mcstyle/left.png");
  const topTexture = textureLoader.load("/texture/mcstyle/top.png");
  const bottomTexture = textureLoader.load("/texture/mcstyle/bottom.png");
  const frontTexture = textureLoader.load("/texture/mcstyle/front.png");
  const backTexture = textureLoader.load("/texture/mcstyle/back.png");

  const materials = [
    new THREE.MeshBasicMaterial({ map: rightTexture }),
    new THREE.MeshBasicMaterial({ map: leftTexture }),
    new THREE.MeshBasicMaterial({ map: topTexture }),
    new THREE.MeshBasicMaterial({ map: bottomTexture }),
    new THREE.MeshBasicMaterial({ map: frontTexture }),
    new THREE.MeshBasicMaterial({ map: backTexture }),
  ];

  rightTexture.magFilter = THREE.NearestFilter;
  leftTexture.magFilter = THREE.NearestFilter;
  topTexture.magFilter = THREE.NearestFilter;
  bottomTexture.magFilter = THREE.NearestFilter;
  frontTexture.magFilter = THREE.NearestFilter;
  backTexture.magFilter = THREE.NearestFilter;

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
  camera.position.y = 2;
  camera.position.z = 6;
  scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight("white", 0.5);
  const directionalLight = new THREE.DirectionalLight("white", 1);
  directionalLight.position.set(1, 1, 2);
  scene.add(ambientLight, directionalLight);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);

  // Mesh
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const mesh = new THREE.Mesh(geometry, materials);
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
