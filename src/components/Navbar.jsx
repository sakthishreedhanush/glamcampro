import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'reels', label: 'Reel' }
];

export default function Navbar({ activeTab = 'home', setActiveTab, onOpenBookModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBrandClick = () => {
    if (setActiveTab) setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (id) => {
    if (id === 'reels') {
      if (activeTab !== 'home' && setActiveTab) {
        setActiveTab('home');
        setTimeout(() => {
          const el = document.getElementById('reels');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById('reels');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (setActiveTab) {
      setActiveTab(id);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'nav-scrolled py-2.5 sm:py-4' : 'bg-transparent py-3.5 sm:py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
        
        {/* Brand & Nav */}
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
          {/* Wordmark */}
          <button 
            type="button"
            onClick={handleBrandClick}
            className="focus:outline-none group text-left flex-shrink-0 cursor-pointer select-none"
            aria-label="The Glam Cam Pro home"
          >
            <span className="font-display text-base sm:text-xl md:text-2xl font-light tracking-wide text-white group-hover:text-[#c8a97e] transition-colors">
              THE<span className="font-medium">GLAMCAM</span>PRO
            </span>
          </button>

          {/* Desktop Navigation Buttons */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = (item.id === 'reels' ? activeTab === 'home' : activeTab === item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`text-xs lg:text-[13px] font-light tracking-wider transition-all duration-300 py-1.5 px-3 lg:px-3.5 rounded-full border cursor-pointer select-none ${
                    isActive && item.id !== 'reels'
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

        {/* Right Actions — Perfectly aligned and proportioned on phone & desktop */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6 flex-shrink-0">
          {/* CTA Button */}
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              if (onOpenBookModal) onOpenBookModal();
            }}
            className="nav-cta-btn select-none"
            aria-label="Plan your experience"
          >
            <span className="hidden sm:inline">PLAN YOUR EXPERIENCE</span>
            <span className="sm:hidden">PLAN</span>
          </button>

          {/* Mobile Hamburger / Close Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden nav-menu-btn select-none"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4 text-[#c8a97e]" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu & Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          {/* Backdrop overlay — Click to dismiss */}
          <div 
            className="fixed inset-0 top-[54px] bg-black/60 backdrop-blur-sm z-40 animate-fadeIn"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Menu Surface */}
          <div className="relative z-50 bg-[#0a0a0a]/98 backdrop-blur-2xl border-b border-white/10 px-5 py-5 animate-fadeIn transition-all shadow-2xl">
            <nav className="flex flex-col gap-2" aria-label="Mobile Navigation">
              {NAV_ITEMS.map((item) => {
                const isActive = (item.id === 'reels' ? false : activeTab === item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left text-sm py-3 px-4 rounded-xl transition-all flex items-center justify-between cursor-pointer min-h-[44px] ${
                      isActive
                        ? 'text-[#c8a97e] bg-[#c8a97e]/10 font-medium border border-[#c8a97e]/20'
                        : 'text-neutral-300 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <span className="tracking-wide text-[13px]">{item.label}</span>
                    {isActive ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c8a97e]" />
                    ) : (
                      <span className="text-xs text-neutral-600">→</span>
                    )}
                  </button>
                );
              })}

              <div className="pt-3 border-t border-white/10 mt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (onOpenBookModal) onOpenBookModal();
                  }}
                  className="w-full h-11 rounded-full bg-[#c8a97e] hover:bg-[#d4ba94] text-black font-semibold text-xs uppercase tracking-wider transition-all active:scale-98 flex items-center justify-center cursor-pointer shadow-lg"
                >
                  PLAN YOUR EXPERIENCE
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

