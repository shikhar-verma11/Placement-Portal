import React from 'react';
import { ShieldCheck, ArrowUp, Github, Linkedin, Twitter, Sparkles, Send } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import confetti from 'canvas-confetti';

export const FooterSection: React.FC = () => {
  const scrollToTop = () => {
    soundEngine.playChime(750, 0.2);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.9 },
      colors: ['#14F1D9', '#00FFC6'],
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#071320] border-t border-[#14F1D9]/30 pt-16 pb-12 px-4 sm:px-8 overflow-hidden">
      {/* Top Border Glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#14F1D9] to-transparent shadow-[0_0_20px_#14F1D9]" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/10">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#14F1D9] to-[#00FFC6] p-[1px] shadow-[0_0_15px_rgba(20,241,217,0.4)]">
            <div className="w-full h-full bg-[#071320] rounded-[11px] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#00FFC6]" />
            </div>
          </div>
          <div>
            <span className="font-heading font-extrabold text-lg text-white tracking-wider flex items-center gap-1.5">
              PLACEMENT<span className="text-[#14F1D9]">.AI</span>
            </span>
            <p className="text-xs text-slate-400 font-mono">Smart College Placement Management Portal</p>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
          <a href="#problem" className="hover:text-[#00FFC6] transition-colors">Problem</a>
          <a href="#journey" className="hover:text-[#00FFC6] transition-colors">Journey</a>
          <a href="#features" className="hover:text-[#00FFC6] transition-colors">Features</a>
          <a href="#tech" className="hover:text-[#00FFC6] transition-colors">Tech Stack</a>
          <a href="#architecture" className="hover:text-[#00FFC6] transition-colors">Architecture</a>
          <a href="#stats" className="hover:text-[#00FFC6] transition-colors">Impact</a>
        </div>

        {/* Back to top magnetic button */}
        <button
          onClick={scrollToTop}
          onMouseEnter={() => soundEngine.playHover()}
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F172A] border border-[#14F1D9]/40 hover:border-[#00FFC6] text-xs font-bold text-white transition-all shadow-[0_0_15px_rgba(20,241,217,0.2)]"
          data-cursor-hover
          data-cursor-text="TOP"
        >
          <span>Return to Top</span>
          <ArrowUp className="w-4 h-4 text-[#00FFC6] group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4 text-center sm:text-left">
        <p>© 2026 Smart College Placement Management Portal. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Designed with <Sparkles className="w-3 h-3 text-[#00FFC6]" /> for Awwwards-grade experience.
        </p>
      </div>
    </footer>
  );
};
