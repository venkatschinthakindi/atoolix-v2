import type { Finding, FileCategory } from '@/lib/engine/types';

export type ModuleStatus = 'not-applicable' | 'pass' | 'review' | 'fail';

export interface ModuleDefinition {
  id: string;
  label: string;
  /** Which file categories this module ever produces findings for. */
  appliesTo: FileCategory[];
  /** Selects which findings (already computed by the pipeline) belong to this module. */
  matches: (finding: Finding) => boolean;
}

// The 7 credential/secret pattern IDs from sensitive-data.ts (and their
// qr-/barcode- wrapped variants, produced when a QR code or barcode payload
// contains one) — this is what separates "Sensitive Data" from general
// "Security" findings, since both currently share section: 'security'.
const SENSITIVE_DATA_BASE_IDS = ['aws-access-key', 'google-api-key', 'stripe-key', 'slack-token', 'jwt', 'ssh-private-key', 'db-connection-string'];
function isSensitiveDataId(id: string): boolean {
  return SENSITIVE_DATA_BASE_IDS.some((base) => id === base || id.endsWith(`-${base}`));
}

/**
 * The 13 modules from the product spec, mapped onto how this codebase
 * actually tags findings. Several modules (Metadata, Sensitive Data) don't
 * have their own dedicated `section` in the report UI — they're findings
 * tagged 'privacy'/'security' that this map re-classifies for the purposes
 * of THIS checklist view specifically, without changing how they're grouped
 * in the main findings sections above. Share Readiness and Smart Report
 * aren't finding-driven at all (the former is the derived ready/review/unsafe
 * badge, the latter is the report itself) so they're handled separately by
 * the component that renders this list, not through `matches` here.
 */
export const MODULE_DEFINITIONS: ModuleDefinition[] = [
  {
    id: 'identity',
    label: 'File Identity',
    appliesTo: ['image', 'pdf', 'document', 'spreadsheet', 'presentation', 'text', 'vector', 'archive'],
    matches: (f) => ['extension-mismatch', 'empty-file', 'very-large-file', 'unexpected-high-entropy'].includes(f.id),
  },
  {
    id: 'metadata',
    label: 'Metadata',
    appliesTo: ['image', 'pdf', 'document', 'spreadsheet', 'presentation'],
    matches: (f) =>
      ['pdf-author-metadata', 'pdf-keywords', 'ooxml-author-metadata', 'ooxml-last-modified-by', 'ooxml-company-metadata', 'timeline-data-present'].includes(f.id),
  },
  {
    id: 'privacy',
    label: 'Privacy',
    appliesTo: ['image', 'pdf', 'document', 'spreadsheet', 'presentation', 'text', 'vector'],
    matches: (f) => f.section === 'privacy' && !isSensitiveDataId(f.id),
  },
  {
    id: 'security',
    label: 'Security',
    appliesTo: ['pdf', 'document', 'spreadsheet', 'presentation', 'archive'],
    matches: (f) => f.section === 'security' && !isSensitiveDataId(f.id),
  },
  {
    id: 'sensitive-data',
    label: 'Sensitive Data',
    appliesTo: ['image', 'pdf', 'document', 'spreadsheet', 'presentation', 'text', 'vector'],
    matches: (f) => isSensitiveDataId(f.id),
  },
  {
    id: 'quality',
    label: 'Quality',
    appliesTo: ['image', 'pdf', 'document', 'spreadsheet', 'presentation', 'text'],
    matches: (f) => f.section === 'quality',
  },
  {
    id: 'size',
    label: 'Size',
    appliesTo: ['image', 'pdf', 'document', 'spreadsheet', 'presentation'],
    matches: (f) => f.section === 'size',
  },
  {
    id: 'integrity',
    label: 'Integrity',
    appliesTo: ['image', 'pdf', 'document', 'spreadsheet', 'presentation', 'text', 'archive'],
    matches: (f) => f.section === 'integrity',
  },
  {
    id: 'timeline',
    label: 'Timeline',
    appliesTo: ['image', 'pdf', 'document', 'spreadsheet', 'presentation'],
    matches: (f) => f.section === 'timeline',
  },
  {
    id: 'accessibility',
    label: 'Accessibility',
    appliesTo: ['pdf'],
    matches: (f) => f.section === 'accessibility',
  },
  {
    id: 'optimization',
    label: 'Optimization',
    appliesTo: ['image', 'pdf', 'document', 'spreadsheet', 'presentation'],
    matches: (f) => f.section === 'optimization',
  },
];

export function statusFor(findings: Finding[]): ModuleStatus {
  if (findings.some((f) => f.severity === 'critical')) return 'fail';
  if (findings.some((f) => f.severity === 'warning')) return 'review';
  return 'pass';
}
