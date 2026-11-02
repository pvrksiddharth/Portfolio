import { RESUME_PATH } from '../data/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© 2026 Siddharth Pendyala. Built with precision.</span>
        <a
          className="top-link"
          href={RESUME_PATH}
          download
          aria-label="Download resume (PDF)"
        >
          Resume ↓
        </a>
        <a className="top-link" href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
