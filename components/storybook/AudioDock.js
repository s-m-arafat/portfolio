"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Pause, Play, X } from "lucide-react";
import MusicToggle from "./MusicToggle";
import { RATES, formatTime, useNarration } from "@/providers/NarrationPlayerProvider";

export default function AudioDock() {
  const pathname = usePathname();
  const p = useNarration();
  // The inline player already shows on the track's own story page.
  const showMini = p.track && pathname !== `/storybook/${p.track.slug}`;
  const busy = p.status === "playing" || p.status === "loading";

  return (
    <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] z-40 flex max-w-[calc(100vw-2rem)] items-end gap-2">
      {showMini && (
        <div role="region" aria-label="Now playing" className="flex w-80 min-w-0 flex-wrap items-center gap-x-1 rounded-xl border border-line bg-surface p-1 shadow-lg sm:w-96">
          <Link
            lang={p.track.lang}
            href={`/storybook/${p.track.slug}`}
            className="hidden basis-full truncate rounded-md px-2 pt-1 text-sm font-medium leading-6 text-ink underline-offset-4 hover:text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:block"
          >
            {p.track.title}
          </Link>
          <button
            type="button"
            onClick={p.toggle}
            aria-label={busy ? "Pause narration" : "Play narration"}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-surface transition-colors duration-150 hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {busy ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
          </button>
          <input
            type="range"
            min={0}
            max={p.duration || 0}
            step={1}
            value={Math.min(p.currentTime, p.duration || 0)}
            onChange={(e) => p.seek(Number(e.target.value))}
            disabled={!p.duration}
            aria-label="Seek narration"
            aria-valuetext={`${formatTime(p.currentTime)} of ${formatTime(p.duration)}`}
            className="h-10 min-w-0 flex-1 cursor-pointer accent-accent disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
          <span className="hidden shrink-0 px-1 font-mono text-xs tabular-nums text-muted sm:inline">
            {formatTime(p.currentTime)} / {formatTime(p.duration)}
          </span>
          <select
            aria-label="Speed"
            value={p.rate}
            onChange={(e) => p.setRate(Number(e.target.value))}
            className="hidden h-8 shrink-0 cursor-pointer rounded-md border border-muted bg-surface px-1 font-mono text-xs text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:block"
          >
            {RATES.map((r) => (
              <option key={r} value={r}>
                {r}×
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={p.close}
            aria-label="Close player"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors duration-150 hover:bg-canvas hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>
      )}
      <MusicToggle />
    </div>
  );
}
