import React, { useState } from 'react';
import { Code2, Layers, Cpu, Binary, FileSpreadsheet, Atom, Sparkles, Database, Terminal, ShieldCheck, Layout } from 'lucide-react';
import { TECH_STACK } from '../data/mockData';
import { TechItem } from '../types';

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
    Layout: <Layout className="w-6 h-6" />,
  };

  return (
    <section id="tech" className="relative py-28 px-4 sm:px-8 bg-[#060f1e] overflow-hidden">
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-radial from-emerald-500/8 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-emerald-500/30 text-xs font-mono text-emerald-400 mb-4">
            <Terminal className="w-3.5 h-3.5" />
            <span>TECHNOLOGY STACK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight mb-4">
            Powered By Industry-Grade Tools
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            A battle-tested architecture designed for reliability, async processing, data analytics, and AI intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TECH_STACK.map((tech) => (
            <div
              key={tech.id}
              onMouseEnter={() => setHoveredTech(tech)}
              onMouseLeave={() => setHoveredTech(null)}
              className="group relative glass-panel glass-panel-hover rounded-3xl p-6 border-white/10 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:border-emerald-400 transition-all">
                    {iconMap[tech.icon]}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 text-slate-300">
                    {tech.category}
                  </span>
                </div>
                <h3 className="text-lg font-heading font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">{tech.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">{tech.role}</p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-emerald-400">
                <span>{tech.speed}</span>
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {hoveredTech && (
          <div className="mt-8 max-w-3xl mx-auto glass-panel rounded-2xl p-4 border-emerald-500/30 text-center animate-fadeIn flex items-center justify-center gap-4">
            <span className="text-xs font-mono text-slate-400">ACTIVE MODULE:</span>
            <span className="text-xs font-bold text-emerald-400 font-mono">{hoveredTech.name}</span>
            <span className="text-xs text-slate-300 hidden sm:inline">&mdash; {hoveredTech.description}</span>
          </div>
        )}
      </div>
    </section>
  );
};
