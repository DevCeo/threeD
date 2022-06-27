import * as THREE from "three";

// ------ 기본 장면 ------
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

  // scene 생성
  const scene = new THREE.Scene();

  // camera 생성 (near와 far사이에 있어야 보인다.)
  const camera = new THREE.PerspectiveCamera(
    75, //시야각
    window.innerWidth / window.innerHeight, //종횡비
    0.1, //near
    1000 //far
  );
  // camera position을 설정하여 camera의 위치를 설정한다. (보통 앞으로 빼준다.)
  camera.position.x = 1;
  camera.position.y = 2;
  camera.position.z = 5;
  scene.add(camera);

  // mesh 생성 (무대 위에 올려져 있는 객체 하나하나라고 보면 된다.)
  // mesh = Geometry(모양) + Material(재질)
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: "#9960ff",
  }); //MeshBasicMaterial -> 빛의 조명을 안받는 재질, 그래서 빛이 없어도 잘보인다.

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 최종적으로 mesh를 무대 위에 올릴라면 renderer로 그려줘야한다.
  renderer.render(scene, camera);
}
