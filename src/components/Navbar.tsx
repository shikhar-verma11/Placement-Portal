import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import { PlacementLogo } from './PlacementLogo';

interface NavbarProps {
  onOpenPortalModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPortalModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);

      // Detect active section
      const sections = ['hero', 'problem', 'usecase', 'journey', 'features', 'tech', 'architecture', 'stats', 'benefits'];
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

  const navLinks = [
    { id: 'problem', label: 'Problem' },
    { id: 'usecase', label: 'Use Case' },
    { id: 'journey', label: 'Journey' },
    { id: 'features', label: 'Features' },
    { id: 'tech', label: 'Tech Stack' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'stats', label: 'Impact' },
  ];

  const scrollTo = (id: string) => {
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
            ? 'glass-panel bg-[#0f1d30]/80 border-emerald-500/20 shadow-lg'
            : 'bg-transparent border border-white/5'
        }`}
      >
        {/* Brand */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="relative group-hover:scale-105 transition-transform duration-300">
            <PlacementLogo className="w-10 h-10" />
          </div>
          <div>
            <span className="font-heading font-extrabold text-base sm:text-lg tracking-wider text-white flex items-center gap-1.5">
              PLACEMENT<span className="text-emerald-400">.PORTAL</span>
            </span>
            <p className="text-[10px] text-slate-400 tracking-widest uppercase font-mono hidden sm:block">
              Smart College Management
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0f1d30]/60 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                  isActive ? 'text-emerald-400' : 'text-slate-300 hover:text-white'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-emerald-500/15 border border-emerald-500/30" />
                )}
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* CTA */}
        <button
          onClick={() => onOpenPortalModal()}
          className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md"
        >
          <Terminal className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          <span>Simulate Portal</span>
        </button>
      </div>
    </header>
  );
};
