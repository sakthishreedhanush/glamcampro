import React, { useState, useRef, useEffect } from 'react';
import { X, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export default function ShowreelModal({ isOpen, onClose, initialIndex = 0 }) {
  const [currentReelIndex, setCurrentReelIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  const reels = [
    {
      id: "amanda-reel",
      title: "Amanda Reel",
      videoUrl: getAssetUrl("AMANDA_REEL7_GLAMBOT.mp4"),
      duration: "0:38",
    },
    {
      id: "basketball-reel",
      title: "Basketball Reel",
      videoUrl: getAssetUrl("BASKETBALL_REEL_2_GLAMBOT.mp4"),
      duration: "0:52",
    },
    {
      id: "sukhleen-reel",
      title: "Sukhleen Reel",
      videoUrl: getAssetUrl("SUKHLEEN_REEL_444_GLAMBOT.mp4"),
      duration: "0:30",
    }
  ];

  useEffect(() => {
    if (isOpen) {
      setCurrentReelIndex(initialIndex);
      setIsPlaying(true);
      setIsMuted(false);
    }
  }, [isOpen, initialIndex]);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = isMuted;

    if (isPlaying) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser policy restricts unmuted autoplay, mute and play
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => {});
          }
        });
      }
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying, currentReelIndex, isMuted, isOpen]);

  const handleReelSwitch = (index) => {
    setCurrentReelIndex(index);
    setIsPlaying(true);
  };

  if (!isOpen) return null;

  const activeReel = reels[currentReelIndex] || reels[0];

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col">
      
      {/* Minimal Top Bar */}
      <div className="flex items-center justify-end px-6 md:px-10 py-5 border-b border-white/5">
        <div className="flex items-center gap-5">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-neutral-500 hover:text-white transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Video — Full Screen */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 relative">
        <div className="relative aspect-[9/16] h-full max-h-[80vh] overflow-hidden">
          <video
            ref={videoRef}
            key={activeReel.videoUrl}
            src={activeReel.videoUrl}
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
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-between px-6 md:px-10 py-5 border-t border-white/5">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
        </button>

        <div className="flex items-center gap-1">
          {reels.map((r, index) => (
            <button
              key={r.id}
              onClick={() => handleReelSwitch(index)}
              className={`w-8 h-1 transition-all duration-500 ${
                currentReelIndex === index
                  ? 'bg-[#c8a97e]'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
