import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangle, CheckCircle2, FileSpreadsheet, Zap, Clock, ShieldAlert, Sparkles, XCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundEngine } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

export const ProblemStatementSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const legacyCardRef = useRef<HTMLDivElement>(null);
  const smartCardRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'legacy' | 'smart'>('smart');

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        '.problem-heading',
        { y: 50, opacity: 0, filter: 'blur(8px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }
      )
        .fromTo(
          legacyCardRef.current,
          { x: -80, opacity: 0, rotateY: 15 },
          { x: 0, opacity: 1, rotateY: 0, duration: 1, ease: 'power4.out' },
          '-=0.4'
        )
        .fromTo(
          smartCardRef.current,
          { x: 80, opacity: 0, rotateY: -15 },
          { x: 0, opacity: 1, rotateY: 0, duration: 1, ease: 'power4.out' },
          '-=0.8'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const legacyFails = [
    { title: 'Excel Sheet Chaos', desc: 'Fragmented .xlsx files across departments with human formula errors and lost records.' },
    { title: 'Missed Drive Deadlines', desc: 'Manual email broadcasts lost in spam, causing top students to miss company drives.' },
    { title: '140+ Hours Wasted', desc: 'TPO staff manually verifying CGPA, backlogs, and certificates for 1000+ candidates.' },
    { title: 'Conflicting Double Offers', desc: 'No system enforcement, leading to policy violations and candidate drops.' },
  ];

  const smartSolutions = [
    { title: 'Zero-Error SQL Matrix', desc: 'Automated filter evaluating 12,000+ candidate profiles in under 20 milliseconds.' },
    { title: 'Instant Broadcast Engine', desc: 'Celery worker dispatches real-time push, portal alerts, and WhatsApp reminders.' },
    { title: '1-Click Executive Reports', desc: 'Pandas & OpenPyXL generate audit-ready NIRF / NAAC reports automatically.' },
    { title: 'Automated Offer Lock', desc: 'Strict policy enforcement locks candidates once a dream offer is accepted.' },
  ];

  return (
    <section id="problem" ref={sectionRef} className="relative py-28 px-4 sm:px-8 overflow-hidden">
      {/* Background Accent Lines */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-[#14F1D9]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 problem-heading">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F172A] border border-red-500/30 text-xs font-mono text-red-400 mb-4">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>THE PLACEMENT BOTTLENECK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight mb-4">
            Why Legacy College Systems <span className="text-red-400 underline decoration-red-500/40">Fail</span> Modern Placements
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Traditional placement offices rely on manual spreadsheets and disjointed communication.
            Here is how Smart Placement Portal transforms chaotic operations into automated precision.
          </p>

          {/* Mobile View Switcher */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl bg-[#0F172A] border border-white/10">
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('legacy');
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'legacy' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'text-slate-400'
              }`}
            >
              Legacy Way
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('smart');
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'smart' ? 'bg-[#00FFC6]/20 text-[#00FFC6] border border-[#00FFC6]/30' : 'text-slate-400'
              }`}
            >
              Smart Portal
            </button>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="perspective-container grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Legacy Card (Red Warning Theme) */}
          <div
            ref={legacyCardRef}
            className={`glass-panel rounded-3xl p-6 sm:p-8 border-red-500/20 bg-[#0F172A]/70 flex flex-col justify-between transition-all duration-300 ${
              activeTab === 'legacy' ? 'block' : 'hidden md:flex'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-red-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-white">Legacy Manual Process</h3>
                    <p className="text-xs text-red-400 font-mono">Status: Error Prone & Slow</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-mono font-bold">
                  HIGH RISK
                </span>
              </div>

              <div className="space-y-4">
                {legacyFails.map((item, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => soundEngine.playHover()}
                    className="p-4 rounded-2xl bg-red-950/20 border border-red-500/10 hover:border-red-500/30 transition-all flex items-start gap-3"
                  >
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-red-500/20 flex items-center justify-between text-xs font-mono text-red-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> Avg Processing: 14 Days
              </span>
              <span>Error Rate: ~18%</span>
            </div>
          </div>

          {/* Smart Portal Card (Neon Teal/Mint Success Theme) */}
          <div
            ref={smartCardRef}
            className={`glass-panel rounded-3xl p-6 sm:p-8 border-[#14F1D9]/40 bg-[#0F172A]/90 neon-glow-teal flex flex-col justify-between transition-all duration-300 ${
              activeTab === 'smart' ? 'block' : 'hidden md:flex'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#14F1D9]/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#00FFC6]/20 border border-[#00FFC6]/40 flex items-center justify-center text-[#00FFC6]">
                    <Zap className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-white">Smart Placement Portal</h3>
                    <p className="text-xs text-[#00FFC6] font-mono">Status: 100% Automated Engine</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#00FFC6]/20 text-[#00FFC6] text-xs font-mono font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> ZERO LATENCY
                </span>
              </div>

              <div className="space-y-4">
                {smartSolutions.map((item, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => soundEngine.playHover()}
                    className="p-4 rounded-2xl bg-[#14F1D9]/10 border border-[#14F1D9]/20 hover:border-[#00FFC6] hover:bg-[#14F1D9]/20 transition-all flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#00FFC6] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#14F1D9]/20 flex items-center justify-between text-xs font-mono text-[#00FFC6]">
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#00FFC6]" /> Avg Processing: 0.02 Sec
              </span>
              <span>Accuracy: 100% Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
