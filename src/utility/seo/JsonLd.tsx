type JsonLdData = Record<string, unknown>;

const DEPRECATED_GOOGLE_SEARCH_TYPES = new Set(["FAQPage", "HowTo"]);

// Keep structured-data URLs aligned with the public URL architecture. Some
// legacy tool components still contain the historical SIP registry URL in
// their JSON-LD, while the public page now lives at the dedicated SIP route.
const LEGACY_STRUCTURED_DATA_URLS: Record<string, string> = {
  "/tools/calculator/roi-calculator": "/tools/calculator/sip-calculator",
};

function normalizeStructuredDataValue(value: unknown): unknown {
  if (typeof value !== "string") return value;

  let normalized = value;
  for (const [legacyPath, publicPath] of Object.entries(LEGACY_STRUCTURED_DATA_URLS)) {
    normalized = normalized.replace(legacyPath, publicPath);
  }

  return normalized;
}

function sanitizeJsonLd(data: unknown): unknown {
  if (!data || typeof data !== "object") {
    return normalizeStructuredDataValue(data);
  }

  if (Array.isArray(data)) {
    return data
      .filter((item) => {
        if (!item || typeof item !== "object" || Array.isArray(item)) return true;
        const type = (item as JsonLdData)["@type"];
        return typeof type !== "string" || !DEPRECATED_GOOGLE_SEARCH_TYPES.has(type);
      })
      .map(sanitizeJsonLd);
  }

  const record = data as JsonLdData;
  const type = record["@type"];
  if (typeof type === "string" && DEPRECATED_GOOGLE_SEARCH_TYPES.has(type)) {
    return null;
  }

  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [key, sanitizeJsonLd(value)]),
  );
}

export function JsonLd({ data }: { data: unknown }) {
  const sanitizedData = sanitizeJsonLd(data);

  if (sanitizedData === null) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(sanitizedData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
