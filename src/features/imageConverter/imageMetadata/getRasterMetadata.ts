export async function getRasterMetadata(file: File) {
  const bitmap = await createImageBitmap(file);

  try {
    return {
      width: bitmap.width,
      height: bitmap.height,
      size: file.size,
      format: file.name.split(".")[1].toLowerCase(),
    };
  } finally {
    bitmap.close();
  }
}