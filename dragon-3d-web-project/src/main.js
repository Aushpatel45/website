// This file initializes the 3-D scene, loads the dragon model, and handles animations.

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Dragon } from './dragon/Dragon.js';

let scene, camera, renderer, dragon;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5).normalize();
    scene.add(light);

    dragon = new Dragon();
    dragon.loadModel().then(() => {
        scene.add(dragon.model);
        animate();
    });

    camera.position.z = 5;
}

function animate() {
    requestAnimationFrame(animate);
    dragon.fly();
    renderer.render(scene, camera);
}

window.onload = init;