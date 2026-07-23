/**
 * File Checkup — Core Engine Types
 *
 * Every analyzer, the report generator, and the fix engine speak this
 * common contract. Keeping this file tiny and dependency-free is what
 * makes analyzers independently testable and lazy-loadable.
 */

export type Severity = 'success' | 'info' | 'warning' | 'critical';

export type FileCategory =
  | 'pdf'
  | 'image'
  | 'text'
  | 'spreadsheet'
  | 'document'
  | 'presentation'
  | 'archive'
  | 'audio'
  | 'video'
  | 'vector'
  | 'unknown';

/** Result of the Type Detector stage. */
export interface DetectedFile {
  file: File;
  category: FileCategory;
  extension: string;
  mimeType: string;
  /**
   * The MIME type implied by the file's actual magic-byte signature, when
   * one was matched (e.g. "image/png" from the PNG header) — distinct from
   * `mimeType`, which is just the browser's `File.type`, itself usually
   * derived from the extension by the OS, not from file content. When no
   * signature matched (plain-text formats have none), this is undefined and
   * `mimeType` is the only type information available.
   */
  detectedMimeType?: string;
  /** True when the extension and detected content type disagree. */
  extensionMismatch: boolean;
}

/** A single finding produced by an analyzer. */
export interface Finding {
  id: string;
  severity: Severity;
  title: string;
  description: string;
  /** Which report section this belongs under. */
  section: ReportSectionId;
  /** If set, the Fix Engine can resolve this finding with a one-click action. */
  fixId?: string;
  /** Optional machine-readable detail for advanced users / debugging. */
  meta?: Record<string, string | number | boolean | null>;
}

export type ReportSectionId =
  | 'summary'
  | 'security'
  | 'privacy'
  | 'quality'
  | 'size'
  | 'timeline'
  | 'optimization'
  | 'integrity'
  | 'accessibility';

/** Normalized output every analyzer must return. */
export interface AnalyzerResult {
  analyzerId: string;
  label: string;
  /** 0-100 contribution to the overall health score for this analyzer's domain. */
  score: number;
  findings: Finding[];
  /** Arbitrary key/value facts surfaced in the Summary section (e.g. "Pages: 32"). */
  facts?: Record<string, string>;
  durationMs: number;
}

/** Context passed into every analyzer's run() call. */
export interface FileContext {
  detected: DetectedFile;
  arrayBuffer: ArrayBuffer;
  /** SHA-256 hex digest, computed once and shared across analyzers. */
  hash: string;
}

/** Common interface every analyzer module must implement. */
export interface Analyzer {
  id: string;
  label: string;
  /** Which detected categories this analyzer applies to. */
  appliesTo: FileCategory[];
  run: (ctx: FileContext) => Promise<AnalyzerResult>;
}

/** A one-click remediation. Fix functions return a new File (never mutate). */
export interface FixDefinition {
  id: string;
  label: string;
  run: (ctx: FileContext, findings: Finding[]) => Promise<{ file: File; note: string }>;
}

export interface FullReport {
  fileName: string;
  fileSize: number;
  category: FileCategory;
  mimeType: string;
  hash: string;
  overallScore: number;
  results: AnalyzerResult[];
  generatedAt: string;
}

export const SEVERITY_WEIGHT: Record<Severity, number> = {
  success: 0,
  info: 2,
  warning: 12,
  critical: 30,
};

export const SECTION_LABELS: Record<ReportSectionId, string> = {
  summary: 'File Summary',
  security: 'Security',
  privacy: 'Privacy',
  quality: 'Quality',
  size: 'Size Analysis',
  timeline: 'Timeline',
  optimization: 'Optimization',
  integrity: 'Integrity',
  accessibility: 'Accessibility',
};
