import fs from 'fs';
import path from 'path';

const storiesDirectory = path.join(process.cwd(), 'content/stories');

export function getAllStories() {
  try {
    // Check if directory exists
    if (!fs.existsSync(storiesDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(storiesDirectory);
    const stories = fileNames
      .filter((fileName) => fileName.endsWith('.json'))
      .map((fileName) => {
        const filePath = path.join(storiesDirectory, fileName);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const story = JSON.parse(fileContents);
        return story;
      })
      .sort((a, b) => {
        // Sort by publishedAt date, newest first
        if (a.publishedAt && b.publishedAt) {
          return new Date(b.publishedAt) - new Date(a.publishedAt);
        }
        return 0;
      });

    return stories;
  } catch (error) {
    console.error('Error loading stories:', error);
    return [];
  }
}

export function getStoryBySlug(slug) {
  try {
    const stories = getAllStories();
    return stories.find((story) => story.slug === slug);
  } catch (error) {
    console.error('Error loading story:', error);
    return null;
  }
}

export function getAllStorySlugs() {
  try {
    const stories = getAllStories();
    return stories.map((story) => story.slug);
  } catch (error) {
    console.error('Error loading story slugs:', error);
    return [];
  }
}
