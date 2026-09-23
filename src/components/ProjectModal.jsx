import React, { useState, useRef, useEffect } from 'react';
import { X, Volume2, VolumeX } from 'lucide-react';

export default function ProjectModal({ project, onClose, onOpenBookModal }) {
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

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-end px-6 md:px-10 py-5 border-b border-white/5" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-5">
          {project.videoUrl && (
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-neutral-500 hover:text-white transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          )}
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Video / Image — Full Screen */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8" onClick={(e) => e.stopPropagation()}>
        <div className="relative aspect-[9/16] h-full max-h-[80vh] overflow-hidden">
          {project.videoUrl ? (
            <video
              ref={videoRef}
              src={project.videoUrl}
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
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
}
