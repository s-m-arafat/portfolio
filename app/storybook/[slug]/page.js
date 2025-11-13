import React from 'react';
import { getAllStorySlugs, getStoryBySlug } from '@/lib/stories';
import StoryContent from './StoryContent';

export async function generateStaticParams() {
  const slugs = getAllStorySlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  
  if (!story) {
    return {
      title: 'Story Not Found',
    };
  }

  return {
    title: `${story.title} | Storybook`,
    description: story.shortDescription,
    openGraph: {
      title: story.title,
      description: story.shortDescription,
      images: [story.coverImage],
    },
  };
}

export default async function StoryPage({ params }) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  return <StoryContent story={story} slug={slug} />;
}
