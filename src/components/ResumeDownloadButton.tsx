import { useState, useRef, useEffect, useCallback } from 'react';
import { RESUME_PATH } from '../data/site';

/**
 * ResumeDownloadButton
 * --------------------
 * Interactive micro-interaction component for downloading Siddharth's resume.
 *
 * States:
 * 1. Default State: Clean button saying 'Download Resume'.
 * 2. Hover / Tap State: Card smoothly expands (width and height increase)
 *    to reveal a thoughtful, subtle message above the download icon:
 *    "You made it this far. If you'd like to see the full picture, grab my resume below."
 * 3. Click State: When the download icon inside the expanded card is clicked,
 *    triggers download of /Siddharth_Pendyala_Resume.pdf and immediately
 *    transitions the download icon into a subtle, animated green checkmark.
 * 4. Revert State: After 3 seconds, smoothly reverts the green checkmark back
 *    to the download icon and collapses the card back to its original size.
 *
 * Works across desktop (hover to expand) and mobile (tap to expand).
 */

interface ResumeDownloadButtonProps {
  className?: string;
  variant?: 'default' | 'pill';
}

export default function ResumeDownloadButton({
  className = '',
  variant = 'default',
}: ResumeDownloadButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const revertTimeoutRef = useRef<number | null>(null);

  const clearRevertTimeout = useCallback(() => {
    if (revertTimeoutRef.current !== null) {
      window.clearTimeout(revertTimeoutRef.current);
      revertTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearRevertTimeout();
  }, [clearRevertTimeout]);

  // Click outside to collapse on mobile / tablet if not downloaded
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        if (!isDownloaded) {
          setIsExpanded(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isDownloaded]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded && !isDownloaded) {
        setIsExpanded(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded, isDownloaded]);

  const handleMouseEnter = () => {
    if (!isDownloaded) {
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    // If not in downloaded confirmation state, collapse immediately
    if (!isDownloaded) {
      setIsExpanded(false);
    }
  };

  // Primary download trigger
  const triggerDownload = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Trigger PDF download
    const link = document.createElement('a');
    link.href = RESUME_PATH;
    link.download = 'Siddharth_Pendyala_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Enter downloaded state immediately
    setIsDownloaded(true);
    setIsExpanded(true);
    clearRevertTimeout();

    // Revert State: After 3 seconds, smoothly revert and collapse
    revertTimeoutRef.current = window.setTimeout(() => {
      setIsDownloaded(false);
      setIsExpanded(false);
      revertTimeoutRef.current = null;
    }, 3000);
  };

  const handleCardClick = () => {
    // On mobile tap or click when collapsed: expand first
    if (!isExpanded && !isDownloaded) {
      setIsExpanded(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`resume-micro-wrapper variant-${variant} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`resume-micro-card ${isExpanded ? 'is-expanded' : 'is-collapsed'} ${
          isDownloaded ? 'is-downloaded' : ''
        }`}
        onClick={handleCardClick}
        role="region"
        aria-label="Resume download panel"
      >
        {/* Thoughtful message revealed on hover/expand */}
        <div
          className="resume-micro-message"
          aria-hidden={!isExpanded}
        >
          <p>
            You made it this far. If you'd like to see the full picture, grab my resume below.
          </p>
        </div>

        {/* Action button / download icon trigger */}
        <button
          type="button"
          className={`resume-micro-trigger ${isDownloaded ? 'is-success' : ''}`}
          onClick={isExpanded ? triggerDownload : undefined}
          aria-label={
            isDownloaded
              ? 'Resume downloaded successfully'
              : 'Download Siddharth Pendyala Resume'
          }
        >
          <span className="resume-micro-label">
            {isDownloaded ? 'Downloaded' : 'Download Resume'}
          </span>

          <span className="resume-micro-icon-wrap" aria-hidden="true">
            {isDownloaded ? (
              <svg
                className="icon-check-animated"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg
                className="icon-download-arrow"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            )}
          </span>
        </button>
      </div>
    </div>
  );
}

