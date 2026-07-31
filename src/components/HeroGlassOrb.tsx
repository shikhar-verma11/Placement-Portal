import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const HeroGlassOrb: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isGrabbed, setIsGrabbed] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Detect mobile device for quality scaling
    const isMobile = window.innerWidth < 768 || navigator.maxTouchPoints > 0;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Studio Environment Lighting Map using PMREMGenerator
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0x151515);

    // Overhead key studio light
    const topLight = new THREE.Mesh(
      new THREE.PlaneGeometry(16, 16),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    topLight.position.set(0, 10, -2);
    topLight.rotation.x = Math.PI / 2;
    envScene.add(topLight);

    // Lateral cool accent studio light (Vision Pro blue-gray reflection)
    const sideLight1 = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 12),
      new THREE.MeshBasicMaterial({ color: 0x98b7e8 })
    );
    sideLight1.position.set(10, 3, 5);
    sideLight1.lookAt(0, 0, 0);
    envScene.add(sideLight1);

    // Soft neutral fill light
    const sideLight2 = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshBasicMaterial({ color: 0xd4d8e0 })
    );
    sideLight2.position.set(-10, -2, -3);
    sideLight2.lookAt(0, 0, 0);
    envScene.add(sideLight2);

    const envMap = pmremGenerator.fromScene(envScene).texture;
    scene.environment = envMap;
    pmremGenerator.dispose();

    // Directional Lighting
    const keyLight = new THREE.DirectionalLight(0xfafafa, 1.8);
    keyLight.position.set(6, 8, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x6a8dff, 1.4);
    rimLight.position.set(-7, 4, -5);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xd4d4d4, 0.6);
    fillLight.position.set(0, -6, 4);
    scene.add(fillLight);

    const ambientLight = new THREE.AmbientLight(0x1f2430, 0.6);
    scene.add(ambientLight);

    // Main Orb Group
    const orbGroup = new THREE.Group();
    scene.add(orbGroup);

    // Outer Glass Shell Material (Frosted glass with polished edges & subtle blue-gray tint)
    const segments = isMobile ? 36 : 64;
    const outerGeo = new THREE.SphereGeometry(2.1, segments, segments);

    const outerMaterial = new THREE.MeshPhysicalMaterial({
      transmission: 0.96,
      opacity: 1,
      transparent: true,
      roughness: 0.18, // Matte frosted glass texture
      metalness: 0.02,
      ior: 1.5,
      thickness: 1.8,
      reflectivity: 0.65,
      specularIntensity: 0.9,
      clearcoat: 0.85, // Polished outer sheen
      clearcoatRoughness: 0.08,
      color: new THREE.Color('#dce6f4'), // Subtle blue-gray tint
      attenuationColor: new THREE.Color('#8eaad4'),
      attenuationDistance: 2.5,
    });

    const outerShell = new THREE.Mesh(outerGeo, outerMaterial);
    orbGroup.add(outerShell);

    // Layer 1: Concentric Refractive Inner Ring
    const ringGeo1 = new THREE.TorusGeometry(1.35, 0.12, isMobile ? 16 : 32, isMobile ? 32 : 64);
    const ringMat1 = new THREE.MeshPhysicalMaterial({
      transmission: 0.88,
      opacity: 0.9,
      transparent: true,
      roughness: 0.12,
      ior: 1.58,
      thickness: 1.2,
      clearcoat: 1.0,
      color: new THREE.Color('#b0cded'),
      attenuationColor: new THREE.Color('#6a8dff'),
      attenuationDistance: 1.8,
    });
    const innerRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    innerRing1.rotation.set(Math.PI / 4, 0, Math.PI / 6);
    orbGroup.add(innerRing1);

    // Layer 2: Inner Core Sculpture
    const coreGeo = new THREE.IcosahedronGeometry(0.95, isMobile ? 2 : 3);
    const coreMat = new THREE.MeshPhysicalMaterial({
      transmission: 0.92,
      opacity: 0.95,
      transparent: true,
      roughness: 0.08,
      metalness: 0.05,
      ior: 1.52,
      thickness: 1.5,
      clearcoat: 1.0,
      color: new THREE.Color('#789be8'),
      attenuationColor: new THREE.Color('#4d72db'),
      attenuationDistance: 1.2,
    });
    const innerCore = new THREE.Mesh(coreGeo, coreMat);
    orbGroup.add(innerCore);

    // Layer 3: Secondary Thin Floating Glass Ring
    const ringGeo2 = new THREE.TorusGeometry(1.78, 0.025, 16, isMobile ? 32 : 64);
    const ringMat2 = new THREE.MeshPhysicalMaterial({
      transmission: 0.94,
      transparent: true,
      roughness: 0.1,
      clearcoat: 1.0,
      color: new THREE.Color('#d0d9e8'),
    });
    const innerRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    innerRing2.rotation.set(-Math.PI / 3, Math.PI / 5, 0);
    orbGroup.add(innerRing2);

    // Soft Ground Shadow Plane Below Orb
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const ctx = shadowCanvas.getContext('2d')!;
    const shadowGrad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
    shadowGrad.addColorStop(0.35, 'rgba(0, 0, 0, 0.22)');
    shadowGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.06)');
    shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = shadowGrad;
    ctx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(6.0, 6.0);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -3.2;
    scene.add(shadowMesh);

    // Helper to calculate visible world bounds at z=0 for full Hero section
    const calculateWorldBounds = () => {
      const vFOV = THREE.MathUtils.degToRad(camera.fov);
      const visibleHeight = 2 * Math.tan(vFOV / 2) * camera.position.z;
      const visibleWidth = visibleHeight * camera.aspect;
      return { visibleWidth, visibleHeight };
    };

    let { visibleWidth, visibleHeight } = calculateWorldBounds();

    // Initial position on load
    let currentX = width >= 1024 ? visibleWidth * 0.22 : 0;
    let currentY = width >= 1024 ? 0 : -visibleHeight * 0.08;

    // Floating equilibrium anchor adapts wherever the user moves/throws the orb in the Hero section
    let anchorX = currentX;
    let anchorY = currentY;

    let vx = 0;
    let vy = 0;

    // Deformation scales for wall bounce compression
    let squashX = 1.0;
    let squashY = 1.0;

    // Raycasting & Pointer Tracking
    const raycaster = new THREE.Raycaster();
    const mouseNDC = new THREE.Vector2(-100, -100);

    let mouseWorldX = currentX;
    let mouseWorldY = currentY;
    let prevMouseWorldX = currentX;
    let prevMouseWorldY = currentY;
    let mouseVx = 0;
    let mouseVy = 0;

    let grabbedState = false;

    const orbRadiusWorld = 2.1;

    // Calculate mouse position relative strictly to the entire #hero section element
    const updateMousePos = (clientX: number, clientY: number) => {
      const heroEl = document.getElementById('hero');
      if (!heroEl) return;
      const rect = heroEl.getBoundingClientRect();

      mouseNDC.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouseNDC.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouseNDC, camera);
      const ray = raycaster.ray;
      if (Math.abs(ray.direction.z) > 0.0001) {
        const distanceToZ0 = -ray.origin.z / ray.direction.z;
        mouseWorldX = ray.origin.x + ray.direction.x * distanceToZ0;
        mouseWorldY = ray.origin.y + ray.direction.y * distanceToZ0;
      }
    };

    // Pointer event handlers
    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;

      updateMousePos(e.clientX, e.clientY);
      raycaster.setFromCamera(mouseNDC, camera);
      const intersects = raycaster.intersectObject(outerShell);
      const distToMouse = Math.hypot(mouseWorldX - currentX, mouseWorldY - currentY);

      if (intersects.length > 0 || distToMouse < orbRadiusWorld * 1.3) {
        e.preventDefault();
        grabbedState = true;
        setIsGrabbed(true);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      updateMousePos(e.clientX, e.clientY);
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (grabbedState) {
        e.preventDefault();
        grabbedState = false;
        setIsGrabbed(false);

        // Momentum transfer upon release
        const throwFactor = 0.38;
        vx = Math.min(0.38, Math.max(-0.38, mouseVx * throwFactor));
        vy = Math.min(0.38, Math.max(-0.38, mouseVy * throwFactor));
      }
    };

    const handlePointerCancel = () => {
      if (grabbedState) {
        grabbedState = false;
        setIsGrabbed(false);
      }
    };

    const heroEl = document.getElementById('hero');
    const targetEventEl = heroEl || window;

    targetEventEl.addEventListener('pointerdown', handlePointerDown as EventListener);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerCancel);

    // Scroll reaction
    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      const bounds = calculateWorldBounds();
      visibleWidth = bounds.visibleWidth;
      visibleHeight = bounds.visibleHeight;
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsedTime = clock.getElapsedTime();

      // Mouse velocity calculation in world space
      mouseVx = (mouseWorldX - prevMouseWorldX) / (delta || 0.016);
      mouseVy = (mouseWorldY - prevMouseWorldY) / (delta || 0.016);
      prevMouseWorldX = mouseWorldX;
      prevMouseWorldY = mouseWorldY;

      // Raycast hover check
      raycaster.setFromCamera(mouseNDC, camera);
      const intersects = raycaster.intersectObject(outerShell);
      const distToMouse = Math.hypot(mouseWorldX - currentX, mouseWorldY - currentY);
      const isRaycastHit = intersects.length > 0;
      const isHoveredState = isRaycastHit || distToMouse < orbRadiusWorld * 1.3;
      setIsHovered(isHoveredState);

      // World Boundary limits strictly derived from the entire Hero section bounding box
      const limitX = Math.max(0.8, (visibleWidth / 2) - orbRadiusWorld - 0.2);
      const limitY = Math.max(0.5, (visibleHeight / 2) - orbRadiusWorld - 0.2);

      let ax = 0;
      let ay = 0;

      if (grabbedState) {
        // GRABBED PHYSICS: Heavy glass sphere spring following cursor with liquid lag & inertia
        const grabStiffness = 0.038;
        const grabDamping = 0.86;

        const fx = (mouseWorldX - currentX) * grabStiffness;
        const fy = (mouseWorldY - currentY) * grabStiffness;

        vx = (vx + fx) * grabDamping;
        vy = (vy + fy) * grabDamping;

        // Anchor adapts to current position while dragging
        anchorX = currentX;
        anchorY = currentY;
      } else {
        // UNTOUCHED / IDLE / RELEASED PHYSICS
        // Anchor smoothly tracks current position so the orb floats wherever it was moved/thrown (NO snapping back to right column)
        anchorX += (currentX - anchorX) * 0.03;
        anchorY += (currentY - anchorY) * 0.03;

        // Clamp anchor within full Hero section limits
        anchorX = Math.max(-limitX, Math.min(limitX, anchorX));
        anchorY = Math.max(-limitY, Math.min(limitY, anchorY));

        // Organic idle floating motion around current anchor
        const idleFloatX = Math.cos(elapsedTime * 0.45) * 0.12;
        const idleFloatY = Math.sin(elapsedTime * 0.75) * 0.15;

        const targetX = anchorX + idleFloatX;
        const targetY = anchorY + idleFloatY;

        // Subtle attraction force when cursor is nearby (hovering does NOT pull orb far, just gentle magnetic influence)
        const pullRadius = 3.6;
        if (distToMouse < pullRadius && distToMouse > 0.6) {
          const pullFactor = Math.min(0.006, 0.012 / (distToMouse * distToMouse + 1.2));
          ax += ((mouseWorldX - currentX) / distToMouse) * pullFactor;
          ay += ((mouseWorldY - currentY) / distToMouse) * pullFactor;
        }

        // Soft equilibrium centering towards local float target
        const homeStiffness = 0.003;
        ax += (targetX - currentX) * homeStiffness;
        ay += (targetY - currentY) * homeStiffness;

        // Air drag
        const airDrag = 0.948;
        vx = (vx + ax) * airDrag;
        vy = (vy + ay) * airDrag;
      }

      // Update Position
      currentX += vx;
      currentY += vy;

      // Hero Outer Boundary Collisions - ONLY Hero outer edges
      const bounceDamping = 0.55;

      if (currentX < -limitX) {
        currentX = -limitX;
        vx = -vx * bounceDamping;
        squashX = 0.85;
        anchorX = -limitX;
      } else if (currentX > limitX) {
        currentX = limitX;
        vx = -vx * bounceDamping;
        squashX = 0.85;
        anchorX = limitX;
      }

      if (currentY < -limitY) {
        currentY = -limitY;
        vy = -vy * bounceDamping;
        squashY = 0.85;
        anchorY = -limitY;
      } else if (currentY > limitY) {
        currentY = limitY;
        vy = -vy * bounceDamping;
        squashY = 0.85;
        anchorY = limitY;
      }

      // Shape squish recovery
      squashX += (1.0 - squashX) * 0.12;
      squashY += (1.0 - squashY) * 0.12;

      // Speed-based dynamic stretch & wobble
      const speed = Math.hypot(vx, vy);
      const stretchFactor = Math.min(0.15, speed * 0.32);
      const moveAngle = Math.atan2(vy, vx);

      // Visual Feedback Interpolations
      const targetScale = grabbedState ? 1.025 : (isHoveredState ? 1.015 : 1.0);
      const targetRimIntensity = grabbedState ? 2.2 : (isHoveredState ? 1.75 : 1.4);
      const targetSpecular = grabbedState ? 1.3 : (isHoveredState ? 1.18 : 0.9);
      const targetClearcoat = grabbedState ? 1.0 : (isHoveredState ? 0.96 : 0.85);

      rimLight.intensity += (targetRimIntensity - rimLight.intensity) * 0.08;
      outerMaterial.specularIntensity += (targetSpecular - outerMaterial.specularIntensity) * 0.08;
      outerMaterial.clearcoat += (targetClearcoat - outerMaterial.clearcoat) * 0.08;

      // Subtle breathing motion
      const breathing = 1.0 + Math.sin(elapsedTime * 0.6) * 0.006;

      // Scale transform
      orbGroup.scale.set(
        targetScale * squashX * (1 + stretchFactor) * breathing,
        targetScale * squashY * (1 - stretchFactor * 0.5) * breathing,
        targetScale * breathing
      );

      // Rotation & tilt
      const baseRotationDelta = 0.004 * (grabbedState ? 1.8 : 1.0);
      outerShell.rotation.y += baseRotationDelta;
      innerRing1.rotation.y += baseRotationDelta * 1.3;
      innerRing1.rotation.x += baseRotationDelta * 0.6;
      innerCore.rotation.y -= baseRotationDelta * 0.8;
      innerRing2.rotation.z += baseRotationDelta * 1.1;

      const hoverTiltX = (isHoveredState && !grabbedState) ? (mouseWorldY - currentY) * 0.04 : 0;
      const hoverTiltZ = (isHoveredState && !grabbedState) ? -(mouseWorldX - currentX) * 0.04 : 0;

      orbGroup.rotation.x = -vy * 0.2 + (scrollY * 0.0003) + hoverTiltX;
      if (!isNaN(moveAngle) && speed > 0.01) {
        orbGroup.rotation.z = Math.sin(elapsedTime * 2) * 0.05 + moveAngle * 0.1 + hoverTiltZ;
      } else {
        orbGroup.rotation.z += (hoverTiltZ - orbGroup.rotation.z) * 0.05;
      }

      // Position in 3D scene
      orbGroup.position.set(currentX, currentY, 0);

      // Ground shadow plane follows orb
      shadowMesh.position.set(currentX, -limitY - 0.4, -0.5);
      const shadowScale = 1 - currentY * 0.1;
      shadowMesh.scale.set(Math.max(0.4, shadowScale), Math.max(0.4, shadowScale), 1);
      shadowMat.opacity = Math.max(0.1, 0.42 - currentY * 0.08);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      targetEventEl.removeEventListener('pointerdown', handlePointerDown as EventListener);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerCancel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 w-full h-full select-none overflow-visible touch-none pointer-events-auto transition-colors duration-200 ${
        isGrabbed ? 'cursor-grabbing' : isHovered ? 'cursor-grab' : 'cursor-default'
      }`}
      aria-label="3D Frosted Glass Orb Interactive Visual"
    />
  );
};
