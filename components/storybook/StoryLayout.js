'use client';

import React from 'react';
import Image from 'next/image';
import IllustFrame from './IllustFrame';

export default function StoryLayout({ children, illustration, title, bgColor = 'bg-amber-50' }) {
  return (
    <div className={`min-h-screen ${bgColor} relative`}>
      {/* Background Illustration */}
      {illustration && <IllustFrame illustrationUrl={illustration} position="background" />}

      {/* Content Container */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </div>
    </div>
  );
}
