import React, { useState, useRef, useEffect } from 'react';
import { X, Volume2, VolumeX } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export default function ProjectModal({ project, onClose }) {
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    setIsMuted(false);
  }, [project]);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = isMuted;
    const playPromise = videoRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(() => {});
        }
      });
    }
  }, [isMuted, project]);

  const handleExitToHome = () => {
    if (onClose) onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#070711]/95 md:bg-black/92 backdrop-blur-xl flex flex-col justify-between select-none"
      onClick={handleExitToHome}
      role="dialog"
      aria-modal="true"
    >
      {/* Top Bar — Exit button to home, no name, no text */}
      <div
        className="w-full flex items-center justify-between px-6 md:px-12 py-5 z-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1" />

        <div className="flex items-center gap-3 sm:gap-4">
          {project.videoUrl && (
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-colors cursor-pointer"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-neutral-400" /> : <Volume2 className="w-4 h-4 text-[#c8a97e]" />}
            </button>
          )}
          {/* EXIT BUTTON TO HOME */}
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

      {/* Video / Image — Full Screen without any name or text */}
      <div
        className="flex-1 flex items-center justify-center p-3 sm:p-6 md:p-8"
        onClick={handleExitToHome}
      >
        <div
          className="relative aspect-[9/16] h-full max-h-[80vh] w-auto rounded-xl sm:rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          {project.videoUrl ? (
            <video
              ref={videoRef}
              src={getAssetUrl(project.videoUrl)}
              poster={getAssetUrl(project.coverImage)}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              webkit-playsinline="true"
              disablePictureInPicture
              controlsList="nodownload nofullscreen noremoteplayback"
              className="w-full h-full object-cover pointer-events-none select-none"
            />
          ) : (
            <img
              src={getAssetUrl(project.coverImage)}
              alt=""
              className="w-full h-full object-cover select-none"
            />
          )}
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-10" />
    </div>
  );
}
