import React, { useEffect, useRef } from 'react';
import { ArrowDownRight, Sparkles, Play, ShieldCheck, Zap, TrendingUp, Users, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { soundEngine } from '../utils/audio';

interface HeroProps {
  onOpenPortalModal: () => void;
}

export const HeroSection: React.FC<HeroProps> = ({ onOpenPortalModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsBadgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

      tl.fromTo(
        '.hero-badge',
        { y: -30, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8 }
      )
        .fromTo(
          '.hero-title-word',
          { y: 60, opacity: 0, rotateX: -45, filter: 'blur(10px)' },
          { y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)', stagger: 0.08, duration: 1 },
          '-=0.4'
        )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          ctaRef.current,
          { y: 30, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          '.hero-float-card',
          { y: 40, opacity: 0, scale: 0.8, rotateY: 20 },
          { y: 0, opacity: 1, scale: 1, rotateY: 0, stagger: 0.15, duration: 1 },
          '-=0.6'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const triggerConfetti = () => {
    soundEngine.playChime(650, 0.3);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#14F1D9', '#00FFC6', '#3B82F6', '#FFFFFF'],
    });
    const el = document.getElementById('problem');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const titleWords = [
    'SMART',
    'COLLEGE',
    'PLACEMENT',
    'MANAGEMENT',
    'PORTAL',
  ];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-4 sm:px-8 overflow-hidden"
    >
      {/* Radial Gradient Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] bg-radial from-[#14F1D9]/15 via-[#00FFC6]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Floating 3D Depth Spheres & Badges */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
        {/* Top Right Floating Card */}
        <div className="hero-float-card absolute top-[18%] right-[8%] glass-panel rounded-2xl p-4 border-[#14F1D9]/30 neon-glow-teal animate-float-slow max-w-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00FFC6]/20 flex items-center justify-center text-[#00FFC6]">
              <TrendingUp className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">Placement Rate</p>
              <p className="text-xl font-heading font-extrabold text-white flex items-center gap-1">
                98.4%
                <span className="text-[10px] text-[#00FFC6] font-mono">+14.2% YoY</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Left Floating Card */}
        <div className="hero-float-card absolute bottom-[20%] left-[6%] glass-panel rounded-2xl p-4 border-[#00FFC6]/30 neon-glow-mint animate-float-fast max-w-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#14F1D9]/20 flex items-center justify-center text-[#14F1D9]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">Top Package</p>
              <p className="text-xl font-heading font-extrabold text-[#00FFC6]">₹52.8 LPA</p>
            </div>
          </div>
        </div>

        {/* Top Left Floating Badge */}
        <div className="hero-float-card absolute top-[25%] left-[10%] glass-panel rounded-full px-4 py-2 border-white/10 text-xs font-mono text-slate-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00FFC6] animate-ping" />
          <span>Celery Queue: 0 Backlog</span>
        </div>

        {/* Bottom Right Floating Badge */}
        <div className="hero-float-card absolute bottom-[25%] right-[10%] glass-panel rounded-full px-4 py-2 border-white/10 text-xs font-mono text-slate-300 flex items-center gap-2">
          <Users className="w-3.5 h-3.5 text-[#14F1D9]" />
          <span>450+ Unicorn Recruiters</span>
        </div>
      </div>

      {/* Main Center Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Futuristic Eyebrow Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F172A]/80 border border-[#14F1D9]/40 text-xs font-mono text-[#00FFC6] shadow-[0_0_15px_rgba(20,241,217,0.2)] mb-8 backdrop-blur-md">
          <Zap className="w-3.5 h-3.5 text-[#00FFC6] animate-pulse" />
          <span>NEXT-GEN CAMPUS RECRUITMENT ECOSYSTEM</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#14F1D9]" />
        </div>

        {/* Hero Title with Word-by-Word Kinetic Reveal */}
        <h1
          ref={titleRef}
          className="perspective-container text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tight text-white leading-[1.08] mb-6"
        >
          {titleWords.map((word, index) => (
            <span
              key={index}
              className={`hero-title-word inline-block mr-3 sm:mr-4 transform-gpu ${
                index === 2 || index === 3
                  ? 'bg-gradient-to-r from-[#14F1D9] via-[#00FFC6] to-white bg-clip-text text-transparent neon-text-teal'
                  : ''
              }`}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Hero Subtitle */}
        <p
          ref={subtitleRef}
          className="text-base sm:text-xl text-slate-300 max-w-3xl font-light leading-relaxed mb-10 text-balance"
        >
          Replacing fragmented spreadsheets, delayed email notices, and manual eligibility checking with a{' '}
          <strong className="text-white font-medium underline decoration-[#14F1D9]/60 underline-offset-4">
            zero-latency AI-automated recruitment engine
          </strong>
          .
        </p>

        {/* Hero CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          {/* Main Action Button */}
          <button
            onClick={triggerConfetti}
            onMouseEnter={() => soundEngine.playHover()}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-sm font-bold tracking-wider uppercase text-[#071320] bg-gradient-to-r from-[#14F1D9] via-[#00FFC6] to-[#14F1D9] bg-[length:200%_auto] hover:bg-right transition-all duration-500 shadow-[0_0_30px_rgba(20,241,217,0.5)] hover:shadow-[0_0_50px_rgba(0,255,198,0.8)] hover:scale-105 active:scale-95"
            data-cursor-hover
            data-cursor-text="EXPLORE"
          >
            <Sparkles className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            <span>Begin Story Journey</span>
            <ArrowDownRight className="w-5 h-5 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
          </button>

          {/* Secondary Interactive Portal Simulator Button */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenPortalModal();
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-sm font-bold tracking-wider uppercase text-white bg-[#0F172A]/80 border border-[#14F1D9]/30 hover:border-[#00FFC6] hover:bg-[#0F172A] transition-all duration-300 backdrop-blur-md hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(15,23,42,0.6)]"
            data-cursor-hover
            data-cursor-text="DEMO"
          >
            <Play className="w-4 h-4 text-[#00FFC6] fill-[#00FFC6] group-hover:scale-125 transition-transform" />
            <span>Live Interactive Simulator</span>
          </button>
        </div>

        {/* Live System Metrics Quick Bar */}
        <div
          ref={statsBadgeRef}
          className="mt-16 w-full max-w-4xl glass-panel rounded-2xl p-4 grid grid-cols-2 md:grid-cols-4 gap-4 border-white/10 text-left"
        >
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <p className="text-[11px] text-slate-400 font-mono uppercase">Database Speed</p>
            <p className="text-lg font-heading font-bold text-[#00FFC6]">0.02s Query</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <p className="text-[11px] text-slate-400 font-mono uppercase">Batch Processing</p>
            <p className="text-lg font-heading font-bold text-white">12,000+ Records</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <p className="text-[11px] text-slate-400 font-mono uppercase">Task Workers</p>
            <p className="text-lg font-heading font-bold text-[#14F1D9]">Celery & Redis</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <p className="text-[11px] text-slate-400 font-mono uppercase">Security Audit</p>
            <p className="text-lg font-heading font-bold text-[#00FFC6] flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> 100% Compliant
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
