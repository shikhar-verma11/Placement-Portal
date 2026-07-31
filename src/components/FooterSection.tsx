import React from 'react';
import { ShieldCheck, ArrowUp, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import confetti from 'canvas-confetti';

export const FooterSection: React.FC = () => {
  const scrollToTop = () => {
    soundEngine.playChime(750, 0.2);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.9 },
      colors: ['#6A8DFF', '#7D9EFF'],
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#151515] border-t border-[#3A3A3A] pt-16 pb-12 px-4 sm:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-[#404040]">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#6A8DFF] flex items-center justify-center text-white font-bold">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-heading font-bold text-base text-[#FAFAFA] tracking-wide flex items-center gap-1.5">
              PLACEMENT<span className="text-[#6A8DFF]">.AI</span>
            </span>
            <p className="text-[11px] text-[#9E9E9E] font-mono">Smart College Placement Management Portal</p>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#9E9E9E]">
          <a href="#problem" className="hover:text-[#FAFAFA] transition-colors">Problem</a>
          <a href="#journey" className="hover:text-[#FAFAFA] transition-colors">Journey</a>
          <a href="#features" className="hover:text-[#FAFAFA] transition-colors">Features</a>
          <a href="#tech" className="hover:text-[#FAFAFA] transition-colors">Tech Stack</a>
          <a href="#architecture" className="hover:text-[#FAFAFA] transition-colors">Architecture</a>
          <a href="#stats" className="hover:text-[#FAFAFA] transition-colors">Impact</a>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          onMouseEnter={() => soundEngine.playHover()}
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1F1F1F] border border-[#3A3A3A] hover:border-[#404040] text-xs font-medium text-[#D4D4D4] hover:text-[#FAFAFA] transition-all shadow-sm"
          data-cursor-hover
          data-cursor-text="TOP"
        >
          <span>Return to Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-[#6A8DFF] group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#9E9E9E] gap-4 text-center sm:text-left">
        <p>© 2026 Smart College Placement Management Portal. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Designed with <Sparkles className="w-3 h-3 text-[#6A8DFF]" /> for enterprise excellence.
        </p>
      </div>
    </footer>
  );
};
