import React, { useRef, useState, useEffect } from 'react';
import { Play, Volume2, VolumeX, RotateCcw, X } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export default function ReelCard({
  id,
  src,
  poster,
  activeReelId,
  onActivate,
  isGlobalMuted = false,
  onToggleMute,
  aspectRatio = "aspect-[9/16]",
  className = ""
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasEverPlayed, setHasEverPlayed] = useState(false);

  const isActive = activeReelId === id;
  const resolvedSrc = src ? getAssetUrl(src) : null;
  const resolvedPoster = poster ? getAssetUrl(poster) : null;

  // Whenever another reel is active or this is not active, STRICTLY pause
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isActive) {
      video.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  // Initial ambient loop preview (muted) only when NO reel is active anywhere
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !resolvedSrc) return;

    video.muted = true;
    video.defaultMuted = true;

    if (!activeReelId && !hasEverPlayed) {
      video.muted = true;
      const p = video.play();
      if (p) p.catch(() => {});
    } else if (activeReelId && !isActive) {
      video.pause();
      setIsPlaying(false);
    }
  }, [resolvedSrc, activeReelId, isActive, hasEverPlayed]);

  // Sync mute state when active
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isActive) return;
    video.muted = isGlobalMuted;
  }, [isGlobalMuted, isActive]);

  // Handle touch / click on reel
  const handleTouchReel = (e) => {
    // If the click was on one of the top control buttons, ignore
    if (e.target.closest('[data-reel-control]')) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    const video = videoRef.current;
    if (!video) return;

    setHasEverPlayed(true);

    if (!isActive) {
      // 1. Instantly pause ALL other video elements across the whole page
      document.querySelectorAll('video').forEach((v) => {
        if (v !== video) {
          v.pause();
        }
      });

      // 2. Play this reel from the start
      video.currentTime = 0;
      video.muted = isGlobalMuted;
      
      const playPromise = video.play();
      if (playPromise) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Fallback to muted playback if browser restricts unmuted audio
            video.muted = true;
            video.play().catch(() => {});
            setIsPlaying(true);
          });
      }

      // 3. Mark this reel as active
      if (onActivate) {
        onActivate(id);
      }
    } else {
      // Reel is already active
      if (!video.paused) {
        // Tap while playing -> pause
        video.pause();
        setIsPlaying(false);
      } else {
        // Tap while paused -> play from start and pause all others
        document.querySelectorAll('video').forEach((v) => {
          if (v !== video) {
            v.pause();
          }
        });

        video.currentTime = 0;
        video.muted = isGlobalMuted;
        const playPromise = video.play();
        if (playPromise) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(() => {
              video.muted = true;
              video.play().catch(() => {});
              setIsPlaying(true);
            });
        }
      }
    }
  };

  // Restart reel from the beginning
  const handleRestart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    setHasEverPlayed(true);

    // Pause all other videos
    document.querySelectorAll('video').forEach((v) => {
      if (v !== video) v.pause();
    });

    video.currentTime = 0;
    video.muted = isGlobalMuted;
    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => {});
    });

    setIsPlaying(true);
    if (!isActive && onActivate) {
      onActivate(id);
    }
  };

  // Audio toggle
  const handleToggleSound = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const video = videoRef.current;
    const nextMuted = !isGlobalMuted;

    if (video) {
      video.muted = nextMuted;
    }
    if (onToggleMute) {
      onToggleMute(nextMuted);
    }
  };

  // Track progress for gold bottom bar
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      const pct = (video.currentTime / video.duration) * 100;
      setProgress(pct);
    }
  };

  // Close / un-pop reel back to normal grid
  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      video.pause();
      setIsPlaying(false);
    }
    if (onActivate) {
      onActivate(null);
    }
  };

  // Smooth continuous loop only when active
  const handleEnded = () => {
    const video = videoRef.current;
    if (video && isActive) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  return (
    <div
      onClick={handleTouchReel}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleTouchReel(e);
        }
      }}
      aria-label="Reel video - tap to play from start"
      className={`relative transition-all duration-500 ease-out touch-manipulation select-none ${
        isActive
          ? 'z-30 scale-[1.04] sm:scale-105 -translate-y-2 ring-2 ring-[#c8a97e] shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(200,169,126,0.35)] rounded-xl'
          : activeReelId
          ? 'z-0 opacity-50 scale-[0.98] blur-[0.2px] hover:opacity-85 transition-all duration-500 rounded-xl cursor-pointer'
          : 'z-10 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 rounded-xl cursor-pointer'
      } ${className}`}
    >
      <div className={`relative ${aspectRatio} w-full overflow-hidden rounded-xl bg-[#111]`}>
        {resolvedSrc ? (
          <video
            ref={videoRef}
            src={resolvedSrc}
            poster={resolvedPoster}
            muted
            defaultMuted
            playsInline
            webkit-playsinline="true"
            x5-playsinline="true"
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            className="w-full h-full object-cover pointer-events-none transition-transform duration-700 ease-out"
          />
        ) : (
          <img
            src={resolvedPoster}
            alt=""
            className="w-full h-full object-cover pointer-events-none"
          />
        )}

        {/* TOP QUICK CONTROLS (Only visible on the active reel) */}
        {isActive && (
          <div className="absolute top-2.5 left-2.5 right-2.5 sm:top-3 sm:left-3 sm:right-3 flex items-center justify-between z-20 pointer-events-none animate-fadeIn">
            {/* Play from Start / Restart Button */}
            <button
              type="button"
              data-reel-control="true"
              onClick={handleRestart}
              className="pointer-events-auto w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/80 backdrop-blur-md border border-white/25 flex items-center justify-center text-white/90 hover:text-[#c8a97e] hover:border-[#c8a97e]/60 transition-all shadow-lg active:scale-90 group/btn cursor-pointer"
              aria-label="Restart from start"
              title="Play from start"
            >
              <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c8a97e] group-hover/btn:-rotate-45 transition-transform duration-300" />
            </button>

            {/* Right Quick Controls: Sound toggle & Close/Minimize */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Audio Toggle Button */}
              <button
                type="button"
                data-reel-control="true"
                onClick={handleToggleSound}
                className="pointer-events-auto w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/80 backdrop-blur-md border border-white/25 flex items-center justify-center text-white/90 hover:text-[#c8a97e] hover:border-[#c8a97e]/60 transition-all shadow-lg active:scale-90 cursor-pointer"
                aria-label={isGlobalMuted ? "Unmute reel" : "Mute reel"}
                title={isGlobalMuted ? "Unmute" : "Mute"}
              >
                {isGlobalMuted ? (
                  <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c8a97e] animate-pulse" />
                )}
              </button>

              {/* Close/Minimize Button */}
              <button
                type="button"
                data-reel-control="true"
                onClick={handleClose}
                className="pointer-events-auto w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/80 backdrop-blur-md border border-white/25 flex items-center justify-center text-white/90 hover:text-[#c8a97e] hover:border-[#c8a97e]/60 transition-all shadow-lg active:scale-90 cursor-pointer"
                aria-label="Close reel"
                title="Close"
              >
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-300 hover:text-white" />
              </button>
            </div>
          </div>
        )}

        {/* CENTER PLAY INDICATOR (Subtle hint when inactive, or pause/play state) */}
        {!isActive ? (
          // Inactive state: subtle hover play hint (NO name, NO text)
          <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-5 h-5 fill-current ml-0.5 text-[#c8a97e]" />
            </div>
          </div>
        ) : (
          // Active state: if paused, show elegant center play badge to tap and play from start
          !isPlaying && (
            <div className="absolute inset-0 bg-black/35 flex items-center justify-center pointer-events-none transition-opacity duration-300">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-black/75 backdrop-blur-md border border-[#c8a97e]/50 flex items-center justify-center text-[#c8a97e] shadow-2xl">
                <Play className="w-6 h-6 fill-current ml-0.5 text-[#c8a97e]" />
              </div>
            </div>
          )
        )}

        {/* BOTTOM GOLD PROGRESS BAR (Only on the active playing reel) */}
        {isActive && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 overflow-hidden z-20 pointer-events-none">
            <div
              className="h-full bg-gradient-to-r from-[#c8a97e] via-[#e5c99e] to-[#c8a97e] transition-[width] duration-100 ease-linear shadow-[0_0_8px_rgba(200,169,126,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
