'use client';

import { useEffect, useRef } from 'react';

/**
 * Custom hook to handle auto-playing background music on page load
 * @param {boolean} isPlaying - Current playing state from BackgroundMusicProvider
 * @param {Function} toggle - Toggle function from BackgroundMusicProvider
 * @param {number} delay - Delay in milliseconds before attempting auto-play (default: 1000)
 */
export function useAutoPlayMusic(isPlaying, toggle, delay = 1000) {
  const autoPlayAttempted = useRef(false);

  useEffect(() => {
    // Only attempt auto-play once
    if (autoPlayAttempted.current) return;
    
    const savedPreference = localStorage.getItem('bgm-enabled');
    
    // Auto-play unless user explicitly turned it off
    if (savedPreference === 'false') {
      autoPlayAttempted.current = true;
      return;
    }
    
    // Set preference to true by default
    if (savedPreference === null) {
      localStorage.setItem('bgm-enabled', 'true');
    }
    
    // Attempt to play after a short delay
    const timer = setTimeout(() => {
      if (!isPlaying) {
        toggle();
      }
      autoPlayAttempted.current = true;
    }, delay);
    
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle]); // Include toggle in dependencies
}
