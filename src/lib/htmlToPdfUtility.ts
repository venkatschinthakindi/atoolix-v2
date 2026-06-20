import { toPng } from "html-to-image";
let htmlToPdfLibPromise: Promise<typeof import("html-to-image")> | null = null;

export async function asyncGetHtmlToPdfLib() {
  const { toPng } =
    await (htmlToPdfLibPromise ??= import("html-to-image"));

  return htmlToPdfLibPromise;
}