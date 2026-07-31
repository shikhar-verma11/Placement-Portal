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
    <section id="problem" ref={sectionRef} className="relative py-28 px-4 sm:px-8 bg-[#1B1B1B] overflow-hidden">
      {/* Background Subtle Gradient Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-[#6A8DFF]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 problem-heading">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#1F1F1F] border border-[#3A3A3A] text-xs font-mono text-[#D4D4D4] mb-4">
            <AlertTriangle className="w-3.5 h-3.5 text-[#9E9E9E]" />
            <span>THE PLACEMENT BOTTLENECK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#FAFAFA] tracking-tight mb-4">
            Why Legacy Systems Fail Modern Campus Recruitment
          </h2>
          <p className="text-[#D4D4D4] text-base sm:text-lg">
            Traditional placement offices rely on manual spreadsheets and disjointed communication.
            Smart Placement Portal transforms chaotic operations into automated precision.
          </p>

          {/* Mobile View Switcher */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-8 p-1 rounded-lg bg-[#1F1F1F] border border-[#3A3A3A]">
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('legacy');
              }}
              className={`flex-1 py-2 rounded-md text-xs font-medium transition-all ${
                activeTab === 'legacy' ? 'bg-[#323232] text-[#FAFAFA]' : 'text-[#9E9E9E]'
              }`}
            >
              Legacy Process
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('smart');
              }}
              className={`flex-1 py-2 rounded-md text-xs font-medium transition-all ${
                activeTab === 'smart' ? 'bg-[#6A8DFF] text-white' : 'text-[#9E9E9E]'
              }`}
            >
              Smart Engine
            </button>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="perspective-container grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Legacy Card */}
          <div
            ref={legacyCardRef}
            className={`glass-panel rounded-2xl p-6 sm:p-8 border-[#3A3A3A] bg-[#282828] flex flex-col justify-between transition-all duration-300 ${
              activeTab === 'legacy' ? 'block' : 'hidden md:flex'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#404040]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1F1F1F] border border-[#3A3A3A] flex items-center justify-center text-[#9E9E9E]">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-[#FAFAFA]">Legacy Manual Process</h3>
                    <p className="text-xs text-[#9E9E9E] font-mono">Status: Manual & Error-Prone</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#C85C5C]/10 text-[#C85C5C] border border-[#C85C5C]/20 text-xs font-mono">
                  Legacy
                </span>
              </div>

              <div className="space-y-3">
                {legacyFails.map((item, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => soundEngine.playHover()}
                    className="p-3.5 rounded-xl bg-[#1F1F1F] border border-[#3A3A3A] flex items-start gap-3"
                  >
                    <XCircle className="w-4 h-4 text-[#C85C5C] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold text-[#FAFAFA]">{item.title}</h4>
                      <p className="text-xs text-[#9E9E9E] mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#404040] flex items-center justify-between text-xs font-mono text-[#9E9E9E]">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Avg Processing: 14 Days
              </span>
              <span>Error Rate: ~18%</span>
            </div>
          </div>

          {/* Smart Portal Card */}
          <div
            ref={smartCardRef}
            className={`glass-panel rounded-2xl p-6 sm:p-8 border-[#3A3A3A] bg-[#282828] flex flex-col justify-between transition-all duration-300 shadow-lg ${
              activeTab === 'smart' ? 'block' : 'hidden md:flex'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#404040]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#6A8DFF]/10 border border-[#6A8DFF]/30 flex items-center justify-center text-[#6A8DFF]">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-[#FAFAFA]">Smart Placement Engine</h3>
                    <p className="text-xs text-[#6A8DFF] font-mono">Status: Automated Precision</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#6A8DFF]/10 text-[#6A8DFF] border border-[#6A8DFF]/20 text-xs font-mono flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> ZERO LATENCY
                </span>
              </div>

              <div className="space-y-3">
                {smartSolutions.map((item, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => soundEngine.playHover()}
                    className="p-3.5 rounded-xl bg-[#1F1F1F] border border-[#3A3A3A] hover:border-[#6A8DFF]/40 transition-all flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#4CAF50] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold text-[#FAFAFA] flex items-center gap-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#D4D4D4] mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#404040] flex items-center justify-between text-xs font-mono text-[#6A8DFF]">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#6A8DFF]" /> Avg Processing: 0.02 Sec
              </span>
              <span className="text-[#4CAF50]">Accuracy: 100%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
