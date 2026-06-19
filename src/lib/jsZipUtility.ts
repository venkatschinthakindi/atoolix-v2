let jszipModule: Promise<typeof import("jszip")> | null = null;

export async function asyncGetJsZipLib() {
  const JSZip  =
    await (jszipModule ??= import("jszip").then((m) => m.default));

  return JSZip;
}