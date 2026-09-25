import React from 'react';
import { PROJECTS } from '../data/mockData';
import InlineReelVideo from '../components/InlineReelVideo';
import { getAssetUrl } from '../utils/assets';

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
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 max-w-5xl mx-auto pt-6 border-t border-white/5">
        {PROJECTS.map((project, index) => (
          <div
            key={project.id}
            onClick={() => onSelectProject(index)}
            className="relative overflow-hidden bg-[#111] cursor-pointer group rounded-lg transition-transform duration-500 hover:shadow-2xl"
            role="button"
            tabIndex={0}
            aria-label="Open reel"
          >
            <div className="relative aspect-[9/16] w-full overflow-hidden">
              {project.videoUrl ? (
                <InlineReelVideo
                  src={project.videoUrl}
                  poster={project.coverImage}
                  className="w-full h-full object-cover pointer-events-none select-none group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              ) : (
                <img
                  src={project.coverImage}
                  alt=""
                  className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
