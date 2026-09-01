/**
 * The "premium glass card" shell className shared by the PDF merge,
 * split, and compress tool pages. Extracted verbatim from the 3
 * byte-for-byte-identical copies (splitPdfClient.tsx had one stray
 * double-space in its version, which produced no visual difference,
 * since extra whitespace in a className string has no rendering
 * effect - not treated as a meaningful divergence).
 */
export function premiumShellClass() {
  return "relative flex flex-col overflow-hidden rounded-[28px] border border-border bg-gradient-to-br from-background via-card to-background";
}
