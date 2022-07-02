import * as THREE from "three";

// ------ 안개(Fog) ------
export default function example() {
  // 동적으로 캔버스 조립하기
  // const renderer = new THREE.WebGLRenderer();
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild(renderer.domElement)

  // html파일에서 캔버스 가져와서 사용하기
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true, // 끊기는 선을 부드럽게 해주는 대신 성능은 좀 떨어진다.
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 해당 디스플레이 기기의 pixel의 값을 나타내는 메소드
  // console.log(window.devicePixelRatio);

  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // scene 생성
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(
    "black", // color
    "3", // near
    "7" // far
  );

  // camera 생성 (near와 far사이에 있어야 보인다.)
  const camera = new THREE.PerspectiveCamera(
    75, //시야각
    window.innerWidth / window.innerHeight, //종횡비
    0.1, //near
    1000 //far
  );
  // camera position을 설정하여 camera의 위치를 설정한다. (보통 앞으로 빼준다.)
  camera.position.y = 1;
  camera.position.z = 5;
  scene.add(camera);

  // light 생성 (첫번째 인자->색상, 두번쨰 인자-> 빛의 강도)
  const light = new THREE.DirectionalLight(0xffffff, 1);
  // light position 지정
  light.position.x = 1;
  light.position.y = 3;
  light.position.z = 10;
  scene.add(light);

  // mesh 생성 (무대 위에 올려져 있는 객체 하나하나라고 보면 된다.)
  // mesh = Geometry(모양) + Material(재질)
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: "#9960ff",
  });

  const meshes = [];
  let mesh;
  for (let i = 0; i < 10; i++) {
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.random() * 5 - 2.5;
    mesh.position.z = Math.random() * 5 - 2.5;
    scene.add(mesh);
    meshes.push(mesh);
  }

  // 그리기
  let oldTime = Date.now();

  function draw() {
    const newTime = Date.now();
    const deltaTime = newTime - oldTime;
    oldTime = newTime;

    meshes.forEach((item) => {
      item.rotation.y += deltaTime * 0.001;
    });

    renderer.render(scene, camera);

    // window.requestAnimationFrame(draw);

    // requestAnimationFrame과 동일한 기능, but webXR(vr 컨텐츠)에서는 반드시 setAnimationLoop를 사용해야한다.
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    // 창사이즈가 변하면 camera 종횡비가 변하기 때문에 다시 설정
    camera.aspect = window.innerWidth / window.innerHeight;
    // camera 투영에 관련된 값이 변화가 있을 때 써줘야하는 메소드
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 창사이즈가 변경될때 컨텐츠도 따라 변경될 수 있게하는 이벤트
  window.addEventListener("resize", setSize);

  draw();
}
