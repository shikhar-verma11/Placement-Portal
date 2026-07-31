import React, { useEffect, useRef } from 'react';
import { Network, CheckCircle2, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HorizontalWorkflowSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const workflowSteps = [
    { step: '01', title: 'Company Drive Creation', sub: 'Recruiter Config', desc: 'Recruiters define drive parameters: CPI ≥ 7.5, Max 0 backlogs, CS/IT branches, and CTC breakdown.', stats: '1-Click Registration' },
    { step: '02', title: 'Instant Query Matching', sub: 'PostgreSQL & Pandas', desc: 'Database executes vectorized filters across 12,000+ student profiles in 0.02s without human review.', stats: '100% Query Accuracy' },
    { step: '03', title: 'Async Task Dispatch', sub: 'Celery & Redis Workers', desc: 'Message queue dispatches instant push alerts, portal notices, and email reminders to eligible batch.', stats: '5,000 Alerts/Sec' },
    { step: '04', title: 'AI Mock Interview Prep', sub: 'Gemini Multi-Modal API', desc: 'Candidates practice domain-specific technical & soft skill mock interviews with immediate AI feedback.', stats: '3.4x Pass Rate Boost' },
    { step: '05', title: 'Digital Offer & Lock', sub: 'Policy Engine', desc: 'Student receives digital offer letter and accepts with 1-click. System enforces single-dream-offer policy.', stats: '0 Offer Drops' },
    { step: '06', title: '1-Click Audit Export', sub: 'OpenPyXL & Analytics', desc: 'Generates NAAC, NIRF formatted Excel & PDF placement reports for department heads.', stats: 'Audit Ready' },
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
    <section id="workflow" ref={sectionRef} className="relative h-screen bg-[#060f1e] overflow-hidden flex flex-col justify-center">
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent pointer-events-none" />

      <div className="absolute top-8 left-6 sm:left-12 z-20">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-800 border border-emerald-500/30 text-xs font-mono text-emerald-400 mb-2">
          <Network className="w-3.5 h-3.5" />
          <span>WORKFLOW TIMELINE</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-heading font-extrabold text-white">
          End-to-End Placement Architecture
        </h2>
      </div>

      <div ref={scrollContainerRef} className="flex items-center gap-8 px-6 sm:px-16 pt-20 w-max">
        {workflowSteps.map((item, idx) => (
          <div
            key={idx}
            className="group relative w-80 sm:w-96 glass-panel rounded-3xl p-6 sm:p-8 border-emerald-500/10 hover:border-emerald-400 transition-all duration-300 flex-shrink-0 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500 flex items-center justify-center font-mono font-extrabold text-emerald-400 text-sm">
                {item.step}
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest px-3 py-1 rounded-full bg-white/5">
                {item.sub}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">{item.title}</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">{item.desc}</p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-green-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> {item.stats}
              </span>
              {idx < workflowSteps.length - 1 && (
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-transform" />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
