export async function getSvgMetadata(file: File) {
  const text = await file.text();

  const parser = new DOMParser();

  const doc = parser.parseFromString(
    text,
    "image/svg+xml"
  );

  const svg = doc.documentElement;

  let width = parseFloat(
    svg.getAttribute("width") || "0"
  );

  let height = parseFloat(
    svg.getAttribute("height") || "0"
  );

  // Fallback to viewBox
  if (!width || !height) {
    const viewBox =
      svg.getAttribute("viewBox");

    if (viewBox) {
      const parts = viewBox
        .trim()
        .split(/[\s,]+/)
        .map(Number);

      if (parts.length === 4) {
        width = parts[2];
        height = parts[3];
      }
    }
  }

  return {
    width,
    height,
    size: file.size,
    format: "svg",
  };
}