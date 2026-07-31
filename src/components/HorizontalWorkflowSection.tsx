import React, { useEffect, useRef } from 'react';
import { Network, CheckCircle2, ArrowRight, Zap, Cpu, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { soundEngine } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

export const HorizontalWorkflowSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const workflowSteps = [
    {
      step: '01',
      title: 'Company Drive Creation',
      sub: 'Recruiter Config',
      desc: 'Recruiters define drive parameters: CPI >= 7.5, Max 0 backlogs, CS/IT branches, and CTC breakdown.',
      stats: '1-Click Registration',
    },
    {
      step: '02',
      title: 'Instant Query Matching',
      sub: 'PostgreSQL & Pandas',
      desc: 'Database executes vectorized filters across 12,000+ student profiles in 0.02s without human review.',
      stats: '100% Query Accuracy',
    },
    {
      step: '03',
      title: 'Async Task Dispatch',
      sub: 'Celery & Redis Workers',
      desc: 'Message queue dispatches instant push alerts, portal notices, and SMS reminders to eligible batch.',
      stats: '5,000 Alerts/Sec',
    },
    {
      step: '04',
      title: 'AI Mock Interview Prep',
      sub: 'Gemini Multi-Modal API',
      desc: 'Candidates practice domain-specific technical & soft skill mock interviews with immediate AI feedback.',
      stats: '3.4x Pass Rate Boost',
    },
    {
      step: '05',
      title: 'Digital Offer & Lock',
      sub: 'Policy Engine',
      desc: 'Student receives digital offer letter and accepts with 1-click. System enforces single-dream-offer policy.',
      stats: '0 Offer Drops',
    },
    {
      step: '06',
      title: '1-Click Audit Export',
      sub: 'OpenPyXL & Analytics',
      desc: 'Generates NAAC, NIRF, and NIRF-ready formatted Excel & PDF placement reports for department heads.',
      stats: 'Audit Ready',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;

      const totalWidth = scrollContainer.scrollWidth - window.innerWidth + 120;

      gsap.to(scrollContainer, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="workflow" ref={sectionRef} className="relative h-screen bg-[#0B0F17] overflow-hidden flex flex-col justify-center">
      {/* Background Lighting & Connecting Line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10 pointer-events-none" />

      {/* Section Title */}
      <div className="absolute top-8 left-6 sm:left-12 z-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#111827] border border-white/10 text-xs font-mono text-slate-300 mb-2">
          <Network className="w-3.5 h-3.5 text-blue-400" />
          <span>WORKFLOW TIMELINE</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-heading font-bold text-white">
          End-to-End Placement Architecture
        </h2>
      </div>

      {/* Horizontal Scroll Track Container */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-8 px-6 sm:px-16 pt-20 w-max"
      >
        {workflowSteps.map((item, idx) => (
          <div
            key={idx}
            onMouseEnter={() => soundEngine.playHover()}
            className="group relative w-80 sm:w-96 glass-panel rounded-2xl p-6 sm:p-8 border-white/10 bg-[#111827] hover:border-white/20 hover:bg-[#1A2333] transition-all duration-200 flex-shrink-0 flex flex-col justify-between shadow-sm"
            data-cursor-hover
            data-cursor-text="STEP"
          >
            {/* Step Connector Badge */}
            <div className="flex items-center justify-between mb-6">
              <span className="w-9 h-9 rounded-lg bg-blue-600/10 border border-blue-500/30 flex items-center justify-center font-mono font-bold text-blue-400 text-xs">
                {item.step}
              </span>
              <span className="text-[10px] font-mono text-slate-300 uppercase tracking-wider px-2.5 py-1 rounded bg-white/5 border border-white/10">
                {item.sub}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-heading font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                {item.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-blue-400 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> {item.stats}
              </span>
              {idx < workflowSteps.length - 1 && (
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-transform" />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
