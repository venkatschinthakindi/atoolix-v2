import jsPDF from "jspdf";

export async function exportQrPdf(dataUrl: string, title = "AToolix QR Code") {
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  pdf.setFontSize(16);
  pdf.text(title, 14, 16);
  pdf.addImage(dataUrl, "PNG", 14, 24, 80, 80);
  pdf.save(`${title.toLowerCase().replace(/\s+/g, "-")}.pdf`);
}

export async function dataUrlToBlob(dataUrl: string) {
  const res = await fetch(dataUrl);
  return await res.blob();
}

export function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read blob."));
    reader.readAsDataURL(blob);
  });
}