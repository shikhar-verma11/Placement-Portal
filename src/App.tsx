import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProblemStatementSection } from './components/ProblemStatementSection';
import { UseCaseSection } from './components/UseCaseSection';
import { StudentJourneySection } from './components/StudentJourneySection';
import { FeaturesSection } from './components/FeaturesSection';
import { HorizontalWorkflowSection } from './components/HorizontalWorkflowSection';
import { TechStackSection } from './components/TechStackSection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { StatisticsSection } from './components/StatisticsSection';
import { BenefitsSection } from './components/BenefitsSection';
import { FooterSection } from './components/FooterSection';
import { InteractivePortalModal } from './components/InteractivePortalModal';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
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
    <div className="relative min-h-screen bg-[#060f1e] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-300 font-body overflow-x-hidden">
      {/* Navigation */}
      <Navbar onOpenPortalModal={() => setIsModalOpen(true)} />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection onOpenPortalModal={() => setIsModalOpen(true)} />
        <ProblemStatementSection />
        <UseCaseSection />
        <StudentJourneySection />
        <FeaturesSection />
        <HorizontalWorkflowSection />
        <TechStackSection />
        <ArchitectureSection />
        <StatisticsSection />
        <BenefitsSection />
      </main>

      {/* Footer */}
      <FooterSection />

      {/* Interactive Portal Simulator Modal */}
      <InteractivePortalModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
