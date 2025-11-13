'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, X, Gauge, Maximize2, Headphones } from 'lucide-react';
import { useNarrationPlayer } from '@/providers/NarrationPlayerProvider';
import { useRouter } from 'next/navigation';

export default function FloatingNarrationPlayer() {
  const router = useRouter();
  const speedMenuRef = useRef(null);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    playbackRate,
    currentTrack,
    isMinimized,
    togglePlay,
    seek,
    changeVolume,
    toggleMute,
    changePlaybackRate,
    closePlayer,
    maximize,
  } = useNarrationPlayer();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(event.target)) {
        setShowSpeedMenu(false);
      }
    };

    if (showSpeedMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSpeedMenu]);

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    seek(newTime);
  };

  const handleVolumeChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    changeVolume(percentage);
  };

  const handleSpeedSelect = (speed) => {
    changePlaybackRate(speed);
    setShowSpeedMenu(false);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const goToStory = () => {
    if (currentTrack?.storySlug) {
      router.push(`/storybook/${currentTrack.storySlug}`);
      maximize();
    }
  };

  const handleTogglePlay = async () => {
    await togglePlay();
  };

  // Don't render if no track is loaded or if not minimized
  if (!currentTrack || !isMinimized) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-4 right-4 z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="max-w-5xl mx-auto bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 border-2 border-amber-300 rounded-2xl shadow-2xl backdrop-blur-sm">
        <div className="px-4 py-2.5">
          <div className="flex items-center gap-3">
            {/* Story Info */}
            <button
              onClick={goToStory}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity min-w-0 flex-shrink"
            >
              <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Volume2 className="w-4 h-4 text-white" />
              </div>
              <div className="text-left min-w-0 hidden sm:block">
                <p className="font-serif font-semibold text-xs text-gray-900 truncate">
                  {currentTrack.title || 'Audio Narration'}
                </p>
                <p className="text-[10px] text-gray-600">Click to view story</p>
              </div>
              </button>

            {/* Headphone Tip */}
            <div className="hidden lg:flex items-center gap-1 px-2 py-1 bg-amber-50 border border-amber-200 rounded-md flex-shrink-0">
              <Headphones className="w-3 h-3 text-amber-700" />
              <span className="text-[10px] text-amber-800 font-medium whitespace-nowrap">Best with headphones</span>
            </div>

            {/* Progress Bar */}
            <div className="flex-1 min-w-0">
            <div
              className="h-1 bg-gray-300 rounded-full cursor-pointer relative overflow-hidden"
              onClick={handleSeek}
              role="slider"
              aria-label="Seek audio"
              aria-valuemin={0}
              aria-valuemax={duration}
              aria-valuenow={currentTime}
            >
              <div
                className="h-full bg-amber-600 rounded-full transition-all"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-0.5">
              <span className="text-[10px] text-gray-600">{formatTime(currentTime)}</span>
              <span className="text-[10px] text-gray-600">{formatTime(duration)}</span>
            </div>
          </div>

            {/* Controls */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {/* Play/Pause */}
              <button
              onClick={handleTogglePlay}
              className="p-1.5 bg-amber-500 hover:bg-amber-600 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 text-white" />
              )}
              </button>

              {/* Volume */}
              <div className="hidden md:flex items-center gap-1.5 pl-1.5 border-l border-amber-300">
              <button
                onClick={toggleMute}
                className="p-1.5 hover:bg-amber-200 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-3.5 h-3.5 text-gray-700" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 text-gray-700" />
                )}
              </button>

              <div
                className="w-12 h-1 bg-gray-300 rounded-full cursor-pointer relative overflow-hidden"
                onClick={handleVolumeChange}
                role="slider"
                aria-label="Volume control"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round((isMuted ? 0 : volume) * 100)}
              >
                <div
                  className="h-full bg-amber-600 rounded-full transition-all"
                  style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
                />
              </div>

              <span className="text-[10px] text-gray-700 w-7 text-right">
                {Math.round((isMuted ? 0 : volume) * 100)}%
              </span>
              </div>

              {/* Speed Control */}
              <div className="relative pl-1.5 border-l border-amber-300" ref={speedMenuRef}>
              <button
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="flex items-center gap-0.5 px-1.5 py-1 text-[10px] bg-white hover:bg-amber-100 border border-amber-300 rounded-md text-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
                aria-label="Toggle playback speed"
                title="Playback speed"
              >
                <Gauge className="w-3 h-3" />
                {`${Number.isInteger(playbackRate) ? playbackRate.toFixed(0) : playbackRate}x`}
              </button>

              {showSpeedMenu && (
                <div className="absolute bottom-full mb-2 right-0 bg-white border border-amber-300 rounded-lg shadow-lg py-1 z-10 min-w-[70px] animate-in fade-in slide-in-from-bottom-2 duration-200">
                  {[1.0, 1.25, 1.5, 1.75, 2.0].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => handleSpeedSelect(speed)}
                      className={`w-full px-2.5 py-1.5 text-[10px] text-left hover:bg-amber-50 transition-colors ${
                        playbackRate === speed ? 'bg-amber-100 font-semibold text-amber-900' : 'text-gray-700'
                      }`}
                    >
                      {`${Number.isInteger(speed) ? speed.toFixed(0) : speed}x`}
                      {speed === 1.0 && ' (Normal)'}
                    </button>
                  ))}
                </div>
              )}
              </div>

              {/* Maximize */}
              <button
              onClick={goToStory}
              className="p-1.5 hover:bg-amber-200 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 ml-1 border-l border-amber-300 pl-2.5"
              aria-label="Maximize player"
              title="Go to story"
            >
              <Maximize2 className="w-3.5 h-3.5 text-gray-700" />
              </button>

              {/* Close */}
              <button
                onClick={closePlayer}
                className="p-1.5 hover:bg-red-100 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                aria-label="Close player"
              >
                <X className="w-3.5 h-3.5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
