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
    <section id="journey" className="relative py-28 px-4 sm:px-8 bg-[#1B1B1B]">
      {/* Glow Backdrop */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-radial from-[#6A8DFF]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#1F1F1F] border border-[#3A3A3A] text-xs font-mono text-[#D4D4D4] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#6A8DFF]" />
            <span>STUDENT PLACEMENT PIPELINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#FAFAFA] tracking-tight mb-4">
            Real-World Student Placement Journey
          </h2>
          <p className="text-[#D4D4D4] text-base sm:text-lg">
            Experience how a candidate progresses seamlessly from resume upload to offer acceptance.
          </p>

          {/* Interactive Run Simulation Control */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={runLiveSimulation}
              disabled={isSimulating}
              onMouseEnter={() => soundEngine.playHover()}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                isSimulating
                  ? 'bg-[#282828] text-[#9E9E9E] cursor-not-allowed border border-[#3A3A3A]'
                  : 'bg-[#6A8DFF] hover:bg-[#7D9EFF] text-white shadow-sm'
              }`}
              data-cursor-hover
              data-cursor-text="PLAY MOVIE"
            >
              {isSimulating ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-[#6A8DFF] animate-ping" />
                  <span>Pipeline Running...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-white fill-white" />
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
                className={`group relative p-4 rounded-xl transition-all duration-200 border text-left flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#282828] border-[#6A8DFF] shadow-md'
                    : isPassed
                    ? 'bg-[#282828]/80 border-[#3A3A3A] opacity-90'
                    : 'bg-[#1F1F1F]/60 border-[#3A3A3A] opacity-60 hover:opacity-100'
                }`}
                data-cursor-hover
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-[#D4D4D4]">{step.number}</span>
                  <div
                    className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${
                      isActive
                        ? 'bg-[#6A8DFF] text-white'
                        : isPassed
                        ? 'bg-[#6A8DFF]/20 text-[#6A8DFF]'
                        : 'bg-[#1F1F1F] text-[#9E9E9E]'
                    }`}
                  >
                    {iconMap[step.iconName]}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-[#FAFAFA] line-clamp-1">{step.title}</h4>
                  <p className="text-[10px] text-[#9E9E9E] font-mono mt-0.5">{step.metrics}</p>
                </div>

                {/* Connecting Arrow for Desktop */}
                {idx < STUDENT_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-[#404040]">
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
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 border-[#3A3A3A] bg-[#282828] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded bg-[#6A8DFF]/10 text-[#6A8DFF] border border-[#6A8DFF]/20 text-xs font-mono">
                  STAGE {currentStep.number} OF 06
                </span>
                <span className="text-xs font-mono text-[#9E9E9E] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#6A8DFF]" /> Verified Engine Step
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#FAFAFA] mb-2">
                {currentStep.title}
              </h3>
              <p className="text-xs font-mono text-[#6A8DFF] uppercase tracking-wider mb-4">
                {currentStep.subtitle}
              </p>
              <p className="text-[#D4D4D4] text-sm sm:text-base leading-relaxed mb-6">
                {currentStep.description}
              </p>
            </div>

            <div className="pt-6 border-t border-[#404040] flex flex-wrap items-center justify-between gap-4">
              <div className="p-3 rounded-lg bg-[#1F1F1F] border border-[#3A3A3A] text-xs font-mono">
                <span className="text-[#9E9E9E] block text-[10px]">BENCHMARK PERFORMANCE</span>
                <span className="text-[#FAFAFA] font-semibold text-sm">{currentStep.metrics}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveStepIndex((prev) => Math.max(0, prev - 1));
                  }}
                  disabled={activeStepIndex === 0}
                  className="px-3.5 py-2 rounded-lg bg-[#1F1F1F] hover:bg-[#323232] border border-[#3A3A3A] disabled:opacity-30 text-xs font-medium text-[#FAFAFA] transition-all"
                >
                  Previous
                </button>
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveStepIndex((prev) => Math.min(STUDENT_STEPS.length - 1, prev + 1));
                  }}
                  disabled={activeStepIndex === STUDENT_STEPS.length - 1}
                  className="px-3.5 py-2 rounded-lg bg-[#6A8DFF] hover:bg-[#7D9EFF] text-white disabled:opacity-30 text-xs font-medium transition-all shadow-sm"
                >
                  Next Stage
                </button>
              </div>
            </div>
          </div>

          {/* Terminal Code Execution Output */}
          <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border-[#3A3A3A] bg-[#151515] font-mono text-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#404040] mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#6A8DFF]" />
                  <span className="text-[#D4D4D4] font-semibold">PIPELINE MONITOR</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3A3A3A]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3A3A3A]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#6A8DFF]" />
                </div>
              </div>

              {/* Code Snippet */}
              <div className="p-3 rounded-lg bg-[#1F1F1F] border border-[#3A3A3A] mb-4 text-[#6A8DFF] overflow-x-auto">
                <div className="flex items-center gap-2 text-[10px] text-[#9E9E9E] mb-1">
                  <Code2 className="w-3 h-3" />
                  <span>EXECUTING STATEMENT</span>
                </div>
                <code>{currentStep.codeSnippet}</code>
              </div>

              {/* Simulation Logs Output Stream */}
              <div
                ref={logContainerRef}
                className="h-48 overflow-y-auto space-y-2 pr-2 font-mono text-[11px] text-[#D4D4D4] scrollbar-thin"
              >
                {simulationLogs.length === 0 ? (
                  <p className="text-[#9E9E9E] italic">
                    Click "Run Live Pipeline Simulation" to view real-time log dispatches...
                  </p>
                ) : (
                  simulationLogs.map((log, i) => (
                    <div key={i} className="flex items-start gap-2 animate-fadeIn">
                      <span className="text-[#6A8DFF] shrink-0">&gt;</span>
                      <span className="leading-tight">{log}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-[#404040] flex items-center justify-between text-[10px] text-[#9E9E9E]">
              <span>Status: {isSimulating ? 'Active Simulation' : 'Ready'}</span>
              <span className="text-[#6A8DFF]">Redis Queue ID: #88092</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
