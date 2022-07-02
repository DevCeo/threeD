import * as THREE from "three";

// ------ AxesHelper(축), GridHelper(그리드) ------

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
  camera.position.x = 1;
  camera.position.y = 3;
  camera.position.z = 0;
  scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight("#ffffff", 0.3);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight("#ffffff", 1);
  directionalLight.position.x = 1;
  directionalLight.position.z = 2;
  scene.add(directionalLight);

  // AxesHelper(x,y,z 축 생성)
  const axesHelper = new THREE.AxesHelper(3);
  scene.add(axesHelper);

  // GridHelper(격자 생성)
  const gridHelper = new THREE.GridHelper(5);
  scene.add(gridHelper);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: "seagreen",
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = 2;
  camera.lookAt(mesh.position);
  scene.add(mesh);

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const time = clock.getElapsedTime();

    mesh.rotation.y = time;

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
