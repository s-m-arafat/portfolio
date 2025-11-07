import React from 'react';
import { getAllStories } from '@/lib/stories';
import StorybookClient from './StorybookClient';

export const metadata = {
  title: 'Storybook | Arafat',
  description: 'A collection of interactive stories with animations, narrations, and illustrations',
};

export default function StorybookPage() {
  const stories = getAllStories();

  return <StorybookClient stories={stories} />;
}

