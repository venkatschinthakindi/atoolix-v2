let fileSaverPromise: Promise<typeof import("file-saver")> | null = null;

export async function asyncGetFileSaverLib() {
  const { saveAs } =
    await (fileSaverPromise ??= import("file-saver").then((m) => m.default));

  return saveAs;
}