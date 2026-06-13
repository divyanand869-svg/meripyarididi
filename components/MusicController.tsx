'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicController() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.4);
  const [ready, setReady] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Enable music only after first user interaction anywhere on the page
  useEffect(() => {
    const enable = () => {
      setReady(true);
      window.removeEventListener('click', enable);
      window.removeEventListener('keydown', enable);
    };
    window.addEventListener('click', enable);
    window.addEventListener('keydown', enable);
    return () => {
      window.removeEventListener('click', enable);
      window.removeEventListener('keydown', enable);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const onTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setProgress(audio.currentTime);
    setDuration(audio.duration || 0);
  };

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const value = Number(e.target.value);
    audio.currentTime = value;
    setProgress(value);
  };

  const formatTime = (t: number) => {
    if (!isFinite(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]" data-cursor-hover>
      <audio
        ref={audioRef}
        src="/audio/theme.mp3"
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onTimeUpdate}
        loop
        preload="none"
      />

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 w-64 rounded-md border border-gold/20 bg-ink-900/90 backdrop-blur-md p-4 shadow-[0_20px_60px_-20px_rgba(212,175,55,0.25)]"
          >
            <p className="eyebrow mb-2">Now Playing</p>
            <p className="font-display text-lg text-paper-100 mb-3">
              A Quiet Theme
            </p>
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={progress}
              onChange={onSeek}
              className="w-full accent-gold h-1 mb-3"
              aria-label="Seek"
            />
            <div className="flex items-center justify-between text-xs text-paper-300/70 mb-3 font-body">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-paper-300/70">Vol</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="flex-1 accent-gold h-1"
                aria-label="Volume"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="h-11 w-11 rounded-full border border-gold/30 bg-ink-900/80 backdrop-blur-md flex items-center justify-center text-gold-light hover:border-gold/60 transition-colors"
          aria-label="Toggle music panel"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        </button>
        <button
          onClick={togglePlay}
          disabled={!ready}
          className="h-11 w-11 rounded-full border border-gold/30 bg-ink-900/80 backdrop-blur-md flex items-center justify-center text-gold-light hover:border-gold/60 transition-colors disabled:opacity-40"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
