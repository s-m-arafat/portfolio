'use client';

import React from 'react';

export default function LoadingPlaceholder({ type = 'default' }) {
  if (type === 'card') {
    return (
      <div className="bg-gray-100 rounded-2xl overflow-hidden animate-pulse">
        <div className="h-48 sm:h-56 bg-gray-300" />
        <div className="p-6 space-y-3">
          <div className="h-6 bg-gray-300 rounded w-3/4" />
          <div className="h-4 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-5/6" />
          <div className="flex gap-2 mt-4">
            <div className="h-6 bg-gray-300 rounded-full w-16" />
            <div className="h-6 bg-gray-300 rounded-full w-16" />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'animation') {
    return (
      <div className="w-full max-w-2xl mx-auto my-8">
        <div className="h-64 bg-gray-200 rounded-2xl flex items-center justify-center animate-pulse">
          <div className="text-gray-500">Loading animation...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
    </div>
  );
}
