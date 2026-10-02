import React, { useState } from 'react';
import { PROJECTS } from '../data/mockData';
import ReelCard from '../components/ReelCard';

export default function Work({ onSelectProject, onOpenBookModal }) {
  const [activeReelId, setActiveReelId] = useState(null);
  const [isGlobalMuted, setIsGlobalMuted] = useState(false);

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
        {PROJECTS.map((project) => (
          <ReelCard
            key={project.id}
            id={`work-page-${project.id}`}
            src={project.videoUrl}
            poster={project.coverImage}
            activeReelId={activeReelId}
            onActivate={setActiveReelId}
            isGlobalMuted={isGlobalMuted}
            onToggleMute={setIsGlobalMuted}
          />
        ))}
      </div>

    </div>
  );
}
