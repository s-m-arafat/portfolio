'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import lottie-web to avoid SSR issues
const LottieAnimation = ({ lottieUrl, loop = true, autoplay = true }) => {
  const containerRef = useRef(null);
  const [lottie, setLottie] = useState(null);
  const animationRef = useRef(null);

  useEffect(() => {
    // Dynamically import lottie-web
    import('lottie-web').then((module) => {
      setLottie(module.default);
    });
  }, []);

  useEffect(() => {
    if (!lottie || !containerRef.current || !lottieUrl) return;

    // Load animation
    animationRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop,
      autoplay,
      path: lottieUrl,
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
      }
    };
  }, [lottie, lottieUrl, loop, autoplay]);

  return (
    <div className="w-full max-w-2xl mx-auto my-8">
      <div
        ref={containerRef}
        className="w-full h-auto"
        style={{ minHeight: '300px' }}
      />
    </div>
  );
};

export default LottieAnimation;
