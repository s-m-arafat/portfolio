"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useBackgroundMusic } from "@/providers/BackgroundMusicProvider";

const ICON =
  "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface text-muted shadow-md transition-colors duration-150 hover:bg-canvas hover:text-ink hover:border-ink aria-pressed:border-accent aria-pressed:bg-accent-soft aria-pressed:text-accent aria-pressed:hover:text-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const LABELED =
  "inline-flex min-h-11 items-center gap-2 rounded-full border border-book-muted bg-book-page px-4 text-sm font-medium text-book-ink transition-colors duration-200 hover:bg-book-paper aria-pressed:border-book-accent aria-pressed:bg-book-accent aria-pressed:text-book-page aria-pressed:hover:border-book-ink aria-pressed:hover:bg-book-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-book-accent motion-reduce:transition-none";

export default function MusicToggle({ showLabel = false }) {
  const { playing, toggle } = useBackgroundMusic();
  const Icon = playing ? Volume2 : VolumeX;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={showLabel ? undefined : "Background music"}
      title="Background music"
      className={showLabel ? LABELED : ICON}
    >
      <Icon aria-hidden="true" className={showLabel ? "size-4" : "size-5"} />
      {showLabel && <span>Background music</span>}
    </button>
  );
}
