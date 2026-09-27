"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useBackgroundMusic } from "./BackgroundMusicProvider";

const NarrationContext = createContext(null);

export const RATES = [0.75, 1, 1.25, 1.5, 1.75, 2];

export function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function NarrationPlayerProvider({ children }) {
  const audioRef = useRef(null);
  const { duck, unduck } = useBackgroundMusic();
  const [track, setTrack] = useState(null);
  const [status, setStatus] = useState("idle");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [muted, setMuted] = useState(false);
  const [rate, setRateState] = useState(1);

  // Status comes from media events only, so every view (inline player, mini-player,
  // lock screen) stays consistent and background music ducks no matter who pressed play.
  useEffect(() => {
    const a = audioRef.current;
    const handlers = {
      play: duck, // "waiting" or "playing" always follows and sets the status
      playing: () => setStatus("playing"),
      waiting: () => setStatus("loading"),
      pause: () => {
        setStatus((s) => (s === "error" || s === "idle" ? s : "paused"));
        unduck();
      },
      error: () => {
        if (!a.getAttribute("src")) return; // clearing the source on close is not an error
        setStatus("error");
        unduck();
      },
      timeupdate: () => setCurrentTime(a.currentTime),
      durationchange: () => setDuration(Number.isFinite(a.duration) ? a.duration : 0),
      volumechange: () => {
        setVolumeState(a.volume);
        setMuted(a.muted);
      },
      ratechange: () => setRateState(a.playbackRate),
    };
    for (const [name, fn] of Object.entries(handlers)) a.addEventListener(name, fn);
    return () => {
      for (const [name, fn] of Object.entries(handlers)) a.removeEventListener(name, fn);
    };
  }, [duck, unduck]);

  const play = useCallback(() => {
    const a = audioRef.current;
    if (a.error) a.load();
    a.play().catch((err) => {
      if (err.name === "NotAllowedError") setStatus("paused");
    });
  }, []);

  const pause = useCallback(() => audioRef.current.pause(), []);

  // After a media error some browsers leave paused === false, so treat an errored element as paused.
  const toggle = useCallback(() => (audioRef.current.paused || audioRef.current.error ? play() : pause()), [play, pause]);

  const load = useCallback(
    (next, { autoplay = false } = {}) => {
      const a = audioRef.current;
      setTrack(next);
      if (a.getAttribute("src") !== next.url) {
        a.src = next.url;
        setCurrentTime(0);
        setDuration(0);
        setStatus("paused");
      }
      if (autoplay) play();
      else unduck(); // changing src pauses without a "pause" event
    },
    [play, unduck],
  );

  const seek = useCallback((t) => {
    const a = audioRef.current;
    const max = Number.isFinite(a.duration) ? a.duration : 0;
    a.currentTime = Math.min(Math.max(0, t), max);
    setCurrentTime(a.currentTime);
  }, []);

  const skip = useCallback((delta) => seek(audioRef.current.currentTime + delta), [seek]);

  const setVolume = useCallback((v) => {
    const a = audioRef.current;
    a.volume = v;
    if (v > 0) a.muted = false;
  }, []);

  const toggleMute = useCallback(() => {
    audioRef.current.muted = !audioRef.current.muted;
  }, []);

  const setRate = useCallback((r) => {
    const a = audioRef.current;
    // defaultPlaybackRate survives a source reload; playbackRate alone resets.
    a.defaultPlaybackRate = r;
    a.playbackRate = r;
  }, []);

  const close = useCallback(() => {
    const a = audioRef.current;
    a.pause();
    a.removeAttribute("src");
    a.load();
    setTrack(null);
    setStatus("idle");
    setCurrentTime(0);
    setDuration(0);
    unduck();
  }, [unduck]);

  useEffect(() => {
    if (!track || !("mediaSession" in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: "Storybook",
      artwork: track.artwork ? [{ src: track.artwork }] : [],
    });
    const actions = {
      play,
      pause,
      seekbackward: () => skip(-10),
      seekforward: () => skip(10),
      seekto: (details) => seek(details.seekTime),
    };
    for (const [name, fn] of Object.entries(actions)) {
      try {
        navigator.mediaSession.setActionHandler(name, fn);
      } catch {} // action unsupported by this browser
    }
    return () => {
      for (const name of Object.keys(actions)) {
        try {
          navigator.mediaSession.setActionHandler(name, null);
        } catch {} // action unsupported by this browser
      }
    };
  }, [track, play, pause, skip, seek]);

  const value = useMemo(
    () => ({ track, status, currentTime, duration, volume, muted, rate, load, play, pause, toggle, seek, skip, setVolume, toggleMute, setRate, close }),
    [track, status, currentTime, duration, volume, muted, rate, load, play, pause, toggle, seek, skip, setVolume, toggleMute, setRate, close],
  );

  return (
    <NarrationContext.Provider value={value}>
      <audio ref={audioRef} preload="metadata" />
      {children}
    </NarrationContext.Provider>
  );
}

export function useNarration() {
  const ctx = useContext(NarrationContext);
  if (!ctx) throw new Error("useNarration must be used inside NarrationPlayerProvider");
  return ctx;
}
