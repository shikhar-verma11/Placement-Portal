import React, { useEffect, useRef } from 'react';
import { TrendingUp, Award, Zap, Building2, Sparkles } from 'lucide-react';
import { STAT_METRICS } from '../data/mockData';
import { soundEngine } from '../utils/audio';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const StatisticsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter animation
      gsap.fromTo(
        '.stat-card',
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.15,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const icons = [
    <TrendingUp key="1" className="w-6 h-6" />,
    <Award key="2" className="w-6 h-6" />,
    <Zap key="3" className="w-6 h-6" />,
    <Building2 key="4" className="w-6 h-6" />,
  ];

  return (
    <section id="stats" ref={containerRef} className="relative py-28 px-4 sm:px-8 bg-[#151515] overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-radial from-[#6A8DFF]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#1F1F1F] border border-[#3A3A3A] text-xs font-mono text-[#D4D4D4] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#6A8DFF]" />
            <span>REAL-WORLD IMPACT NUMBERS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#FAFAFA] tracking-tight mb-4">
            Quantifiable Academic Metrics
          </h2>
          <p className="text-[#D4D4D4] text-base sm:text-lg">
            Verifiable placement performance benchmarks achieved across 12,000+ candidate batches.
          </p>
        </div>

        {/* Holographic Stats Grid */}
        <div className="perspective-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STAT_METRICS.map((stat, idx) => (
            <div
              key={stat.id}
              onMouseEnter={() => soundEngine.playHover()}
              className="stat-card glass-panel rounded-2xl p-6 sm:p-8 border-[#3A3A3A] bg-[#282828] hover:border-[#404040] transition-all duration-200 flex flex-col justify-between text-center relative overflow-hidden group shadow-sm"
              data-cursor-hover
            >
              <div>
                <div className="w-10 h-10 mx-auto mb-6 rounded-lg bg-[#6A8DFF]/10 border border-[#6A8DFF]/20 flex items-center justify-center text-[#6A8DFF]">
                  {icons[idx]}
                </div>

                <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#FAFAFA] mb-2 tracking-tight">
                  <span className="text-[#6A8DFF]">{stat.prefix}</span>
                  <span>{stat.value}</span>
                  <span className="text-[#6A8DFF]">{stat.suffix}</span>
                </div>

                <h3 className="text-sm font-semibold text-[#FAFAFA] mb-1">{stat.label}</h3>
                <p className="text-xs text-[#9E9E9E] font-mono">{stat.sublabel}</p>
              </div>

              {/* Progress Bar Line */}
              <div className="mt-6 pt-4 border-t border-[#404040] w-full">
                <div className="w-full h-1 rounded-full bg-[#1F1F1F] overflow-hidden">
                  <div
                    className="h-full bg-[#6A8DFF] rounded-full transition-all duration-1000"
                    style={{ width: `${stat.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
