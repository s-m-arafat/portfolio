'use client';

import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicToggleButton({ isPlaying, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 group backdrop-blur-sm"
      aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-5 h-5 text-amber-900 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium text-amber-900">
            Background Music Playing
          </span>
        </>
      ) : (
        <>
          <VolumeX className="w-5 h-5 text-amber-900 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium text-amber-900">
            Click to Play Music
          </span>
        </>
      )}
    </button>
  );
}
