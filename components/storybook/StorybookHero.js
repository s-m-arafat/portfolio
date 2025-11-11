'use client';

import React from 'react';
import { BookOpen } from 'lucide-react';
import MusicToggleButton from './MusicToggleButton';

export default function StorybookHero({ isPlaying, onToggle, videoSrc = "/assets/stories/videos/kashful.mp4" }) {
  return (
    <div className="mb-12 relative overflow-hidden rounded-2xl shadow-xl min-h-[400px] md:min-h-[500px]">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/50" />

      {/* Content Overlay */}
      <div className="relative flex flex-col items-center justify-center p-8 md:p-12 h-full min-h-[400px] md:min-h-[500px]">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BookOpen className="w-10 h-10 text-amber-300 drop-shadow-lg" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white drop-shadow-2xl">
            Storybook
          </h1>
        </div>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl text-center mb-6 drop-shadow-lg">
          Immerse yourself in interactive tales with animations, narrations, and beautiful illustrations
        </p>

        {/* Music Toggle Interface */}
        <div className="flex items-center justify-center gap-3">
          <MusicToggleButton isPlaying={isPlaying} onToggle={onToggle} />
        </div>
      </div>
    </div>
  );
}
