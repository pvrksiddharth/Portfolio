import { useCallback, useState } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DomainExpertiseSection from './components/DomainExpertiseSection';
import AnalyticsSection from './components/AnalyticsSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ResumeDialog from './components/ResumeDialog';
import { useReveal } from './hooks/useReveal';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const openResume = useCallback(() => setResumeOpen(true), []);
  const closeResume = useCallback(() => setResumeOpen(false), []);

  useReveal();

  return (
    <>
      <ParticleBackground />
      <div className="page-content">
        <Navbar onResumeClick={openResume} />
        <main>
          <HeroSection onResumeClick={openResume} />
          <DomainExpertiseSection />
          <AnalyticsSection />
          <AboutSection />
          <ContactSection onResumeClick={openResume} />
        </main>
        <Footer />
      </div>
      <ResumeDialog open={resumeOpen} onClose={closeResume} />
    </>
  );
}
