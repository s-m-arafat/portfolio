'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const BackgroundMusicContext = createContext();

export function BackgroundMusicProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef(null);

  // Load user preference from localStorage
  useEffect(() => {
    const savedPreference = localStorage.getItem('bgm-enabled');
    if (savedPreference !== null) {
      setIsPlaying(savedPreference === 'true');
    }
  }, []);

  // Initialize audio element
  useEffect(() => {
    if (typeof window !== 'undefined' && !audioRef.current) {
      // Create audio element
      const audio = new Audio();
      audio.loop = true;
      audio.volume = volume;
      
      // Try to load the background music
      audio.src = '/assets/stories/audio/background-music.mp3';
      
      // Handle loading errors gracefully
      audio.addEventListener('error', () => {
        console.warn('Background music file not found. Add background-music.mp3 to enable this feature.');
      });
      
      audioRef.current = audio;
      setIsLoaded(true);
    }
  }, [volume]);

  // Handle play/pause based on state
  useEffect(() => {
    if (!audioRef.current || !isLoaded) return;

    const audio = audioRef.current;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Auto-play prevented:', error);
          setIsPlaying(false);
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, isLoaded]);

  const toggle = () => {
    setIsPlaying((prev) => {
      const newState = !prev;
      localStorage.setItem('bgm-enabled', String(newState));
      return newState;
    });
  };

  const pause = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
    }
  };

  const resume = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(console.warn);
    }
  };

  const changeVolume = (newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <BackgroundMusicContext.Provider
      value={{
        isPlaying,
        toggle,
        pause,
        resume,
        volume,
        changeVolume,
      }}
    >
      {children}
    </BackgroundMusicContext.Provider>
  );
}

export function useBackgroundMusic() {
  const context = useContext(BackgroundMusicContext);
  if (context === undefined) {
    throw new Error('useBackgroundMusic must be used within BackgroundMusicProvider');
  }
  return context;
}
