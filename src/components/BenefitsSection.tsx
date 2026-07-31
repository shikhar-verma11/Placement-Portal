import React from 'react';
import { LayoutGrid, Wand2, CheckCircle2, FileCheck, ShieldAlert, Download, UserCheck, Clock, Send, Star, Sparkles } from 'lucide-react';
import { AUDIENCE_BENEFITS } from '../data/mockData';

export const BenefitsSection: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    LayoutGrid: <LayoutGrid className="w-5 h-5" />,
    Wand2: <Wand2 className="w-5 h-5" />,
    CheckCircle2: <CheckCircle2 className="w-5 h-5" />,
    FileCheck: <FileCheck className="w-5 h-5" />,
    ShieldAlert: <ShieldAlert className="w-5 h-5" />,
    Download: <Download className="w-5 h-5" />,
    UserCheck: <UserCheck className="w-5 h-5" />,
    Clock: <Clock className="w-5 h-5" />,
    Send: <Send className="w-5 h-5" />,
  };

  return (
    <section id="benefits" className="relative py-28 px-4 sm:px-8 bg-[#060f1e]">
      {/* Soft Backdrop Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-radial from-emerald-500/8 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-emerald-500/30 text-xs font-mono text-emerald-400 mb-4">
            <Star className="w-3.5 h-3.5" />
            <span>KEY STAKEHOLDERS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight mb-4">
            Unified Value for Everyone
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            A single, comprehensive platform tailored specifically for students, coordinators, and recruiting partners.
          </p>
        </div>

        {/* Stakeholder Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {AUDIENCE_BENEFITS.map((benefit, idx) => (
            <div
              key={idx}
              className="group glass-panel rounded-3xl p-6 sm:p-8 border-white/10 flex flex-col justify-between hover:border-emerald-500/30 transition-all duration-300 bg-[#0f1d30]/60"
            >
              <div>
                <div className="mb-6 pb-4 border-b border-white/15">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold">
                    ROLE: {benefit.role.toUpperCase()}
                  </span>
                  <p className="text-sm text-slate-300 mt-4 leading-relaxed font-medium">
                    {benefit.tagline}
                  </p>
                </div>

                <div className="space-y-6">
                  {benefit.points.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform duration-300 shrink-0">
                        {iconMap[point.icon] || <Sparkles className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white mb-1">{point.title}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">{point.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-500">
                <span>Verified Module</span>
                <span className="text-emerald-400">Ready</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
