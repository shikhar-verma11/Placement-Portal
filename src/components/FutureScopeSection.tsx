import React from 'react';
import { Rocket, Cpu, Sparkles, ShieldCheck, Box, Bot } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const FutureScopeSection: React.FC = () => {
  const roadmaps = [
    {
      quarter: 'Q3 2026',
      title: 'Quantum Trajectory AI',
      desc: 'Deep neural models projecting 5-year career growth paths & skill gap recommendations before drives begin.',
      icon: <Cpu className="w-5 h-5 text-[#6A8DFF]" />,
      status: 'In Active R&D',
    },
    {
      quarter: 'Q4 2026',
      title: 'AR Spatial Interview Chambers',
      desc: 'Spatial WebGL chambers for remote systemic whiteboard interviews with real-time biometric sentiment tracking.',
      icon: <Box className="w-5 h-5 text-[#6A8DFF]" />,
      status: 'Prototyping Stage',
    },
    {
      quarter: 'Q1 2027',
      title: 'Blockchain Credential Ledger',
      desc: 'Zero-knowledge tamper-proof verification of college marksheets, backlogs, and degree transcripts.',
      icon: <ShieldCheck className="w-5 h-5 text-[#6A8DFF]" />,
      status: 'Architecture Phase',
    },
    {
      quarter: 'Q2 2027',
      title: 'Autonomous TPO Agent',
      desc: 'AI co-pilot managing corporate recruiter outreach, slot negotiations, and NIRF documentation independently.',
      icon: <Bot className="w-5 h-5 text-[#6A8DFF]" />,
      status: 'Planned',
    },
  ];

  return (
    <section id="future" className="relative py-28 px-4 sm:px-8 bg-[#1B1B1B] overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-radial from-[#6A8DFF]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#1F1F1F] border border-[#3A3A3A] text-xs font-mono text-[#D4D4D4] mb-4">
            <Rocket className="w-3.5 h-3.5 text-[#6A8DFF]" />
            <span>THE NEXT FRONTIER</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#FAFAFA] tracking-tight mb-4">
            Future Scope & Roadmap
          </h2>
          <p className="text-[#D4D4D4] text-base sm:text-lg">
            Pioneering the next decade of spatial recruitment, autonomous agents, and verified academic credentials.
          </p>
        </div>

        {/* Roadmap Grid */}
        <div className="perspective-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmaps.map((item, idx) => (
            <div
              key={idx}
              onMouseEnter={() => soundEngine.playHover()}
              className="glass-panel rounded-2xl p-6 border-[#3A3A3A] bg-[#282828] hover:border-[#404040] transition-all duration-200 flex flex-col justify-between shadow-sm"
              data-cursor-hover
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] font-mono font-medium text-[#6A8DFF] px-2.5 py-1 rounded bg-[#6A8DFF]/10 border border-[#6A8DFF]/20">
                    {item.quarter}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-[#6A8DFF]/10 border border-[#6A8DFF]/20 flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>

                <h3 className="text-base font-heading font-semibold text-[#FAFAFA] mb-2">{item.title}</h3>
                <p className="text-xs text-[#D4D4D4] leading-relaxed mb-6">{item.desc}</p>
              </div>

              <div className="pt-3 border-t border-[#404040] flex items-center justify-between text-[10px] font-mono text-[#9E9E9E]">
                <span>Phase: {item.status}</span>
                <Sparkles className="w-3.5 h-3.5 text-[#6A8DFF]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
