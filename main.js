import './style.css'

import * as THREE from 'three';

import { OrbitControls, ThreeMFLoader } from 'three/examples/jsm/Addons.js';

import { FBXLoader } from 'three/examples/jsm/Addons.js';

import { GLTFLoader } from 'three/examples/jsm/Addons.js';

import { VRMLLoader } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347,});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)

const pointlight = new THREE.PointLight(0xffffff, 500)
pointlight.position.set(10,10,10)
pointlight.rotation.set(0,0,0) 

const ambientLight = new THREE.AmbientLight(0xffffff)

//const LightHelper = new THREE.PointLightHelper(pointlight)

//const gridHelper= new THREE.GridHelper(200, 50);

const controls = new OrbitControls(camera, renderer.domElement);


scene.add(pointlight)
scene.add(ambientLight)
//scene.add(LightHelper, gridHelper)

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff } )
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  
  scene.add(star)
}

Array(200).fill().forEach(addStar)

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg')
scene.background = spaceTexture




// Avatar

const jeffTexture = new THREE.TextureLoader().load('jeff.png')

const jeff = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( { map: jeffTexture } )
);

scene.add(jeff)
jeff.position.set(0, 0, 0)

// Moon

const MoonTexture = new THREE.TextureLoader().load('moon.jpg');
const MoonNormalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry( 3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: MoonTexture,
    normalMap: MoonNormalTexture
  })

);

scene.add(moon)
moon.position.z =30;
moon.position.setX(-10);

// Move camera

function movecamera() {
  const t = document.body.getBoundingClientRect().top
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = movecamera


function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;

  controls.update();

  renderer.render(scene, camera);
}

animate()