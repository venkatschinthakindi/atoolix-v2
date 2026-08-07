import type { Finding } from '@/lib/engine/types';
import { getPdfjs } from '@/lib/utils/pdfjs';

const MAX_PAGES_SCANNED = 20;

export interface PdfTextAnalysis {
  findings: Finding[];
  facts: Record<string, string>;
  extractedText: string;
}

export async function analyzePdfSearchableText(arrayBuffer: ArrayBuffer, totalPageCount: number): Promise<PdfTextAnalysis> {
  const findings: Finding[] = [];
  const facts: Record<string, string> = {};

  const pdfjs = await getPdfjs();
  const loadingTask = pdfjs.getDocument({ data: arrayBuffer.slice(0) });
  const doc = await loadingTask.promise;

  const pagesToScan = Math.min(doc.numPages, MAX_PAGES_SCANNED);
  let totalTextLength = 0;
  const textParts: string[] = [];
  const perPageTextLength: number[] = [];

  for (let pageNum = 1; pageNum <= pagesToScan; pageNum++) {
    const page = await doc.getPage(pageNum);
    const content = await page.getTextContent();
    let pageLength = 0;
    for (const item of content.items) {
      if (!('str' in item) || !item.str || !item.str.trim()) continue;
      const str = item.str.trim();
      totalTextLength += str.length;
      pageLength += str.length;
      textParts.push(str);
    }
    perPageTextLength.push(pageLength);
  }

  const avgTextPerPage = totalTextLength / Math.max(1, pagesToScan);
  const looksScanned = avgTextPerPage < 20 && pagesToScan > 0;
  facts['Searchable Text'] = looksScanned ? 'No (likely scanned)' : 'Yes';
  if (looksScanned) {
    findings.push({
      id: 'pdf-not-searchable',
      severity: 'warning',
      title: 'No searchable text found',
      description: 'This PDF appears to be scanned images rather than real text — you won\u2019t be able to search, select, or copy text from it without running OCR first.',
      section: 'accessibility',
    });
  } else {

    const blankPageNumbers = perPageTextLength.map((len, idx) => (len === 0 ? idx + 1 : null)).filter((n): n is number => n !== null);
    if (blankPageNumbers.length > 0) {
      findings.push({
        id: 'pdf-blank-pages',
        severity: 'info',
        title: `${blankPageNumbers.length} likely blank page${blankPageNumbers.length > 1 ? 's' : ''} (page ${blankPageNumbers.slice(0, 5).join(', ')}${blankPageNumbers.length > 5 ? ', …' : ''})`,
        description: 'These pages have no extractable text. They may be genuinely blank, or contain only images/graphics with no text layer — review before removing, since this product doesn\u2019t auto-delete pages.',
        section: 'quality',
      });
    }
  }

  if (doc.numPages > MAX_PAGES_SCANNED) {
    facts['Pages Scanned for Text'] = `${MAX_PAGES_SCANNED} of ${doc.numPages} (capped for performance)`;
  }

  try {
    const markInfo = await doc.getMarkInfo();
    const isTagged = !!markInfo?.Marked;
    facts['Tagged for Accessibility'] = isTagged ? 'Yes' : 'No';
    if (!isTagged) {
      findings.push({
        id: 'pdf-not-tagged',
        severity: 'info',
        title: 'PDF is not tagged for accessibility',
        description: 'No structure tree was found. Tagged PDFs give screen readers heading and reading-order information; this one will read as one undifferentiated block.',
        section: 'accessibility',
      });
    }
  } catch {
    console.error('Failed to get PDF mark info');
    // Some PDFs (especially malformed or heavily-optimized ones) don't
    // expose mark info cleanly — skip rather than report a false "No".
  }

  await doc.destroy();

  return { findings, facts, extractedText: textParts.join(' ') };
}
