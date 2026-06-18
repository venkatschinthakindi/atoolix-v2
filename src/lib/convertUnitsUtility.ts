let convertPromise: Promise<any> | null = null;

export async function getConvertUnits() {
  if (!convertPromise) {
    convertPromise = import("convert-units");
  }

  const mod = await convertPromise;
  return mod.default;
}