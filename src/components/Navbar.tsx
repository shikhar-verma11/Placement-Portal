import React, { useState, useEffect } from 'react';
import { ShieldCheck, Volume2, VolumeX, Sparkles, Terminal } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface NavbarProps {
  onOpenPortalModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPortalModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);

      // Detect active section
      const sections = ['hero', 'problem', 'journey', 'features', 'workflow', 'tech', 'architecture', 'stats', 'benefits'];
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 300 && rect.bottom >= 300) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleAudio = () => {
    const state = soundEngine.toggleSound();
    setSoundEnabled(state);
  };

  const navLinks = [
    { id: 'problem', label: 'Problem' },
    { id: 'journey', label: 'Journey' },
    { id: 'features', label: 'Features' },
    { id: 'workflow', label: 'Workflow' },
    { id: 'tech', label: 'Tech Stack' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'stats', label: 'Impact' },
  ];

  const scrollTo = (id: string) => {
    soundEngine.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out px-4 sm:px-8 py-4 ${
        hidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 flex items-center justify-between px-5 py-3 ${
          scrolled
            ? 'glass-panel bg-[#0F172A]/80 border-[#14F1D9]/30 shadow-[0_10px_30px_rgba(7,19,32,0.8)]'
            : 'bg-transparent border border-white/5'
        }`}
      >
        {/* Brand / Logo */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-3 group text-left focus:outline-none"
          data-cursor-hover
          data-cursor-text="HOME"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#14F1D9] to-[#00FFC6] p-[1px] shadow-[0_0_15px_rgba(20,241,217,0.4)] group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#071320] rounded-[11px] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#00FFC6] group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <span className="font-heading font-extrabold text-base sm:text-lg tracking-wider text-white flex items-center gap-1.5">
              PLACEMENT<span className="text-[#14F1D9]">.AI</span>
              <span className="inline-block w-2 h-2 rounded-full bg-[#00FFC6] animate-pulse" />
            </span>
            <p className="text-[10px] text-slate-400 tracking-widest uppercase font-mono hidden sm:block">
              Smart College Portal
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0F172A]/60 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                onMouseEnter={() => soundEngine.playHover()}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                  isActive ? 'text-[#00FFC6]' : 'text-slate-300 hover:text-white'
                }`}
                data-cursor-hover
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-[#14F1D9]/15 border border-[#14F1D9]/40 shadow-[0_0_12px_rgba(20,241,217,0.3)] animate-pulse-glow" />
                )}
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Controls & CTA */}
        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={toggleAudio}
            onMouseEnter={() => soundEngine.playHover()}
            className="p-2.5 rounded-xl bg-[#0F172A]/80 border border-slate-800 hover:border-[#14F1D9]/40 text-slate-300 hover:text-[#00FFC6] transition-all"
            title={soundEnabled ? 'Mute Audio' : 'Enable Audio Feedback'}
            data-cursor-hover
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#00FFC6]" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Live Interactive Portal Simulation Modal CTA */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenPortalModal();
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase text-[#071320] bg-gradient-to-r from-[#14F1D9] to-[#00FFC6] shadow-[0_0_20px_rgba(20,241,217,0.4)] hover:shadow-[0_0_30px_rgba(0,255,198,0.7)] hover:scale-105 active:scale-95 transition-all duration-300"
            data-cursor-hover
            data-cursor-text="TRY LIVE"
          >
            <Terminal className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>Simulate Portal</span>
            <Sparkles className="w-3.5 h-3.5 text-[#071320] animate-spin" style={{ animationDuration: '4s' }} />
          </button>
        </div>
      </div>
    </header>
  );
};
