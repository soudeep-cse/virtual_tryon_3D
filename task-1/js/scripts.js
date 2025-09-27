// Global variables
let scene, camera, renderer, currentAccessory;
let faceMesh, video, canvas3d;
let faceDetected = false;
let facePosition = { x: 0, y: 0, z: 0 };
let faceRotation = { x: 0, y: 0, z: 0 };
let faceScale = 1;
let lastTime = performance.now();
let frameCount = 0;
let isWireframe = false;

// Accessory settings
let accessorySettings = {
    scale: 1.0,
    yOffset: 0,
    zOffset: 0,
    rotation: 0
};

// GLB models configuration - Replace URLs with your actual .glb files
const accessoryModels = {
    glasses: {
        url: 'models\\glasses.glb', // Ensure this path is correct
        scale: { x: 0.95, y: 0.95, z: 0.95 },         // Reduced scale
        position: { x: 0, y: 0.015, z: 0.08 },     // Adjusted position
        rotation: { x: 0, y: Math.PI, z: 0 }
    },
    hat: {
        url: 'models\\hat.glb', // Add your hat.glb file if you have it
        scale: { x: 0.75, y: 0.30, z: 0.75 },
        position: { x: 0, y: 0.40, z: -0.05 }, 
        rotation: { x: 0, y: Math.PI * 2, z: 0 }
    }
};

// Fallback primitive geometries (when .glb files are not available)
const fallbackModels = {
    glasses: {
        geometry: 'box',
        color: 0x333333,
        scale: { x: 0.08, y: 0.02, z: 0.06 },
        position: { x: 0, y: -0.01, z: 0.03 }
    },
    hat: {
        geometry: 'cylinder',
        color: 0x8B4513,
        scale: { x: 0.12, y: 0.08, z: 0.12 },
        position: { x: 0, y: 0.08, z: 0 }
    },
    mask: {
        geometry: 'sphere',
        color: 0x4169E1,
        scale: { x: 0.06, y: 0.04, z: 0.02 },
        position: { x: 0, y: -0.02, z: 0.02 }
    }
};

// Initialize Three.js scene
function initThreeJS() {
    canvas3d = document.getElementById('canvas3d');
    
    // Scene
    scene = new THREE.Scene();
    
    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 1;
    
    // Renderer
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas3d, 
        alpha: true, 
        antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 1);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    console.log('Three.js initialized');
}

// GLTFLoader for loading .glb models
let gltfLoader;

// Initialize GLTF Loader
function initGLTFLoader() {
    gltfLoader = new THREE.GLTFLoader();
    console.log('GLTF Loader initialized');
}

// Load GLB model
function loadGLBModel(type, callback) {
    const config = accessoryModels[type];
    const modelStatusEl = document.getElementById('model-status');
    
    // Set initial loading status
    modelStatusEl.textContent = 'Loading...';
    document.getElementById('glb-status').textContent = `Loading ${type}...`;
    
    if (!config.url || config.url.includes('path/to/')) {
        modelStatusEl.textContent = 'No';
        document.getElementById('glb-status').textContent = `Using fallback for ${type}`;
        const mesh = createFallbackAccessory(type);
        callback(mesh);
        return;
    }
    
    console.log(`Loading GLB model from: ${config.url}`);
    
    gltfLoader.load(
        config.url,
        (gltf) => {
            modelStatusEl.textContent = 'Yes';
            document.getElementById('glb-status').textContent = `${type} loaded successfully`;
            
            const model = gltf.scene;
            
            // Apply initial transformations
            model.scale.set(
                config.scale.x,
                config.scale.y,
                config.scale.z
            );
            
            model.position.set(
                config.position.x,
                config.position.y,
                config.position.z
            );
            
            model.rotation.set(
                config.rotation.x,
                config.rotation.y,
                config.rotation.z
            );
            
            // Enable shadows
            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            
            callback(model);
        },
        (xhr) => {
            const percent = Math.round((xhr.loaded / xhr.total) * 100);
            document.getElementById('glb-status').textContent = `Loading ${type}: ${percent}%`;
        },
        (error) => {
            console.error('Error loading GLB:', error);
            modelStatusEl.textContent = 'Error';
            document.getElementById('glb-status').textContent = `Error loading ${type}`;
        }
    );
}

// Create fallback primitive accessory
function createFallbackAccessory(type) {
    const config = fallbackModels[type];
    let geometry, material, mesh;
    
    // Create geometry based on type
    switch(config.geometry) {
        case 'box':
            geometry = new THREE.BoxGeometry(1, 1, 1);
            break;
        case 'cylinder':
            geometry = new THREE.CylinderGeometry(0.8, 1, 1, 16);
            break;
        case 'sphere':
            geometry = new THREE.SphereGeometry(1, 16, 12);
            break;
        default:
            geometry = new THREE.BoxGeometry(1, 1, 1);
    }
    
    material = new THREE.MeshPhongMaterial({ 
        color: config.color,
        transparent: true,
        opacity: 0.9
    });
    
    mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(config.scale.x, config.scale.y, config.scale.z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    
    return mesh;
}

// Load accessory
function loadAccessory(type) {
    // Remove current accessory
    if (currentAccessory) {
        scene.remove(currentAccessory);
    }
    
    // Show loading state
    console.log(`Loading ${type} accessory...`);
    
    // Load GLB model or fallback
    loadGLBModel(type, (model) => {
        currentAccessory = model;
        currentAccessory.userData = { type: type }; // Store type for reference
        scene.add(currentAccessory);
        
        // Update button states
        document.querySelectorAll('#controls button').forEach(btn => {
            btn.classList.remove('active');
        });
        const button = document.getElementById(`btn-${type}`);
        if (button) button.classList.add('active');
        
        console.log(`${type} accessory loaded successfully`);
    });
}

// Clear accessory
function clearAccessory() {
    if (currentAccessory) {
        scene.remove(currentAccessory);
        currentAccessory = null;
    }
    document.querySelectorAll('#controls button').forEach(btn => {
        btn.classList.remove('active');
    });
}

// Initialize MediaPipe Face Mesh
function initFaceMesh() {
    faceMesh = new FaceMesh({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
        }
    });
    
    // Add error handler
    faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
        selfieMode: true  // Add this line
    });
    
    faceMesh.onResults(onFaceMeshResults);
    
    faceMesh.initialize().then(() => {
        console.log('FaceMesh model loaded successfully');
    }).catch(error => {
        console.error('Error initializing FaceMesh:', error);
    });
    
    console.log('Face Mesh initialized');
}


function onFaceMeshResults(results) {
    const faceStatusEl = document.getElementById('face-status');
    
    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        const landmarks = results.multiFaceLandmarks[0];
        faceDetected = true;
        faceStatusEl.textContent = 'Yes';
        faceStatusEl.style.color = '#00ff00';
        
        // Get key facial points
        const leftEye = landmarks[33];
        const rightEye = landmarks[263];
        
        // Calculate face center
        const eyeCenter = {
            x: (leftEye.x + rightEye.x) / 2,
            y: (leftEye.y + rightEye.y) / 2,
            z: (leftEye.z + rightEye.z) / 2
        };
        
        // Update face position with fixed mirroring
        facePosition.x = (1 - eyeCenter.x - 0.5) * 2; // Fix mirroring by using (1 - x)
        facePosition.y = -(eyeCenter.y - 0.5) * 2;
        facePosition.z = eyeCenter.z * 2;
        
        // Calculate face rotation
        const eyeVector = {
            x: rightEye.x - leftEye.x,
            y: rightEye.y - leftEye.y,
            z: rightEye.z - leftEye.z
        };
        
        faceRotation.z = -Math.atan2(eyeVector.y, eyeVector.x);
        
        // Calculate face scale
        const eyeDistance = Math.sqrt(
            Math.pow(rightEye.x - leftEye.x, 2) + 
            Math.pow(rightEye.y - leftEye.y, 2)
        );
        faceScale = eyeDistance * 5;
    } else {
        faceDetected = false;
        faceStatusEl.textContent = 'No';
        faceStatusEl.style.color = '#ff0000';
    }
}

// Initialize camera
async function initCamera() {
    try {
        video = document.getElementById('video');
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { 
                width: 640,  // Reduced size for better performance
                height: 480,
                facingMode: "user",
                frameRate: 30
            }
        });
        
        video.srcObject = stream;
        await video.play();  // Add this line
        
        // Create camera instance
        const camera = new Camera(video, {
            onFrame: async () => {
                await faceMesh.send({image: video});
            },
            width: 640,
            height: 480
        });
        camera.start();
        
    } catch (error) {
        console.error('Error accessing camera:', error);
        document.getElementById('loading').textContent = 'Error: Could not access camera';
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Process video frame
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        faceMesh.send({ image: video });
    }
    
    // Update accessory position and rotation
    if (currentAccessory && faceDetected) {
        const config = accessoryModels[Object.keys(accessoryModels).find(key => 
            currentAccessory.userData && currentAccessory.userData.type === key
        )] || accessoryModels.glasses;
        
        currentAccessory.position.set(
            facePosition.x, // Remove the negative sign here
            facePosition.y + config.position.y + (accessorySettings.yOffset * 0.0005),
            facePosition.z + config.position.z + (accessorySettings.zOffset * 0.0005)
        );
        
        currentAccessory.rotation.set(
            faceRotation.x,
            faceRotation.y,
            faceRotation.z + (accessorySettings.rotation * Math.PI / 180)
        );
        
        currentAccessory.scale.set(
            config.scale.x * faceScale * accessorySettings.scale,
            config.scale.y * faceScale * accessorySettings.scale,
            config.scale.z * faceScale * accessorySettings.scale
        );
        
        currentAccessory.visible = true;
    } else if (currentAccessory) {
        currentAccessory.visible = false;
    }
    
    // Render
    renderer.render(scene, camera);
    
    // Update FPS
    frameCount++;
    const currentTime = performance.now();
    if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        document.getElementById('fps').textContent = `${fps} FPS`;
        frameCount = 0;
        lastTime = currentTime;
    }
}

// Control handlers
function setupControls() {
    // Scale slider
    const scaleSlider = document.getElementById('scale-slider');
    const scaleValue = document.getElementById('scale-value');
    scaleSlider.addEventListener('input', (e) => {
        accessorySettings.scale = parseFloat(e.target.value);
        scaleValue.textContent = e.target.value;
    });
    
    // Y position slider
    const yPosSlider = document.getElementById('y-pos-slider');
    const yPosValue = document.getElementById('y-pos-value');
    yPosSlider.addEventListener('input', (e) => {
        accessorySettings.yOffset = parseInt(e.target.value);
        yPosValue.textContent = e.target.value;
    });
    
    // Z position slider
    const zPosSlider = document.getElementById('z-pos-slider');
    const zPosValue = document.getElementById('z-pos-value');
    zPosSlider.addEventListener('input', (e) => {
        accessorySettings.zOffset = parseInt(e.target.value);
        zPosValue.textContent = e.target.value;
    });
    
    // Rotation slider
    const rotationSlider = document.getElementById('rotation-slider');
    const rotationValue = document.getElementById('rotation-value');
    rotationSlider.addEventListener('input', (e) => {
        accessorySettings.rotation = parseInt(e.target.value);
        rotationValue.textContent = e.target.value + '°';
    });
}

// Toggle wireframe
function toggleWireframe() {
    if (currentAccessory) {
        isWireframe = !isWireframe;
        currentAccessory.material.wireframe = isWireframe;
    }
}

// Download screenshot
function downloadScreenshot() {
    const link = document.createElement('a');
    link.download = `virtual-tryon-${Date.now()}.png`;
    
    // Render current frame to canvas and download
    renderer.render(scene, camera);
    link.href = renderer.domElement.toDataURL();
    link.click();
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialize everything
async function init() {
    // Add this check at the beginning
    fetch('./models/glasses.glb')
        .then(response => {
            if (!response.ok) {
                throw new Error('GLB file not found');
            }
            console.log('GLB file exists and is accessible');
        })
        .catch(error => {
            console.error('Error checking GLB file:', error);
            document.getElementById('glb-status').textContent = 'GLB file not found - Check path';
        });

    initThreeJS();
    initGLTFLoader();
    initFaceMesh();
    setupControls();
    await initCamera();
    
    // Load default accessory
    loadAccessory('glasses');
    
    // Start animation loop
    animate();
    
    // Handle resize
    window.addEventListener('resize', onWindowResize);
    
    console.log('AR Virtual Try-On system initialized!');
}

// Start the application
init().catch(console.error);