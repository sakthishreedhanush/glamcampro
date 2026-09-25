import React, { useState, useRef, useEffect } from 'react';
import { X, Volume2, VolumeX, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

const DEFAULT_REELS = [
  {
    id: "amanda-reel-7",
    videoUrl: getAssetUrl("AMANDA_REEL7_GLAMBOT.mp4"),
    poster: getAssetUrl("glambot_1.jpeg")
  },
  {
    id: "basketball-reel",
    videoUrl: getAssetUrl("BASKETBALL_REEL_2_GLAMBOT.mp4"),
    poster: getAssetUrl("glambot_2.jpeg")
  },
  {
    id: "sukhleen-reel-444",
    videoUrl: getAssetUrl("SUKHLEEN_REEL_444_GLAMBOT.mp4"),
    poster: getAssetUrl("glambot_3.jpeg")
  },
  {
    id: "amanda-bts",
    videoUrl: getAssetUrl("Amanda01_BTS_edited.mp4"),
    poster: getAssetUrl("glambot.jpeg")
  },
  {
    id: "amanda-sukhleen-bts",
    videoUrl: getAssetUrl("Amanda_Sukhleen01_BTS_edited.mp4"),
    poster: getAssetUrl("glambot_1.jpeg")
  },
  {
    id: "sahil-glamcam",
    videoUrl: getAssetUrl("Sahil01_Glamcam_final.mp4"),
    poster: getAssetUrl("glambot_2.jpeg")
  }
];

export default function ShowreelModal({ isOpen, onClose, initialIndex = 0, customReels }) {
  const reels = customReels && customReels.length > 0 ? customReels : DEFAULT_REELS;
  const [currentReelIndex, setCurrentReelIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  // Sync initial index whenever modal opens
  useEffect(() => {
    if (isOpen) {
      const validIndex = Math.min(Math.max(0, initialIndex), reels.length - 1);
      setCurrentReelIndex(validIndex);
      setIsPlaying(true);
      setIsMuted(false);
    }
  }, [isOpen, initialIndex, reels.length]);

  // Handle video playback & mute changes
  useEffect(() => {
    if (!isOpen || !videoRef.current) return;
    const video = videoRef.current;
    video.muted = isMuted;

    if (isPlaying) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser restricts unmuted autoplay, mute and continue playing smoothly
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => {});
          }
        });
      }
    } else {
      video.pause();
    }
  }, [isPlaying, currentReelIndex, isMuted, isOpen]);

  // Keyboard navigation & escape listener to exit to home page
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        handleExitToHome();
      } else if (e.key === 'ArrowRight') {
        handleReelSwitch((currentReelIndex + 1) % reels.length);
      } else if (e.key === 'ArrowLeft') {
        handleReelSwitch((currentReelIndex - 1 + reels.length) % reels.length);
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentReelIndex, reels.length]);

  const handleExitToHome = () => {
    if (onClose) onClose();
    // Smoothly scroll to the top of the home page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReelSwitch = (index) => {
    setCurrentReelIndex(index);
    setIsPlaying(true);
  };

  if (!isOpen) return null;

  const activeReel = reels[currentReelIndex] || reels[0];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#070711]/95 md:bg-black/92 backdrop-blur-xl flex flex-col justify-between select-none animate-fadeIn"
      onClick={handleExitToHome}
      role="dialog"
      aria-modal="true"
      aria-label="Reel Modal"
    >
      {/* Top Header Bar — Contains sound control & Exit button leading to Home page */}
      <div
        className="w-full flex items-center justify-between px-6 md:px-12 py-5 z-20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Intentionally completely blank - no name, no text */}
        <div className="flex-1" />

        {/* Action Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Mute / Unmute Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-colors cursor-pointer"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-neutral-400" /> : <Volume2 className="w-4 h-4 text-[#c8a97e]" />}
          </button>

          {/* EXIT BUTTON TO HOME PAGE */}
          <button
            onClick={handleExitToHome}
            className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/15 hover:bg-[#c8a97e] text-white hover:text-black border border-white/20 hover:border-[#c8a97e] backdrop-blur-md transition-all duration-300 font-semibold tracking-wider text-xs uppercase shadow-xl group cursor-pointer"
            aria-label="Exit to home page"
          >
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            <span>Exit</span>
          </button>
        </div>
      </div>

      {/* Center Reel Display — Cinematic portrait aspect ratio with NO text or name */}
      <div
        className="flex-1 flex items-center justify-center p-2 sm:p-6 md:p-8 relative"
        onClick={handleExitToHome}
      >
        {/* Previous Reel Navigation Button (no text) */}
        {reels.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleReelSwitch((currentReelIndex - 1 + reels.length) % reels.length);
            }}
            className="hidden sm:flex absolute left-4 md:left-8 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-white/20 text-white items-center justify-center backdrop-blur-md border border-white/10 transition-all duration-300 hover:scale-105 cursor-pointer"
            aria-label="Previous Reel"
          >
            <ChevronLeft className="w-5 h-5 text-neutral-300" />
          </button>
        )}

        {/* Video Reel Container (Stops propagation so backdrop click exits cleanly) */}
        <div
          className="relative aspect-[9/16] h-full max-h-[78vh] sm:max-h-[80vh] w-auto rounded-xl sm:rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          <video
            ref={videoRef}
            key={activeReel.videoUrl}
            src={activeReel.videoUrl}
            poster={activeReel.poster}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            webkit-playsinline="true"
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            className="w-full h-full object-cover pointer-events-none select-none"
          />
        </div>

        {/* Next Reel Navigation Button (no text) */}
        {reels.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleReelSwitch((currentReelIndex + 1) % reels.length);
            }}
            className="hidden sm:flex absolute right-4 md:right-8 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-white/20 text-white items-center justify-center backdrop-blur-md border border-white/10 transition-all duration-300 hover:scale-105 cursor-pointer"
            aria-label="Next Reel"
          >
            <ChevronRight className="w-5 h-5 text-neutral-300" />
          </button>
        )}
      </div>

      {/* Bottom Minimal Controls — Minimal play/pause and progress bars, zero text */}
      <div
        className="flex items-center justify-between px-6 md:px-12 py-5 z-20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Play / Pause Toggle Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-colors cursor-pointer"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
        </button>

        {/* Minimal Bar Indicators (No text or labels) */}
        <div className="flex items-center gap-1.5">
          {reels.map((_, index) => (
            <button
              key={index}
              onClick={() => handleReelSwitch(index)}
              className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                currentReelIndex === index
                  ? 'bg-[#c8a97e] w-8'
                  : 'bg-white/20 hover:bg-white/40 w-3'
              }`}
              aria-label={`Reel ${index + 1}`}
            />
          ))}
        </div>

        {/* Spacer for symmetry */}
        <div className="w-10" />
      </div>
    </div>
  );
}
