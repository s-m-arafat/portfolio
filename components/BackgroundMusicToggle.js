'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Volume2, VolumeX } from 'lucide-react';
import { useBackgroundMusic } from '@/providers/BackgroundMusicProvider';

export default function BackgroundMusicToggle() {
  const { isPlaying, toggle } = useBackgroundMusic();
  const pathname = usePathname();

  // Hide on storybook main page (has its own toggle)
  if (pathname === '/storybook') {
    return null;
  }

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 p-4 bg-amber-100 hover:bg-amber-200 dark:bg-amber-100 dark:hover:bg-amber-200 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-400"
      aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
      title={isPlaying ? 'Pause background music' : 'Play background music'}
    >
      {isPlaying ? (
        <Volume2 className="w-6 h-6 text-amber-900 dark:text-amber-900" />
      ) : (
        <VolumeX className="w-6 h-6 text-amber-900 dark:text-amber-900" />
      )}
    </button>
  );
}
