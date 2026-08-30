import type { Analyzer, Finding } from '@/lib/engine/types';
import { formatBytes } from '@/lib/utils/format';

const DANGEROUS_EXTENSIONS = new Set([
  'exe', 'bat', 'cmd', 'com', 'scr', 'pif', 'msi', 'msp', 'jar', 'js', 'jse',
  'vbs', 'vbe', 'wsf', 'wsh', 'ps1', 'psm1', 'reg', 'lnk', 'hta', 'cpl',
]);

export const archiveAnalyzer: Analyzer = {
  id: 'archive-analysis',
  label: 'Archive Analysis',
  appliesTo: ['archive'],
  async run(ctx) {
    const started = performance.now();
    const findings: Finding[] = [];
    const facts: Record<string, string> = {};

    let entries: Record<string, Uint8Array>;
    try {
      const { unzipSync } = await import('fflate');
      entries = unzipSync(new Uint8Array(ctx.arrayBuffer));
    } catch {
      findings.push({
        id: 'zip-corrupt',
        severity: 'critical',
        title: 'Archive could not be opened',
        description: 'This ZIP file could not be read. It may be corrupted, password-protected in a way that blocks even listing contents, or not actually a ZIP archive.',
        section: 'integrity',
      });
      return { analyzerId: this.id, label: this.label, score: 10, findings, durationMs: performance.now() - started };
    }

    const names = Object.keys(entries).filter((n) => !n.endsWith('/'));
    facts['Files Inside'] = String(names.length);

    let totalUncompressed = 0;
    for (const name of names) totalUncompressed += entries[name]?.length ?? 0;
    facts['Uncompressed Size'] = formatBytes(totalUncompressed);
    if (totalUncompressed > 0) {
      const ratio = ctx.detected.file.size / totalUncompressed;
      facts['Compression Ratio'] = `${(ratio * 100).toFixed(0)}%`;
      // A ZIP that "explodes" to a huge multiple of its compressed size is
      // the classic zip-bomb signature worth flagging defensively.
      if (totalUncompressed > 500 * 1024 * 1024 && ratio < 0.01) {
        findings.push({
          id: 'zip-bomb-suspect',
          severity: 'critical',
          title: 'Unusually extreme compression ratio',
          description: `This archive expands to ${formatBytes(totalUncompressed)} from a much smaller compressed size — a pattern associated with "zip bomb" files designed to exhaust disk space or memory when extracted.`,
          section: 'security',
        });
      }
    }

    const dangerous = names.filter((n) => {
      const ext = n.split('.').pop()?.toLowerCase();
      return ext ? DANGEROUS_EXTENSIONS.has(ext) : false;
    });
    if (dangerous.length > 0) {
      findings.push({
        id: 'zip-dangerous-files',
        severity: 'critical',
        title: `${dangerous.length} executable/script file${dangerous.length > 1 ? 's' : ''} inside`,
        description: `This archive contains potentially dangerous file types: ${dangerous.slice(0, 5).join(', ')}${dangerous.length > 5 ? `, +${dangerous.length - 5} more` : ''}. Only extract these if you trust the source.`,
        section: 'security',
      });
    }

    const nested = names.filter((n) => /\.(zip|rar|7z|tar|gz)$/i.test(n));
    if (nested.length > 0) {
      findings.push({
        id: 'zip-nested-archive',
        severity: 'warning',
        title: `${nested.length} nested archive${nested.length > 1 ? 's' : ''}`,
        description: 'This ZIP contains other archive files inside it. Nested archives are sometimes used to evade security scanners.',
        section: 'security',
      });
    }

    const suspiciousNames = names.filter((n) => /\.(pdf|jpg|png|docx?|xlsx?)\.(exe|scr|bat|js|vbs)$/i.test(n));
    if (suspiciousNames.length > 0) {
      findings.push({
        id: 'zip-double-extension',
        severity: 'critical',
        title: 'Disguised file extension detected',
        description: `Found file(s) named to look like documents but ending in an executable extension (e.g. "${suspiciousNames[0]}") — a common malware disguise technique.`,
        section: 'security',
      });
    }

    const lowerNameCounts = new Map<string, number>();
    for (const n of names) {
      const base = n.split('/').pop()?.toLowerCase() ?? n;
      lowerNameCounts.set(base, (lowerNameCounts.get(base) ?? 0) + 1);
    }
    const duplicates = [...lowerNameCounts.entries()].filter(([, count]) => count > 1);
    if (duplicates.length > 0) {
      findings.push({
        id: 'zip-duplicate-names',
        severity: 'info',
        title: 'Duplicate file names across folders',
        description: `${duplicates.length} file name${duplicates.length > 1 ? 's appear' : ' appears'} more than once at different paths inside this archive.`,
        section: 'quality',
      });
    }

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
