import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import dat from "dat.gui";

// ------ HemisphereLight ------

export default function example() {
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

  // Camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.y = 6;
  camera.position.z = 10;
  scene.add(camera);

  // Light
  //   const ambientLight = new THREE.AmbientLight("aliceblue", 0.7);
  //   scene.add(ambientLight);

  const hemisphereLight = new THREE.HemisphereLight("pink", "lime", 1);
  hemisphereLight.position.x = -5;
  hemisphereLight.position.y = 3;
  scene.add(hemisphereLight);

  // Light helper
  const lightHelper = new THREE.HemisphereLightHelper(hemisphereLight);
  scene.add(lightHelper);

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
  gui.add(hemisphereLight.position, "x", -5, 5, 0.1).name("빛 X");
  gui.add(hemisphereLight.position, "y", -5, 5, 0.1).name("빛 Y");
  gui.add(hemisphereLight.position, "z", 2, 10, 0.1).name("빛 Z");

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    // delta는 draw함수가 실행되면서 늘어나는 시간 간격
    // const delta = clock.getDelta();

    // getElapsedTime -> 늘어나는 시간을 반영
    const time = clock.getElapsedTime();

    // hemisphereLight.position.x = Math.cos(time) * 5;
    // hemisphereLight.position.z = Math.sin(time) * 5;

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
