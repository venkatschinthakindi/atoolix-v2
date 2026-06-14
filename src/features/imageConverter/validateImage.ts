import {
  MAX_IMAGE_SIZE
} from "@/types/imageConstants";
import { isValidImageFormat } from "./isValidImageFormat";

export function validateImage(file: File) {
  if (!file) {
    throw new Error("No file provided");
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error(
      "Maximum supported file size is 50MB"
    );
  }

  if (!isValidImageFormat(file)) {
    throw new Error(
      "Unsupported file format"
    );
  }
}