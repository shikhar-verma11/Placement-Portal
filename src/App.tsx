import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { ThreeCanvas } from './components/ThreeCanvas';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProblemStatementSection } from './components/ProblemStatementSection';
import { StudentJourneySection } from './components/StudentJourneySection';
import { FeaturesSection } from './components/FeaturesSection';
import { HorizontalWorkflowSection } from './components/HorizontalWorkflowSection';
import { TechStackSection } from './components/TechStackSection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { StatisticsSection } from './components/StatisticsSection';
import { BenefitsSection } from './components/BenefitsSection';
import { FutureScopeSection } from './components/FutureScopeSection';
import { FooterSection } from './components/FooterSection';
import { InteractivePortalModal } from './components/InteractivePortalModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { ToastManager } from './components/ToastManager';
import { INITIAL_NOTIFICATIONS } from './data/saasData';
import { NotificationItem, ToastMessage } from './types';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'tpo' | 'student' | 'analytics' | 'activity' | 'reports'>('tpo');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Global Keyboard Shortcut: Ctrl + K / Cmd + K to open Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}`,
      title,
      message,
      type,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('Notifications Cleared', 'All unread notifications marked as read.', 'info');
  };

  const handleSelectSearchResult = (type: string, id: string) => {
    if (type === 'student') setModalTab('student');
    else if (type === 'drive') setModalTab('tpo');
    else if (type === 'company') setModalTab('reports');
    else setModalTab('activity');

    setIsModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#151515] text-[#FAFAFA] selection:bg-[#6A8DFF]/30 selection:text-[#FAFAFA] font-body overflow-x-hidden">
      {/* 3D WebGL Particle Background Canvas */}
      <ThreeCanvas />

      {/* Futuristic Custom Spotlight Cursor */}
      <CustomCursor />

      {/* Dynamic Glassmorphic Navbar */}
      <Navbar
        onOpenPortalModal={() => {
          setModalTab('tpo');
          setIsModalOpen(true);
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        notifications={notifications}
        onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection
          onOpenPortalModal={() => {
            setModalTab('tpo');
            setIsModalOpen(true);
          }}
        />
        <ProblemStatementSection />
        <StudentJourneySection />
        <FeaturesSection />
        <HorizontalWorkflowSection />
        <TechStackSection />
        <ArchitectureSection />
        <StatisticsSection />
        <BenefitsSection />
        <FutureScopeSection />
      </main>

      {/* Footer */}
      <FooterSection />

      {/* Interactive SaaS Command Center Modal */}
      <InteractivePortalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onShowToast={showToast}
        initialTab={modalTab}
      />

      {/* Global Search Command Palette (Ctrl + K) */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSelectSearchResult}
      />

      {/* Toast Notification Stack */}
      <ToastManager toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};
