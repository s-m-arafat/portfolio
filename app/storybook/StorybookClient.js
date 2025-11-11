'use client';

import React, { useEffect, useRef } from 'react';
import { BookOpen, Volume2, VolumeX } from 'lucide-react';
import { useBackgroundMusic } from '@/providers/BackgroundMusicProvider';
import StoryGrid from '@/components/storybook/StoryGrid';

export default function StorybookClient({ stories }) {
  const { isPlaying, toggle } = useBackgroundMusic();
  const autoPlayAttempted = useRef(false);

  // Auto-play music when page loads
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
    }, 1000);
    
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle]); // Include toggle in dependencies

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header with Video Background */}
        <div className="mb-12 relative overflow-hidden rounded-2xl shadow-xl min-h-[400px] md:min-h-[500px]">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/assets/stories/videos/kashful.mp4" type="video/mp4" />
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
              <button
                onClick={toggle}
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
            </div>
          </div>
        </div>

        {/* Story Grid */}
        <StoryGrid stories={stories} />

        {/* Empty State */}
        {stories.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No stories yet
            </h3>
            <p className="text-gray-600">
              Check back soon for new interactive stories!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
