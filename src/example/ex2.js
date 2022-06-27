import * as THREE from "three"

// 직교 카메라 (멀리 있든 가까이 있든 크기가 똑같이 보이는 기법-위에서 바라보는 느낌)
export default function example() {
// 동적으로 캔버스 조립하기
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement)

// html파일에서 캔버스 가져와서 사용하기
const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGLRenderer({ 
    canvas,
    antialias: true // 끊기는 선을 부드럽게 해주는 대신 성능은 좀 떨어진다.
});
renderer.setSize(window.innerWidth, window.innerHeight);

// scene 생성
const scene = new THREE.Scene();

// Orthographic camera(직교 카메라) 생성
// Mesh가 가까이 있든 멀리 있든 크기가 같아보이는 기법
// 예를 들어 하늘에서 보는거와 같은 느낌의 카메라
const camera = new THREE.OrthographicCamera(
    -(window.innerWidth/window.innerHeight), //left
    window.innerWidth/window.innerHeight, //right
    1, //top
    -1, //bottom
    0.1, //near
    1000 //far
);
camera.position.x = 1;
camera.position.y = 2;
camera.position.z = 5;
camera.lookAt(0, 0, 0); //camera가 원점을 바라보게 설정한 코드
camera.zoom = 0.5; //zoomin, zoomout 설정 가능한 메소드
camera.updateProjectionMatrix(); //camera 렌더에 대한 속성을 바꿨으면 이 메소드를 호출해줘야한다.
scene.add(camera);

// mesh 생성 (무대 위에 올려져 있는 객체 하나하나라고 보면 된다.)
// mesh = Geometry(모양) + Material(재질)
const geometry = new THREE.BoxGeometry(1, 1 ,1);
const material = new THREE.MeshBasicMaterial({
    color: '#9960ff'
}); //MeshBasicMaterial -> 빛의 조명을 안받는 재질, 그래서 빛이 없어도 잘보인다.

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 최종적으로 mesh를 무대 위에 올릴라면 renderer로 그려줘야한다.
renderer.render(scene, camera);

}