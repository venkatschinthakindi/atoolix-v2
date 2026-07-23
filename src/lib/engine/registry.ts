import type { Analyzer, FileCategory } from '@/lib/engine/types';

/**
 * Registry entries are lazy `import()` calls, never eager imports.
 * This is what keeps the initial bundle small: a user analyzing a
 * .txt file never pays for pdf-lib or exifr.
 */
type AnalyzerLoader = () => Promise<Analyzer>;

const REGISTRY: Record<FileCategory, AnalyzerLoader[]> = {
  pdf: [
    async () => (await import("@/lib/analyzers/generic")).genericAnalyzer,
    async () => (await import('@/lib/analyzers/pdf')).pdfAnalyzer,
    async () => (await import('@/lib/analyzers/size')).sizeAnalyzer,
    async () => (await import('@/lib/analyzers/timeline')).timelineAnalyzer,
  ],
  image: [
    async () => (await import('@/lib/analyzers/generic')).genericAnalyzer,
    async () => (await import('@/lib/analyzers/image')).imageAnalyzer,
    async () => (await import('@/lib/analyzers/size')).sizeAnalyzer,
    async () => (await import('@/lib/analyzers/timeline')).timelineAnalyzer,
  ],
  text: [
    async () => (await import('@/lib/analyzers/generic')).genericAnalyzer,
    async () => (await import('@/lib/analyzers/text')).textAnalyzer,
  ],
  vector: [
    async () => (await import('@/lib/analyzers/generic')).genericAnalyzer,
    async () => (await import('@/lib/analyzers/text')).textAnalyzer,
  ],
  spreadsheet: [
    async () => (await import('@/lib/analyzers/generic')).genericAnalyzer,
    async () => (await import('@/lib/analyzers/ooxml')).ooxmlAnalyzer,
    async () => (await import('@/lib/analyzers/size')).sizeAnalyzer,
    async () => (await import('@/lib/analyzers/timeline')).timelineAnalyzer,
  ],
  document: [
    async () => (await import('@/lib/analyzers/generic')).genericAnalyzer,
    async () => (await import('@/lib/analyzers/ooxml')).ooxmlAnalyzer,
    async () => (await import('@/lib/analyzers/size')).sizeAnalyzer,
    async () => (await import('@/lib/analyzers/timeline')).timelineAnalyzer,
  ],
  presentation: [
    async () => (await import('@/lib/analyzers/generic')).genericAnalyzer,
    async () => (await import('@/lib/analyzers/ooxml')).ooxmlAnalyzer,
    async () => (await import('@/lib/analyzers/size')).sizeAnalyzer,
    async () => (await import('@/lib/analyzers/timeline')).timelineAnalyzer,
  ],
  archive: [
    async () => (await import('@/lib/analyzers/generic')).genericAnalyzer,
    async () => (await import('@/lib/analyzers/archive')).archiveAnalyzer,
  ],
  // Still generic-only: real audio/video technical analysis (ID3/MP4 box
  // parsing) is on the roadmap, not yet implemented — see README.
  audio: [async () => (await import('@/lib/analyzers/generic')).genericAnalyzer],
  video: [async () => (await import('@/lib/analyzers/generic')).genericAnalyzer],
  unknown: [async () => (await import('@/lib/analyzers/generic')).genericAnalyzer],
};

export function getAnalyzersFor(category: FileCategory): AnalyzerLoader[] {
  return REGISTRY[category] ?? REGISTRY.unknown;
}
