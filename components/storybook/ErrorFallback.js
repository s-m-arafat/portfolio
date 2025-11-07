'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function ErrorFallback({ error, type = 'media' }) {
  return (
    <div className="w-full max-w-2xl mx-auto my-8 p-6 bg-red-50 rounded-2xl border border-red-200">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-red-900 mb-1">
            Failed to load {type}
          </h4>
          <p className="text-sm text-red-700">
            {error || 'An unexpected error occurred. Please try again later.'}
          </p>
        </div>
      </div>
    </div>
  );
}
