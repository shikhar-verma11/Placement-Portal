import React, { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, Sparkles, Play, ShieldCheck, Zap, TrendingUp, Users, Award } from 'lucide-react';
import gsap from 'gsap';

interface HeroProps {
  onOpenPortalModal: () => void;
}

// Animated counter hook
const useCountUp = (end: number, duration: number = 2000, decimals: number = 0) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime: number;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * end).toFixed(decimals)));
      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [hasStarted, end, duration, decimals]);

  return { count, start: () => setHasStarted(true) };
};

export const HeroSection: React.FC<HeroProps> = ({ onOpenPortalModal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const counter1 = useCountUp(0.02, 1500, 2);
  const counter2 = useCountUp(12000, 2000, 0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

      tl.fromTo(
        '.hero-badge',
        { y: -30, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8 }
      )
        .fromTo(
          '.hero-title-word',
          { y: 60, opacity: 0, filter: 'blur(10px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', stagger: 0.08, duration: 1 },
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
          { y: 40, opacity: 0, scale: 0.8 },
          {
            y: 0, opacity: 1, scale: 1, stagger: 0.15, duration: 1,
            onComplete: () => { counter1.start(); counter2.start(); }
          },
          '-=0.6'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToContent = () => {
    const el = document.getElementById('problem');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const titleWords = ['SMART', 'COLLEGE', 'PLACEMENT', 'MANAGEMENT', 'PORTAL'];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-4 sm:px-8 overflow-hidden"
    >
      {/* Soft Gradient Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] bg-radial from-emerald-500/10 via-teal-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Floating Stats Cards */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
        <div className="hero-float-card absolute top-[18%] right-[8%] glass-panel rounded-2xl p-4 border-emerald-500/20 animate-float-slow max-w-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">Placement Rate</p>
              <p className="text-xl font-heading font-extrabold text-white flex items-center gap-1">
                98.4%
                <span className="text-[10px] text-green-400 font-mono">+14.2% YoY</span>
              </p>
            </div>
          </div>
        </div>

        <div className="hero-float-card absolute bottom-[20%] left-[6%] glass-panel rounded-2xl p-4 border-teal-500/20 animate-float-fast max-w-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">Top Package</p>
              <p className="text-xl font-heading font-extrabold text-teal-400">₹52.8 LPA</p>
            </div>
          </div>
        </div>

        <div className="hero-float-card absolute top-[25%] left-[10%] glass-panel rounded-full px-4 py-2 border-white/10 text-xs font-mono text-slate-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span>System Active</span>
        </div>

        <div className="hero-float-card absolute bottom-[25%] right-[10%] glass-panel rounded-full px-4 py-2 border-white/10 text-xs font-mono text-slate-300 flex items-center gap-2">
          <Users className="w-3.5 h-3.5 text-emerald-400" />
          <span>450+ Recruiters</span>
        </div>
      </div>

      {/* Main Center Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Eyebrow Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-emerald-500/30 text-xs font-mono text-emerald-400 mb-8 backdrop-blur-md">
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
          <span>NEXT-GEN CAMPUS RECRUITMENT ECOSYSTEM</span>
        </div>

        {/* Hero Title */}
        <h1
          ref={titleRef}
          className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight text-white leading-[1.12] mb-6 max-w-4xl"
        >
          {titleWords.map((word, index) => (
            <span
              key={index}
              className={`hero-title-word inline-block mr-3 sm:mr-4 transform-gpu ${
                index === 2 || index === 3
                  ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300 bg-clip-text text-transparent'
                  : ''
              }`}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-base sm:text-xl text-slate-300 max-w-3xl font-light leading-relaxed mb-10 text-balance"
        >
          Replacing fragmented spreadsheets, delayed email notices, and manual eligibility checking with an{' '}
          <strong className="text-white font-medium underline decoration-emerald-500/60 underline-offset-4">
            automated recruitment engine
          </strong>
          .
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={scrollToContent}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-sm font-bold tracking-wider uppercase text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transition-all duration-500 hover:scale-105 active:scale-95 shadow-lg"
          >
            <Sparkles className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            <span>Explore Features</span>
            <ArrowDownRight className="w-5 h-5 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
          </button>

          <button
            onClick={() => onOpenPortalModal()}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-sm font-bold tracking-wider uppercase text-white bg-slate-800/80 border border-emerald-500/30 hover:border-emerald-400 hover:bg-slate-800 transition-all duration-300 backdrop-blur-md hover:scale-105 active:scale-95"
          >
            <Play className="w-4 h-4 text-emerald-400 fill-emerald-400 group-hover:scale-125 transition-transform" />
            <span>Live Interactive Demo</span>
          </button>
        </div>

        {/* Stats Bar */}
        <div className="mt-16 w-full max-w-4xl glass-panel rounded-2xl p-4 grid grid-cols-2 md:grid-cols-4 gap-4 border-white/10 text-left">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <p className="text-[11px] text-slate-400 font-mono uppercase">Database Speed</p>
            <p className="text-lg font-heading font-bold text-emerald-400">{counter1.count}s Query</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <p className="text-[11px] text-slate-400 font-mono uppercase">Batch Processing</p>
            <p className="text-lg font-heading font-bold text-white">{counter2.count.toLocaleString()}+ Records</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <p className="text-[11px] text-slate-400 font-mono uppercase">Task Workers</p>
            <p className="text-lg font-heading font-bold text-teal-400">Celery & Redis</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <p className="text-[11px] text-slate-400 font-mono uppercase">Security Audit</p>
            <p className="text-lg font-heading font-bold text-green-400 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> 100% Compliant
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
