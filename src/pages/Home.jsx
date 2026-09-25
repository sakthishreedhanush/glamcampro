import React from 'react';
import { PROJECTS, SERVICES } from '../data/mockData';
import { Play } from 'lucide-react';
import InlineReelVideo from '../components/InlineReelVideo';
import { getAssetUrl } from '../utils/assets';

export default function Home({ onOpenShowreel, onSelectProject, onOpenBookModal }) {

  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pb-24">

      {/* HERO */}
      <section className="relative w-full overflow-hidden pt-32 md:pt-40 pb-28 md:pb-40 border-b border-white/5">
        {/* HERO BACKGROUND VIDEO */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <InlineReelVideo
            src="BASKETBALL_REEL_2_GLAMBOT.mp4"
            poster="glambot_2.jpeg"
            loopDuration={5}
            className="w-full h-full object-cover opacity-75 scale-105"
          />
        </div>
        
        {/* GRADIENT OVERLAYS FOR HIGH CONTRAST & LUXURY FEEL */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#070711] via-[#070711]/85 to-[#070711]/40 md:to-[#070711]/30 pointer-events-none" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#070711] via-transparent to-[#070711]/80 pointer-events-none" />
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,169,126,0.12),transparent_70%)] pointer-events-none" />

        {/* HERO CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl space-y-8 md:space-y-10">

            <span className="label-gold inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#c8a97e]/10 border border-[#c8a97e]/20 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8a97e] animate-pulse" />
              Ultra Slow-Motion Cinematography
            </span>

            <h1 className="hero-heading">
              Make Every Moment<br />
              <em>Cinematic</em>
            </h1>

            <p className="hero-subtitle text-neutral-200 max-w-2xl text-lg md:text-xl font-light leading-relaxed">
              An extraordinary slow-motion experience, designed to be seen, shared and remembered.
            </p>

            <p className="text-sm md:text-base text-neutral-400 max-w-2xl leading-relaxed font-light">
              Step into the spotlight and experience the magic of cinematic slow motion. From weddings and celebrations to sports and brand activations, The Glam Cam Pro transforms ordinary moments into extraordinary visual experiences—crafted to captivate, connect and be shared.
            </p>
          </div>
        </div>
      </section>

      {/* HERO VIDEO REELS — Clickable to pop up, zero name or text on reel */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20 md:pb-32 border-b border-white/5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { src: getAssetUrl('AMANDA_REEL7_GLAMBOT.mp4'), poster: getAssetUrl('glambot_1.jpeg') },
            { src: getAssetUrl('BASKETBALL_REEL_2_GLAMBOT.mp4'), poster: getAssetUrl('glambot_2.jpeg') },
            { src: getAssetUrl('SUKHLEEN_REEL_444_GLAMBOT.mp4'), poster: getAssetUrl('glambot_3.jpeg') }
          ].map((item, i) => (
            <div
              key={i}
              onClick={() => onOpenShowreel(i)}
              className="relative overflow-hidden bg-[#111] cursor-pointer group rounded-lg transition-transform duration-500 hover:shadow-2xl"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpenShowreel(i); }}
              aria-label="Open reel"
            >
              <div className="relative aspect-[9/16] w-full overflow-hidden">
                <InlineReelVideo
                  src={item.src}
                  poster={item.poster}
                  className="w-full h-full object-cover pointer-events-none select-none group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Subtle Play Icon Hint on Hover — NO name, NO text */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-5 h-5 fill-current ml-0.5 text-[#c8a97e]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED WORK / RECENT PROJECTS REELS — Clickable to pop up, zero name or text on reel */}
      <section id="work" className="max-w-7xl mx-auto px-6 md:px-12 pb-32">
        <div className="flex items-end justify-between mb-14 pb-8 border-b border-white/5">
          <div>
            <span className="label-gold mb-4 block">Selected Work</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight">
              Recent projects
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 max-w-5xl mx-auto">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              onClick={() => onOpenShowreel(index)}
              className="relative overflow-hidden bg-[#111] cursor-pointer group rounded-lg transition-transform duration-500 hover:shadow-2xl"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpenShowreel(index); }}
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
                {/* Subtle Play Icon Hint on Hover — NO name, NO text */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-5 h-5 fill-current ml-0.5 text-[#c8a97e]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
