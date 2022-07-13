import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import dat from "dat.gui";

// ------ SpotLight ------

export default function example() {
  // Renderer
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  // rendere 그림자 설정
  renderer.shadowMap.enabled = true;

  // renderer.shadowMap.type = THREE.PCFShadowMap;
  // renderer.shadowMap.type = THREE.BasicShadowMap; // 성능이 제일 좋다
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap; // PCFShadowMap보다 좀 더 부드러운 대신 성능이 떨어짐

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.y = 6;
  camera.position.z = 10;
  scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight("aliceblue", 0.7);
  scene.add(ambientLight);

  const spotLight = new THREE.SpotLight("aliceblue", 1, 30, Math.PI / 6);
  spotLight.position.x = -5;
  spotLight.position.y = 3;
  scene.add(spotLight);

  // Light helper
  const lightHelper = new THREE.SpotLightHelper(spotLight);
  scene.add(lightHelper);

  // 그림자 설정
  spotLight.castShadow = true;
  // mapSize => default value는 512;
  spotLight.shadow.mapSize.width = 2048;
  spotLight.shadow.mapSize.height = 2048;
  // radius는 부드럽게 처리가능
  // spotLight.shadow.radius = 15; // 기본값인 THREE.PCFShadowMap에서만 적용
  spotLight.shadow.camera.near = 1;
  spotLight.shadow.camera.far = 10;

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);

  // Geometry
  const planeGeometry = new THREE.PlaneGeometry(10, 10);
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const sphereGeometry = new THREE.SphereGeometry(0.7, 16, 16);

  // Material
  const material1 = new THREE.MeshStandardMaterial({ color: "white" });
  const material2 = new THREE.MeshStandardMaterial({ color: "skyblue" });
  const material3 = new THREE.MeshStandardMaterial({ color: "plum" });

  // Mesh
  const plane = new THREE.Mesh(planeGeometry, material1);
  const box = new THREE.Mesh(boxGeometry, material2);
  const sphere = new THREE.Mesh(sphereGeometry, material3);

  scene.add(plane, box, sphere);

  plane.rotation.x = -Math.PI * 0.5;
  box.position.set(1, 1, 0);
  sphere.position.set(-1, 1, 0);

  // Mesh 그림자 설정
  plane.receiveShadow = true;
  box.castShadow = true;
  box.receiveShadow = true;
  sphere.castShadow = true;
  sphere.receiveShadow = true;

  // AxesHelper
  const axesHelper = new THREE.AxesHelper(3);
  scene.add(axesHelper);

  // Dat GUI
  const gui = new dat.GUI();
  gui.add(spotLight.position, "x", -5, 5, 0.1).name("빛 X");
  gui.add(spotLight.position, "y", -5, 5, 0.1).name("빛 Y");
  gui.add(spotLight.position, "z", 2, 10, 0.1).name("빛 Z");

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    // delta는 draw함수가 실행되면서 늘어나는 시간 간격
    // const delta = clock.getDelta();

    // getElapsedTime -> 늘어나는 시간을 반영
    const time = clock.getElapsedTime();

    // spotLight.position.x = Math.cos(time) * 5;
    // spotLight.position.z = Math.sin(time) * 5;

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
