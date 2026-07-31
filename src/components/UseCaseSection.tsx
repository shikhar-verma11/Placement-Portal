import React, { useEffect, useRef, useState } from 'react';
import { Lightbulb, Building2, Filter, Bell, ClipboardCheck, BarChart3, CheckCircle2, ChevronRight, Play } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const USE_CASE_STEPS = [
  {
    step: 1,
    title: 'TPO Lists Infosys Drive',
    detail: 'Placement officer creates a new campus drive for Infosys with eligibility: CGPA ≥ 7.5, 0 active backlogs, CS/IT/ECE branches.',
    icon: Building2,
    tag: 'Drive Creation',
  },
  {
    step: 2,
    title: 'Auto-Filter Eligible Students',
    detail: 'System instantly queries 2,400+ student records and returns 847 eligible candidates in 0.02 seconds — zero manual spreadsheet work.',
    icon: Filter,
    tag: 'Smart Filter',
  },
  {
    step: 3,
    title: 'Push Notifications Dispatched',
    detail: 'Celery workers dispatch portal alerts and email notifications to all 847 eligible students within seconds.',
    icon: Bell,
    tag: 'Celery Queue',
  },
  {
    step: 4,
    title: 'Interview Results Recorded',
    detail: 'Recruiters submit shortlist results directly through the portal. Students see real-time status updates on their dashboard.',
    icon: ClipboardCheck,
    tag: 'Result Tracking',
  },
  {
    step: 5,
    title: 'Dashboard Updates Live',
    detail: 'Placement statistics dashboard auto-refreshes: placed count, average CTC, department-wise breakdown — all in real-time.',
    icon: BarChart3,
    tag: 'Live Analytics',
  },
];

export const UseCaseSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.usecase-header',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
        }
      );

      gsap.fromTo(
        '.usecase-card',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '.usecase-timeline', start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const playScenario = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setActiveStep(0);

    USE_CASE_STEPS.forEach((_, idx) => {
      setTimeout(() => {
        setActiveStep(idx);
        if (idx === USE_CASE_STEPS.length - 1) {
          setTimeout(() => setIsPlaying(false), 1000);
        }
      }, idx * 1200);
    });
  };

  return (
    <section id="usecase" ref={sectionRef} className="relative py-28 px-4 sm:px-8 overflow-hidden">
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-radial from-emerald-500/8 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="usecase-header text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-emerald-500/30 text-xs font-mono text-emerald-400 mb-4">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>REAL-WORLD USE CASE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight mb-4">
            See It In Action
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            The placement officer lists an <strong className="text-white">Infosys drive with a 7.5 CGPA cutoff</strong>.
            Watch how the system handles everything automatically.
          </p>

          <div className="mt-8">
            <button
              onClick={playScenario}
              disabled={isPlaying}
              className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                isPlaying
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:scale-105 active:scale-95 shadow-lg'
              }`}
            >
              {isPlaying ? (
                <>
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <span>Running Scenario...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Play Live Scenario</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="usecase-timeline space-y-4">
          {USE_CASE_STEPS.map((item, idx) => {
            const Icon = item.icon;
            const isActive = idx === activeStep;
            const isPassed = idx < activeStep;

            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`usecase-card group relative flex items-start gap-5 p-5 sm:p-6 rounded-2xl border transition-all duration-500 cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 border-emerald-500/50 shadow-lg'
                    : isPassed
                    ? 'bg-slate-800/60 border-green-500/20'
                    : 'bg-slate-800/30 border-white/5 hover:border-white/15 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      isActive
                        ? 'bg-emerald-500 text-white scale-110'
                        : isPassed
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-white/5 text-slate-400 group-hover:text-slate-200'
                    }`}
                  >
                    {isPassed ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  {idx < USE_CASE_STEPS.length - 1 && (
                    <div className={`w-0.5 h-4 rounded-full transition-colors duration-500 ${isPassed ? 'bg-green-500/40' : 'bg-white/10'}`} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
                      Step {item.step}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className={`text-lg font-heading font-bold mb-1 transition-colors ${isActive ? 'text-emerald-400' : 'text-white'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm leading-relaxed transition-all duration-500 ${
                    isActive || isPassed ? 'text-slate-300 max-h-20 opacity-100' : 'text-slate-400 max-h-0 opacity-0 sm:max-h-20 sm:opacity-100'
                  }`}>
                    {item.detail}
                  </p>
                </div>

                <div className="hidden sm:flex items-center shrink-0 self-center">
                  <ChevronRight className={`w-5 h-5 transition-all ${isActive ? 'text-emerald-400 translate-x-1' : 'text-slate-600 group-hover:text-slate-400'}`} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-xs font-mono text-slate-400">
            Total time from drive creation to student notification:{' '}
            <strong className="text-green-400">under 3 seconds</strong> — previously took 2-3 days manually.
          </p>
        </div>
      </div>
    </section>
  );
};
