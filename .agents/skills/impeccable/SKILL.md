---
name: impeccable
description: Ensures highest visual design standards, zero visual glitches, fluid micro-animations, flawless mobile responsiveness, and clean code quality across web applications.
---

# Impeccable Skill — Excellence Guidelines

This skill enforces peak aesthetic craftsmanship, flawless UI design, robust code quality, and exceptional user experiences.

## 1. Visual Aesthetics & Design Polish
- **Harmonious Color Palette**: Use curated luxury HSL and dark-mode color tokens. Avoid generic browser colors.
- **Typography Excellence**: Utilize high-end typography hierarchy (e.g., Cormorant Garamond for display headers, Inter for crisp body copy).
- **Micro-Animations & Micro-Interactions**: Use smooth, hardware-accelerated CSS transitions (`transition-all duration-300 ease-out`), subtle scale effects on hover (`hover:scale-[1.02]`), and subtle gold accents.
- **Glassmorphism & Depth**: Leverage modern backdrop blur (`backdrop-blur-md`), subtle translucent borders (`border-white/8`), and deep true-black elevated surfaces (`#0a0a0a`, `#111111`).

## 2. Multi-Device Responsiveness
- **Fluid Layout Spacing**: Use responsive padding and margins (`px-4 sm:px-6 md:px-12`).
- **Touch-First Controls**: Ensure touch targets are at least 44x44px for thumb friendliness.
- **Viewport Notch Support**: Always set `viewport-fit=cover` in meta viewport.
- **Form Input Zoom Fix**: Enforce `font-size: 16px` on mobile inputs to prevent iOS Safari auto-zooming.
- **Inline Video Playback**: Ensure all video tags carry `playsInline`, `muted`, `loop`, and `preload="metadata"`.

## 3. Code Integrity & Performance
- **Zero Console Errors**: Ensure all components render cleanly without unhandled exceptions or broken imports.
- **Relative Path Safety**: Use relative base paths (`./`) for static assets to work flawlessly across all deployment environments (GitHub Pages, Vercel, Netlify, custom subpaths).
- **Graceful Empty States**: Always provide visual fallback messages when arrays or datasets are empty.
- **Production Build Verification**: Continuously verify compilation with `npm run build`.
