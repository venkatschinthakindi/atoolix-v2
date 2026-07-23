import type { Finding, ReportSectionId, Severity } from '@/lib/engine/types';

interface PatternDef {
  id: string;
  title: string;
  severity: Severity;
  section: ReportSectionId;
  regex: RegExp;
  /** Optional extra validation (e.g. checksum) to cut false positives. Return false to reject a raw match. */
  validate?: (raw: string) => boolean;
  /** How to shorten a match for display without leaking the full secret. */
  mask: (raw: string) => string;
  description: string;
}

function maskMiddle(s: string, keepStart = 4, keepEnd = 2): string {
  const clean = s.trim();
  if (clean.length <= keepStart + keepEnd) return '•'.repeat(clean.length);
  return `${clean.slice(0, keepStart)}${'•'.repeat(Math.min(8, clean.length - keepStart - keepEnd))}${clean.slice(-keepEnd)}`;
}

function luhnValid(digitsOnly: string): boolean {
  let sum = 0;
  let alt = false;
  for (let i = digitsOnly.length - 1; i >= 0; i--) {
    let d = digitsOnly.charCodeAt(i) - 48;
    if (alt) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    alt = !alt;
  }
  return sum % 10 === 0;
}

function ibanValid(raw: string): boolean {
  const iban = raw.replace(/\s/g, '').toUpperCase();
  if (iban.length < 15 || iban.length > 34) return false;
  const rearranged = iban.slice(4) + iban.slice(0, 4);
  const expanded = rearranged.replace(/[A-Z]/g, (ch) => String(ch.charCodeAt(0) - 55));
  // mod 97 over a potentially huge numeric string — do it in chunks
  let remainder = 0;
  for (let i = 0; i < expanded.length; i += 7) {
    const chunk = String(remainder) + expanded.slice(i, i + 7);
    remainder = Number(chunk) % 97;
  }
  return remainder === 1;
}

const PATTERNS: PatternDef[] = [
  {
    id: 'aws-access-key',
    title: 'AWS access key ID',
    severity: 'critical',
    section: 'security',
    regex: /\bAKIA[0-9A-Z]{16}\b/g,
    mask: (s) => maskMiddle(s, 4, 4),
    description: 'This looks like an AWS access key ID. If this is a real, active credential, rotate it immediately.',
  },
  {
    id: 'google-api-key',
    title: 'Google API key',
    severity: 'critical',
    section: 'security',
    regex: /\bAIza[0-9A-Za-z\-_]{35}\b/g,
    mask: (s) => maskMiddle(s, 6, 4),
    description: 'This looks like a Google API key embedded in the file.',
  },
  {
    id: 'stripe-key',
    title: 'Stripe API key',
    severity: 'critical',
    section: 'security',
    regex: /\b(?:sk|pk|rk)_(?:live|test)_[0-9A-Za-z]{16,}\b/g,
    mask: (s) => maskMiddle(s, 7, 4),
    description: 'This looks like a Stripe secret or publishable key.',
  },
  {
    id: 'slack-token',
    title: 'Slack token',
    severity: 'critical',
    section: 'security',
    regex: /\bxox[baprs]-[0-9A-Za-z-]{10,48}\b/g,
    mask: (s) => maskMiddle(s, 5, 4),
    description: 'This looks like a Slack API token.',
  },
  {
    id: 'jwt',
    title: 'JWT (JSON Web Token)',
    severity: 'warning',
    section: 'security',
    regex: /\bey[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/g,
    mask: (s) => maskMiddle(s, 12, 6),
    description: 'This looks like a JWT auth token. Depending on how it was issued, it may grant access if leaked.',
  },
  {
    id: 'ssh-private-key',
    title: 'SSH / PEM private key block',
    severity: 'critical',
    section: 'security',
    regex: /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/g,
    mask: () => '-----BEGIN […] PRIVATE KEY-----',
    description: 'This file contains what looks like a private key block. Private keys should never be shared.',
  },
  {
    id: 'db-connection-string',
    title: 'Database connection string',
    severity: 'critical',
    section: 'security',
    regex: /\b(?:postgres(?:ql)?|mysql|mongodb(?:\+srv)?|redis):\/\/[^\s"'<>]{6,}/gi,
    mask: (s) => {
      const atIdx = s.indexOf('@');
      return atIdx > -1 ? `${s.slice(0, s.indexOf('://') + 3)}•••@${s.slice(atIdx + 1, atIdx + 15)}…` : maskMiddle(s, 12, 4);
    },
    description: 'This looks like a database connection string, which may include embedded credentials.',
  },
  {
    id: 'email',
    title: 'Email address',
    severity: 'info',
    section: 'privacy',
    regex: /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+/g,
    mask: (s) => {
      const [user, domain] = s.split('@');
      return `${(user ?? '').slice(0, 2)}•••@${domain ?? ''}`;
    },
    description: 'Email addresses were found in this file.',
  },
  {
    id: 'url',
    title: 'Embedded URL',
    severity: 'info',
    section: 'privacy',
    regex: /\bhttps?:\/\/[^\s"'<>)]{4,}/g,
    mask: (s) => (s.length > 40 ? `${s.slice(0, 37)}…` : s),
    description: 'Web links are embedded in this file.',
  },
  {
    id: 'ipv4',
    title: 'IP address',
    severity: 'info',
    section: 'privacy',
    regex: /\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b/g,
    validate: (s) => s !== '0.0.0.0' && !/^127\./.test(s),
    mask: (s) => s,
    description: 'An IP address is embedded in this file.',
  },
  {
    id: 'mac-address',
    title: 'MAC address',
    severity: 'info',
    section: 'privacy',
    regex: /\b[0-9A-Fa-f]{2}(:[0-9A-Fa-f]{2}){5}\b/g,
    mask: (s) => maskMiddle(s, 2, 2),
    description: 'A hardware MAC address is embedded in this file, which can identify a specific device.',
  },
  {
    id: 'credit-card',
    title: 'Possible credit card number',
    severity: 'critical',
    section: 'privacy',
    regex: /\b(?:4\d{3}|5[1-5]\d{2}|3[47]\d{2}|6011|65\d{2})[ -]?\d{4}[ -]?\d{4}[ -]?\d{1,4}\b/g,
    validate: (s) => {
      const digits = s.replace(/[ -]/g, '');
      return digits.length >= 13 && digits.length <= 19 && luhnValid(digits);
    },
    mask: (s) => maskMiddle(s.replace(/[ -]/g, ''), 4, 4),
    description: 'A number matching a valid credit card format (passes the Luhn checksum) was found.',
  },
  {
    id: 'iban',
    title: 'Possible IBAN (bank account)',
    severity: 'warning',
    section: 'privacy',
    regex: /\b[A-Z]{2}\d{2}(?:[ ]?[A-Z0-9]{4}){2,7}(?:[ ]?[A-Z0-9]{1,4})?\b/g,
    validate: (s) => ibanValid(s),
    mask: (s) => maskMiddle(s, 6, 4),
    description: 'A number matching a valid IBAN checksum was found — this can identify a specific bank account.',
  },
  {
    id: 'phone',
    title: 'Phone number',
    severity: 'info',
    section: 'privacy',
    // Deliberately conservative: requires either a leading + / international
    // dialing prefix, or clear grouping punctuation (spaces/dashes/parens) —
    // a bare 7-10 digit run is too easy to confuse with an ID, invoice
    // number, or timestamp to report with confidence.
    regex: /(?:\+\d{1,3}[\s.-]?)?(?:\(\d{2,4}\)[\s.-]?)?\d{2,4}[\s.-]\d{2,4}[\s.-]?\d{0,4}/g,
    validate: (s) => {
      const digits = s.replace(/\D/g, '');
      return digits.length >= 8 && digits.length <= 15 && !/^(\d)\1+$/.test(digits);
    },
    mask: (s) => maskMiddle(s.replace(/\s+/g, ' ').trim(), 3, 2),
    description: 'A number formatted like a phone number was found. This is a format match, not a verified working number.',
  },
  {
    id: 'upi-id',
    title: 'Possible UPI ID',
    severity: 'warning',
    section: 'privacy',
    // UPI IDs look like an email address but resolve against a payment
    // handle instead of a mail domain (e.g. "name@okhdfcbank", "user@ybl").
    // Restricting to known handle suffixes keeps this from firing on every
    // ordinary email address, which already has its own pattern above.
    regex: /\b[\w.-]{2,64}@(okhdfcbank|okaxis|oksbi|okicici|ybl|ibl|axl|apl|paytm|upi|jio|freecharge|airtel|idfcbank|kotak|hdfcbank|sbi)\b/gi,
    mask: (s) => {
      const [user, handle] = s.split('@');
      return `${(user ?? '').slice(0, 2)}•••@${handle ?? ''}`;
    },
    description: 'This matches the format of a UPI payment ID, which can be used to identify or send money to a specific person.',
  },
  {
    id: 'coordinates',
    title: 'GPS coordinate pair',
    severity: 'warning',
    section: 'privacy',
    // Distinct from the image-EXIF GPS check in image.ts: this catches
    // coordinates typed or pasted directly into text-based content (a PDF,
    // spreadsheet cell, or document body), which the EXIF check can't see.
    // Requires 3+ decimal digits on both numbers to filter out ordinary
    // decimal pairs (prices, version numbers, ratios); validate() then
    // checks the values actually fall within real latitude/longitude range.
    regex: /-?\d{1,3}\.\d{3,8}\s*,\s*-?\d{1,3}\.\d{3,8}/g,
    validate: (s) => {
      const parts = s.split(',').map((n) => parseFloat(n.trim()));
      const a = parts[0] ?? NaN;
      const b = parts[1] ?? NaN;
      if (Number.isNaN(a) || Number.isNaN(b)) return false;
      return Math.abs(a) <= 90 && Math.abs(b) <= 180;
    },
    mask: (s) => {
      const parts = s.split(',').map((n) => n.trim());
      const a = parts[0] ?? '';
      const b = parts[1] ?? '';
      return `${a.slice(0, 3)}•••, ${b.slice(0, 4)}•••`;
    },
    description: 'A pair of numbers matching real-world latitude/longitude range was found in this file\u2019s text content — likely a specific physical location.',
  },
  {
    id: 'in-pan',
    title: 'Possible Indian PAN number',
    severity: 'warning',
    section: 'privacy',
    regex: /\b[A-Z]{5}\d{4}[A-Z]\b/g,
    mask: (s) => maskMiddle(s, 2, 1),
    description: 'A pattern matching an Indian PAN (tax ID) format was found. This is a format match only, not verified against records.',
  },
  {
    id: 'in-aadhaar-like',
    title: 'Possible 12-digit ID number (e.g. Aadhaar-style)',
    severity: 'info',
    section: 'privacy',
    regex: /\b\d{4}[ -]?\d{4}[ -]?\d{4}\b/g,
    mask: (s) => maskMiddle(s.replace(/[ -]/g, ''), 0, 4),
    description: 'A 12-digit number in this format resembles an Aadhaar-style ID. This is a loose format match with no checksum, so it may be a false positive (e.g. a phone or account number).',
  },
];

export interface SensitiveMatch extends Finding {
  count: number;
}

/**
 * Replaces every validated match of every pattern with a fixed-width
 * placeholder. Reuses the exact same PATTERNS/validate logic as the
 * scanner above, so "what got flagged" and "what gets redacted" can never
 * drift apart from each other.
 */
export function redactSensitiveData(text: string): { redacted: string; count: number } {
  let redacted = text;
  let count = 0;

  for (const pattern of PATTERNS) {
    const re = new RegExp(pattern.regex.source, pattern.regex.flags.includes('g') ? pattern.regex.flags : pattern.regex.flags + 'g');
    redacted = redacted.replace(re, (raw) => {
      if (pattern.validate && !pattern.validate(raw)) return raw;
      count++;
      return '█'.repeat(Math.min(12, Math.max(4, raw.length)));
    });
  }

  return { redacted, count };
}

/**
 * Scans decoded text for sensitive patterns. Caller supplies which
 * ReportSectionId findings should land under has already been baked into
 * each PatternDef, so this can be reused verbatim by the text analyzer,
 * the PDF analyzer (on extracted text), and the OOXML analyzer.
 */
export function scanTextForSensitiveData(text: string, maxSamplesPerPattern = 3): Finding[] {
  const findings: Finding[] = [];

  for (const pattern of PATTERNS) {
    const seen = new Set<string>();
    const samples: string[] = [];
    let match: RegExpExecArray | null;
    const re = new RegExp(pattern.regex.source, pattern.regex.flags.includes('g') ? pattern.regex.flags : pattern.regex.flags + 'g');
    let iterations = 0;
    while ((match = re.exec(text)) && iterations < 20_000) {
      iterations++;
      const raw = match[0];
      if (pattern.validate && !pattern.validate(raw)) continue;
      if (!seen.has(raw)) {
        seen.add(raw);
        if (samples.length < maxSamplesPerPattern) samples.push(pattern.mask(raw));
      }
      if (re.lastIndex === match.index) re.lastIndex++; // guard zero-width matches
    }

    if (seen.size > 0) {
      const extra = seen.size > samples.length ? ` (+${seen.size - samples.length} more)` : '';
      findings.push({
        id: `sensitive-${pattern.id}`,
        severity: pattern.severity,
        title: `${pattern.title} found${seen.size > 1 ? ` (${seen.size})` : ''}`,
        description: `${pattern.description} Example${samples.length > 1 ? 's' : ''}: ${samples.join(', ')}${extra}`,
        section: pattern.section,
      });
    }
  }

  return findings;
}
