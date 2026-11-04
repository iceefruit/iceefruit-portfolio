'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { HeroCore3D } from './HeroCore';
import { ParticleField3D } from './ParticleField';
import { useScrollProgress } from '@/hooks/useScrollProgress';

export const SceneCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScrollProgress();
  const [hasWebGLError, setHasWebGLError] = useState(false);
  const scrollRef = useRef(scrollYProgress);
  scrollRef.current = scrollYProgress;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch (e) {
      console.warn('WebGL is not supported on this device. Displaying fallback grid.', e);
      setHasWebGLError(true);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 7;

    const heroCore = new HeroCore3D();
    scene.add(heroCore.group);

    const particleField = new ParticleField3D();
    scene.add(particleField.points);

    // Subtle ambient & directional orange rim lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const orangeLight = new THREE.PointLight(0xFF5E00, 2, 20);
    orangeLight.position.set(4, 3, 5);
    scene.add(orangeLight);

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const currentScroll = scrollRef.current;

      heroCore.update(elapsedTime, currentScroll, mouseX, mouseY);
      particleField.update(elapsedTime, currentScroll);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  if (hasWebGLError) {
    return (
      <div className="fixed inset-0 pointer-events-none -z-10 bg-icee-dark cyber-grid opacity-30" />
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
      aria-hidden="true"
    />
  );
};
