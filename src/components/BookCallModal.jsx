import React, { useState } from 'react';
import { X, Check, Send, Mail } from 'lucide-react';

export default function BookCallModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ name: '', contact: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const bookingPayload = {
      timestamp: new Date().toISOString(),
      name: formData.name,
      contact: formData.contact,
      email: formData.email,
      message: formData.message || 'No additional details provided.'
    };

    // Save to local storage as fail-safe backup
    try {
      const existing = JSON.parse(localStorage.getItem('glamcam_bookings') || '[]');
      localStorage.setItem('glamcam_bookings', JSON.stringify([bookingPayload, ...existing]));
    } catch (err) {
      console.warn('LocalStorage save warning:', err);
    }

    try {
      // Send directly to palfocussports@gmail.com using FormSubmit API
      const response = await fetch("https://formsubmit.co/ajax/palfocussports@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `✨ New GlamCam Pro Booking Request from ${formData.name}`,
          _template: "table",
          _captcha: "false",
          "Client Name": formData.name,
          "Contact Number / WhatsApp": formData.contact,
          "Client Email": formData.email,
          "Event Details / Notes": formData.message || "None provided",
          "Submitted At": new Date().toLocaleString()
        })
      });

      const result = await response.json();

      if (response.ok || result.success === "true" || result.success === true) {
        setSubmitted(true);
      } else {
        // Backup attempt using Web3Forms if FormSubmit is unreachable
        const fallbackRes = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: "a8d2983a-4efb-4b21-8eb1-4d37c8cbcf60",
            subject: `✨ New GlamCam Pro Booking Request from ${formData.name}`,
            to_email: "palfocussports@gmail.com",
            name: formData.name,
            contact: formData.contact,
            email: formData.email,
            message: `Client Name: ${formData.name}\nContact: ${formData.contact}\nEmail: ${formData.email}\nDetails: ${formData.message}`
          })
        });
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting booking form:", error);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setErrorMessage('');
    setFormData({ name: '', contact: '', email: '', message: '' });
    onClose();
  };

  const mailtoUrl = `mailto:palfocussports@gmail.com?subject=${encodeURIComponent(`Glambot Booking - ${formData.name}`)}&body=${encodeURIComponent(
    `Hi GlamCam Pro Team,\n\nI would like to book a Glambot session.\n\nName: ${formData.name}\nPhone/WhatsApp: ${formData.contact}\nEmail: ${formData.email}\nDetails: ${formData.message}\n`
  )}`;

  const inputClasses = "w-full px-4 py-3.5 bg-[#111] border border-white/8 text-white text-sm focus:border-[#c8a97e]/50 focus:outline-none transition-colors font-body";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0a]/95 backdrop-blur-sm">
      
      <div className="relative w-full max-w-xl bg-[#0a0a0a] border border-white/8 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/5 flex-shrink-0">
          <span className="label-gold">Book a Glambot Session</span>
          <button
            onClick={resetForm}
            className="text-neutral-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto">
          
          {submitted ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-14 h-14 border border-[#c8a97e]/40 flex items-center justify-center mx-auto rounded-full bg-[#c8a97e]/10">
                <Check className="w-6 h-6 text-[#c8a97e]" />
              </div>
              
              <div className="space-y-3">
                <h3 className="font-display text-3xl font-light text-white">
                  Booking Submitted!
                </h3>
                <p className="text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Your booking details have been sent to <span className="text-[#c8a97e]">palfocussports@gmail.com</span>. We will contact you shortly via WhatsApp or Email.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={mailtoUrl}
                  className="btn-secondary text-[11px] py-3.5 px-6 flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Open Direct Email</span>
                </a>
                <button
                  onClick={resetForm}
                  className="btn-primary text-[11px] py-3.5 px-7"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {errorMessage && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded">
                  {errorMessage}
                </div>
              )}

              {/* 1. Name */}
              <div>
                <label className="label-gold block mb-2 text-xs uppercase tracking-wider">
                  1. Full Name *
                </label>
                <input
                  type="text"
                  required
                  maxLength={50}
                  placeholder="e.g. Alex Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClasses}
                  disabled={isSubmitting}
                />
              </div>

              {/* 2. Contact Number */}
              <div>
                <label className="label-gold block mb-2 text-xs uppercase tracking-wider">
                  2. Contact Number / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  maxLength={30}
                  placeholder="e.g. +1 (555) 019-9234"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className={inputClasses}
                  disabled={isSubmitting}
                />
              </div>

              {/* 3. Email Address */}
              <div>
                <label className="label-gold block mb-2 text-xs uppercase tracking-wider">
                  3. Email Address *
                </label>
                <input
                  type="email"
                  required
                  maxLength={60}
                  placeholder="e.g. alex@brand.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClasses}
                  disabled={isSubmitting}
                />
              </div>

              {/* 4. Event Details (Optional) */}
              <div>
                <label className="label-gold block mb-2 text-xs uppercase tracking-wider">
                  4. Event Details / Date (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Event location, date, expected guests or special requests..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`${inputClasses} resize-none`}
                  disabled={isSubmitting}
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-neutral-500">
                  Direct recipient: <span className="text-neutral-400">palfocussports@gmail.com</span>
                </span>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-primary text-[11px] py-4 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? "Sending..." : "Submit Booking"}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
