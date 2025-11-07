'use client';

import React, { useState } from 'react';

export default function MediaPlayer({ videos }) {
  const [currentVideo, setCurrentVideo] = useState(0);

  if (!videos || videos.length === 0) return null;

  const video = videos[currentVideo];

  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl overflow-hidden shadow-lg">
        <video
          key={video.url}
          controls
          poster={video.poster}
          className="w-full h-auto"
          preload="metadata"
        >
          <source src={video.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {video.caption && (
          <div className="p-4 bg-white">
            <p className="text-sm text-gray-700 text-center italic">
              {video.caption}
            </p>
          </div>
        )}

        {videos.length > 1 && (
          <div className="p-4 bg-white border-t flex gap-2 justify-center">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentVideo(index)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  index === currentVideo
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                aria-label={`Play video ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
