import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'reel', label: 'Reel' }
];

export default function Navbar({ activeTab = 'home' }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNoOp = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'nav-scrolled py-3 sm:py-4' : 'bg-transparent py-5 sm:py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Brand & Nav Buttons */}
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          {/* Wordmark */}
          <div 
            onClick={handleNoOp}
            className="focus:outline-none group text-left flex-shrink-0 cursor-default select-none"
            aria-label="The Glam Cam Pro home"
          >
            <span className="font-display text-lg sm:text-xl md:text-2xl font-light tracking-wide text-white">
              THE<span className="font-medium">GLAMCAM</span>PRO
            </span>
          </div>

          {/* Desktop Navigation Buttons */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={handleNoOp}
                  className={`text-xs lg:text-[13px] font-light tracking-wider transition-all duration-300 py-1.5 px-3 lg:px-3.5 rounded-full border cursor-default select-none ${
                    isActive
                      ? 'text-[#c8a97e] bg-[#c8a97e]/10 border-[#c8a97e]/30 shadow-sm font-normal'
                      : 'text-neutral-300 border-transparent hover:border-white/10 hover:bg-white/5'
                  }`}
                  aria-label={item.label}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* CTA */}
          <button
            type="button"
            onClick={handleNoOp}
            className="btn-primary text-[10px] sm:text-[11px] py-2 px-3.5 sm:py-3 sm:px-6 cursor-default select-none"
          >
            <span>PLAN YOUR EXPERIENCE</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={handleNoOp}
            className="md:hidden w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 focus:outline-none cursor-default select-none"
            aria-label="Navigation Menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}

