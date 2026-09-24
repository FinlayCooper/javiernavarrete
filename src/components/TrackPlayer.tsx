"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The cue player that sits under a poster (or an album cover), styled after the
 * mock-up on page 10 of the content doc: a slim translucent bar with the play
 * control at the left, the track name centred and volume at the right.
 *
 * The mock-up is a screenshot of a stock player, so it also shows shuffle, skip
 * and repeat. There is one cue per row here, so those would be dead controls and
 * are left out; a seek line, on its own row so it never squeezes the name, is
 * more use than any of them.
 */

/** Every mounted player, so starting one can stop the rest. */
const mounted = new Set<HTMLAudioElement>();

type Props = {
  /** Path under /public/audio */
  src: string;
  title: string;
  /** Known length in seconds, shown until the file's own metadata loads. */
  duration: number;
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function TrackPlayer({ src, title, duration: knownDuration }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(knownDuration);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    mounted.add(el);
    return () => {
      mounted.delete(el);
    };
  }, []);

  function toggle() {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      for (const other of mounted) if (other !== el) other.pause();
      // Autoplay policies can still reject this; the catch keeps it quiet.
      void el.play().catch(() => setPlaying(false));
    } else {
      el.pause();
    }
  }

  function seek(event: React.ChangeEvent<HTMLInputElement>) {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Number(event.target.value);
    setElapsed(el.currentTime);
  }

  function toggleMute() {
    const el = audioRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  }

  return (
    <div className="rounded-sm border border-cream/10 bg-black/55 px-3 py-2.5 backdrop-blur-sm sm:px-4">
      <audio
        ref={audioRef}
        src={src}
        // Nothing is fetched until play, so a page of players doesn't pull
        // every file down on load and hold up the images.
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => setElapsed(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />

      {/* Play, track name, volume — the row the mock-up shows. */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Pause ${title}` : `Play ${title}`}
          className="shrink-0 text-cream/90 transition-colors duration-200 hover:text-accent focus-visible:text-accent focus-visible:outline-none"
        >
          {playing ? (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
              <rect x="6" y="4" width="4.5" height="16" rx="0.6" />
              <rect x="13.5" y="4" width="4.5" height="16" rx="0.6" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden>
              <path d="M7 4.2v15.6a.6.6 0 0 0 .92.5l12-7.8a.6.6 0 0 0 0-1l-12-7.8A.6.6 0 0 0 7 4.2Z" />
            </svg>
          )}
        </button>

        <span className="min-w-0 flex-1 truncate text-center text-xs uppercase tracking-[0.2em] text-cream/85 sm:text-sm">
          {title}
        </span>

        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? `Unmute ${title}` : `Mute ${title}`}
          className="shrink-0 text-cream/75 transition-colors duration-200 hover:text-accent focus-visible:text-accent focus-visible:outline-none"
        >
          {muted ? (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
              <path d="M3 9v6h4l5 4V5L7 9H3Z" />
              <path
                d="M16 9.5l4 5m0-5l-4 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
              <path d="M3 9v6h4l5 4V5L7 9H3Z" />
              <path
                d="M15.5 8.8a4.2 4.2 0 0 1 0 6.4M18 6.5a7.5 7.5 0 0 1 0 11"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Seek on its own line, so it never squeezes the track name. */}
      <div className="mt-2.5 flex items-center gap-2.5">
        <span className="w-8 shrink-0 text-right text-[0.6rem] tabular-nums text-cream/35">
          {formatTime(elapsed)}
        </span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={elapsed}
          onChange={seek}
          aria-label={`Seek within ${title}`}
          className="h-1 min-w-0 flex-1 cursor-pointer accent-cream"
        />
        <span className="w-8 shrink-0 text-[0.6rem] tabular-nums text-cream/35">
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
}
