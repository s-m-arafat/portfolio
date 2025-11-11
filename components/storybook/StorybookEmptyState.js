'use client';

import React from 'react';
import { BookOpen } from 'lucide-react';

export default function StorybookEmptyState() {
  return (
    <div className="text-center py-20">
      <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        No stories yet
      </h3>
      <p className="text-gray-600">
        Check back soon for new interactive stories!
      </p>
    </div>
  );
}
