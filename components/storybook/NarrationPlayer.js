"use client";

import { Headphones, Pause, Play, RotateCcw, RotateCw, Volume2, VolumeX } from "lucide-react";
import { RATES, formatTime, useNarration } from "@/providers/NarrationPlayerProvider";

const FOCUS = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-book-accent";
const ICON_BUTTON = `inline-flex size-11 items-center justify-center rounded-full text-book-ink transition-colors duration-200 hover:bg-book-page ${FOCUS} motion-reduce:transition-none`;

export default function NarrationPlayer({ track }) {
  const p = useNarration();
  const loaded = p.track?.url === track.url;
  const busy = loaded && (p.status === "playing" || p.status === "loading");
  // One return: the primary button keeps its parent and slot in both states, so React reuses
  // its DOM node and keyboard/screen-reader focus survives "Listen" -> "Pause".
  return (
    <section
      aria-label="Audio narration"
      className={
        loaded
          ? "mt-8 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-2 rounded-md border border-book-rule bg-book-paper p-3 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:p-4"
          : "mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-book-rule py-4"
      }
    >
      <div className="flex items-center gap-1">
        {loaded && (
          <button type="button" onClick={() => p.skip(-10)} aria-label="Back 10 seconds" className={ICON_BUTTON}>
            <RotateCcw aria-hidden="true" className="size-5" />
          </button>
        )}
        <button
          type="button"
          onClick={loaded ? p.toggle : () => p.load(track, { autoplay: true })}
          aria-label={loaded ? (busy ? "Pause" : "Play") : undefined}
          className={
            loaded
              ? `inline-flex size-12 items-center justify-center rounded-full bg-book-accent text-book-page transition-colors duration-200 hover:bg-book-ink ${FOCUS} motion-reduce:transition-none`
              : `inline-flex min-h-11 items-center gap-2 rounded-full bg-book-accent px-5 font-medium text-book-page transition-colors duration-200 hover:bg-book-ink ${FOCUS} motion-reduce:transition-none`
          }
        >
          {busy ? <Pause aria-hidden="true" className="size-5" /> : <Play aria-hidden="true" className={loaded ? "size-5" : "size-4"} />}
          {!loaded && " Listen to this story"}
        </button>
        {loaded && (
          <button type="button" onClick={() => p.skip(10)} aria-label="Forward 10 seconds" className={ICON_BUTTON}>
            <RotateCw aria-hidden="true" className="size-5" />
          </button>
        )}
      </div>
      {loaded ? (
        <>
          <input
            type="range"
            min={0}
            max={p.duration || 0}
            step={1}
            value={Math.min(p.currentTime, p.duration || 0)}
            onChange={(e) => p.seek(Number(e.target.value))}
            disabled={!p.duration}
            aria-label="Seek"
            aria-valuetext={`${formatTime(p.currentTime)} of ${formatTime(p.duration)}`}
            className={`h-11 w-full cursor-pointer accent-book-accent disabled:cursor-not-allowed disabled:opacity-50 ${FOCUS}`}
          />
          <p className="whitespace-nowrap text-sm tabular-nums text-book-muted">
            <span>{formatTime(p.currentTime)}</span> / <span>{formatTime(p.duration)}</span>
          </p>
          <label className="inline-flex items-center gap-2 justify-self-end text-sm text-book-muted sm:justify-self-start">
            Speed
            <select
              value={p.rate}
              onChange={(e) => p.setRate(Number(e.target.value))}
              className={`min-h-11 cursor-pointer rounded-md border border-book-muted bg-book-page px-2 text-sm text-book-ink ${FOCUS}`}
            >
              {RATES.map((r) => (
                <option key={r} value={r}>
                  {r}×
                </option>
              ))}
            </select>
          </label>
          <div className="hidden items-center gap-1 justify-self-end sm:col-span-2 sm:flex">
            <button type="button" onClick={p.toggleMute} aria-label={p.muted ? "Unmute" : "Mute"} className={ICON_BUTTON}>
              {p.muted || p.volume === 0 ? <VolumeX aria-hidden="true" className="size-5" /> : <Volume2 aria-hidden="true" className="size-5" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={p.muted ? 0 : p.volume}
              onChange={(e) => p.setVolume(Number(e.target.value))}
              aria-label="Volume"
              className={`h-11 w-24 cursor-pointer accent-book-accent ${FOCUS}`}
            />
          </div>
          {p.status === "loading" && (
            <p role="status" className="col-span-full text-sm text-book-muted">
              Loading…
            </p>
          )}
          {p.status === "error" && (
            <p role="alert" className="col-span-full flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-book-accent">
              Couldn’t load the audio.{" "}
              <button
                type="button"
                onClick={p.play}
                className={`inline-flex min-h-11 items-center rounded-full border border-book-accent bg-book-page px-4 font-medium text-book-accent transition-colors duration-200 hover:bg-book-accent hover:text-book-page ${FOCUS} motion-reduce:transition-none`}
              >
                Try again
              </button>
            </p>
          )}
        </>
      ) : (
        <p className="inline-flex items-center gap-1.5 text-sm text-book-muted">
          <Headphones aria-hidden="true" className="size-4" /> Best with headphones
        </p>
      )}
    </section>
  );
}
