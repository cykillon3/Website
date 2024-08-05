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

//Renderer

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(35);

renderer.render(scene, camera);

// Torus geometry

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0x9999ff,});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)

//Cube
// const cubeGeometry = new THREE.BoxGeometry()
// const cubeMaterial = new THREE.MeshStandardMaterial({color: 0xffffff,});
// const Cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// scene.add(Cube)

// Point Light

const pointlight = new THREE.PointLight(0xffffff, 10)
pointlight.position.set(10,10,10)
pointlight.rotation.set(0,0,0) 

// Ambient light

const ambientLight = new THREE.AmbientLight(0xffffff, .5)

//const LightHelper = new THREE.PointLightHelper(pointlight)

//const gridHelper= new THREE.GridHelper(200, 50);

const controls = new OrbitControls(camera, renderer.domElement);


scene.add(pointlight)
scene.add(ambientLight)
//scene.add(LightHelper, gridHelper)


//stars


function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff, emissive: 0xffffff } )
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  
  scene.add(star)
}

Array(500).fill().forEach(addStar)

// Background

//const spaceTexture = new THREE.TextureLoader().load('/images/background.png')
scene.background = new THREE.Color(0x050505);



// Project model

// const Aviloader = new GLTFLoader();

// let avi;
// Aviloader.load( '/models/beanscented.gltf', function ( avatar ) {

// 	scene.add( avatar.scene );

// }, undefined, function ( error ) {

// 	console.error( error );

// } );




function updateModelPosition() {
  if (torus) {
    // Get the position of the HTML element
    const header = document.getElementById('header');
    const rect = header.getBoundingClientRect();

    // Convert HTML element's position to normalized device coordinates (NDC)
    const x = (rect.left / window.innerWidth) * 2 - 0.5;
    const y = -(rect.top / window.innerHeight) * 2 + 0.5;

    // Project the NDC to 3D world coordinates
    torus.position.x = x * 2;
    torus.position.y = y * 2;
  }
}

// Avatar

const jeffTexture = new THREE.TextureLoader().load('/images/jeff.png')

const jeff = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( { map: jeffTexture } )
);

//scene.add(jeff)
//jeff.position.set(0, 0, 0)

// Moon

const MoonTexture = new THREE.TextureLoader().load('/images/moon.jpg');
const MoonNormalTexture = new THREE.TextureLoader().load('/images/normal.jpg');

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

  // Cube.position.y += 0.01;
  //Cube.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = movecamera


// button

// var coll = document.getElementsByClassName("collapsible");
// var i;

// for (i = 0; i < coll.length; i++) {
//   coll[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     var content = this.nextElementSibling;
//     if (content.style.display === "block") {
//       content.style.display = "none";
//     } else {
//       content.style.display = "block";
//     }
//   });
// }

// Torus Animation

function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;



  controls.update();

  renderer.render(scene, camera);
}

animate()