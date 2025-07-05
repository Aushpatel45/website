class Dragon {
    constructor(scene) {
        this.scene = scene;
        this.model = null;
        this.fireParticleSystem = null;
    }

    async loadModel() {
        const loader = new THREE.GLTFLoader();
        const gltf = await loader.loadAsync('assets/models/dragon.glb');
        this.model = gltf.scene;
        this.scene.add(this.model);
    }

    fly() {
        if (this.model) {
            this.model.position.set(0, 0, 0);
            this.model.rotation.y = Math.PI; // Face the camera
            this.animateFly();
        }
    }

    animateFly() {
        const flyAnimation = () => {
            requestAnimationFrame(flyAnimation);
            if (this.model) {
                this.model.position.y += 0.01; // Move up
                this.model.rotation.y += 0.01; // Rotate
            }
        };
        flyAnimation();
    }

    breatheFire() {
        // Create a fire particle system
        const fireGeometry = new THREE.ConeGeometry(0.1, 1, 8);
        const fireMaterial = new THREE.MeshBasicMaterial({ color: 0xff4500 });
        const fire = new THREE.Mesh(fireGeometry, fireMaterial);
        fire.position.set(0, 0, -1); // Position in front of the dragon
        this.scene.add(fire);
        
        // Animate fire
        const animateFire = () => {
            requestAnimationFrame(animateFire);
            fire.scale.y += 0.05; // Grow the fire
            fire.scale.x += 0.05; // Grow the fire
            fire.material.opacity = Math.max(0, fire.material.opacity - 0.01); // Fade out
            if (fire.material.opacity <= 0) {
                this.scene.remove(fire); // Remove fire after it fades
            }
        };
        animateFire();
    }

    displayMessage() {
        const message = document.createElement('div');
        message.style.position = 'absolute';
        message.style.top = '50%';
        message.style.left = '50%';
        message.style.transform = 'translate(-50%, -50%)';
        message.style.color = 'white';
        message.style.fontSize = '24px';
        message.innerText = "Nothing is free in this world, there is a reason behind everything.";
        document.body.appendChild(message);
    }
}

export default Dragon;