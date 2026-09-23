import React, { useRef, useState, useEffect } from 'react';
import { PROJECTS } from '../data/mockData';

function InlineReelVideo({ src, poster, className = "" }) {
  const videoRef = useRef(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }, [src]);

  if (loadFailed) {
    return (
      <img
        src={poster || "/cambot.jpeg"}
        alt="Reel preview"
        className={className}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      defaultMuted
      playsInline
      webkit-playsinline="true"
      disablePictureInPicture
      controlsList="nodownload nofullscreen noremoteplayback"
      preload="auto"
      onError={() => setLoadFailed(true)}
      className={className}
    />
  );
}

export default function Work({ onSelectProject, onOpenBookModal }) {

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 md:px-12 space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-6">
        <span className="label-gold">Portfolio</span>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tight leading-[1.05]">
          Selected<br />
          <em className="italic text-[#c8a97e]">work</em>
        </h1>

        <p className="text-neutral-500 text-base leading-relaxed max-w-lg">
          Explore our portfolio across branding, motion, and cinematic experiences for leading brands and innovative startups.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-5xl mx-auto pt-6 border-t border-white/5">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            className="relative overflow-hidden bg-[#111]"
          >
            <div className="relative aspect-[9/16] w-full overflow-hidden">
              {project.videoUrl ? (
                <InlineReelVideo
                  src={project.videoUrl}
                  poster={project.coverImage}
                  className="w-full h-full object-cover pointer-events-none select-none"
                />
              ) : (
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover select-none"
                />
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
