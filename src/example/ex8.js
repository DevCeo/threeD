import * as THREE from "three";

// ------ 애니메이션 보정(기기마다 1초에 돌아가는 각도의 횟수가 차이가 날 수 있기 때문에 그것을 보안한 코드)
// getElapsedTime() 메소드 ------
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

  // camera 생성 (near와 far사이에 있어야 보인다.)
  const camera = new THREE.PerspectiveCamera(
    75, //시야각
    window.innerWidth / window.innerHeight, //종횡비
    0.1, //near
    1000 //far
  );
  // camera position을 설정하여 camera의 위치를 설정한다. (보통 앞으로 빼준다.)
  camera.position.z = 5;
  scene.add(camera);

  // light 생성 (첫번째 인자->색상, 두번쨰 인자-> 빛의 강도)
  const light = new THREE.DirectionalLight(0xffffff, 1);
  // light position 지정
  light.position.x = 3;
  light.position.z = 2;
  scene.add(light);

  // mesh 생성 (무대 위에 올려져 있는 객체 하나하나라고 보면 된다.)
  // mesh = Geometry(모양) + Material(재질)
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial({
    color: "#9960ff",
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // 그리기
  const clock = new THREE.Clock();
  function draw() {
    // 성능이 좋거나 안좋거나 상관없이 모든 기기에서 같은 횟수로 회전하게끔 한다.
    // getElapsedTime() -> 실행 시점부터 총 경과 시간을 나타낸다.
    // console.log(clock.getElapsedTime());
    const time = clock.getElapsedTime();
    // mesh를 이동하는 메소드
    mesh.rotation.x = time; // 회전속도를 더 빠르게 해주고 싶다면 숫자를 곱하면된다.
    mesh.position.x += 0.03;
    if (mesh.position.x > 10) {
      mesh.position.x = 0;
    }
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
