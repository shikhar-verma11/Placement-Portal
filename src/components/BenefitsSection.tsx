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
    LayoutGrid: <LayoutGrid className="w-5 h-5 text-blue-400" />,
    Wand2: <Wand2 className="w-5 h-5 text-blue-400" />,
    CheckCircle2: <CheckCircle2 className="w-5 h-5 text-blue-400" />,
    FileCheck: <FileCheck className="w-5 h-5 text-blue-400" />,
    ShieldAlert: <ShieldAlert className="w-5 h-5 text-blue-400" />,
    Download: <Download className="w-5 h-5 text-blue-400" />,
    UserCheck: <CheckCircle2 className="w-5 h-5 text-blue-400" />,
    Clock: <Clock className="w-5 h-5 text-blue-400" />,
    Send: <Send className="w-5 h-5 text-blue-400" />,
  };

  return (
    <section id="benefits" className="relative py-28 px-4 sm:px-8 bg-[#1B1B1B] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#1F1F1F] border border-[#3A3A3A] text-xs font-mono text-[#D4D4D4] mb-4">
            <Users className="w-3.5 h-3.5 text-[#6A8DFF]" />
            <span>STAKEHOLDER VALUE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#FAFAFA] tracking-tight mb-4">
            Tailored For Every Stakeholder
          </h2>
          <p className="text-[#D4D4D4] text-base sm:text-lg">
            Empowering candidates, campus placement directors, and corporate recruiters with seamless digital workflows.
          </p>

          {/* Role Tabs Selector */}
          <div className="flex items-center justify-center gap-2 mt-8 p-1.5 rounded-xl bg-[#1F1F1F] border border-[#3A3A3A] max-w-md mx-auto">
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
                  className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-2 ${
                    isActive
                      ? 'bg-[#6A8DFF] text-white shadow-sm'
                      : 'text-[#9E9E9E] hover:text-[#FAFAFA]'
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
        <div className="glass-panel rounded-2xl p-6 sm:p-10 border-[#3A3A3A] bg-[#282828] max-w-4xl mx-auto shadow-sm">
          <div className="mb-8 pb-6 border-b border-[#404040] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[#6A8DFF] uppercase tracking-wider">
                FOR {activeAudience.role.toUpperCase()}
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#FAFAFA] mt-1">
                {activeAudience.tagline}
              </h3>
            </div>
            <span className="px-3 py-1.5 rounded-lg bg-[#1F1F1F] border border-[#3A3A3A] text-xs font-mono text-[#D4D4D4] shrink-0">
              Verified Value Proposition
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeAudience.points.map((pt, i) => (
              <div
                key={i}
                onMouseEnter={() => soundEngine.playHover()}
                className="p-5 rounded-xl bg-[#1F1F1F] border border-[#3A3A3A] hover:border-[#6A8DFF]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#6A8DFF]/10 border border-[#6A8DFF]/20 flex items-center justify-center mb-4">
                    {pointIconMap[pt.icon] || <Sparkles className="w-5 h-5 text-[#6A8DFF]" />}
                  </div>
                  <h4 className="text-base font-heading font-semibold text-[#FAFAFA] mb-2">{pt.title}</h4>
                  <p className="text-xs text-[#D4D4D4] leading-relaxed">{pt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
