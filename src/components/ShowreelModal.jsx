import React, { useState, useRef, useEffect } from 'react';
import { X, Volume2, VolumeX, Play, Pause, Film } from 'lucide-react';

export default function ShowreelModal({ isOpen, onClose }) {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  const reels = [
    {
      id: "sahil-glamcam",
      title: "Brand Reel 2026",
      videoUrl: "/Sahil01_Glamcam_final.mp4",
      duration: "0:45",
    },
    {
      id: "amanda-reel",
      title: "Motion Showcase",
      videoUrl: "/AMANDA REEL7 GLAMBOT .mp4",
      duration: "0:38",
    },
    {
      id: "basketball-reel",
      title: "Campaign Reel",
      videoUrl: "/BASKETBALL REEL 2 GALMBOT.mp4",
      duration: "0:52",
    },
    {
      id: "sukhleen-reel",
      title: "Creative Cut",
      videoUrl: "/SUKHLEEN  REEL 444 GLAMBOT.mp4",
      duration: "0:30",
    }
  ];

  useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying, currentReelIndex]);

  const handleReelSwitch = (index) => {
    setCurrentReelIndex(index);
    setIsPlaying(true);
  };

  if (!isOpen) return null;

  const activeReel = reels[currentReelIndex];

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col">
      
      {/* Minimal Top Bar */}
      <div className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-white/5">
        <div>
          <span className="label-gold">{activeReel.title}</span>
        </div>

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
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-between px-6 md:px-10 py-5 border-t border-white/5">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          <span className="text-[11px] tracking-[0.12em] uppercase font-medium">
            {isPlaying ? 'Pause' : 'Play'} · {activeReel.duration}
          </span>
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
