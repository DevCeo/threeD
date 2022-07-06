import * as THREE from "three";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";

// ------ FirstPersonControls(FlyControls의 대체 구현) ------

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
  const controls = new FirstPersonControls(camera, renderer.domElement);
  controls.movementSpeed = 10;
  //controls.activeLook = false; // 주변을 둘러볼수 없다.
  //controls.lookSpeed = 0.1; // 마우스 움직임에 따라 회전하는 속도를 설정
  //controls.autoForward = true; // 자동으로 앞으로 나아간다.

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

    // FirstPersonControls는 update에 delta값을 넣어줘야한다.
    controls.update(delta);

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
