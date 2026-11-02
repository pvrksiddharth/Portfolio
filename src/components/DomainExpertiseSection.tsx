import { domains, type DomainIconKey } from '../data/site';

/** Minimal 24px line-art icons, stroke = currentColor. */
function DomainIcon({ name }: { name: DomainIconKey }) {
  const common = {
    width: 30,
    height: 30,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
  switch (name) {
    case 'cloud':
      return (
        <svg {...common}>
          <path d="M6.5 18a4.5 4.5 0 1 1-.4-8.98A6 6 0 0 1 17.7 10.6 3.7 3.7 0 0 1 17 18Z" />
          {/* managed-service nodes */}
          <circle cx="9.2" cy="15" r="0.9" />
          <circle cx="13" cy="13.4" r="0.9" />
          <circle cx="14.6" cy="16.4" r="0.9" />
          <path d="M9.9 14.6 12.3 13.8M13.7 14.3l.6 1.4" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 3.2 5 6v5.2c0 4.4 3 7.6 7 9.6 4-2 7-5.2 7-9.6V6Z" />
          <path d="M9.2 11.8h5.6M9.2 14.6h5.6" />
          <path d="M12 8.6v8" />
        </svg>
      );
    case 'brain':
      return (
        <svg {...common}>
          {/* left hemisphere */}
          <path d="M12 5.4a3.1 3.1 0 0 0-5.9 1.5 3 3 0 0 0-1.3 4.6 3.1 3.1 0 0 0 1.4 4.7 3 3 0 0 0 4.5 1.9c.6-.3 1-.9 1.3-1.5" />
          {/* right hemisphere */}
          <path d="M12 5.4a3.1 3.1 0 0 1 5.9 1.5 3 3 0 0 1 1.3 4.6 3.1 3.1 0 0 1-1.4 4.7 3 3 0 0 1-4.5 1.9c-.6-.3-1-.9-1.3-1.5" />
          {/* network links */}
          <path d="M12 5.4v13.2" />
          <circle cx="8.6" cy="9.6" r="0.9" />
          <circle cx="15.4" cy="9.6" r="0.9" />
          <circle cx="12" cy="13.6" r="0.9" />
          <path d="M9.4 10.1 11.3 13M14.6 10.1 12.7 13" />
        </svg>
      );
    case 'infra':
      return (
        <svg {...common}>
          {/* server stack */}
          <rect x="3.4" y="4.4" width="8" height="4.2" rx="0.8" />
          <rect x="3.4" y="10.4" width="8" height="4.2" rx="0.8" />
          <circle cx="5.6" cy="6.5" r="0.55" fill="currentColor" stroke="none" />
          <circle cx="5.6" cy="12.5" r="0.55" fill="currentColor" stroke="none" />
          {/* public-sector building */}
          <path d="M14.6 19.6v-7.2l4.4-2.6 4 2.6v7.2" transform="translate(-2.4 0)" />
          <path d="M13.4 19.6h10.2" transform="translate(-2.4 0)" />
          <path d="M15.6 19.6v-3.4h2.6v3.4" transform="translate(-2.4 0)" />
        </svg>
      );
  }
}

export default function DomainExpertiseSection() {
  return (
    <section className="section container expertise" id="expertise" aria-labelledby="expertise-heading">
      <div className="section-head reveal">
        <p className="section-kicker mono">
          <span className="dot" aria-hidden="true" />
          02&ensp;/&ensp;Domain Expertise
        </p>
        <h2 id="expertise-heading" className="section-title">
          Where the work lives.
        </h2>
        <p className="section-lede">
          Four technology arenas I translate between engineering teams and
          procurement tables — from scope and compliance to the final bid file.
        </p>
      </div>

      <div className="expertise-grid">
        {domains.map((d, i) => (
          <article
            key={d.name}
            className="domain-card reveal"
            style={{ ['--d' as string]: `${i * 90}ms` }}
          >
            <div className="domain-blueprint" aria-hidden="true" />
            <div className="domain-icon">
              <DomainIcon name={d.icon} />
            </div>
            <h3 className="domain-name">{d.name}</h3>
            <p className="domain-keywords mono">{d.keywords}</p>
            <p className="domain-desc">{d.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
