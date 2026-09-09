import React, { useState } from 'react';
import { SERVICES } from '../data/mockData';
import { ArrowUpRight, Check } from 'lucide-react';

export default function Services({ onOpenBookModal }) {
  const [selectedServices, setSelectedServices] = useState(['Capture', 'Cinematography']);
  const [timelineSpeed, setTimelineSpeed] = useState('standard');

  const estimatorServices = [
    { id: 'Capture', name: '1000 FPS Glambot On-Site Shoot', price: 3500, weeks: 1 },
    { id: 'Cinematography', name: 'Post-Production & Speed Ramping', price: 2000, weeks: 1 },
    { id: 'Lighting', name: 'Studio Lighting & High-Speed Rigs', price: 1500, weeks: 1 }
  ];

  const toggleEstimatorService = (id) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const calculatedPrice = estimatorServices
    .filter(s => selectedServices.includes(s.id))
    .reduce((acc, curr) => acc + curr.price, 0) * (timelineSpeed === 'expedited' ? 1.25 : 1);

  const calculatedWeeks = estimatorServices
    .filter(s => selectedServices.includes(s.id))
    .reduce((acc, curr) => acc + curr.weeks, 0);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 md:px-12 space-y-32">
      
      {/* Header */}
      <div className="max-w-4xl space-y-6">
        <span className="label-gold">Services & Capabilities</span>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tight leading-[1.05]">
          All the ways we<br />
          <em className="italic text-[#c8a97e]">move brands</em>
        </h1>

        <p className="text-base text-neutral-500 leading-relaxed max-w-2xl">
          Strategy sets the direction and design gives it form. Crafted in-house and engineered to be unmistakable wherever your brand shows up.
        </p>
      </div>

      {/* Services List */}
      <div className="space-y-0">
        {SERVICES.map((service) => (
          <div
            key={service.id}
            className="py-16 border-b border-white/5 first:border-t first:border-white/5"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              
              {/* Left */}
              <div className="lg:col-span-5">
                <div className="flex items-baseline gap-5 mb-5">
                  <span className="font-display text-4xl font-light text-neutral-700">
                    {service.num}
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl font-normal text-white">
                    {service.title}
                  </h2>
                </div>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {service.subtitle} {service.description}
                </p>
              </div>

              {/* Right — Deliverables */}
              <div className="lg:col-span-7">
                <span className="label block mb-6">Key Deliverables</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 py-3 border-b border-white/3 text-sm text-neutral-400">
                      <span className="w-1 h-1 bg-[#c8a97e] flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ESTIMATOR */}
      <div className="border border-white/8 p-8 md:p-14 space-y-10">
        
        <div>
          <span className="label-gold mb-4 block">Scope & Timeline Estimator</span>
          <h3 className="font-display text-2xl md:text-3xl font-light text-white">
            Customize your project scope
          </h3>
          <p className="text-sm text-neutral-500 mt-2">
            Select deliverables for instant transparent pricing and execution timelines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Options */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <span className="label block mb-4">1. Project modules</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {estimatorServices.map((item) => {
                  const isSelected = selectedServices.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleEstimatorService(item.id)}
                      className={`p-4 border text-left flex items-center justify-between transition-all duration-300 ${
                        isSelected
                          ? 'bg-[#c8a97e]/8 border-[#c8a97e]/30 text-white'
                          : 'bg-transparent border-white/8 text-neutral-500 hover:border-white/16'
                      }`}
                    >
                      <span className="text-sm">{item.name}</span>
                      <span className="text-[11px] text-[#c8a97e] font-medium tracking-wide">
                        {isSelected ? '✓' : '+'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <span className="label block mb-4">2. Delivery pace</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setTimelineSpeed('standard')}
                  className={`flex-1 py-3.5 px-5 border text-sm font-medium transition-all duration-300 ${
                    timelineSpeed === 'standard'
                      ? 'bg-white text-black border-white'
                      : 'bg-transparent border-white/8 text-neutral-500 hover:border-white/16'
                  }`}
                >
                  Standard
                </button>
                <button
                  onClick={() => setTimelineSpeed('expedited')}
                  className={`flex-1 py-3.5 px-5 border text-sm font-medium transition-all duration-300 ${
                    timelineSpeed === 'expedited'
                      ? 'bg-[#c8a97e] text-black border-[#c8a97e]'
                      : 'bg-transparent border-white/8 text-neutral-500 hover:border-white/16'
                  }`}
                >
                  Expedited (+25%)
                </button>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="border border-white/8 p-8 flex flex-col justify-between space-y-8">
            <div>
              <span className="label block mb-3">Estimated investment</span>
              <span className="font-display text-4xl md:text-5xl font-light text-white block">
                ${calculatedPrice.toLocaleString()}
              </span>
              <span className="text-sm text-neutral-500 block mt-3">
                Delivery: <strong className="text-[#c8a97e] font-medium">{calculatedWeeks} weeks</strong>
              </span>
            </div>

            <button
              onClick={onOpenBookModal}
              className="btn-primary text-[11px] py-4 px-6 w-full justify-center"
            >
              <span>Lock in this scope</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
