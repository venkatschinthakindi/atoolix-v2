let nextImageModule: Promise<any> | null = null;

export async function asyncGetNextImageLib() {
  const Image =
    await (nextImageModule ??= import("next/image").then((m) => m.default));

  return Image;
}
