import type { Analyzer, Finding } from '@/lib/engine/types';
import { scanTextForSensitiveData } from '@/lib/analyzers/sensitive-data';

export const textAnalyzer: Analyzer = {
  id: 'text-analysis',
  label: 'Text Structure Analysis',
  appliesTo: ['text', 'vector'],
  async run(ctx) {
    const started = performance.now();
    const findings: Finding[] = [];
    const facts: Record<string, string> = {};

    const decoder = new TextDecoder('utf-8', { fatal: false });
    const text = decoder.decode(ctx.arrayBuffer);
    const lines = text.split(/\r\n|\r|\n/);
    facts['Lines'] = String(lines.length);
    facts['Characters'] = String(text.length);

    // BOM / encoding sanity check
    const hasReplacementChar = text.includes('\uFFFD');
    if (hasReplacementChar) {
      findings.push({
        id: 'encoding-issue',
        severity: 'warning',
        title: 'Possible encoding problem',
        description: 'This file contains characters that could not be decoded as valid UTF-8, which often shows up as garbled text (�) when opened.',
        section: 'integrity',
      });
    }

    const hasCRLF = /\r\n/.test(text);
    const hasBareCR = /\r(?!\n)/.test(text);
    const hasTrailingWhitespace = lines.some((l) => /[ \t]+$/.test(l));
    if (hasCRLF || hasBareCR || hasTrailingWhitespace) {
      const issues = [hasCRLF && 'Windows-style (CRLF) line endings', hasBareCR && 'old Mac-style (CR) line endings', hasTrailingWhitespace && 'trailing whitespace'].filter(Boolean);
      findings.push({
        id: 'text-formatting-hygiene',
        severity: 'info',
        title: `Formatting cleanup available: ${issues.join(', ')}`,
        description: 'These don\u2019t affect meaning but can cause noisy diffs in version control or inconsistent rendering across editors.',
        section: 'quality',
        fixId: 'normalize-text',
      });
    }

    const ext = ctx.detected.extension;

    if (ext === 'xml') {
      // Same native-DOMParser approach as the OOXML analyzer's internal
      // parts check — deterministic well-formedness, not a heuristic.
      // Deliberately NOT applied to .html: HTML5 parsing is intentionally
      // forgiving of malformed markup by spec, so a parsererror there
      // wouldn't mean what it means for XML.
      try {
        const parsed = new DOMParser().parseFromString(text, 'application/xml');
        const parserError = parsed.getElementsByTagName('parsererror')[0];
        if (parserError) {
          findings.push({
            id: 'xml-not-well-formed',
            severity: 'critical',
            title: 'XML is not well-formed',
            description: 'This file could not be parsed as valid XML — check for mismatched tags, an unescaped special character, or a truncated file.',
            section: 'integrity',
          });
        }
      } catch {
        // See note in ooxml.ts: DOMParser reports errors via a parsererror
        // element rather than throwing, so this branch shouldn't normally run.
      }
    }

    if (ext === 'json') {
      try {
        JSON.parse(text);
        facts['Valid JSON'] = 'Yes';
      } catch (err) {
        findings.push({
          id: 'invalid-json',
          severity: 'critical',
          title: 'Invalid JSON syntax',
          description: err instanceof Error ? `This file is not valid JSON: ${err.message}` : 'This file is not valid JSON.',
          section: 'integrity',
        });
      }
    }

    if (ext === 'csv') {
      const nonEmptyLines = lines.filter((l) => l.trim().length > 0);
      const columnCounts = new Set(nonEmptyLines.slice(0, 200).map((l) => splitCsvLine(l).length));
      facts['Rows'] = String(Math.max(0, nonEmptyLines.length - 1));
      if (columnCounts.size > 1) {
        findings.push({
          id: 'csv-inconsistent-columns',
          severity: 'warning',
          title: 'Inconsistent column counts',
          description: 'Some rows in this CSV have a different number of columns than others, which can break imports into spreadsheets or databases.',
          section: 'quality',
        });
      }
    }

    if (ext === 'xml' || ext === 'svg') {
      try {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(text, 'application/xml');
        const parserError = parsed.querySelector('parsererror');
        if (parserError) {
          findings.push({
            id: 'invalid-xml',
            severity: 'critical',
            title: 'Malformed XML',
            description: 'This file could not be parsed as valid XML. Check for unclosed tags or invalid characters.',
            section: 'integrity',
          });
        } else {
          facts['Valid XML'] = 'Yes';
          if (ext === 'svg') {
            const scripts = parsed.querySelectorAll('script');
            if (scripts.length > 0) {
              findings.push({
                id: 'svg-embedded-script',
                severity: 'critical',
                title: 'Embedded <script> in SVG',
                description: 'This SVG contains executable script tags. SVGs with scripts can run code when opened in a browser — only trust this if you know the source.',
                section: 'security',
              });
            }
          }
        }
      } catch {
        findings.push({
          id: 'xml-parse-error',
          severity: 'warning',
          title: 'Could not fully validate XML structure',
          description: 'The parser was unable to confirm this document is well-formed XML.',
          section: 'integrity',
        });
      }
    }

    if (/\t/.test(text) && ext === 'csv') {
      findings.push({
        id: 'csv-tabs',
        severity: 'info',
        title: 'Tab characters found in a CSV',
        description: 'This file mixes tabs with commas, which is sometimes a sign it was meant to be a TSV file instead.',
        section: 'quality',
      });
    }

    findings.push(...scanTextForSensitiveData(text).map((f) => ({ ...f, fixId: 'redact-text-secrets' })));

    const score = 100 - findings.reduce((acc, f) => acc + (f.severity === 'critical' ? 30 : f.severity === 'warning' ? 10 : 2), 0);

    return {
      analyzerId: this.id,
      label: this.label,
      score: Math.max(0, Math.min(100, score)),
      findings,
      facts,
      durationMs: performance.now() - started,
    };
  },
};

function splitCsvLine(line: string): string[] {
  // Minimal quoted-field-aware split — good enough for a structural sanity check,
  // not a full RFC 4180 parser.
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}
