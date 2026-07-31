import React, { useState } from 'react';
import {
  Code2,
  Layers,
  Cpu,
  Binary,
  FileSpreadsheet,
  Atom,
  Sparkles,
  Database,
  Terminal,
  ShieldCheck,
} from 'lucide-react';
import { TECH_STACK } from '../data/mockData';
import { TechItem } from '../types';
import { soundEngine } from '../utils/audio';

export const TechStackSection: React.FC = () => {
  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(null);

  const iconMap: Record<string, React.ReactNode> = {
    Code2: <Code2 className="w-6 h-6" />,
    Layers: <Layers className="w-6 h-6" />,
    Cpu: <Cpu className="w-6 h-6" />,
    Binary: <Binary className="w-6 h-6" />,
    FileSpreadsheet: <FileSpreadsheet className="w-6 h-6" />,
    Atom: <Atom className="w-6 h-6" />,
    Sparkles: <Sparkles className="w-6 h-6" />,
    Database: <Database className="w-6 h-6" />,
  };

  return (
    <section id="tech" className="relative py-28 px-4 sm:px-8 bg-[#071320] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-radial from-[#14F1D9]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F172A] border border-[#14F1D9]/30 text-xs font-mono text-[#00FFC6] mb-4">
            <Terminal className="w-3.5 h-3.5" />
            <span>CUTTING-EDGE TECH STACK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight mb-4">
            Powered By Industrial Software Engineering
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            A battle-tested architecture designed for high availability, async background queuing, vector data analysis, and multi-modal AI intelligence.
          </p>
        </div>

        {/* 3D Floating Tech Grid */}
        <div className="perspective-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TECH_STACK.map((tech) => (
            <div
              key={tech.id}
              onMouseEnter={() => {
                soundEngine.playHover();
                setHoveredTech(tech);
              }}
              onMouseLeave={() => setHoveredTech(null)}
              className="group relative glass-panel glass-panel-hover rounded-3xl p-6 border-white/10 flex flex-col justify-between transform-gpu transition-all duration-500 hover:-translate-y-2 hover:rotate-1"
              data-cursor-hover
              data-cursor-text="TECH"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F172A] border border-[#14F1D9]/30 flex items-center justify-center text-[#00FFC6] group-hover:scale-110 group-hover:border-[#00FFC6] shadow-[0_0_15px_rgba(20,241,217,0.3)] transition-all">
                    {iconMap[tech.icon]}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-slate-300">
                    {tech.category}
                  </span>
                </div>

                <h3 className="text-lg font-heading font-bold text-white mb-1 group-hover:text-[#00FFC6] transition-colors">
                  {tech.name}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {tech.role}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#00FFC6]">
                <span>{tech.speed}</span>
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Selected Tech Inspector Box */}
        {hoveredTech && (
          <div className="mt-8 max-w-3xl mx-auto glass-panel rounded-2xl p-4 border-[#00FFC6]/40 bg-[#0F172A] text-center animate-fadeIn flex items-center justify-center gap-4">
            <span className="text-xs font-mono text-slate-400">ACTIVE MODULE INSPECTOR:</span>
            <span className="text-xs font-bold text-[#00FFC6] font-mono">{hoveredTech.name}</span>
            <span className="text-xs text-slate-300 hidden sm:inline">&mdash; {hoveredTech.description}</span>
          </div>
        )}
      </div>
    </section>
  );
};
