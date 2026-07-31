import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x071320, 0.015);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 25);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Particle Starfield / Quantum Dust
    const particleCount = 700;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorTeal = new THREE.Color(0x14f1d9);
    const colorMint = new THREE.Color(0x00ffc6);
    const colorBlue = new THREE.Color(0x3b82f6);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

      const randColor = Math.random() > 0.5 ? colorTeal : Math.random() > 0.5 ? colorMint : colorBlue;
      colors[i * 3] = randColor.r;
      colors[i * 3 + 1] = randColor.g;
      colors[i * 3 + 2] = randColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    mainGroup.add(particles);

    // 2. 3D Floating Futuristic Geometric Polyhedrons
    const geoCount = 5;
    const meshList: THREE.Mesh[] = [];

    for (let i = 0; i < geoCount; i++) {
      const geoType = i % 2 === 0 ? new THREE.IcosahedronGeometry(1.8, 1) : new THREE.OctahedronGeometry(2.2, 0);
      const wireMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x14f1d9 : 0x00ffc6,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      });

      const mesh = new THREE.Mesh(geoType, wireMat);
      mesh.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 30
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      meshList.push(mesh);
      mainGroup.add(mesh);
    }

    // 3. Grid Floor Perspective Plane
    const gridHelper = new THREE.GridHelper(120, 40, 0x14f1d9, 0x0f172a);
    gridHelper.position.y = -12;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.25;
    mainGroup.add(gridHelper);

    // Mouse Parallax Interaction
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Window Resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Group & Camera motion
      mainGroup.rotation.y = elapsedTime * 0.03 + currentMouseX * 0.2;
      mainGroup.rotation.x = currentMouseY * 0.15;

      // Rotate geometric wireframes
      meshList.forEach((m, idx) => {
        m.rotation.x += 0.005 * (idx + 1);
        m.rotation.y += 0.008 * (idx + 1);
        m.position.y += Math.sin(elapsedTime * 1.5 + idx) * 0.01;
      });

      // Animate particles
      particles.rotation.y = elapsedTime * 0.01;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
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
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
