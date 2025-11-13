'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, Gauge, Minimize2, Headphones } from 'lucide-react';
import { useBackgroundMusic } from '@/providers/BackgroundMusicProvider';
import { useNarrationPlayer } from '@/providers/NarrationPlayerProvider';

export default function NarrationPlayer({ narrationUrl, duration, storyTitle, storySlug }) {
  const audioRef = useRef(null);
  const speedMenuRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(duration || 0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const { pause: pauseBGM, resume: resumeBGM } = useBackgroundMusic();
  const globalPlayer = useNarrationPlayer();

  // Sync with global player when it's controlling this track
  const isControlledByGlobal = globalPlayer.currentTrack?.url === narrationUrl;

  useEffect(() => {
    if (isControlledByGlobal) {
      setIsPlaying(globalPlayer.isPlaying);
      setCurrentTime(globalPlayer.currentTime);
      setVolume(globalPlayer.volume);
      setIsMuted(globalPlayer.isMuted);
      setPlaybackRate(globalPlayer.playbackRate);
      setAudioDuration(globalPlayer.duration || duration || 0);
    }
  }, [
    isControlledByGlobal,
    globalPlayer.isPlaying,
    globalPlayer.currentTime,
    globalPlayer.volume,
    globalPlayer.isMuted,
    globalPlayer.playbackRate,
    globalPlayer.duration,
    duration,
  ]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

  // Set initial volume and playback speed
    audio.volume = volume;
  audio.playbackRate = playbackRate;

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
  }, [resumeBGM, volume, playbackRate]);

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

  const togglePlay = async () => {
    if (isControlledByGlobal) {
      // Use global player controls
      await globalPlayer.togglePlay();
      if (!globalPlayer.isPlaying) {
        pauseBGM();
      } else {
        resumeBGM();
      }
      return;
    }

    // Local player logic
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      resumeBGM();
    } else {
      // Load into global player and start
      globalPlayer.loadTrack(narrationUrl, storyTitle, storySlug);
      pauseBGM();
      
      // Transfer current state to global player
      globalPlayer.changeVolume(volume);
      globalPlayer.changePlaybackRate(playbackRate);
      if (isMuted) globalPlayer.toggleMute();
      
      // Wait a bit for the track to load, then play and minimize
      await new Promise(resolve => setTimeout(resolve, 100));
      await globalPlayer.play();
      globalPlayer.minimize();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e) => {
    if (isControlledByGlobal) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      const newTime = percentage * globalPlayer.duration;
      globalPlayer.seek(newTime);
      return;
    }

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
    if (isControlledByGlobal) {
      globalPlayer.restart();
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    setCurrentTime(0);
  };

  const handleVolumeChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    
    if (isControlledByGlobal) {
      globalPlayer.changeVolume(percentage);
    } else {
      const audio = audioRef.current;
      if (!audio) return;
      
      setVolume(percentage);
      audio.volume = percentage;
      if (percentage > 0) {
        setIsMuted(false);
      }
    }
  };

  const toggleMute = () => {
    if (isControlledByGlobal) {
      globalPlayer.toggleMute();
      return;
    }

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

  const handleSpeedToggle = () => {
    const speeds = [1.25, 1.5, 1.75, 2.0];
    const idx = speeds.indexOf(playbackRate);
    if (idx === -1) {
      setPlaybackRate(speeds[0]);
    } else if (idx === speeds.length - 1) {
      setPlaybackRate(1.0); // cycle back to normal speed
    } else {
      setPlaybackRate(speeds[idx + 1]);
    }
  };

  const handleSpeedSelect = (speed) => {
    if (isControlledByGlobal) {
      globalPlayer.changePlaybackRate(speed);
    } else {
      setPlaybackRate(speed);
    }
    setShowSpeedMenu(false);
  };

  const handleMinimize = () => {
    if (isControlledByGlobal) {
      globalPlayer.minimize();
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
      {!isControlledByGlobal && (
        <audio ref={audioRef} src={narrationUrl} preload="metadata" />
      )}
      
      <div className="flex items-center gap-4">
        <Volume2 className="w-5 h-5 text-amber-900" />
        <h4 className="font-serif font-semibold text-gray-900">Audio Narration</h4>
        {isControlledByGlobal && globalPlayer.isMinimized && (
          <span className="ml-auto text-xs bg-amber-200 text-amber-900 px-2 py-1 rounded-full">
            Playing in mini-player
          </span>
        )}
      </div>

      {/* Headphone Suggestion */}
      <div className="mt-3 flex items-center gap-2 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
        <Headphones className="w-4 h-4 flex-shrink-0" />
        <span className="font-medium">Use headphones for the best immersive experience</span>
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

            {/* Playback Speed */}
            <div className="relative ml-2 pl-2 border-l border-amber-300" ref={speedMenuRef}>
              <button
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="flex items-center gap-1 px-2 py-1 text-xs bg-white hover:bg-amber-100 border border-amber-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                aria-label="Toggle playback speed"
                title="Playback speed"
              >
                <Gauge className="w-3 h-3" />
                {`${Number.isInteger(playbackRate) ? playbackRate.toFixed(0) : playbackRate}x`}
              </button>

              {/* Speed Dropdown Menu */}
              {showSpeedMenu && (
                <div className="absolute bottom-full mb-2 right-0 bg-white border border-amber-300 rounded-lg shadow-lg py-1 z-10 min-w-[80px]">
                  {[1.0, 1.25, 1.5, 1.75, 2.0].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => handleSpeedSelect(speed)}
                      className={`w-full px-3 py-2 text-xs text-left hover:bg-amber-50 transition-colors ${
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
          </div>
        </div>

        {/* Minimize button */}
        {isControlledByGlobal && !globalPlayer.isMinimized && (
          <button
            onClick={handleMinimize}
            className="p-2 hover:bg-amber-200 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Minimize to floating player"
            title="Minimize to floating player"
          >
            <Minimize2 className="w-4 h-4 text-gray-700" />
          </button>
        )}

        <div className="text-sm text-gray-700">
          {formatTime(currentTime)} / {formatTime(audioDuration)}
        </div>
      </div>
    </div>
  );
}
