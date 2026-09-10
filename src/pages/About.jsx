import React from 'react';
import { CLIENT_LOGOS } from '../data/mockData';
import { ArrowUpRight } from 'lucide-react';

export default function About({ onOpenBookModal }) {
  const values = [
    {
      title: "Momentum",
      description: "Decisions get made, work gets shipped, and nothing waits for a meeting. Speed is the compliment our clients pay us most.",
    },
    {
      title: "Precision",
      description: "Every detail gets the same attention, from the kerning on a wordmark to the milliseconds a page takes to load.",
    },
    {
      title: "Ownership",
      description: "One team answers for everything we make. We treat every brand we touch as if our name were on it.",
    }
  ];

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 md:px-12 space-y-32">
      
      {/* Hero */}
      <div className="max-w-4xl space-y-6">
        <span className="label-gold">About</span>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tight leading-[1.05]">
          Greater than<br />
          <em className="italic text-[#c8a97e]">the sum</em>
        </h1>

        <p className="text-base md:text-lg text-neutral-400 font-light leading-relaxed max-w-3xl">
          THEGLAMCAMPRO is an independent cinematography studio, founded in 2017 and kept deliberately small. The people who win your work are the people who do it. Senior operators, creative directors and engineers — one team, one standard.
        </p>
      </div>

      {/* Values */}
      <div className="space-y-14">
        <div className="border-b border-white/5 pb-6">
          <span className="label">Core Values</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {values.map((val) => (
            <div key={val.title} className="bg-[#0a0a0a] p-10 md:p-12 space-y-5">
              <h3 className="font-display text-2xl md:text-3xl font-light text-white">
                {val.title}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="py-20 border-y border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 text-center">
          <div>
            <span className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-white block mb-3">
              2017
            </span>
            <span className="label block mb-2">Founded</span>
            <p className="text-[12px] text-neutral-600">Independent & founder-led</p>
          </div>

          <div>
            <span className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-[#c8a97e] block mb-3">
              4.9
            </span>
            <span className="label block mb-2">Client Rating</span>
            <p className="text-[12px] text-neutral-600">Across 100+ engagements</p>
          </div>

          <div>
            <span className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-white block mb-3">
              600+
            </span>
            <span className="label block mb-2">Projects Delivered</span>
            <p className="text-[12px] text-neutral-600">Global brands & scaleups</p>
          </div>
        </div>
      </div>

      {/* Parent Foundation & Partners */}
      <div className="space-y-10">
        <span className="label">Parent Foundation</span>
        <div className="bg-[#0a0a0a] border border-white/5 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-display text-2xl text-white font-light tracking-wide">Focus Sports Media</h4>
            <p className="text-sm text-neutral-500 mt-1">Parent Media & Production Foundation</p>
          </div>
          <img src="./focus sports media parent logo.jpeg" alt="Focus Sports Media" className="h-12 object-contain opacity-80 hover:opacity-100 transition-opacity" />
        </div>
      </div>

    </div>
  );
}
