import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = "15550199234"; // Default WhatsApp contact number
  const defaultMessage = encodeURIComponent("Hi GlamCam Pro Team! I'd like to inquire about booking a 1000 FPS Glambot session for my upcoming event.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-[#0a0a0a]/90 backdrop-blur-md border border-[#25D366]/40 hover:border-[#25D366] text-white px-4 py-3 shadow-2xl transition-all duration-300 hover:scale-[1.05] group"
    >
      <div className="relative flex items-center justify-center">
        <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-[#25D366] opacity-75" />
        <MessageCircle className="w-5 h-5 text-[#25D366] group-hover:scale-110 transition-transform" />
      </div>
      <div className="hidden sm:flex flex-col text-left">
        <span className="text-[10px] tracking-[0.14em] uppercase text-neutral-400 font-medium leading-none mb-1">Instant Inquiry</span>
        <span className="text-xs font-medium text-white tracking-wide leading-none">Chat on WhatsApp</span>
      </div>
    </a>
  );
}
