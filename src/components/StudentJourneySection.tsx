import React, { useState, useEffect, useRef } from 'react';
import { UserCheck, Filter, BellRing, BrainCircuit, Award, BarChart3, Play, CheckCircle2, Terminal, ChevronRight, Code2, Sparkles } from 'lucide-react';
import { STUDENT_STEPS } from '../data/mockData';

export const StudentJourneySection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLogs, setSimulationLogs] = useState<{prefix: string; color: string; text: string}[]>([]);
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

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [simulationLogs]);

  const runLiveSimulation = () => {
    setIsSimulating(true);
    setActiveStepIndex(0);
    setSimulationLogs([{ prefix: 'INIT', color: '#34d399', text: 'Initializing Student Pipeline for candidate "Aarav Sharma" (CS2025_001)...' }]);

    const delays = [1200, 2400, 3600, 4800, 6000, 7200];

    delays.forEach((delay, idx) => {
      setTimeout(() => {
        setActiveStepIndex(idx);

        const logs = [
          { prefix: 'SUCCESS', color: '#10b981', text: 'PDF Resume parsed. Skill Vector: ["Python", "Django", "React", "Docker"]. CPI: 9.42.' },
          { prefix: 'MATCH', color: '#06b6d4', text: 'Eligibility verified for "Google Software Engineer Campus Drive" (Min CPI: 8.5).' },
          { prefix: 'DISPATCH', color: '#34d399', text: 'Celery worker pushed push notice & email invite. Student Registered.' },
          { prefix: 'AI PREP', color: '#10b981', text: 'Gemini AI mock interview score: 94/100 (DSA & System Design verified).' },
          { prefix: 'OFFER', color: '#10b981', text: 'Dream Offer Letter ₹28 LPA generated & sent to candidate portal.' },
          { prefix: 'LOCKED', color: '#facc15', text: 'Student accepted offer. Secondary drive locks enforced by Policy Engine.' },
        ];

        setSimulationLogs((prev) => [...prev, logs[idx]]);

        if (idx === STUDENT_STEPS.length - 1) {
          setIsSimulating(false);
        }
      }, delay);
    });
  };

  return (
    <section id="journey" className="relative py-28 px-4 sm:px-8 bg-[#060f1e]">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-radial from-emerald-500/8 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-emerald-500/30 text-xs font-mono text-emerald-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>STUDENT PLACEMENT PIPELINE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight mb-4">
            Real-World Student Placement Journey
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Experience how a student progresses seamlessly from resume upload to dream offer acceptance.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={runLiveSimulation}
              disabled={isSimulating}
              className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                isSimulating
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg hover:scale-105 active:scale-95'
              }`}
            >
              {isSimulating ? (
                <>
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <span>Pipeline Running...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Run Live Pipeline Simulation</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Step Progress */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {STUDENT_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            const isPassed = idx < activeStepIndex;

            return (
              <button
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`group relative p-4 rounded-2xl transition-all duration-300 border text-left flex flex-col justify-between ${
                  isActive
                    ? 'bg-slate-800 border-emerald-500 scale-105 z-10 shadow-lg'
                    : isPassed
                    ? 'bg-slate-800/80 border-green-500/30 opacity-90'
                    : 'bg-slate-800/40 border-white/5 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-extrabold text-emerald-400">{step.number}</span>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                    isActive ? 'bg-emerald-500 text-white' : isPassed ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-slate-400'
                  }`}>
                    {iconMap[step.iconName]}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{step.title}</h4>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">{step.metrics}</p>
                </div>
                {idx < STUDENT_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-slate-600">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Step Detail + Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border-emerald-500/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                  STAGE {currentStep.number} OF 06
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> Verified Step
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white mb-2">{currentStep.title}</h3>
              <p className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-4">{currentStep.subtitle}</p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">{currentStep.description}</p>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
                <span className="text-slate-400 block text-[10px]">BENCHMARK</span>
                <span className="text-emerald-400 font-bold text-sm">{currentStep.metrics}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  disabled={activeStepIndex === 0}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-30 text-xs font-bold text-white transition-all"
                >
                  Previous
                </button>
                <button
                  onClick={() => setActiveStepIndex((prev) => Math.min(STUDENT_STEPS.length - 1, prev + 1))}
                  disabled={activeStepIndex === STUDENT_STEPS.length - 1}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white disabled:opacity-30 text-xs font-bold transition-all"
                >
                  Next Stage
                </button>
              </div>
            </div>
          </div>

          {/* Terminal */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 border-white/10 bg-[#060f1e] font-mono text-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-300 font-bold">PIPELINE MONITOR</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800 border border-white/5 mb-4 text-emerald-400 overflow-x-auto">
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1">
                  <Code2 className="w-3 h-3" />
                  <span>EXECUTING STATEMENT</span>
                </div>
                <code>{currentStep.codeSnippet}</code>
              </div>

              <div ref={logContainerRef} className="h-48 overflow-y-auto space-y-2 pr-2 font-mono text-[11px] text-slate-300">
                {simulationLogs.length === 0 ? (
                  <p className="text-slate-500 italic">
                    Click "Run Live Pipeline Simulation" to view real-time logs...
                  </p>
                ) : (
                  <>
                    {simulationLogs.map((log, i) => (
                      <div key={i} className="flex items-start gap-2 animate-fadeIn">
                        <span className="text-slate-500 shrink-0">{'>'}</span>
                        <span className="font-bold shrink-0" style={{ color: log.color }}>[{log.prefix}]</span>
                        <span className="leading-tight text-slate-300">{log.text}</span>
                      </div>
                    ))}
                    {isSimulating && (
                      <span className="inline-block w-2 h-4 bg-emerald-400 animate-cursor-blink" />
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
              <span>Status: {isSimulating ? 'Active Simulation' : 'Ready'}</span>
              <span className="text-emerald-400">Redis Queue ID: #88092</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
