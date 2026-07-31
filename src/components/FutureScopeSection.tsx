import React from 'react';
import { Rocket, Cpu, Sparkles, ShieldCheck, Box, Bot } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const FutureScopeSection: React.FC = () => {
  const roadmaps = [
    {
      quarter: 'Q3 2026',
      title: 'Quantum Trajectory AI',
      desc: 'Deep neural models projecting 5-year career growth paths & skill gap recommendations before drives begin.',
      icon: <Cpu className="w-6 h-6 text-[#00FFC6]" />,
      status: 'In Active R&D',
    },
    {
      quarter: 'Q4 2026',
      title: 'AR Spatial Interview Chambers',
      desc: 'Spatial WebGL chambers for remote systemic whiteboard interviews with real-time biometric sentiment tracking.',
      icon: <Box className="w-6 h-6 text-[#14F1D9]" />,
      status: 'Prototyping Stage',
    },
    {
      quarter: 'Q1 2027',
      title: 'Blockchain Credential Ledger',
      desc: 'Zero-knowledge tamper-proof verification of college marksheets, backlogs, and degree transcripts.',
      icon: <ShieldCheck className="w-6 h-6 text-[#00FFC6]" />,
      status: 'Architecture Phase',
    },
    {
      quarter: 'Q2 2027',
      title: 'Autonomous TPO Agent',
      desc: 'AI co-pilot managing corporate recruiter outreach, slot negotiations, and NIRF documentation independently.',
      icon: <Bot className="w-6 h-6 text-[#14F1D9]" />,
      status: 'Planned',
    },
  ];

  return (
    <section id="future" className="relative py-28 px-4 sm:px-8 bg-[#071320] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-radial from-[#14F1D9]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F172A] border border-[#14F1D9]/30 text-xs font-mono text-[#00FFC6] mb-4">
            <Rocket className="w-3.5 h-3.5" />
            <span>THE NEXT FRONTIER</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight mb-4">
            Future Scope & Roadmap
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Pioneering the next decade of spatial recruitment, autonomous agents, and verified academic credentials.
          </p>
        </div>

        {/* Roadmap Grid */}
        <div className="perspective-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmaps.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={() => soundEngine.playHover()}
              className="glass-panel glass-panel-hover rounded-3xl p-6 border-white/10 flex flex-col justify-between"
              data-cursor-hover
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] font-mono font-bold text-[#00FFC6] px-3 py-1 rounded-full bg-[#00FFC6]/10 border border-[#00FFC6]/30">
                    {item.quarter}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#0F172A] border border-white/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>

                <h3 className="text-lg font-heading font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">{item.desc}</p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Phase: {item.status}</span>
                <Sparkles className="w-3.5 h-3.5 text-[#00FFC6]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
