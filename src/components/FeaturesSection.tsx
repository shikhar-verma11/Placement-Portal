import React, { useEffect, useRef, useState } from 'react';
import { ShieldCheck, CalendarSync, FileText, Zap, Lock, PieChart, Layers, ArrowRight, X } from 'lucide-react';
import { FEATURES_LIST } from '../data/mockData';
import { FeatureItem } from '../types';
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
      gsap.fromTo(
        '.feature-card',
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, stagger: 0.12, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={containerRef} className="relative py-28 px-4 sm:px-8 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-radial from-emerald-500/8 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-emerald-500/30 text-xs font-mono text-emerald-400 mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>ENTERPRISE CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight mb-4">
            Engineered For Zero Bottlenecks
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Every feature automates complex college recruitment operations with high efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES_LIST.map((feat) => (
            <div
              key={feat.id}
              onClick={() => setSelectedFeature(feat)}
              className="feature-card group relative glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-white/10 cursor-pointer overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-radial from-emerald-500/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400">
                    {feat.category}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:border-emerald-400 transition-all">
                    {iconMap[feat.icon]}
                  </div>
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">{feat.title}</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">{feat.description}</p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block">KEY METRIC</span>
                  <span className="text-sm font-extrabold text-emerald-400 font-heading">{feat.stats}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-emerald-500 group-hover:text-white flex items-center justify-center text-slate-300 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-fadeIn">
          <div className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 border-emerald-500/30 bg-slate-800 shadow-xl">
            <button onClick={() => setSelectedFeature(null)} className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400">
                {iconMap[selectedFeature.icon]}
              </div>
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">{selectedFeature.category}</span>
                <h3 className="text-2xl font-heading font-extrabold text-white">{selectedFeature.title}</h3>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">{selectedFeature.description}</p>
            <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-3 mb-6">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Performance:</span>
                <span className="text-emerald-400 font-bold">{selectedFeature.stats}</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Guarantee:</span>
                <span className="text-white font-bold">{selectedFeature.highlight}</span>
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={() => setSelectedFeature(null)} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold uppercase tracking-wider">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
