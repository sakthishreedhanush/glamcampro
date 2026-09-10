import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Footer({ onOpenBookModal }) {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Top — CTA */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 pb-20 border-b border-white/5">
          <div>
            <p className="label-gold mb-5">Let's work together</p>
            <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] tracking-tight">
              Ready to capture<br />
              something <em className="text-[#c8a97e] italic">extraordinary</em>?
            </h3>
          </div>
          <button
            onClick={onOpenBookModal}
            className="btn-primary text-[11px] py-4 px-8 flex-shrink-0"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-16">
          
          {/* Brand */}
          <div className="space-y-5">
            <span className="font-display text-xl font-light tracking-wide text-white">
              THE<span className="font-medium">GLAMCAM</span>PRO
            </span>
            <p className="text-sm text-neutral-500 leading-relaxed max-w-xs">
              Ultra slow-motion cinematography at 1000 FPS.
              A Focus Sports Media foundation.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <span className="label">Contact</span>
            <div className="flex flex-col gap-3 text-sm text-neutral-500">
              <a href="mailto:palfocussports@gmail.com" className="hover:text-white transition-colors">palfocussports@gmail.com</a>
              <a 
                href="https://wa.me/15550199234?text=Hi%20GlamCam%20Pro%20Team!%20I'd%20like%20to%20inquire%20about%20booking%20a%201000%20FPS%20Glambot%20session." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#25D366] transition-colors flex items-center gap-2"
              >
                <span>WhatsApp Direct Inquiry</span>
              </a>
              <span>Vancouver, Canada</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[11px] text-neutral-600 gap-4 tracking-wide">
          <span>© {new Date().getFullYear()} THEGLAMCAMPRO. All rights reserved.</span>
        </div>

      </div>
    </footer>
  );
}
