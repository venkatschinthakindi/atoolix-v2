import jsPDF from "jspdf";
import type {
  QrPresentationState,
} from "@/components/tools/qrCode/qrTypes";

export async function exportQrPdf(
  dataUrl: string,
  title = "AToolix QR Code"
) {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  pdf.setFontSize(16);
  pdf.text(title, 14, 16);

  pdf.addImage(
    dataUrl,
    "PNG",
    14,
    24,
    80,
    80
  );

  pdf.save(
    `${title
      .toLowerCase()
      .replace(/\s+/g, "-")}.pdf`
  );
}

export async function dataUrlToBlob(
  dataUrl: string
) {
  const res = await fetch(dataUrl);
  return await res.blob();
}

export function blobToDataUrl(
  blob: Blob
): Promise<string> {
  return new Promise(
    (resolve, reject) => {
      const reader =
        new FileReader();

      reader.onload = () =>
        resolve(
          reader.result as string
        );

      reader.onerror = () =>
        reject(
          new Error(
            "Failed to read blob."
          )
        );

      reader.readAsDataURL(blob);
    }
  );
}

/* =====================================================
   QR CARD EXPORT
   ===================================================== */

type ExportQrCardOptions = {
  qrBlob: Blob;
  presentation: QrPresentationState;
};

export async function exportQrCardPng({
  qrBlob,
  presentation,
}: ExportQrCardOptions): Promise<Blob> {
  if (!presentation.enabled) {
    return qrBlob;
  }

  const qrImage =
    await loadImageFromBlob(qrBlob);

  const title =
    presentation.title.trim();

  const description =
    presentation.description.trim();

  let customImage:
    | HTMLImageElement
    | null = null;

  if (presentation.image) {
    try {
      customImage =
        await loadImageFromDataUrl(
          presentation.image
        );
    } catch {
      customImage = null;
    }
  }

  /*
   * QR is normally square.
   * Use its native dimensions.
   */

  const qrSize = Math.max(
    qrImage.width,
    qrImage.height
  );

  const horizontalPadding = 60;
  const verticalPadding = 60;

  const canvasWidth =
    Math.max(
      qrSize,
      600
    ) +
    horizontalPadding * 2;

  const titleFontSize = 42;
  const descriptionFontSize = 26;

  const titleLineHeight = 52;
  const descriptionLineHeight = 40;

  const textWidth =
    canvasWidth -
    horizontalPadding * 2;

  const titleLines = title
    ? wrapText(
        title,
        `600 ${titleFontSize}px ${presentation.titleFont}`,
        textWidth
      )
    : [];

  const descriptionLines =
    description
      ? wrapText(
          description,
          `400 ${descriptionFontSize}px ${presentation.descriptionFont}`,
          textWidth
        )
      : [];

  const titleHeight =
    titleLines.length *
    titleLineHeight;

  const descriptionHeight =
    descriptionLines.length *
    descriptionLineHeight;

  const qrBottomSpacing =
    title ||
    description ||
    customImage
      ? 40
      : 0;

  const titleDescriptionGap =
    title && description
      ? 20
      : 0;

  let imageWidth = 0;
  let imageHeight = 0;

  if (customImage) {
    imageWidth = Math.min(
      customImage.width,
      280
    );

    imageHeight =
      imageWidth *
      (customImage.height /
        customImage.width);
  }

  const imageSpacing =
    customImage ? 30 : 0;

  const imageBottomSpacing =
    customImage ? 20 : 0;

  const canvasHeight =
    verticalPadding +
    qrSize +
    qrBottomSpacing +
    titleHeight +
    titleDescriptionGap +
    descriptionHeight +
    imageSpacing +
    imageHeight +
    imageBottomSpacing +
    verticalPadding;

  const canvas =
    document.createElement(
      "canvas"
    );

  canvas.width =
    Math.ceil(canvasWidth);

  canvas.height =
    Math.ceil(canvasHeight);

  const ctx =
    canvas.getContext("2d");

  if (!ctx) {
    throw new Error(
      "Unable to create canvas."
    );
  }

  /*
   * Background
   */

  ctx.fillStyle =
    presentation.backgroundColor;

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  /*
   * QR
   */

  const qrX =
    (canvas.width - qrSize) / 2;

  const qrY =
    verticalPadding;

  ctx.drawImage(
    qrImage,
    qrX,
    qrY,
    qrSize,
    qrSize
  );

  let currentY =
    qrY +
    qrSize +
    qrBottomSpacing;

  /*
   * Title
   */

  if (titleLines.length > 0) {
    ctx.fillStyle =
      presentation.titleColor;

    ctx.font = `600 ${titleFontSize}px ${presentation.titleFont}`;

    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    for (const line of titleLines) {
      ctx.fillText(
        line,
        canvas.width / 2,
        currentY
      );

      currentY +=
        titleLineHeight;
    }
  }

  /*
   * Description
   */

  if (
    descriptionLines.length > 0
  ) {
    if (
      titleLines.length > 0
    ) {
      currentY +=
        titleDescriptionGap;
    }

    ctx.fillStyle =
      presentation.descriptionColor;

    ctx.font = `400 ${descriptionFontSize}px ${presentation.descriptionFont}`;

    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    for (
      const line of descriptionLines
    ) {
      ctx.fillText(
        line,
        canvas.width / 2,
        currentY
      );

      currentY +=
        descriptionLineHeight;
    }
  }

  /*
   * Image
   */

  if (customImage) {
    currentY += imageSpacing;

    const imageX =
      (canvas.width -
        imageWidth) /
      2;

    ctx.drawImage(
      customImage,
      imageX,
      currentY,
      imageWidth,
      imageHeight
    );

    currentY +=
      imageHeight +
      imageBottomSpacing;
  }

  return new Promise(
    (resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(
              new Error(
                "Failed to create PNG."
              )
            );
            return;
          }

          resolve(blob);
        },
        "image/png",
        1
      );
    }
  );
}

function loadImageFromBlob(
  blob: Blob
): Promise<HTMLImageElement> {
  return new Promise(
    (resolve, reject) => {
      const url =
        URL.createObjectURL(blob);

      const image =
        new Image();

      image.onload = () => {
        URL.revokeObjectURL(
          url
        );

        resolve(image);
      };

      image.onerror = () => {
        URL.revokeObjectURL(
          url
        );

        reject(
          new Error(
            "Unable to load QR image."
          )
        );
      };

      image.src = url;
    }
  );
}

function loadImageFromDataUrl(
  dataUrl: string
): Promise<HTMLImageElement> {
  return new Promise(
    (resolve, reject) => {
      const image =
        new Image();

      image.onload = () =>
        resolve(image);

      image.onerror = () =>
        reject(
          new Error(
            "Unable to load image."
          )
        );

      image.src = dataUrl;
    }
  );
}

function wrapText(
  text: string,
  font: string,
  maxWidth: number
): string[] {
  const canvas =
    document.createElement(
      "canvas"
    );

  const ctx =
    canvas.getContext("2d");

  if (!ctx) {
    return [text];
  }

  ctx.font = font;

  const paragraphs =
    text.split("\n");

  const lines: string[] = [];

  for (
    const paragraph of paragraphs
  ) {
    const words =
      paragraph
        .trim()
        .split(/\s+/);

    if (words.length === 0) {
      lines.push("");
      continue;
    }

    let current = "";

    for (const word of words) {
      const test =
        current.length > 0
          ? `${current} ${word}`
          : word;

      if (
        ctx.measureText(test)
          .width <= maxWidth
      ) {
        current = test;
      } else {
        if (current) {
          lines.push(current);
        }

        current = word;
      }
    }

    if (current) {
      lines.push(current);
    }
  }

  return lines;
}
