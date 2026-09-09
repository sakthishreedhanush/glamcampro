import React, { useState, useEffect } from 'react';
import { Play, Volume2, VolumeX } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenBookModal, onOpenShowreel, isSoundOn, setIsSoundOn }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'nav-scrolled py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Wordmark */}
        <button 
          onClick={() => setActiveTab('home')}
          className="focus:outline-none group"
        >
          <span className="font-display text-2xl font-light tracking-wide text-white group-hover:text-[#c8a97e] transition-colors duration-500">
            THE<span className="font-medium">GLAMCAM</span>PRO
          </span>
        </button>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-5">
          
          {/* Sound Toggle */}
          <button 
            onClick={() => setIsSoundOn(!isSoundOn)}
            className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors duration-300"
            title={isSoundOn ? "Mute audio" : "Enable ambient audio"}
          >
            {isSoundOn ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#c8a97e]" />
                <div className="flex items-end gap-0.5 h-3">
                  <div className="equalizer-bar" />
                  <div className="equalizer-bar" />
                  <div className="equalizer-bar" />
                </div>
              </>
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Showreel */}
          <button 
            onClick={onOpenShowreel}
            className="flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] uppercase text-neutral-400 hover:text-white transition-colors duration-300"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Reel</span>
          </button>

          {/* CTA */}
          <button
            onClick={onOpenBookModal}
            className="btn-primary text-[11px] py-3 px-6"
          >
            <span>Start a Project</span>
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2.5 md:hidden">
          {/* Reel */}
          <button 
            onClick={onOpenShowreel}
            className="p-2 text-neutral-400"
          >
            <Play className="w-4 h-4 fill-current" />
          </button>

          {/* CTA */}
          <button
            onClick={onOpenBookModal}
            className="btn-primary text-[10px] py-2 px-4"
          >
            <span>Start a Project</span>
          </button>
        </div>
      </div>
    </header>
  );
}
