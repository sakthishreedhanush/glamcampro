import React from 'react';
import { PROJECTS } from '../data/mockData';

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-6 border-t border-white/5">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="relative overflow-hidden group cursor-pointer bg-[#111]"
          >
            <div className="relative aspect-[9/16] w-full overflow-hidden">
              {project.videoUrl ? (
                <video
                  src={project.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1.2s] ease-out"
                />
              ) : (
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1.2s] ease-out"
                />
              )}
              <div className="absolute inset-0 video-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                <span className="font-display text-lg text-white font-normal">
                  {project.title}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
