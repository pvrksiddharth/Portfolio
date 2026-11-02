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
  { label: 'Analytics', href: '#analytics' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const;

export const contact = {
  email: 'siddharthpendyala75872@gmail.com',
  linkedin: 'https://linkedin.com/in/pvrksiddharth',
  linkedinLabel: 'linkedin.com/in/pvrksiddharth',
};

/* ------------------------------------------------------------------ */
/* Operational analytics — illustrative process data                   */
/*                                                                     */
/* These datasets visualise the *bid process itself*, not personal     */
/* performance metrics. The lifecycle volumes represent a typical      */
/* requirement workload per stage of a single bid cycle, and the       */
/* delivery series illustrates a steady submission cadence             */
/* (~2+ major bids / month). They are sample/illustrative data.        */
/* ------------------------------------------------------------------ */

export interface LifecycleStage {
  stage: string;
  /** Representative number of requirements / items handled at this stage. */
  count: number;
}

export const bidLifecycle: LifecycleStage[] = [
  { stage: 'RFP Analysis', count: 120 },
  { stage: 'Compliance Matrix', count: 96 },
  { stage: 'Drafting', count: 74 },
  { stage: 'Quality Review', count: 52 },
  { stage: 'Submission', count: 30 },
];

export interface MonthPoint {
  month: string;
  submissions: number;
}

/** Illustrative 6-month submission cadence — consistently 2+ per month. */
export const deliveryCadence: MonthPoint[] = [
  { month: 'Apr', submissions: 2 },
  { month: 'May', submissions: 3 },
  { month: 'Jun', submissions: 2 },
  { month: 'Jul', submissions: 3 },
  { month: 'Aug', submissions: 2 },
  { month: 'Sep', submissions: 3 },
];

/* ------------------------------------------------------------------ */
/* Sample compliance matrix (mock rows for the side-drawer demo)       */
/* ------------------------------------------------------------------ */

export type ComplianceStatus = 'Compliant' | 'Partially Compliant' | 'Clarification';

export interface ComplianceRow {
  clause: string;
  requirement: string;
  status: ComplianceStatus;
}

export const sampleComplianceMatrix: ComplianceRow[] = [
  {
    clause: '3.1 (a)',
    requirement: 'Provide managed network infrastructure with 99.9% uptime SLA across all municipal nodes.',
    status: 'Compliant',
  },
  {
    clause: '4.2',
    requirement: 'Data residency — all citizen data shall be hosted within India, in a MeitY-empanelled DC.',
    status: 'Compliant',
  },
  {
    clause: '5.3 (b)',
    requirement: '24x7 SOC/NOC coverage with certified analysts; escalation matrix to be submitted.',
    status: 'Compliant',
  },
  {
    clause: '6.1',
    requirement: 'Interoperability with existing e-governance platforms via published REST APIs.',
    status: 'Partially Compliant',
  },
  {
    clause: '7.4',
    requirement: 'Proposed AI-assisted ticket triage must disclose model provider and data-handling policy.',
    status: 'Partially Compliant',
  },
  {
    clause: '8.2',
    requirement: 'Performance security deposit of 5% contract value within 30 days of award.',
    status: 'Compliant',
  },
  {
    clause: '9.5',
    requirement: 'Local content preference under DPILL — certificate category to be specified.',
    status: 'Clarification',
  },
  {
    clause: '10.3 (c)',
    requirement: 'Training: 40 man-days of admin/user training per phase, on-site at each circle office.',
    status: 'Clarification',
  },
];
