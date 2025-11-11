'use client';

import React from 'react';
import { useBackgroundMusic } from '@/providers/BackgroundMusicProvider';
import { useAutoPlayMusic } from '@/hooks/useAutoPlayMusic';
import StoryGrid from '@/components/storybook/StoryGrid';
import StorybookHero from '@/components/storybook/StorybookHero';
import StorybookEmptyState from '@/components/storybook/StorybookEmptyState';

export default function StorybookClient({ stories }) {
  const { isPlaying, toggle } = useBackgroundMusic();
  
  // Auto-play music when page loads
  useAutoPlayMusic(isPlaying, toggle);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header with Video Background */}
        <StorybookHero isPlaying={isPlaying} onToggle={toggle} />

        {/* Story Grid */}
        <StoryGrid stories={stories} />

        {/* Empty State */}
        {stories.length === 0 && <StorybookEmptyState />}
      </div>
    </div>
  );
}
