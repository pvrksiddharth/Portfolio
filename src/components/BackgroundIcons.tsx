import { useEffect, useRef } from 'react';

/**
 * BackgroundIcons
 * ---------------
 * Renders 5 massive, ultra-low-opacity (opacity: 0.035 - 0.045) SVG icons
 * scattered across the portfolio sections to establish an architectural,
 * living backdrop behind all content.
 *
 * 1. AI / Neural Network Brain (Hero / Top)
 * 2. Shield with Lock / Biometrics (Cybersecurity / Expertise)
 * 3. Document with Checklist / Compliance (Analytics / Bid Lifecycle)
 * 4. Cloud & Server Stack (About & Infrastructure)
 * 5. Network Constellation / Data Pipeline (Contact & Grounding)
 *
 * Micro-animations:
 * - Subtle, slow floating and gentle rotation via pure GPU CSS keyframes.
 * - Parallax scroll tracking: window.scrollY moves each icon vertically at
 *   distinct speeds via translate3d, providing rich 3D depth on scroll.
 * - Non-blocking (pointer-events: none, z-index: 0).
 */

const SPEEDS = [-0.11, 0.08, -0.13, 0.1, -0.07];

export default function BackgroundIcons() {
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let rafId = 0;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          iconRefs.current.forEach((el, index) => {
            if (el) {
              const speed = SPEEDS[index] || 0.08;
              el.style.transform = `translate3d(0, ${Math.round(scrollY * speed)}px, 0)`;
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="background-icons-layer" aria-hidden="true">
      {/* 1. AI / Neural Network Brain - Top Right near Hero */}
      <div
        ref={(el) => { iconRefs.current[0] = el; }}
        className="parallax-icon-wrapper"
        style={{ top: '6%', right: '-4%' }}
      >
        <div className="parallax-icon-float bg-float-1">
          <svg
            className="parallax-svg"
            width="520"
            height="520"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Brain left hemisphere contours */}
            <path d="M48 20 C36 20 24 28 24 42 C24 50 28 56 31 62 C34 68 35 78 48 82" />
            <path d="M48 30 C40 30 32 36 32 46 C32 54 36 58 40 64 C42 67 43 73 48 76" />
            <path d="M48 40 C44 40 39 44 39 50 C39 55 42 58 44 62 C46 64 47 67 48 70" />

            {/* Brain right hemisphere / neural network */}
            <path d="M52 20 C64 20 76 28 76 42 C76 50 72 56 69 62 C66 68 65 78 52 82" />
            <path d="M52 30 C60 30 68 36 68 46 C68 54 64 58 60 64 C58 67 57 73 52 76" />
            <path d="M52 40 C56 40 61 44 61 50 C61 55 58 58 56 62 C54 64 53 67 52 70" />

            {/* Neural network graph nodes & synapses across the right */}
            <line x1="52" y1="26" x2="63" y2="34" strokeDasharray="1.5 1.5" />
            <line x1="63" y1="34" x2="72" y2="46" strokeDasharray="1.5 1.5" />
            <line x1="52" y1="46" x2="63" y2="34" />
            <line x1="52" y1="46" x2="64" y2="54" />
            <line x1="64" y1="54" x2="72" y2="46" />
            <line x1="64" y1="54" x2="68" y2="68" strokeDasharray="1.5 1.5" />
            <line x1="52" y1="64" x2="64" y2="54" />
            <line x1="52" y1="64" x2="59" y2="74" />
            <line x1="59" y1="74" x2="68" y2="68" />
            <line x1="52" y1="76" x2="59" y2="74" />

            {/* Synapse nodes */}
            <circle cx="52" cy="26" r="1.8" fill="currentColor" />
            <circle cx="63" cy="34" r="2.2" fill="currentColor" />
            <circle cx="72" cy="46" r="2" fill="currentColor" />
            <circle cx="52" cy="46" r="1.8" fill="currentColor" />
            <circle cx="64" cy="54" r="2.4" fill="currentColor" />
            <circle cx="68" cy="68" r="1.9" fill="currentColor" />
            <circle cx="52" cy="64" r="1.8" fill="currentColor" />
            <circle cx="59" cy="74" r="2" fill="currentColor" />
            <circle cx="52" cy="76" r="1.8" fill="currentColor" />

            {/* Left nodes */}
            <circle cx="36" cy="34" r="1.5" fill="currentColor" opacity="0.6" />
            <circle cx="28" cy="48" r="1.5" fill="currentColor" opacity="0.6" />
            <circle cx="38" cy="62" r="1.5" fill="currentColor" opacity="0.6" />
            <line x1="36" y1="34" x2="28" y2="48" strokeDasharray="1 1" opacity="0.5" />
            <line x1="28" y1="48" x2="38" y2="62" strokeDasharray="1 1" opacity="0.5" />

            {/* Central stem / connector */}
            <line x1="50" y1="16" x2="50" y2="86" strokeWidth="1" opacity="0.4" />
            <circle cx="50" cy="16" r="1.2" fill="currentColor" />
            <circle cx="50" cy="86" r="1.2" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* 2. Shield with Lock / Biometrics - Left near Domain Expertise */}
      <div
        ref={(el) => { iconRefs.current[1] = el; }}
        className="parallax-icon-wrapper"
        style={{ top: '26%', left: '-5%' }}
      >
        <div className="parallax-icon-float bg-float-2">
          <svg
            className="parallax-svg"
            width="500"
            height="540"
            viewBox="0 0 100 110"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Outer security shield */}
            <path d="M50 10 L84 22 C84 60 70 88 50 100 C30 88 16 60 16 22 Z" />
            {/* Inner shield inset */}
            <path d="M50 18 L76 28 C76 58 64 80 50 90 C36 80 24 58 24 28 Z" strokeDasharray="3 2" />

            {/* Central padlock & security construct */}
            <rect x="40" y="52" width="20" height="18" rx="3.5" />
            <path d="M44 52 V44 C44 40.686 46.686 38 50 38 C53.314 38 56 40.686 56 44 V52" strokeWidth="1.5" />
            <circle cx="50" cy="60" r="2" fill="currentColor" />
            <line x1="50" y1="62" x2="50" y2="66" strokeWidth="1.5" />

            {/* Biometric fingerprint / security concentric lines around lock */}
            <path d="M33 46 C33 36.6 40.6 29 50 29 C59.4 29 67 36.6 67 46" strokeDasharray="1.5 2" />
            <path d="M30 60 C30 71 39 80 50 80 C61 80 70 71 70 60" opacity="0.6" />

            {/* Horizontal radar scan tick marks */}
            <line x1="12" y1="22" x2="20" y2="22" />
            <line x1="80" y1="22" x2="88" y2="22" />
            <line x1="50" y1="4" x2="50" y2="10" />
          </svg>
        </div>
      </div>

      {/* 3. Document with Checklist / Compliance - Right near Analytics */}
      <div
        ref={(el) => { iconRefs.current[2] = el; }}
        className="parallax-icon-wrapper"
        style={{ top: '48%', right: '-4%' }}
      >
        <div className="parallax-icon-float bg-float-3">
          <svg
            className="parallax-svg"
            width="480"
            height="540"
            viewBox="0 0 100 115"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Document sheet with folded corner */}
            <path d="M22 12 H64 L82 30 V102 C82 105.3 79.3 108 76 108 H22 C18.7 108 16 105.3 16 102 V18 C16 14.7 18.7 12 22 12 Z" />
            <polyline points="64 12 64 30 82 30" />

            {/* Document title / header placeholder */}
            <line x1="26" y1="24" x2="52" y2="24" strokeWidth="2" />
            <line x1="26" y1="32" x2="42" y2="32" strokeWidth="1" strokeDasharray="2 1.5" />

            {/* Checklist item 1 - checked */}
            <rect x="26" y="44" width="7" height="7" rx="1.5" />
            <polyline points="27.5 47.5 29.5 49.5 32 45" strokeWidth="1.4" stroke="#10b981" />
            <line x1="38" y1="47.5" x2="72" y2="47.5" strokeWidth="1.3" />

            {/* Checklist item 2 - checked */}
            <rect x="26" y="58" width="7" height="7" rx="1.5" />
            <polyline points="27.5 61.5 29.5 63.5 32 59" strokeWidth="1.4" stroke="#10b981" />
            <line x1="38" y1="61.5" x2="68" y2="61.5" strokeWidth="1.3" />

            {/* Checklist item 3 - checked */}
            <rect x="26" y="72" width="7" height="7" rx="1.5" />
            <polyline points="27.5 75.5 29.5 77.5 32 73" strokeWidth="1.4" stroke="#10b981" />
            <line x1="38" y1="75.5" x2="74" y2="75.5" strokeWidth="1.3" />

            {/* Checklist item 4 - active / in progress */}
            <rect x="26" y="86" width="7" height="7" rx="1.5" strokeDasharray="1.5 1" />
            <circle cx="29.5" cy="89.5" r="1.2" fill="currentColor" />
            <line x1="38" y1="89.5" x2="62" y2="89.5" strokeWidth="1.3" />

            {/* Stamp / verification seal */}
            <circle cx="68" cy="94" r="7" strokeDasharray="2 1.5" opacity="0.6" />
            <polyline points="65 94 67.5 96.5 71.5 92" strokeWidth="1.2" opacity="0.7" />
          </svg>
        </div>
      </div>

      {/* 4. Cloud & Server Stack - Left near lower section */}
      <div
        ref={(el) => { iconRefs.current[3] = el; }}
        className="parallax-icon-wrapper"
        style={{ top: '72%', left: '-5%' }}
      >
        <div className="parallax-icon-float bg-float-4">
          <svg
            className="parallax-svg"
            width="520"
            height="500"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Top Cloud Structure */}
            <path d="M28 42 C24 42 20 45 20 50 C20 55 24 58 28 58 H72 C77 58 81 54 81 49 C81 44 77 40 72 40 C72 32 65 26 56 26 C49 26 43 30 40 36 C37 34 32 34 28 42 Z" strokeDasharray="4 2" />

            {/* Server Rack Chassis 1 (Top Tier) */}
            <rect x="24" y="46" width="52" height="12" rx="2.5" />
            <line x1="30" y1="52" x2="52" y2="52" strokeWidth="1.2" />
            <circle cx="64" cy="52" r="1.2" fill="currentColor" />
            <circle cx="68" cy="52" r="1.2" fill="currentColor" />
            <circle cx="72" cy="52" r="1.2" fill="currentColor" />

            {/* Server Rack Chassis 2 (Middle Tier) */}
            <rect x="24" y="62" width="52" height="12" rx="2.5" />
            <line x1="30" y1="68" x2="52" y2="68" strokeWidth="1.2" />
            <circle cx="64" cy="68" r="1.2" fill="currentColor" />
            <circle cx="68" cy="68" r="1.2" fill="currentColor" />
            <circle cx="72" cy="68" r="1.2" fill="currentColor" />

            {/* Server Rack Chassis 3 (Base Tier) */}
            <rect x="24" y="78" width="52" height="12" rx="2.5" />
            <line x1="30" y1="84" x2="52" y2="84" strokeWidth="1.2" />
            <circle cx="64" cy="84" r="1.2" fill="currentColor" />
            <circle cx="68" cy="84" r="1.2" fill="currentColor" />
            <circle cx="72" cy="84" r="1.2" fill="currentColor" />

            {/* Inter-rack bus connection lines */}
            <line x1="20" y1="52" x2="24" y2="52" />
            <line x1="20" y1="68" x2="24" y2="68" />
            <line x1="20" y1="84" x2="24" y2="84" />
            <line x1="20" y1="52" x2="20" y2="84" strokeWidth="1.5" />

            {/* Foundation rails */}
            <line x1="28" y1="94" x2="72" y2="94" strokeWidth="1.5" />
            <line x1="32" y1="90" x2="32" y2="94" />
            <line x1="68" y1="90" x2="68" y2="94" />
          </svg>
        </div>
      </div>

      {/* 5. Network Constellation / Data Pipeline - Bottom Right near Contact */}
      <div
        ref={(el) => { iconRefs.current[4] = el; }}
        className="parallax-icon-wrapper"
        style={{ top: '90%', right: '-3%' }}
      >
        <div className="parallax-icon-float bg-float-5">
          <svg
            className="parallax-svg"
            width="460"
            height="460"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Global telemetry orbit rings */}
            <circle cx="50" cy="50" r="38" strokeDasharray="3 3" opacity="0.6" />
            <ellipse cx="50" cy="50" rx="38" ry="16" transform="rotate(-25 50 50)" strokeDasharray="2 2" opacity="0.5" />
            <ellipse cx="50" cy="50" rx="38" ry="16" transform="rotate(35 50 50)" strokeDasharray="2 2" opacity="0.5" />

            {/* Central hub node */}
            <circle cx="50" cy="50" r="5" fill="none" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="2" fill="currentColor" />

            {/* Distributed satellite nodes */}
            <circle cx="26" cy="32" r="2.5" fill="currentColor" />
            <circle cx="74" cy="28" r="2.5" fill="currentColor" />
            <circle cx="80" cy="62" r="2" fill="currentColor" />
            <circle cx="28" cy="72" r="2" fill="currentColor" />
            <circle cx="56" cy="84" r="2.2" fill="currentColor" />

            {/* Telemetry connectors */}
            <line x1="50" y1="50" x2="26" y2="32" />
            <line x1="50" y1="50" x2="74" y2="28" />
            <line x1="50" y1="50" x2="80" y2="62" strokeDasharray="1.5 1.5" />
            <line x1="50" y1="50" x2="28" y2="72" strokeDasharray="1.5 1.5" />
            <line x1="50" y1="50" x2="56" y2="84" />
          </svg>
        </div>
      </div>
    </div>
  );
}

