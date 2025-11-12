'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { useBackgroundMusic } from '@/providers/BackgroundMusicProvider';

export default function NarrationPlayer({ narrationUrl, duration }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(duration || 0);
  const [volume, setVolume] = useState(0.6); // Default to 80%
  const [isMuted, setIsMuted] = useState(false);
  const { pause: pauseBGM, resume: resumeBGM } = useBackgroundMusic();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set initial volume
    audio.volume = volume;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setAudioDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      resumeBGM();
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [resumeBGM, volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      resumeBGM();
    } else {
      pauseBGM();
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * audioDuration;
    
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleRestart = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    setCurrentTime(0);
  };

  const handleVolumeChange = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    
    setVolume(percentage);
    audio.volume = percentage;
    if (percentage > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 shadow-md">
      <audio ref={audioRef} src={narrationUrl} preload="metadata" />
      
      <div className="flex items-center gap-4">
        <Volume2 className="w-5 h-5 text-amber-900" />
        <h4 className="font-serif font-semibold text-gray-900">Audio Narration</h4>
      </div>

      {/* Progress Bar */}
      <div
        className="mt-4 h-2 bg-gray-300 rounded-full cursor-pointer relative overflow-hidden"
        onClick={handleSeek}
        role="slider"
        aria-label="Seek audio"
        aria-valuemin={0}
        aria-valuemax={audioDuration}
        aria-valuenow={currentTime}
      >
        <div
          className="h-full bg-amber-500 rounded-full transition-all"
          style={{ width: `${(currentTime / audioDuration) * 100}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="p-3 bg-amber-500 hover:bg-amber-600 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white" />
            )}
          </button>

          <button
            onClick={handleRestart}
            className="p-2 hover:bg-amber-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Restart"
          >
            <RotateCcw className="w-4 h-4 text-gray-700" />
          </button>

          {/* Volume Control */}
          <div className="flex items-center gap-2 ml-2 pl-2 border-l border-amber-300">
            <button
              onClick={toggleMute}
              className="p-2 hover:bg-amber-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-gray-700" />
              ) : (
                <Volume2 className="w-4 h-4 text-gray-700" />
              )}
            </button>

            <div
              className="w-20 h-1.5 bg-gray-300 rounded-full cursor-pointer relative overflow-hidden"
              onClick={handleVolumeChange}
              role="slider"
              aria-label="Volume control"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round((isMuted ? 0 : volume) * 100)}
            >
              <div
                className="h-full bg-amber-500 rounded-full transition-all"
                style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
              />
            </div>

            <div className="text-xs text-gray-600 w-8">
              {Math.round((isMuted ? 0 : volume) * 100)}%
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-700">
          {formatTime(currentTime)} / {formatTime(audioDuration)}
        </div>
      </div>
    </div>
  );
}
