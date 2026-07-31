import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PlacementLogo } from './PlacementLogo';

export const FooterSection: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-950 border-t border-white/10 pt-16 pb-12 px-4 sm:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/10">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <PlacementLogo className="w-10 h-10" />
          </div>
          <div className="text-left">
            <span className="font-heading font-extrabold text-lg text-white tracking-wider flex items-center gap-1.5">
              PLACEMENT<span className="text-emerald-400">.PORTAL</span>
            </span>
            <p className="text-xs text-slate-400 font-mono">Smart College Placement Management Portal</p>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
          <a href="#problem" className="hover:text-emerald-400 transition-colors">Problem</a>
          <a href="#usecase" className="hover:text-emerald-400 transition-colors">Use Case</a>
          <a href="#journey" className="hover:text-emerald-400 transition-colors">Journey</a>
          <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
          <a href="#tech" className="hover:text-emerald-400 transition-colors">Tech Stack</a>
          <a href="#architecture" className="hover:text-emerald-400 transition-colors">Architecture</a>
          <a href="#stats" className="hover:text-emerald-400 transition-colors">Impact</a>
        </div>

        {/* Return to top */}
        <button
          onClick={scrollToTop}
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-emerald-500 hover:text-emerald-400 text-xs font-bold text-white transition-all shadow-lg"
        >
          <span>Return to Top</span>
          <ArrowUp className="w-4 h-4 text-emerald-400 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto pt-8 space-y-6">
        {/* Tech Stack Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {['Django', 'Celery', 'Pandas', 'OpenPyXL', 'Bootstrap', 'PostgreSQL', 'Redis', 'Gemini AI'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-[10px] font-mono text-slate-300 hover:border-emerald-500/40 hover:text-emerald-400 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Hackathon Badge & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4 text-center sm:text-left pt-4 border-t border-white/5">
          <p>© 2026 Smart College Placement Management Portal. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
              Hackathon FISAT (UnStop)
            </span>
            <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-[10px] font-bold">
              Python Stack
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
