import { contact } from '../data/site';

interface ContactProps {
  onResumeClick: () => void;
}

export default function ContactSection({ onResumeClick }: ContactProps) {
  return (
    <section className="section" id="contact" aria-labelledby="contact-heading">
      <div className="container">
        <p className="section-label reveal">Contact</p>
        <h2 className="contact-lead reveal" id="contact-heading">
          Have an opportunity<br />
          <span className="accent-word">worth pursuing?</span>
        </h2>
        <p className="contact-sub reveal">
          Whether it is a tender pipeline that needs disciplined coordination or a
          proposal that deserves a sharper response — the fastest way to reach me
          is email.
        </p>

        <div className="contact-links reveal">
          <a className="contact-pill" href={`mailto:${contact.email}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-10 6L2 7" />
            </svg>
            {contact.email}
          </a>
          <a
            className="contact-pill"
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            {contact.linkedinLabel}
          </a>
          <button type="button" className="contact-pill" onClick={onResumeClick}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <polyline points="9 15 12 18 15 15" />
            </svg>
            Download Resume
          </button>
        </div>
      </div>
    </section>
  );
}
