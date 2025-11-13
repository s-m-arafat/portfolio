'use client';

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const NarrationPlayerContext = createContext(null);

export function NarrationPlayerProvider({ children }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [currentTrack, setCurrentTrack] = useState(null); // { url, title, storySlug }
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.playbackRate = playbackRate;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [volume, playbackRate]);

  const loadTrack = (url, title, storySlug) => {
    const audio = audioRef.current;
    if (audio) {
      // Pause current playback
      audio.pause();
      setIsPlaying(false);
    }
    
    setCurrentTrack({ url, title, storySlug });
    setCurrentTime(0);
    setIsMinimized(false);
  };

  const play = async () => {
    if (audioRef.current) {
      try {
        // Wait for audio to be ready
        if (audioRef.current.readyState < 2) {
          await new Promise((resolve) => {
            const onCanPlay = () => {
              audioRef.current.removeEventListener('canplay', onCanPlay);
              resolve();
            };
            audioRef.current.addEventListener('canplay', onCanPlay);
          });
        }
        
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error playing audio:', error);
        setIsPlaying(false);
      }
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = async () => {
    if (isPlaying) {
      pause();
    } else {
      await play();
    }
  };

  const seek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const restart = () => {
    seek(0);
  };

  const changeVolume = (newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const changePlaybackRate = (rate) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const closePlayer = () => {
    pause();
    setCurrentTrack(null);
    setCurrentTime(0);
    setIsMinimized(false);
  };

  const minimize = () => {
    setIsMinimized(true);
  };

  const maximize = () => {
    setIsMinimized(false);
  };

  const value = {
    // State
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    playbackRate,
    currentTrack,
    isMinimized,
    audioRef,
    // Actions
    loadTrack,
    play,
    pause,
    togglePlay,
    seek,
    restart,
    changeVolume,
    toggleMute,
    changePlaybackRate,
    closePlayer,
    minimize,
    maximize,
  };

  return (
    <NarrationPlayerContext.Provider value={value}>
      <audio ref={audioRef} src={currentTrack?.url} preload="metadata" />
      {children}
    </NarrationPlayerContext.Provider>
  );
}

export function useNarrationPlayer() {
  const context = useContext(NarrationPlayerContext);
  if (!context) {
    throw new Error('useNarrationPlayer must be used within NarrationPlayerProvider');
  }
  return context;
}
