'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, User } from 'lucide-react';

export default function StoryCard({ story }) {
  const {
    slug,
    title,
    shortDescription,
    author,
    coverImage,
    tags,
    bgColor = 'bg-amber-50',
  } = story;

  return (
    <Link href={`/storybook/${slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.3 }}
        className={`${bgColor} rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full flex flex-col`}
      >
        {/* Cover Image */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="p-6 flex-grow flex flex-col">
          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2 line-clamp-2">
            {title}
          </h3>

          <p className="text-gray-700 text-sm mb-4 line-clamp-3 flex-grow">
            {shortDescription}
          </p>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
            {author && (
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{author}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-white rounded-full text-xs text-gray-700 border border-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
