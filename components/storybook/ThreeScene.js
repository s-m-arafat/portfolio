'use client';

import React, { useEffect, useRef, useState } from 'react';

const ThreeScene = ({ entryUrl }) => {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    let scene, camera, renderer, animationId;
    const container = containerRef.current;

    const initScene = async () => {
      try {
        // Dynamically import Three.js and GSAP
        const THREE = await import('three');
        const gsap = await import('gsap');

        // Basic Three.js setup
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
          75,
          containerRef.current.clientWidth / containerRef.current.clientHeight,
          0.1,
          1000
        );
        
        renderer = new THREE.WebGLRenderer({ 
          antialias: true, 
          alpha: true 
        });
        renderer.setSize(
          container.clientWidth,
          container.clientHeight
        );
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // Example scene: rotating cube
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshPhongMaterial({ 
          color: 0xf59e0b,
          shininess: 100 
        });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        camera.position.z = 5;

        // GSAP animation
        gsap.default.to(cube.rotation, {
          y: Math.PI * 2,
          duration: 3,
          repeat: -1,
          ease: 'none',
        });

        // Animation loop
        const animate = () => {
          animationId = requestAnimationFrame(animate);
          cube.rotation.x += 0.01;
          renderer.render(scene, camera);
        };

        animate();
        setIsLoading(false);

      } catch (err) {
        console.error('Error loading 3D scene:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    initScene();

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (renderer && container) {
        container.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, [entryUrl]);

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto my-8 p-8 bg-red-50 rounded-2xl">
        <p className="text-red-700">Error loading 3D scene: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto my-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl overflow-hidden shadow-lg">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
        </div>
      )}
      <div
        ref={containerRef}
        className="w-full h-[400px] md:h-[500px]"
        style={{ minHeight: '400px' }}
      />
    </div>
  );
};

export default ThreeScene;
