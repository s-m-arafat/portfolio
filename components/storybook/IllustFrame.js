'use client';

import React from 'react';
import Image from 'next/image';

export default function IllustFrame({ illustrationUrl, position = 'background' }) {
  if (!illustrationUrl) return null;

  if (position === 'background') {
    return (
      <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
        <Image
          src={illustrationUrl}
          alt="Decorative illustration"
          fill
          className="object-cover"
          priority={false}
        />
      </div>
    );
  }

  if (position === 'border') {
    return (
      <div className="relative w-full max-w-4xl mx-auto my-8">
        <div className="absolute -inset-4 opacity-30">
          <Image
            src={illustrationUrl}
            alt="Decorative border"
            fill
            className="object-contain"
          />
        </div>
        <div className="relative bg-white rounded-2xl p-8 shadow-lg">
          {/* Content goes here */}
        </div>
      </div>
    );
  }

  // Inline illustration
  return (
    <div className="w-full max-w-2xl mx-auto my-8">
      <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-md">
        <Image
          src={illustrationUrl}
          alt="Story illustration"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 672px"
        />
      </div>
    </div>
  );
}
