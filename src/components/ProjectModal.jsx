import React from 'react';
import { X } from 'lucide-react';

export default function ProjectModal({ project, onClose, onOpenBookModal }) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-white/5" onClick={(e) => e.stopPropagation()}>
        <span className="label-gold">{project.title}</span>
        <button
          onClick={onClose}
          className="text-neutral-500 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Video / Image — Full Screen */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8" onClick={(e) => e.stopPropagation()}>
        <div className="relative aspect-[9/16] h-full max-h-[80vh] overflow-hidden">
          {project.videoUrl ? (
            <video
              src={project.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
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
