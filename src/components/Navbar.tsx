import React, { useState, useEffect } from 'react';
import { ShieldCheck, Volume2, VolumeX, Sparkles, Terminal, Search } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { NotificationCenter } from './NotificationCenter';
import { NotificationItem } from '../types';

interface NavbarProps {
  onOpenPortalModal: () => void;
  onOpenSearch: () => void;
  notifications: NotificationItem[];
  onMarkAllNotificationsRead: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPortalModal,
  onOpenSearch,
  notifications,
  onMarkAllNotificationsRead,
}) => {
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
        className={`max-w-7xl mx-auto rounded-xl transition-all duration-300 flex items-center justify-between px-5 py-3 ${
          scrolled
            ? 'glass-panel bg-[#151515]/90 border-[#3A3A3A] shadow-xl'
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
          <div className="w-9 h-9 rounded-lg bg-[#282828] border border-[#3A3A3A] flex items-center justify-center text-[#6A8DFF] group-hover:bg-[#6A8DFF] group-hover:text-white transition-all">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="font-heading font-semibold text-sm sm:text-base tracking-tight text-[#FAFAFA] flex items-center gap-2">
              PLACEMENT<span className="text-[#6A8DFF] font-mono text-xs px-1.5 py-0.5 rounded bg-[#6A8DFF]/10 border border-[#6A8DFF]/20">PORTAL</span>
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#1F1F1F]/90 p-1 rounded-lg border border-[#3A3A3A] backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                onMouseEnter={() => soundEngine.playHover()}
                className={`relative px-3.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                  isActive ? 'bg-[#323232] text-[#FAFAFA] border border-[#3A3A3A]' : 'text-[#9E9E9E] hover:text-[#D4D4D4]'
                }`}
                data-cursor-hover
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Controls, Search & CTA */}
        <div className="flex items-center gap-2.5">
          {/* Global Search Button */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenSearch();
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1F1F1F] border border-[#3A3A3A] text-xs font-mono text-[#9E9E9E] hover:text-[#FAFAFA] hover:border-[#404040] transition-all"
            data-cursor-hover
            data-cursor-text="SEARCH"
          >
            <Search className="w-3.5 h-3.5 text-[#6A8DFF]" />
            <span>Search</span>
            <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-[#282828] text-[#9E9E9E] border border-[#3A3A3A]">
              Ctrl K
            </kbd>
          </button>

          {/* Notification Center */}
          <NotificationCenter
            notifications={notifications}
            onMarkAllAsRead={onMarkAllNotificationsRead}
            onSelectNotification={() => onOpenPortalModal()}
          />

          {/* Sound Toggle */}
          <button
            onClick={toggleAudio}
            onMouseEnter={() => soundEngine.playHover()}
            className="p-2 rounded-lg bg-[#1F1F1F] border border-[#3A3A3A] text-[#9E9E9E] hover:text-[#FAFAFA] hover:border-[#404040] transition-all"
            title={soundEnabled ? 'Mute Audio' : 'Enable Audio Feedback'}
            data-cursor-hover
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#6A8DFF]" /> : <VolumeX className="w-4 h-4 text-[#9E9E9E]" />}
          </button>

          {/* Live Interactive Portal Simulation Modal CTA */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenPortalModal();
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-white bg-[#6A8DFF] hover:bg-[#7D9EFF] active:bg-[#6A8DFF] transition-all duration-200 shadow-sm"
            data-cursor-hover
            data-cursor-text="SIMULATE"
          >
            <Terminal className="w-3.5 h-3.5 text-white/90" />
            <span className="hidden xs:inline">Simulate Portal</span>
            <Sparkles className="w-3 h-3 text-white/80" />
          </button>
        </div>
      </div>
    </header>
  );
};
