'use client';

import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, User, Tag, Volume2, VolumeX } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import dynamic from 'next/dynamic';

import StoryLayout from '@/components/storybook/StoryLayout';
import NarrationPlayer from '@/components/storybook/NarrationPlayer';
import MediaPlayer from '@/components/storybook/MediaPlayer';
import IllustFrame from '@/components/storybook/IllustFrame';
import LoadingPlaceholder from '@/components/storybook/LoadingPlaceholder';
import ErrorFallback from '@/components/storybook/ErrorFallback';
import { useBackgroundMusic } from '@/providers/BackgroundMusicProvider';

// Lazy load heavy components
const LottieAnimation = dynamic(
  () => import('@/components/storybook/LottieAnimation'),
  {
    loading: () => <LoadingPlaceholder type="animation" />,
    ssr: false,
  }
);

const ThreeScene = dynamic(
  () => import('@/components/storybook/ThreeScene'),
  {
    loading: () => <LoadingPlaceholder type="animation" />,
    ssr: false,
  }
);

export default function StoryContent({ story }) {
  const { isPlaying, toggle } = useBackgroundMusic();
  
  if (!story) {
    notFound();
  }

  const {
    title,
    author,
    coverImage,
    illustration,
    audio,
    videos,
    lottie,
    threeScene,
    content,
    tags,
    publishedAt,
    bgColor,
  } = story;

  return (
    <StoryLayout illustration={illustration} title={title} bgColor={bgColor}>
      {/* Back Button */}
      <Link
        href="/storybook"
        className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Stories</span>
      </Link>

      {/* Cover Image */}
      <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl mb-8">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 896px"
        />
      </div>

      {/* Title & Meta */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
          {title}
        </h1>

        {/* Background Music Toggle */}
        <div className="flex justify-center mb-6">
          <button
            onClick={toggle}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 rounded-full shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 group"
            aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-5 h-5 text-amber-900 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-amber-900">
                  Background Music Playing
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-5 h-5 text-amber-900 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-amber-900">
                  Click to Play Music
                </span>
              </>
            )}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          {author && (
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{author}</span>
            </div>
          )}
          {publishedAt && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{new Date(publishedAt).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-gray-200"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Audio Narration */}
      {audio?.narrationUrl && (
        <div className="mb-8">
          <NarrationPlayer
            narrationUrl={audio.narrationUrl}
            duration={audio.duration}
          />
        </div>
      )}

      {/* Story Content */}
      <div 
        className="prose prose-lg prose-amber max-w-none mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-md" 
        style={{ 
          fontFamily: "'Noto Sans Bengali', 'Fira Sans', sans-serif",
          lineHeight: '2',
          direction: 'ltr',
          unicodeBidi: 'embed'
        }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>

      {/* Lottie Animation */}
      {lottie?.url && (
        <Suspense fallback={<LoadingPlaceholder type="animation" />}>
          <LottieAnimation
            lottieUrl={lottie.url}
            loop={lottie.loop}
            autoplay={lottie.autoplay}
          />
        </Suspense>
      )}

      {/* Three.js Scene */}
      {threeScene?.entryUrl && (
        <Suspense fallback={<LoadingPlaceholder type="animation" />}>
          <ThreeScene entryUrl={threeScene.entryUrl} />
        </Suspense>
      )}

      {/* Videos */}
      {videos && videos.length > 0 && (
        <MediaPlayer videos={videos} />
      )}

      {/* Decorative Illustration */}
      {illustration && (
        <IllustFrame illustrationUrl={illustration} position="inline" />
      )}
    </StoryLayout>
  );
}
