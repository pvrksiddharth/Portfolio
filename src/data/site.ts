/**
 * Central content configuration.
 * All site copy lives here so presentation stays separate from data.
 *
 * NOTE ON PROJECTS: only builds that actually exist are listed. The card
 * component is reusable — add entries to `builds` when there is a real
 * repository or product behind them. Do not fabricate projects.
 */

export const RESUME_PATH = '/resume/Siddharth_Pendyala_Resume.pdf';

export interface Build {
  name: string;
  description: string;
  category: string;
  status: 'live' | 'wip' | 'archived';
  tags: string[];
  /** External URL if the project has one. */
  link?: string;
  /** GitHub URL only when the repository actually exists. */
  github?: string;
  /** Which CSS preview composition renders in the card header. */
  preview: 'interface' | 'graph' | 'code';
}

export const builds: Build[] = [
  {
    name: 'NEXA HRMS',
    description:
      'A human-resource management system I designed and built — employee records, attendance, and workflow interfaces in one internal tool.',
    category: 'Web Application',
    status: 'wip',
    tags: ['React', 'TypeScript', 'UI Systems'],
    preview: 'interface',
  },
];

export const navLinks = [
  { label: 'Builds', href: '#builds' },
  { label: 'Playground', href: '#playground' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const;

export const contact = {
  email: 'pvrks2025@gmail.com',
  linkedin: 'https://linkedin.com/in/pvrksiddharth',
  linkedinLabel: 'linkedin.com/in/pvrksiddharth',
};
