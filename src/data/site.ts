/**
 * Central content configuration.
 * All site copy lives here so presentation stays separate from data.
 */

export const RESUME_PATH = '/Siddharth_Pendyala_Resume.pdf';

export type DomainIconKey = 'cloud' | 'shield' | 'brain' | 'infra';

export interface Domain {
  name: string;
  icon: DomainIconKey;
  /** Short keyword line shown under the heading. */
  keywords: string;
  description: string;
}

/**
 * Domain expertise areas, based on actual pre-sales / bid-management
 * experience. Descriptions stay grounded — no fabricated metrics or claims.
 */
export const domains: Domain[] = [
  {
    name: 'Cloud & Managed Services',
    icon: 'cloud',
    keywords: 'MSP / CSP · Cloud Infrastructure',
    description:
      'Positioning cloud and managed-service offerings for enterprise bids — solution mapping, partner-ecosystem alignment (MSP/CSP models), and infrastructure scope definition inside proposal documents.',
  },
  {
    name: 'Cybersecurity',
    icon: 'shield',
    keywords: 'SOC / NOC · Compliance',
    description:
      'Translating security capability into tender language — SOC/NOC service constructs, compliance and certification requirements, and response structuring for security-focused RFPs.',
  },
  {
    name: 'Artificial Intelligence',
    icon: 'brain',
    keywords: 'AI Integration · Prompt Engineering',
    description:
      'Integrating AI into both the work and the workflow — articulating AI-enabled solutions in proposals, and using prompt engineering with modern AI tools to sharpen research, drafting, and refinement.',
  },
  {
    name: 'IT Infrastructure & Public Sector',
    icon: 'infra',
    keywords: 'System Integration · Municipal · Gov/PSU Tenders',
    description:
      'End-to-end tender participation across Government, PSU, and municipal opportunities — system-integration scopes, e-procurement documentation, compliance checklists, and bid coordination.',
  },
];

export const navLinks = [
  { label: 'Expertise', href: '#expertise' },
  { label: 'Playground', href: '#playground' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const;

export const contact = {
  email: 'pvrks2025@gmail.com',
  linkedin: 'https://linkedin.com/in/pvrksiddharth',
  linkedinLabel: 'linkedin.com/in/pvrksiddharth',
};
