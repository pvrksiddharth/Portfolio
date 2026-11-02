import { useEffect, useRef } from 'react';
import { sampleComplianceMatrix, type ComplianceStatus } from '../data/site';

interface ComplianceDrawerProps {
  open: boolean;
  onClose: () => void;
}

const statusClass: Record<ComplianceStatus, string> = {
  Compliant: 'status-compliant',
  'Partially Compliant': 'status-partial',
  Clarification: 'status-clarify',
};

/**
 * Accessible right-hand side drawer showing a sample (mock) compliance
 * matrix. Focus is moved into the drawer on open, returned to the trigger
 * on close, Esc closes it, and focus is trapped while open.
 */
export default function ComplianceDrawer({ open, onClose }: ComplianceDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    lastFocused.current = document.activeElement as HTMLElement | null;
    // Let the panel mount/transition before moving focus.
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 60);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.classList.add('drawer-open');

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('drawer-open');
      lastFocused.current?.focus();
    };
  }, [open, onClose]);

  return (
    <div className={`drawer-root${open ? ' open' : ''}`} aria-hidden={!open}>
      <div className="drawer-backdrop" onClick={onClose} />
      <aside
        ref={panelRef}
        className="drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <header className="drawer-header">
          <div>
            <p className="drawer-kicker">Sample Document</p>
            <h3 className="drawer-title" id="drawer-title">
              Compliance Matrix
            </h3>
          </div>
          <button
            type="button"
            className="drawer-close"
            onClick={onClose}
            aria-label="Close compliance matrix drawer"
            ref={closeButtonRef}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        <p className="drawer-note">
          Illustrative excerpt — clause references and requirements are mock data
          formatted the way I structure responses during bid preparation.
        </p>

        <div className="drawer-table-wrap">
          <table className="drawer-table">
            <thead>
              <tr>
                <th scope="col">Clause</th>
                <th scope="col">Requirement</th>
                <th scope="col">Compliance Status</th>
              </tr>
            </thead>
            <tbody>
              {sampleComplianceMatrix.map((row) => (
                <tr key={row.clause}>
                  <td className="cell-clause">{row.clause}</td>
                  <td className="cell-req">{row.requirement}</td>
                  <td>
                    <span className={`status-pill ${statusClass[row.status]}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="drawer-footer">
          <span>{sampleComplianceMatrix.length} clauses shown</span>
          <button type="button" className="drawer-done" onClick={onClose}>
            Close
          </button>
        </footer>
      </aside>
    </div>
  );
}
