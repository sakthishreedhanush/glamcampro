import React, { useState, useEffect } from 'react';
import { Play, Volume2, VolumeX, Menu, X } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenBookModal, onOpenShowreel, isSoundOn, setIsSoundOn }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'work', label: 'Work' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'journal', label: 'Journal' },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || mobileMenuOpen ? 'nav-scrolled py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Wordmark */}
        <button 
          onClick={() => handleTabClick('home')}
          className="focus:outline-none group text-left"
        >
          <span className="font-display text-2xl font-light tracking-wide text-white group-hover:text-[#c8a97e] transition-colors duration-500">
            THE<span className="font-medium">GLAMCAM</span>PRO
          </span>
        </button>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`text-[11px] font-medium tracking-[0.14em] uppercase transition-all duration-300 relative py-1 ${
                activeTab === item.id ? 'text-[#c8a97e]' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {item.label}
              {activeTab === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#c8a97e] animate-fadeIn" />
              )}
            </button>
          ))}
        </nav>

        {/* Right Desktop Actions */}
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
            <Play className="w-3 h-3 fill-current text-[#c8a97e]" />
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

        {/* Mobile Actions & Menu Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenBookModal}
            className="btn-primary text-[10px] py-2 px-3"
          >
            <span>Book</span>
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-400 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a]/98 border-b border-white/10 px-6 py-8 space-y-6 animate-fadeIn">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`text-left text-lg font-display tracking-wider transition-colors py-2 border-b border-white/5 ${
                  activeTab === item.id ? 'text-[#c8a97e] font-normal' : 'text-neutral-400 hover:text-white font-light'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <button
              onClick={() => {
                onOpenShowreel();
                setMobileMenuOpen(false);
              }}
              className="btn-secondary text-[11px] py-3 justify-center w-full"
            >
              <Play className="w-3 h-3 fill-current text-[#c8a97e]" />
              <span>Watch Showreel</span>
            </button>

            <button
              onClick={() => {
                onOpenBookModal();
                setMobileMenuOpen(false);
              }}
              className="btn-primary text-[11px] py-3 justify-center w-full"
            >
              <span>Start a Project</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
