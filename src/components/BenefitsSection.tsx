import React, { useState } from 'react';
import { Users, GraduationCap, ShieldCheck, Building2, CheckCircle2, LayoutGrid, Wand2, FileCheck, ShieldAlert, Download, Clock, Send, Sparkles } from 'lucide-react';
import { AUDIENCE_BENEFITS } from '../data/mockData';
import { soundEngine } from '../utils/audio';

export const BenefitsSection: React.FC = () => {
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);

  const activeAudience = AUDIENCE_BENEFITS[selectedRoleIndex];

  const roleIcons = [
    <GraduationCap key="1" className="w-5 h-5" />,
    <ShieldCheck key="2" className="w-5 h-5" />,
    <Building2 key="3" className="w-5 h-5" />,
  ];

  const pointIconMap: Record<string, React.ReactNode> = {
    LayoutGrid: <LayoutGrid className="w-5 h-5 text-[#00FFC6]" />,
    Wand2: <Wand2 className="w-5 h-5 text-[#14F1D9]" />,
    CheckCircle2: <CheckCircle2 className="w-5 h-5 text-[#00FFC6]" />,
    FileCheck: <FileCheck className="w-5 h-5 text-[#14F1D9]" />,
    ShieldAlert: <ShieldAlert className="w-5 h-5 text-[#00FFC6]" />,
    Download: <Download className="w-5 h-5 text-[#14F1D9]" />,
    UserCheck: <CheckCircle2 className="w-5 h-5 text-[#00FFC6]" />,
    Clock: <Clock className="w-5 h-5 text-[#14F1D9]" />,
    Send: <Send className="w-5 h-5 text-[#00FFC6]" />,
  };

  return (
    <section id="benefits" className="relative py-28 px-4 sm:px-8 bg-[#071320] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F172A] border border-[#14F1D9]/30 text-xs font-mono text-[#00FFC6] mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>VALUE CREATION ACROSS STAKEHOLDERS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight mb-4">
            Tailored For Every Stakeholder
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Empowering candidates, campus placement directors, and corporate recruiters with seamless digital workflows.
          </p>

          {/* Role Tabs Selector */}
          <div className="flex items-center justify-center gap-3 mt-8 p-1.5 rounded-2xl bg-[#0F172A] border border-white/10 max-w-md mx-auto">
            {AUDIENCE_BENEFITS.map((aud, idx) => {
              const isActive = idx === selectedRoleIndex;
              return (
                <button
                  key={aud.role}
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedRoleIndex(idx);
                  }}
                  onMouseEnter={() => soundEngine.playHover()}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#14F1D9] to-[#00FFC6] text-[#071320] shadow-[0_0_15px_rgba(20,241,217,0.4)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  data-cursor-hover
                >
                  {roleIcons[idx]}
                  <span>{aud.role}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Audience Persona Details Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border-[#14F1D9]/30 bg-[#0F172A]/90 max-w-4xl mx-auto neon-glow-teal">
          <div className="mb-8 pb-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[#00FFC6] uppercase tracking-wider">
                FOR {activeAudience.role.toUpperCase()}
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white mt-1">
                {activeAudience.tagline}
              </h3>
            </div>
            <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-[#00FFC6] shrink-0">
              Verified Value Proposition
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeAudience.points.map((pt, i) => (
              <div
                key={i}
                onMouseEnter={() => soundEngine.playHover()}
                className="p-5 rounded-2xl bg-[#071320] border border-white/10 hover:border-[#14F1D9]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#0F172A] border border-[#14F1D9]/30 flex items-center justify-center mb-4">
                    {pointIconMap[pt.icon] || <Sparkles className="w-5 h-5 text-[#00FFC6]" />}
                  </div>
                  <h4 className="text-base font-heading font-bold text-white mb-2">{pt.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{pt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
