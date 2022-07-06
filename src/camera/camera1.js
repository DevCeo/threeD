import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// ------ OrbitControls ------

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
  camera.position.y = 1.5;
  camera.position.z = 4;
  scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight("white", 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight("white", 1);
  directionalLight.position.x = 1;
  directionalLight.position.z = 2;
  scene.add(directionalLight);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // control의 느낌을 좀 더 부드럽게 해준다.
  //   controls.enableZoom = false; // zoomIn, zoomOut 불가하게
  controls.maxDistance = 14; // 최대거리 설정
  controls.minDistance = 5; // 최소거리 설정
  controls.maxPolarAngle = THREE.MathUtils.degToRad(135); // 하단 각도
  controls.minPolarAngle = THREE.MathUtils.degToRad(45); // 상단 각도
  controls.target.set(2, 2, 2); // x,y,z 로 회전의 중심축을 정해준다.
  controls.autoRotate = true; // 자동으로 돌아가게
  controls.autoRotateSpeed = 5; // 자동으로 돌아가게하는거 속도 지정

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  let material;
  let mesh;
  for (let i = 0; i < 20; i += 1) {
    material = new THREE.MeshStandardMaterial({
      color: `rgb(
            ${50 + Math.floor(Math.random() * 205)}, 
            ${50 + Math.floor(Math.random() * 205)}, 
            ${50 + Math.floor(Math.random() * 205)}
            )`,
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 5;
    mesh.position.y = (Math.random() - 0.5) * 5;
    mesh.position.z = (Math.random() - 0.5) * 5;
    scene.add(mesh);
  }

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const delta = clock.getDelta();

    controls.update();

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
