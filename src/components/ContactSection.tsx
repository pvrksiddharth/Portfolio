import { contact } from '../data/site';
import ResumeDownloadButton from './ResumeDownloadButton';

export default function ContactSection() {
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
          <ResumeDownloadButton variant="pill" />
        </div>
      </div>
    </section>
  );
}
