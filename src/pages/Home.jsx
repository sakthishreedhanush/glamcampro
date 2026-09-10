import React from 'react';
import { PROJECTS, SERVICES } from '../data/mockData';
import { Play, ArrowUpRight, ArrowRight } from 'lucide-react';

export default function Home({ onOpenShowreel, onSelectProject, onOpenBookModal, setActiveTab }) {

  return (
    <div className="pt-28 pb-24">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-12 md:pt-24 pb-32 md:pb-44">
        <div className="max-w-5xl space-y-10">

          <span className="label-gold">Ultra Slow-Motion Cinematography</span>

          <h1 className="hero-heading">
            Capturing every<br />
            moment at <em>1000 FPS</em>
          </h1>

          <p className="hero-subtitle">
            We transform ordinary moments into cinematic experiences using precision Glambot technology and stunning slow-motion detail.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-4 hero-fade-up">
            <button
              onClick={() => setActiveTab('work')}
              className="btn-primary text-[11px] py-4 px-8 justify-center w-full sm:w-auto"
            >
              <span>View Work</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onOpenShowreel}
              className="btn-secondary text-[11px] py-4 px-8 justify-center w-full sm:w-auto"
            >
              <Play className="w-3 h-3 fill-current text-[#c8a97e]" />
              <span>Watch Reel</span>
            </button>
          </div>
        </div>
      </section>

      {/* HERO VIDEO REELS */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20 md:pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            './Sahil01_Glamcam_final.mp4',
            './AMANDA REEL7 GLAMBOT .mp4',
            './BASKETBALL REEL 2 GALMBOT.mp4'
          ].map((src, i) => (
            <div
              key={i}
              onClick={onOpenShowreel}
              className="relative overflow-hidden group cursor-pointer bg-[#111]"
            >
              <div className="relative aspect-[9/16] w-full overflow-hidden">
                <video
                  src={src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1.2s] ease-out"
                />
                <div className="absolute inset-0 video-overlay opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 opacity-100 sm:opacity-0 group-hover:opacity-100 translate-y-0 sm:translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <span className="text-[11px] tracking-[0.14em] uppercase text-neutral-300 font-medium">
                    Reel {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DIVIDER — TAGLINE */}
      <section className="border-y border-white/5 py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <p className="text-center font-display text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.08em] uppercase text-neutral-600">
            A Focus Sports Media Foundation
          </p>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-44">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">

          {/* Left — Heading */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
            <span className="label-gold mb-6 block">What we do</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] tracking-tight mb-6">
              Precision meets<br /><em className="text-[#c8a97e] italic">artistry</em>
            </h2>
            <p className="text-sm text-neutral-500 leading-relaxed max-w-sm">
              From creative direction to final delivery, we handle every frame with meticulous care.
            </p>
          </div>

          {/* Right — Services */}
          <div className="lg:col-span-8 space-y-0">
            {SERVICES.map((service, index) => (
              <div
                key={service.id}
                className="py-12 border-b border-white/5 first:border-t first:border-white/5"
              >
                <div className="flex items-baseline justify-between mb-6">
                  <div className="flex items-baseline gap-6">
                    <span className="font-display text-3xl md:text-4xl font-light text-neutral-700">
                      {service.num}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-normal text-white">
                      {service.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-neutral-500 leading-relaxed max-w-xl mb-6">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {service.deliverables.slice(0, 4).map((item, idx) => (
                    <span key={idx} className="text-[12px] text-neutral-400 tracking-wide">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-32">
        <div className="flex items-end justify-between mb-14 pb-8 border-b border-white/5">
          <div>
            <span className="label-gold mb-4 block">Selected Work</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
              Recent projects
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('work')}
            className="hidden md:flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase font-medium text-neutral-500 hover:text-white transition-colors"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {PROJECTS.slice(0, 4).map((project, index) => (
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
      </section>

    </div>
  );
}
