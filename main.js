import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "https://cdn.jsdelivr.net/npm/lil-gui@0.20/+esm";

// UI
const gui = new GUI();

// 定義
let scene,
  camera,
  renderer,
  pointLight,
  controls,
  moonMesh,
  material,
  directionalLight;

// 月齢と呼び名
const moonAges = [
  { age: 0, name: "新月（しんげつ）" },
  { age: 3, name: "三日月（みかづき）" },
  { age: 7, name: "上弦の月（じょうげんのつき）" },
  { age: 10, name: "十日夜（とうかんや）" },
  { age: 13, name: "十三夜月（じゅうさんやづき）" },
  { age: 15, name: "望月（もちづき）・満月（まんげつ）" },
  { age: 19, name: "寝待月（ねまちづき）・臥待月（ふしまちづき）" },
  { age: 22, name: "下弦の月（かげんのつき）" },
];

window.addEventListener("load", init);

function init() {
  // シーンの作成
  scene = new THREE.Scene();

  // カメラの作成
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 700;

  // レンダラーの作成
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);

  // テクスチャを追加
  let texture = new THREE.TextureLoader().load("./images/texture.jpg");

  // ジオメトリの作成
  let moon = new THREE.SphereGeometry(40, 64, 32);

  // マテリアル
  material = new THREE.MeshPhysicalMaterial({ map: texture });

  // メッシュ化
  moonMesh = new THREE.Mesh(moon, material);
  scene.add(moonMesh);

  // 平行光源
  // let dirctionalLight = new THREE.DirectionalLight(0xffffff, 2);
  // dirctionalLight.position.set(1, 1, 1);
  // scene.add(dirctionalLight);
  // 平行光源（正しい名前で宣言）
  directionalLight = new THREE.DirectionalLight(0xffffff, 2); // ここで宣言
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  let directionalLighttHerper = new THREE.DirectionalLightHelper(
    directionalLight,
    30
  );
  scene.add(directionalLighttHerper);

  // ポイント光源
  pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(-200, -200, -200);
  pointLight.decay = 1;
  pointLight.power = 200;

  scene.add(pointLight);

  // ポイント光源がどこにあるか
  let pointLightHerper = new THREE.PointLightHelper(pointLight, 10);
  scene.add(pointLightHerper);

  controls = new OrbitControls(camera, renderer.domElement);

  window.addEventListener("resize", onWindowResize);

  // 月齢のボタン作成
  createMoonAgeButtons();

  // デバック用のフォルダ追加
  const positionFolder = gui.addFolder("Position");
  const visibleFolder = gui.addFolder("Visible");

  // 位置の調整
  positionFolder
    .add(moonMesh.position, "x")
    .min(-300)
    .max(300)
    .step(0.01)
    .name("positionX");
  positionFolder
    .add(moonMesh.position, "y")
    .min(-300)
    .max(300)
    .step(0.01)
    .name("positionY");
  positionFolder
    .add(moonMesh.position, "z")
    .min(-300)
    .max(300)
    .step(0.01)
    .name("positionZ");
  positionFolder
    .add(moonMesh.rotation, "x")
    .min(-Math.PI)
    .max(Math.PI)
    .step(0.01)
    .name("rotationX");

  // 表示設定の調整
  visibleFolder.add(moonMesh, "visible");
  visibleFolder.add(material, "wireframe");

  // 色の調整
  gui.addColor(material, "color");

  // デバッグ用に方向光の位置と強度をGUIに追加
  const lightFolder = gui.addFolder("Directional Light");

  lightFolder.add(directionalLight.position, "x", -500, 500).name("Position X");
  lightFolder.add(directionalLight.position, "y", -500, 500).name("Position Y");
  lightFolder.add(directionalLight.position, "z", -500, 500).name("Position Z");
  lightFolder.add(directionalLight, "intensity", 0, 5).name("Intensity");

  animate();
}

// ブラウザリサイズ対応
function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  // アスペクト
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  // 画面幅が一定以下（例：768px）ならGUIを非表示にする
  if (window.innerWidth <= 768) {
    gui.domElement.style.display = "none"; // GUIを非表示
  } else {
    gui.domElement.style.display = "block"; // GUIを表示
  }
}

// 月齢に基づいて光源を変更する

function changeLightForMoonAge(age) {
  switch (age) {
    case 0: // 新月
      directionalLight.position.set(0, 0, -300); // 月が地球の裏側にあるので影響なし
      directionalLight.intensity = 0; // 新月なので光源の強度をゼロに
      break;
    case 3: // 三日月
      directionalLight.position.set(30, 0, -30); // 少し光源を横にずらす
      directionalLight.intensity = 4; // 低い光源
      break;
    case 7: // 上弦の月
      directionalLight.position.set(500, 5, -50); // 光源を更に強く
      directionalLight.intensity = 1.5;
      break;
    case 10: // 十三夜月（じゅうさんやづき
      directionalLight.position.set(500, 20, 410); // 光源を更に強く
      directionalLight.intensity = 1.5;
      break;
    case 13: // 十三夜月（じゅうさんやづき
      directionalLight.position.set(500, 20, 480); // 光源を更に強く
      directionalLight.intensity = 1.5;
      break;
    case 15: // 満月
      directionalLight.position.set(30, 10, 300); // 満月の位置に
      directionalLight.intensity = 2; // 強い光源
      break;
    case 19: // 下弦の月
      directionalLight.position.set(-350, 1, 352); // 光源を下方向に
      directionalLight.intensity = 1.5;
      break;
    case 22: // 下弦の月
      directionalLight.position.set(-500, -5, -5); // 光源を下方向に
      directionalLight.intensity = 1.5;

      break;
    default:
      directionalLight.position.set(0, 0, 0); // その他の場合、標準設定
      directionalLight.intensity = 0.5;
      break;
  }
}
// 月齢ボタンを作成
function createMoonAgeButtons() {
  const buttonFolder = gui.addFolder("月齢");

  moonAges.forEach((moon) => {
    buttonFolder.add(
      { [moon.name]: () => changeLightForMoonAge(moon.age) },
      moon.name
    );
  });
}

// ポイント光源を回る
function animate() {
  pointLight.position.set(
    200 * Math.sin(Date.now() / 500),
    200 * Math.sin(Date.now() / 1000),
    200 * Math.cos(Date.now() / 500)
  );
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
