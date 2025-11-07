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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with Music Toggle */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-10 h-10 text-amber-600" />
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">
              Storybook
            </h1>
          </div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
            Immerse yourself in interactive tales with animations, narrations, and beautiful illustrations
          </p>

          {/* Music Toggle Interface */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <button
              onClick={toggle}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 rounded-full shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 group"
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
