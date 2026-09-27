import fs from "fs";
import path from "path";

const STORIES_DIR = path.join(process.cwd(), "content/stories");

function readStory(file) {
  try {
    return JSON.parse(fs.readFileSync(path.join(STORIES_DIR, file), "utf8"));
  } catch (err) {
    throw new Error(`content/stories/${file}: ${err.message}`);
  }
}

export function getAllStories() {
  return fs
    .readdirSync(STORIES_DIR)
    .filter((file) => file.endsWith(".json"))
    .map(readStory)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

export function getStoryBySlug(slug) {
  return getAllStories().find((story) => story.slug === slug);
}

export function getAllStorySlugs() {
  return getAllStories().map((story) => story.slug);
}
