export function isSafeExternalUrl(value: string) {
  const trimmed = value.trim();

  if (/^(mailto:|tel:|sms:)/i.test(trimmed)) return true;
  if (/^geo:/i.test(trimmed)) return /^geo:-?\d+(\.\d+)?,-?\d+(\.\d+)?/i.test(trimmed);

  try {
    const url = new URL(trimmed);
    return (url.protocol === "http:" || url.protocol === "https:") && !!url.hostname;
  } catch {
    return false;
  }
}

export function sanitizeDownloadName(baseName: string) {
  const cleaned = baseName
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "");
  const stripped = cleaned.replace(/[._-]/g, "");
  return stripped ? cleaned : "qr";
}

export function todayStamp() {
  const d = new Date();
  return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, "0"), String(d.getDate()).padStart(2, "0")].join("-");
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidPhone(value: string) {
  return /^[+0-9()\-\s]{5,}$/.test(value);
}

export function isValidLatLng(lat: string, lng: string) {
  const a = Number(lat);
  const b = Number(lng);
  return Number.isFinite(a) && Number.isFinite(b) && a >= -90 && a <= 90 && b >= -180 && b <= 180;
}

export function isValidUrlLike(value: string) {
  try {
    const url = new URL(value);
    return (url.protocol === "http:" || url.protocol === "https:") && !!url.hostname;
  } catch {
    return false;
  }
}

export function escapeWifiText(value: string) {
  return value.replace(/([\\;,:])/g, "\\$1");
}

export function escapeVCardText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r\n|\r|\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
}

export function safeScanTarget(text: string) {
  const t = text.trim();
  if (/^mailto:/i.test(t) || /^tel:/i.test(t) || /^sms:/i.test(t)) return t;
  if (/^geo:/i.test(t)) return /^geo:-?\d+(\.\d+)?,-?\d+(\.\d+)?/i.test(t) ? t : "";
  if (/^https?:\/\//i.test(t)) return isSafeExternalUrl(t) ? t : "";
  return "";
}

export function isMobileLike() {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
}