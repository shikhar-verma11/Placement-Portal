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
    <section id="tech" className="relative py-28 px-4 sm:px-8 bg-[#1B1B1B] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-radial from-[#6A8DFF]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#1F1F1F] border border-[#3A3A3A] text-xs font-mono text-[#D4D4D4] mb-4">
            <Terminal className="w-3.5 h-3.5 text-[#6A8DFF]" />
            <span>CUTTING-EDGE TECH STACK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#FAFAFA] tracking-tight mb-4">
            Powered By Industrial Software Engineering
          </h2>
          <p className="text-[#D4D4D4] text-base sm:text-lg">
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
              className="group relative glass-panel rounded-2xl p-6 border-[#3A3A3A] bg-[#282828] hover:border-[#404040] hover:bg-[#323232] transition-all duration-200 flex flex-col justify-between shadow-sm"
              data-cursor-hover
              data-cursor-text="TECH"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#6A8DFF]/10 border border-[#6A8DFF]/20 flex items-center justify-center text-[#6A8DFF] group-hover:bg-[#6A8DFF] group-hover:text-white transition-all">
                    {iconMap[tech.icon]}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-[#1F1F1F] border border-[#3A3A3A] text-[#D4D4D4]">
                    {tech.category}
                  </span>
                </div>

                <h3 className="text-base font-heading font-semibold text-[#FAFAFA] mb-1 group-hover:text-[#6A8DFF] transition-colors">
                  {tech.name}
                </h3>
                <p className="text-xs text-[#D4D4D4] leading-relaxed mb-4">
                  {tech.role}
                </p>
              </div>

              <div className="pt-3 border-t border-[#404040] flex items-center justify-between text-[11px] font-mono text-[#6A8DFF]">
                <span>{tech.speed}</span>
                <ShieldCheck className="w-3.5 h-3.5 text-[#6A8DFF]" />
              </div>
            </div>
          ))}
        </div>

        {/* Selected Tech Inspector Box */}
        {hoveredTech && (
          <div className="mt-8 max-w-2xl mx-auto glass-panel rounded-xl p-3.5 border-[#3A3A3A] bg-[#282828] text-center animate-fadeIn flex items-center justify-center gap-3">
            <span className="text-xs font-mono text-[#9E9E9E]">ACTIVE MODULE INSPECTOR:</span>
            <span className="text-xs font-semibold text-[#6A8DFF] font-mono">{hoveredTech.name}</span>
            <span className="text-xs text-[#D4D4D4] hidden sm:inline">&mdash; {hoveredTech.description}</span>
          </div>
        )}
      </div>
    </section>
  );
};
