type JsonLdData = Record<string, unknown>;

const DEPRECATED_GOOGLE_SEARCH_TYPES = new Set(["FAQPage", "HowTo"]);

function sanitizeJsonLd(data: unknown): unknown {
  if (!data || typeof data !== "object") return data;

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
