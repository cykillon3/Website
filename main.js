import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';

import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/GLTFLoader.js';
import { VRMLLoader } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/loaders/VRMLLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(35);

renderer.render(scene, camera);

// Torus geometry
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x9999ff });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Point Light
const pointlight = new THREE.PointLight(0xffffff, 10);
pointlight.position.set(10, 10, 10);

// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

const controls = new OrbitControls(camera, renderer.domElement);
scene.add(pointlight, ambientLight);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);

  scene.add(star);
}

Array(500).fill().forEach(addStar);

scene.background = new THREE.Color(0x050505);

// Moon
const MoonTexture = new THREE.TextureLoader().load('images/moon.jpg');
const MoonNormalTexture = new THREE.TextureLoader().load('images/normal.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: MoonTexture,
    normalMap: MoonNormalTexture,
  })
);
scene.add(moon);
moon.position.z = 30;
moon.position.setX(-10);

function movecamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = movecamera;

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;

  controls.update();
  renderer.render(scene, camera);
}

animate();
