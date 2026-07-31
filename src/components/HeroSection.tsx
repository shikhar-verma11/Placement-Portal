import React, { useEffect, useRef } from 'react';
import { ArrowDownRight, Play, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { soundEngine } from '../utils/audio';
import { HeroGlassOrb } from './HeroGlassOrb';

interface HeroProps {
  onOpenPortalModal: () => void;
}

export const HeroSection: React.FC<HeroProps> = ({ onOpenPortalModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

      tl.fromTo(
        '.hero-badge',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
        .fromTo(
          '.hero-title-word',
          { y: 80, opacity: 0, filter: 'blur(8px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.08, duration: 1.1 },
          '-=0.4'
        )
        .fromTo(
          '.hero-3d-orb-layer',
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' },
          '-=0.9'
        )
        .fromTo(
          subtitleRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.7'
        )
        .fromTo(
          ctaRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          '.hero-geo-element',
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, stagger: 0.2, duration: 1.2 },
          '-=0.8'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const triggerConfetti = () => {
    soundEngine.playChime(650, 0.3);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6A8DFF', '#7D9EFF', '#FAFAFA', '#D4D4D4'],
    });
    const el = document.getElementById('problem');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between pt-28 sm:pt-32 pb-16 px-6 sm:px-12 bg-[#151515] overflow-hidden"
    >
      {/* Layer 0: Background Soft Ambient Spotlights & Abstract Geo Elements */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[550px] sm:w-[800px] h-[400px] sm:h-[600px] bg-radial from-[#6A8DFF]/12 via-transparent to-transparent blur-3xl pointer-events-none" />

        {/* Floating Wireframe Polygon */}
        <div className="hero-geo-element absolute top-[18%] right-[6%] w-32 h-32 border border-[#3A3A3A] rotate-45 rounded-2xl backdrop-blur-sm bg-white/[0.01] animate-float-slow hidden md:block" />

        {/* Floating Concentric Circle */}
        <div className="hero-geo-element absolute bottom-[22%] left-[5%] w-40 h-40 border border-[#3A3A3A] rounded-full backdrop-blur-sm bg-white/[0.01] animate-float-fast hidden md:flex items-center justify-center">
          <div className="w-20 h-20 border border-[#6A8DFF]/20 rounded-full" />
        </div>

        {/* Minimal Editorial Monospaced Accent Tag */}
        <div className="hero-geo-element absolute top-[28%] left-[5%] font-mono text-[11px] text-[#9E9E9E] tracking-widest uppercase border-l border-[#3A3A3A] pl-3 py-1 hidden md:block">
          Issue N° 01 &mdash; Enterprise Architecture
        </div>
      </div>

      {/* Layer 1: Global Three.js Glass Orb Scene Canvas (Covers Full Hero, Positioned Behind Text) */}
      <div className="hero-3d-orb-layer absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
        <HeroGlassOrb />
      </div>

      {/* Layer 2: Hero UI Content, Text & Interactive Buttons (Positioned ABOVE Orb Layer) */}
      <div className="relative z-20 max-w-7xl mx-auto w-full my-auto py-6 pointer-events-auto">
        {/* Top Editorial Eyebrow Tag */}
        <div className="mb-6">
          <div className="hero-badge inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#1F1F1F]/90 backdrop-blur-md border border-[#3A3A3A] text-xs font-mono text-[#D4D4D4] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#6A8DFF]" />
            <span>CAMPUS RECRUITMENT AUTOMATION ENGINE</span>
          </div>
        </div>

        {/* Clean Editorial Headline */}
        <div className="max-w-4xl">
          <h1
            ref={titleRef}
            className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-heading font-extrabold tracking-tight text-[#FAFAFA] leading-[0.98] mb-6 text-left uppercase"
          >
            <span className="hero-title-word block">PLACEMENT</span>
            <span className="hero-title-word block text-[#D4D4D4]">MANAGEMENT</span>
            <span className="hero-title-word block text-[#6A8DFF]">PORTAL.</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-base sm:text-xl text-[#D4D4D4] font-normal leading-relaxed text-balance max-w-2xl mb-8 drop-shadow-sm"
          >
            Replacing fragmented spreadsheets and delayed email notices with an automated, high-throughput campus placement workflow engine.
          </p>

          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4"
          >
            {/* Main CTA Button */}
            <button
              onClick={triggerConfetti}
              onMouseEnter={() => soundEngine.playHover()}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-sm font-medium text-white bg-[#6A8DFF] hover:bg-[#7D9EFF] transition-all duration-200 shadow-lg"
              data-cursor-hover
              data-cursor-text="EXPLORE"
            >
              <span>Explore Architecture</span>
              <ArrowDownRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </button>

            {/* Secondary Interactive Portal Trigger Link */}
            <button
              onClick={() => {
                soundEngine.playClick();
                onOpenPortalModal();
              }}
              onMouseEnter={() => soundEngine.playHover()}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-medium text-[#D4D4D4] hover:text-[#FAFAFA] bg-[#1F1F1F]/90 hover:bg-[#282828] backdrop-blur-md border border-[#3A3A3A] transition-all duration-200 shadow-sm"
              data-cursor-hover
              data-cursor-text="DEMO"
            >
              <Play className="w-3.5 h-3.5 text-[#6A8DFF] fill-[#6A8DFF]" />
              <span>Simulate Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Layer 2: Editorial Bottom Metadata Strip */}
      <div className="relative z-20 max-w-7xl mx-auto w-full pt-6 border-t border-[#3A3A3A]/60 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#9E9E9E] pointer-events-auto">
        <div className="flex items-center gap-6">
          <span>LATENCY: 0.02s</span>
          <span>RECORDS: 12,000+</span>
          <span className="hidden sm:inline">QUEUE: CELERY & REDIS</span>
        </div>
        <div className="flex items-center gap-2 text-[#D4D4D4]">
          <ShieldCheck className="w-4 h-4 text-[#6A8DFF]" />
          <span>ENTERPRISE GRADE AUDITED</span>
        </div>
      </div>
    </section>
  );
};
