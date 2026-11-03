import ParticleBackground from './components/ParticleBackground';
import BackgroundIcons from './components/BackgroundIcons';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DomainExpertiseSection from './components/DomainExpertiseSection';
import AnalyticsSection from './components/AnalyticsSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { useReveal } from './hooks/useReveal';

export default function App() {
  useReveal();

  return (
    <>
      <ParticleBackground />
      <BackgroundIcons />
      <div className="page-content">
        <Navbar />
        <main>
          <HeroSection />
          <DomainExpertiseSection />
          <AnalyticsSection />
          <AboutSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
