import React, { useState, useEffect, useRef } from 'react';
import {
  UserCheck,
  Filter,
  BellRing,
  BrainCircuit,
  Award,
  BarChart3,
  Play,
  RotateCcw,
  CheckCircle2,
  Terminal,
  ChevronRight,
  Code2,
  Sparkles,
} from 'lucide-react';
import { STUDENT_STEPS } from '../data/mockData';
import { soundEngine } from '../utils/audio';
import confetti from 'canvas-confetti';

export const StudentJourneySection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const iconMap: Record<string, React.ReactNode> = {
    UserCheck: <UserCheck className="w-6 h-6" />,
    Filter: <Filter className="w-6 h-6" />,
    BellRing: <BellRing className="w-6 h-6" />,
    BrainCircuit: <BrainCircuit className="w-6 h-6" />,
    Award: <Award className="w-6 h-6" />,
    BarChart3: <BarChart3 className="w-6 h-6" />,
  };

  const currentStep = STUDENT_STEPS[activeStepIndex];

  // Auto scroll logs container
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [simulationLogs]);

  const runLiveSimulation = () => {
    soundEngine.playChime(700, 0.2);
    setIsSimulating(true);
    setActiveStepIndex(0);
    setSimulationLogs(['[02:04:00] Initializing Student Pipeline for candidate "Aarav Sharma" (CS2025_001)...']);

    const delays = [1200, 2400, 3600, 4800, 6000, 7200];

    delays.forEach((delay, idx) => {
      setTimeout(() => {
        setActiveStepIndex(idx);
        soundEngine.playClick();

        const logs = [
          '[02:04:01] SUCCESS: PDF Resume parsed. Skill Vector: ["Python", "Django", "React", "Docker"]. CPI: 9.42.',
          '[02:04:02] MATCH: Eligibility verified for "Google Software Engineer Campus Drive" (Min CPI: 8.5).',
          '[02:04:03] DISPATCH: Celery worker pushed push notice & WhatsApp invite. Student Registered.',
          '[02:04:04] AI PREP: Gemini AI mock interview score: 94/100 (DSA & System Design verified).',
          '[02:04:05] OFFER DISPATCHED: Dream Offer Letter ₹28 LPA generated & sent to candidate portal.',
          '[02:04:06] ACCEPTED & LOCKED: Student accepted offer. Secondary drive locks enforced by Policy Engine.',
        ];

        setSimulationLogs((prev) => [...prev, logs[idx]]);

        if (idx === STUDENT_STEPS.length - 1) {
          setIsSimulating(false);
          soundEngine.playChime(880, 0.4);
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.7 },
            colors: ['#00FFC6', '#14F1D9', '#3B82F6'],
          });
        }
      }, delay);
    });
  };

  return (
    <section id="journey" className="relative py-28 px-4 sm:px-8 bg-[#071320]">
      {/* Glow Backdrop */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-radial from-[#00FFC6]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F172A] border border-[#14F1D9]/30 text-xs font-mono text-[#00FFC6] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE STUDENT PLACEMENT MOVIE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight mb-4">
            Real-World Student Placement Journey
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Experience how a student progresses seamlessly from resume upload to dream offer acceptance.
          </p>

          {/* Interactive Run Simulation Control */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={runLiveSimulation}
              disabled={isSimulating}
              onMouseEnter={() => soundEngine.playHover()}
              className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                isSimulating
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  : 'bg-gradient-to-r from-[#14F1D9] to-[#00FFC6] text-[#071320] shadow-[0_0_20px_rgba(20,241,217,0.4)] hover:scale-105 active:scale-95'
              }`}
              data-cursor-hover
              data-cursor-text="PLAY MOVIE"
            >
              {isSimulating ? (
                <>
                  <span className="w-3 h-3 rounded-full bg-[#00FFC6] animate-ping" />
                  <span>Pipeline Running...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-[#071320]" />
                  <span>Run Live Pipeline Simulation</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Step Progress Visual Tracker */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {STUDENT_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            const isPassed = idx < activeStepIndex;

            return (
              <button
                key={step.id}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveStepIndex(idx);
                }}
                onMouseEnter={() => soundEngine.playHover()}
                className={`group relative p-4 rounded-2xl transition-all duration-300 border text-left flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#0F172A] border-[#00FFC6] neon-glow-mint scale-105 z-10'
                    : isPassed
                    ? 'bg-[#0F172A]/80 border-[#14F1D9]/40 opacity-90'
                    : 'bg-[#0F172A]/40 border-white/5 opacity-60 hover:opacity-100'
                }`}
                data-cursor-hover
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-extrabold text-[#00FFC6]">{step.number}</span>
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                      isActive
                        ? 'bg-[#00FFC6] text-[#071320]'
                        : isPassed
                        ? 'bg-[#14F1D9]/20 text-[#14F1D9]'
                        : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    {iconMap[step.iconName]}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{step.title}</h4>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">{step.metrics}</p>
                </div>

                {/* Connecting Arrow for Desktop */}
                {idx < STUDENT_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-[#14F1D9]/40">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Stage & Terminal Output */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Detailed Stage Card */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border-[#14F1D9]/30 bg-[#0F172A]/90 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-[#14F1D9]/20 text-[#00FFC6] text-xs font-mono font-bold">
                  STAGE {currentStep.number} OF 06
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00FFC6]" /> Verified Engine Step
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white mb-2">
                {currentStep.title}
              </h3>
              <p className="text-xs font-mono text-[#00FFC6] uppercase tracking-wider mb-4">
                {currentStep.subtitle}
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                {currentStep.description}
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
                <span className="text-slate-400 block text-[10px]">BENCHMARK PERFORMANCE</span>
                <span className="text-[#00FFC6] font-bold text-sm">{currentStep.metrics}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveStepIndex((prev) => Math.max(0, prev - 1));
                  }}
                  disabled={activeStepIndex === 0}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-30 text-xs font-bold text-white transition-all"
                >
                  Previous
                </button>
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveStepIndex((prev) => Math.min(STUDENT_STEPS.length - 1, prev + 1));
                  }}
                  disabled={activeStepIndex === STUDENT_STEPS.length - 1}
                  className="px-4 py-2 rounded-xl bg-[#00FFC6] hover:bg-[#14F1D9] text-[#071320] disabled:opacity-30 text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,255,198,0.4)]"
                >
                  Next Stage
                </button>
              </div>
            </div>
          </div>

          {/* Terminal Code Execution Output */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border-white/10 bg-[#071320] font-mono text-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#00FFC6]" />
                  <span className="text-slate-300 font-bold">PIPELINE EXECUTION MONITOR</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
              </div>

              {/* Code Snippet */}
              <div className="p-3 rounded-xl bg-[#0F172A] border border-white/5 mb-4 text-[#14F1D9] overflow-x-auto">
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1">
                  <Code2 className="w-3 h-3" />
                  <span>EXECUTING STATEMENT</span>
                </div>
                <code>{currentStep.codeSnippet}</code>
              </div>

              {/* Simulation Logs Output Stream */}
              <div
                ref={logContainerRef}
                className="h-48 overflow-y-auto space-y-2 pr-2 font-mono text-[11px] text-slate-300 scrollbar-thin"
              >
                {simulationLogs.length === 0 ? (
                  <p className="text-slate-500 italic">
                    Click "Run Live Pipeline Simulation" to view real-time log dispatches...
                  </p>
                ) : (
                  simulationLogs.map((log, i) => (
                    <div key={i} className="flex items-start gap-2 animate-fadeIn">
                      <span className="text-[#00FFC6] shrink-0">&gt;</span>
                      <span className="leading-tight">{log}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
              <span>Status: {isSimulating ? 'Active Simulation' : 'Ready'}</span>
              <span className="text-[#00FFC6]">Redis Queue ID: #88092</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
