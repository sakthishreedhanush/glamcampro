import React, { useState, useRef, useEffect } from 'react';
import { X, Volume2, VolumeX, Play, Pause, Film } from 'lucide-react';

export default function ShowreelModal({ isOpen, onClose }) {
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [fpsMode, setFpsMode] = useState('1000'); // '1000' (0.35x slow-mo) or '30' (1.0x normal speed)
  const videoRef = useRef(null);

  const reels = [
    {
      id: "sahil-glamcam",
      title: "Sahil — Glambot Special",
      videoUrl: "./Sahil01_Glamcam_final.mp4",
      duration: "0:45",
    },
    {
      id: "amanda-reel",
      title: "Amanda — Reel 7",
      videoUrl: "./AMANDA REEL7 GLAMBOT .mp4",
      duration: "0:38",
    },
    {
      id: "basketball-reel",
      title: "Basketball — Focus Sports",
      videoUrl: "./BASKETBALL REEL 2 GALMBOT.mp4",
      duration: "0:52",
    },
    {
      id: "sukhleen-reel",
      title: "Sukhleen — Creative Cut",
      videoUrl: "./SUKHLEEN  REEL 444 GLAMBOT.mp4",
      duration: "0:30",
    }
  ];

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = fpsMode === '1000' ? 0.35 : 1.0;
    if (isPlaying) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying, currentReelIndex, fpsMode]);

  const handleReelSwitch = (index) => {
    setCurrentReelIndex(index);
    setIsPlaying(true);
  };

  if (!isOpen) return null;

  const activeReel = reels[currentReelIndex];

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col">
      
      {/* Minimal Top Bar with Speed Ramp Selector */}
      <div className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-white/5">
        <div>
          <span className="label-gold block">{activeReel.title}</span>
        </div>

        {/* Speed Ramp Toggle Control */}
        <div className="flex items-center gap-2 bg-[#111] p-1 border border-white/8 rounded-full">
          <button
            onClick={() => setFpsMode('1000')}
            className={`px-3 py-1 text-[10px] font-medium tracking-wider uppercase transition-all duration-300 rounded-full ${
              fpsMode === '1000'
                ? 'bg-[#c8a97e] text-black font-semibold shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            ✨ 1000 FPS (Slow-Mo)
          </button>
          <button
            onClick={() => setFpsMode('30')}
            className={`px-3 py-1 text-[10px] font-medium tracking-wider uppercase transition-all duration-300 rounded-full ${
              fpsMode === '30'
                ? 'bg-white text-black font-semibold shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            ⚡ 30 FPS (Normal)
          </button>
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-neutral-500 hover:text-white transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#c8a97e]" />}
          </button>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Video — Full Screen with FPS Indicator Badge */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 relative">
        <div className="relative aspect-[9/16] h-full max-h-[80vh] overflow-hidden shadow-2xl border border-white/8">
          <video
            ref={videoRef}
            key={activeReel.videoUrl}
            src={activeReel.videoUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Active Mode Badge Overlay */}
          <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 text-white text-[10px] uppercase tracking-widest font-medium">
            {fpsMode === '1000' ? (
              <span className="text-[#c8a97e] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c8a97e] animate-pulse" />
                1000 FPS Ultra Slow-Mo (0.35x)
              </span>
            ) : (
              <span className="text-neutral-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                30 FPS Normal Speed (1.0x)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-between px-6 md:px-10 py-5 border-t border-white/5">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current text-[#c8a97e]" />}
          <span className="text-[11px] tracking-[0.12em] uppercase font-medium">
            {isPlaying ? 'Pause' : 'Play'} · {activeReel.duration}
          </span>
        </button>

        <div className="flex items-center gap-1.5">
          {reels.map((r, index) => (
            <button
              key={r.id}
              onClick={() => handleReelSwitch(index)}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                currentReelIndex === index
                  ? 'bg-[#c8a97e] w-8'
                  : 'bg-white/10 hover:bg-white/30 w-3'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
