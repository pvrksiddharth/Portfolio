import { useEffect, useState } from 'react';

interface HeroProps {
  onResumeClick: () => void;
}

export default function HeroSection({ onResumeClick }: HeroProps) {
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolledPast(window.scrollY > window.innerHeight * 0.4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="hero container" id="top" aria-labelledby="hero-heading">
      <p className="hero-kicker hero-enter" style={{ ['--d' as string]: '80ms' }}>
        <span className="dot" aria-hidden="true" />
        Personal Space&ensp;/&ensp;Digital Workshop
      </p>

      <h1 id="hero-heading" className="hero-headline hero-enter" style={{ ['--d' as string]: '180ms' }}>
        Curiosity,<br />
        <span className="accent-word">engineered.</span>
      </h1>

      <p className="hero-sub hero-enter" style={{ ['--d' as string]: '320ms' }}>
        A digital space for experiments, ideas, and things worth building.
        <span className="dim">
          Exploring the intersection of software, intelligence, and thoughtful design.
        </span>
      </p>

      <div className="hero-actions hero-enter" style={{ ['--d' as string]: '460ms' }}>
        <a className="btn btn-primary" href="#builds">
          Explore the work
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        </a>
        <button type="button" className="btn btn-ghost" onClick={onResumeClick}>
          Download resume
        </button>
      </div>

      <div className={`scroll-hint${scrolledPast ? ' hidden' : ''}`} aria-hidden="true">
        <span>Scroll</span>
        <span className="rail" />
      </div>
    </section>
  );
}
