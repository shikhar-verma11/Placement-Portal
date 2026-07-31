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

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div className="relative min-h-screen bg-[#071320] text-slate-100 selection:bg-[#14F1D9]/30 selection:text-[#00FFC6] font-body overflow-x-hidden">
      {/* 3D WebGL Particle Background Canvas */}
      <ThreeCanvas />

      {/* Futuristic Custom Spotlight Cursor */}
      <CustomCursor />

      {/* Dynamic Glassmorphic Navbar */}
      <Navbar onOpenPortalModal={() => setIsModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection onOpenPortalModal={() => setIsModalOpen(true)} />
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

      {/* Interactive Portal Simulator Modal */}
      <InteractivePortalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
