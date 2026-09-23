import React, { useState, useEffect } from 'react';

export default function Navbar({ onOpenBookModal }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'nav-scrolled py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Wordmark */}
        <button 
          onClick={scrollToTop}
          className="focus:outline-none group text-left"
        >
          <span className="font-display text-xl sm:text-2xl font-light tracking-wide text-white group-hover:text-[#c8a97e] transition-colors duration-500">
            THE<span className="font-medium">GLAMCAM</span>PRO
          </span>
        </button>

        {/* Right Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* CTA */}
          <button
            onClick={onOpenBookModal}
            className="btn-primary text-[10px] sm:text-[11px] py-2.5 px-4 sm:py-3 sm:px-6"
          >
            <span>PLAN YOUR EXPERIENCE</span>
          </button>
        </div>

      </div>
    </header>
  );
}

