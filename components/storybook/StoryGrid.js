'use client';

import React from 'react';
import StoryCard from './StoryCard';

export default function StoryGrid({ stories }) {
  if (!stories || stories.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 text-lg">No stories available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </div>
  );
}
