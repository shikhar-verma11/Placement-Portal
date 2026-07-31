import React, { useEffect, useRef, useState } from 'react';
import {
  ShieldCheck,
  CalendarSync,
  FileText,
  Zap,
  Lock,
  PieChart,
  Sparkles,
  ArrowRight,
  X,
  Layers,
} from 'lucide-react';
import { FEATURES_LIST } from '../data/mockData';
import { FeatureItem } from '../types';
import { soundEngine } from '../utils/audio';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FeaturesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedFeature, setSelectedFeature] = useState<FeatureItem | null>(null);

  const iconMap: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-6 h-6" />,
    CalendarSync: <CalendarSync className="w-6 h-6" />,
    FileText: <FileText className="w-6 h-6" />,
    Zap: <Zap className="w-6 h-6" />,
    Lock: <Lock className="w-6 h-6" />,
    PieChart: <PieChart className="w-6 h-6" />,
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3D Stagger & Scale In Cards on Scroll
      gsap.fromTo(
        '.feature-card',
        {
          y: 80,
          opacity: 0,
          rotateX: -20,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          stagger: 0.12,
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

  return (
    <section id="features" ref={containerRef} className="relative py-28 px-4 sm:px-8 bg-[#151515] overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-radial from-[#6A8DFF]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#1F1F1F] border border-[#3A3A3A] text-xs font-mono text-[#D4D4D4] mb-4">
            <Layers className="w-3.5 h-3.5 text-[#6A8DFF]" />
            <span>ENTERPRISE CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#FAFAFA] tracking-tight mb-4">
            Engineered For Zero Bottlenecks
          </h2>
          <p className="text-[#D4D4D4] text-base sm:text-lg">
            Every feature is designed to automate complex college recruitment operations with sub-millisecond execution.
          </p>
        </div>

        {/* 3D Interactive Feature Cards Grid */}
        <div className="perspective-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES_LIST.map((feat) => (
            <div
              key={feat.id}
              onClick={() => {
                soundEngine.playClick();
                setSelectedFeature(feat);
              }}
              onMouseEnter={() => soundEngine.playHover()}
              className="feature-card group relative glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between border-[#3A3A3A] bg-[#282828] hover:border-[#404040] hover:bg-[#323232] transition-all duration-200 cursor-pointer overflow-hidden transform-gpu shadow-sm"
              data-cursor-hover
              data-cursor-text="INSPECT"
            >
              <div>
                {/* Category & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-[#1F1F1F] border border-[#3A3A3A] text-[#D4D4D4]">
                    {feat.category}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-[#6A8DFF]/10 border border-[#6A8DFF]/20 flex items-center justify-center text-[#6A8DFF] group-hover:bg-[#6A8DFF] group-hover:text-white transition-all">
                    {iconMap[feat.icon]}
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-heading font-semibold text-[#FAFAFA] mb-2.5 group-hover:text-[#6A8DFF] transition-colors">
                  {feat.title}
                </h3>
                <p className="text-[#D4D4D4] text-xs sm:text-sm leading-relaxed mb-6">
                  {feat.description}
                </p>
              </div>

              {/* Stat Highlight & Trigger Link */}
              <div className="pt-4 border-t border-[#404040] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#9E9E9E] block uppercase">KEY METRIC</span>
                  <span className="text-sm font-semibold text-[#FAFAFA] font-heading">{feat.stats}</span>
                </div>
                <div className="w-7 h-7 rounded-md bg-[#1F1F1F] group-hover:bg-[#6A8DFF] group-hover:text-white flex items-center justify-center text-[#9E9E9E] transition-all">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Deep-Dive Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#151515]/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl glass-panel rounded-2xl p-6 sm:p-8 border-[#3A3A3A] bg-[#1F1F1F] shadow-2xl">
            <button
              onClick={() => setSelectedFeature(null)}
              className="absolute top-6 right-6 p-2 rounded-lg bg-[#282828] hover:bg-[#323232] text-[#9E9E9E] hover:text-[#FAFAFA] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#6A8DFF]/10 border border-[#6A8DFF]/20 flex items-center justify-center text-[#6A8DFF]">
                {iconMap[selectedFeature.icon]}
              </div>
              <div>
                <span className="text-xs font-mono text-[#6A8DFF] uppercase tracking-wider">
                  {selectedFeature.category}
                </span>
                <h3 className="text-xl font-heading font-bold text-[#FAFAFA]">
                  {selectedFeature.title}
                </h3>
              </div>
            </div>

            <p className="text-[#D4D4D4] text-sm leading-relaxed mb-6">
              {selectedFeature.description}
            </p>

            <div className="p-4 rounded-xl bg-[#151515] border border-[#3A3A3A] space-y-3 mb-6">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#9E9E9E]">Benchmark Performance:</span>
                <span className="text-[#FAFAFA] font-semibold">{selectedFeature.stats}</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#9E9E9E]">Operational Guarantee:</span>
                <span className="text-[#6A8DFF] font-semibold">{selectedFeature.highlight}</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedFeature(null)}
                className="px-5 py-2 rounded-lg bg-[#6A8DFF] hover:bg-[#7D9EFF] text-white text-xs font-medium transition-all"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
