let htmlToPdfLibPromise: Promise<typeof import("html-to-image")> | null = null;

export async function asyncGetHtmlToPdfLib() {
  await (htmlToPdfLibPromise ??= import("html-to-image"));

  return htmlToPdfLibPromise;
}