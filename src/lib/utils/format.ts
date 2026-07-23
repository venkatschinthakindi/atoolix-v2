export async function sha256Hex(buffer: ArrayBuffer): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', buffer);
  return bufToHex(digest);
}

export async function sha1Hex(buffer: ArrayBuffer): Promise<string> {
  // SHA-1 is cryptographically broken but still requested here purely as a
  // file-identity checksum (matching common file-manager "hashes" panels),
  // not for any security decision.
  const digest = await crypto.subtle.digest('SHA-1', buffer);
  return bufToHex(digest);
}

function bufToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Pure-JS MD5. Included only as a legacy file-identity checksum (the same
 * reason file managers still show it) — never used for anything security
 * sensitive. Implementation follows RFC 1321.
 */
export function md5Hex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const msgLen = bytes.length;
  const paddedLen = (((msgLen + 8) >> 6) + 1) << 4;
  const words = new Int32Array(paddedLen);
  for (let i = 0; i < msgLen; i++) {
    words[i >> 2]! |= (bytes[i] ?? 0) << ((i % 4) * 8);
  }
  words[msgLen >> 2]! |= 0x80 << ((msgLen % 4) * 8);
  words[paddedLen - 2] = msgLen * 8;

  let a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;

  const rotl = (x: number, n: number) => (x << n) | (x >>> (32 - n));
  const cmn = (q: number, a: number, b: number, x: number, s: number, t: number) => {
    a = add32(add32(a, q), add32(x, t));
    return add32(rotl(a, s), b);
  };
  const ff = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) => cmn((b & c) | (~b & d), a, b, x, s, t);
  const gg = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) => cmn((b & d) | (c & ~d), a, b, x, s, t);
  const hh = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) => cmn(b ^ c ^ d, a, b, x, s, t);
  const ii = (a: number, b: number, c: number, d: number, x: number, s: number, t: number) => cmn(c ^ (b | ~d), a, b, x, s, t);
  function add32(x: number, y: number) {
    return (x + y) | 0;
  }

  for (let i = 0; i < words.length; i += 16) {
    const [origA, origB, origC, origD] = [a, b, c, d];

    a = ff(a, b, c, d, words[i + 0]!, 7, -680876936);
    d = ff(d, a, b, c, words[i + 1]!, 12, -389564586);
    c = ff(c, d, a, b, words[i + 2]!, 17, 606105819);
    b = ff(b, c, d, a, words[i + 3]!, 22, -1044525330);
    a = ff(a, b, c, d, words[i + 4]!, 7, -176418897);
    d = ff(d, a, b, c, words[i + 5]!, 12, 1200080426);
    c = ff(c, d, a, b, words[i + 6]!, 17, -1473231341);
    b = ff(b, c, d, a, words[i + 7]!, 22, -45705983);
    a = ff(a, b, c, d, words[i + 8]!, 7, 1770035416);
    d = ff(d, a, b, c, words[i + 9]!, 12, -1958414417);
    c = ff(c, d, a, b, words[i + 10]!, 17, -42063);
    b = ff(b, c, d, a, words[i + 11]!, 22, -1990404162);
    a = ff(a, b, c, d, words[i + 12]!, 7, 1804603682);
    d = ff(d, a, b, c, words[i + 13]!, 12, -40341101);
    c = ff(c, d, a, b, words[i + 14]!, 17, -1502002290);
    b = ff(b, c, d, a, words[i + 15]!, 22, 1236535329);

    a = gg(a, b, c, d, words[i + 1]!, 5, -165796510);
    d = gg(d, a, b, c, words[i + 6]!, 9, -1069501632);
    c = gg(c, d, a, b, words[i + 11]!, 14, 643717713);
    b = gg(b, c, d, a, words[i + 0]!, 20, -373897302);
    a = gg(a, b, c, d, words[i + 5]!, 5, -701558691);
    d = gg(d, a, b, c, words[i + 10]!, 9, 38016083);
    c = gg(c, d, a, b, words[i + 15]!, 14, -660478335);
    b = gg(b, c, d, a, words[i + 4]!, 20, -405537848);
    a = gg(a, b, c, d, words[i + 9]!, 5, 568446438);
    d = gg(d, a, b, c, words[i + 14]!, 9, -1019803690);
    c = gg(c, d, a, b, words[i + 3]!, 14, -187363961);
    b = gg(b, c, d, a, words[i + 8]!, 20, 1163531501);
    a = gg(a, b, c, d, words[i + 13]!, 5, -1444681467);
    d = gg(d, a, b, c, words[i + 2]!, 9, -51403784);
    c = gg(c, d, a, b, words[i + 7]!, 14, 1735328473);
    b = gg(b, c, d, a, words[i + 12]!, 20, -1926607734);

    a = hh(a, b, c, d, words[i + 5]!, 4, -378558);
    d = hh(d, a, b, c, words[i + 8]!, 11, -2022574463);
    c = hh(c, d, a, b, words[i + 11]!, 16, 1839030562);
    b = hh(b, c, d, a, words[i + 14]!, 23, -35309556);
    a = hh(a, b, c, d, words[i + 1]!, 4, -1530992060);
    d = hh(d, a, b, c, words[i + 4]!, 11, 1272893353);
    c = hh(c, d, a, b, words[i + 7]!, 16, -155497632);
    b = hh(b, c, d, a, words[i + 10]!, 23, -1094730640);
    a = hh(a, b, c, d, words[i + 13]!, 4, 681279174);
    d = hh(d, a, b, c, words[i + 0]!, 11, -358537222);
    c = hh(c, d, a, b, words[i + 3]!, 16, -722521979);
    b = hh(b, c, d, a, words[i + 6]!, 23, 76029189);
    a = hh(a, b, c, d, words[i + 9]!, 4, -640364487);
    d = hh(d, a, b, c, words[i + 12]!, 11, -421815835);
    c = hh(c, d, a, b, words[i + 15]!, 16, 530742520);
    b = hh(b, c, d, a, words[i + 2]!, 23, -995338651);

    a = ii(a, b, c, d, words[i + 0]!, 6, -198630844);
    d = ii(d, a, b, c, words[i + 7]!, 10, 1126891415);
    c = ii(c, d, a, b, words[i + 14]!, 15, -1416354905);
    b = ii(b, c, d, a, words[i + 5]!, 21, -57434055);
    a = ii(a, b, c, d, words[i + 12]!, 6, 1700485571);
    d = ii(d, a, b, c, words[i + 3]!, 10, -1894986606);
    c = ii(c, d, a, b, words[i + 10]!, 15, -1051523);
    b = ii(b, c, d, a, words[i + 1]!, 21, -2054922799);
    a = ii(a, b, c, d, words[i + 8]!, 6, 1873313359);
    d = ii(d, a, b, c, words[i + 15]!, 10, -30611744);
    c = ii(c, d, a, b, words[i + 6]!, 15, -1560198380);
    b = ii(b, c, d, a, words[i + 13]!, 21, 1309151649);
    a = ii(a, b, c, d, words[i + 4]!, 6, -145523070);
    d = ii(d, a, b, c, words[i + 11]!, 10, -1120210379);
    c = ii(c, d, a, b, words[i + 2]!, 15, 718787259);
    b = ii(b, c, d, a, words[i + 9]!, 21, -343485551);

    a = add32(a, origA);
    b = add32(b, origB);
    c = add32(c, origC);
    d = add32(d, origD);
  }

  const toLE = (n: number) => {
    const bytes = new Uint8Array(4);
    bytes[0] = n & 0xff;
    bytes[1] = (n >>> 8) & 0xff;
    bytes[2] = (n >>> 16) & 0xff;
    bytes[3] = (n >>> 24) & 0xff;
    return Array.from(bytes).map((x) => x.toString(16).padStart(2, '0')).join('');
  };
  return toLE(a) + toLE(b) + toLE(c) + toLE(d);
}

let crc32Table: Int32Array | null = null;
function getCrc32Table(): Int32Array {
  if (crc32Table) return crc32Table;
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c;
  }
  crc32Table = table;
  return table;
}

export function crc32Hex(buffer: ArrayBuffer): string {
  const table = getCrc32Table();
  const bytes = new Uint8Array(buffer);
  let crc = -1;
  for (let i = 0; i < bytes.length; i++) {
    crc = table[(crc ^ bytes[i]!) & 0xff]! ^ (crc >>> 8);
  }
  crc = (crc ^ -1) >>> 0;
  return crc.toString(16).padStart(8, '0');
}

/** Shannon entropy in bits/byte (0 = totally uniform, 8 = maximally random — typical of compressed/encrypted data). */
export function shannonEntropy(buffer: ArrayBuffer, maxSampleBytes = 2_000_000): number {
  const bytes = new Uint8Array(buffer, 0, Math.min(buffer.byteLength, maxSampleBytes));
  if (bytes.length === 0) return 0;
  const freq = new Uint32Array(256);
  for (let i = 0; i < bytes.length; i++) freq[bytes[i]!]!++;
  let entropy = 0;
  for (let i = 0; i < 256; i++) {
    if (freq[i] === 0) continue;
    const p = freq[i]! / bytes.length;
    entropy -= p * Math.log2(p);
  }
  return entropy;
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);
  return `${value.toFixed(i === 0 ? 0 : decimals)} ${units[i]}`;
}

export function formatDate(iso: string | undefined | null): string {
  if (!iso) return 'Unknown';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return 'Unknown';
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}
