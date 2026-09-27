"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

const SRC = "/assets/stories/audio/background-music.mp3";
const BackgroundMusicContext = createContext(null);

export function BackgroundMusicProvider({ children }) {
  const audioRef = useRef(null);
  const playingRef = useRef(false);
  const duckedRef = useRef(false);
  const [playing, setPlaying] = useState(false);

  const setOn = useCallback((on) => {
    playingRef.current = on;
    setPlaying(on);
  }, []);

  const start = useCallback(() => {
    // Created on first use so visitors who never press play don't download the track.
    audioRef.current ??= Object.assign(new Audio(SRC), { loop: true, volume: 0.3 });
    audioRef.current.play().catch((err) => {
      if (err.name === "AbortError") return; // our own pause() (duck/toggle) interrupted a pending play()
      console.warn("Background music could not start:", err.message);
      setOn(false);
    });
  }, [setOn]);

  const toggle = useCallback(() => {
    const on = !playingRef.current;
    setOn(on);
    if (!on) audioRef.current?.pause();
    else if (!duckedRef.current) start();
  }, [setOn, start]);

  const duck = useCallback(() => {
    duckedRef.current = true;
    audioRef.current?.pause();
  }, []);

  const unduck = useCallback(() => {
    duckedRef.current = false;
    if (playingRef.current) start();
  }, [start]);

  const value = useMemo(() => ({ playing, toggle, duck, unduck }), [playing, toggle, duck, unduck]);
  return <BackgroundMusicContext.Provider value={value}>{children}</BackgroundMusicContext.Provider>;
}

export function useBackgroundMusic() {
  const ctx = useContext(BackgroundMusicContext);
  if (!ctx) throw new Error("useBackgroundMusic must be used inside BackgroundMusicProvider");
  return ctx;
}
