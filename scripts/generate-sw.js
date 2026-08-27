import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const version = crypto.randomBytes(8).toString("hex");

const templatePath = path.join(__dirname, "..", "public", "sw.template.js");
const outputPath = path.join(__dirname, "..", "public", "sw.js");
const template = fs.readFileSync(templatePath, "utf8");
const toolImagesDir = path.join(__dirname, "..", "public", "toolimages");

const toolImages = fs
  .readdirSync(toolImagesDir)
  .filter((file) => /\.(png|jpg|jpeg|webp|svg|gif|avif)$/i.test(file))
  .map((file) => `/toolimages/${file}`);

const appShellImages = toolImages
  .map((img) => `  "${img}"`)
  .join(",\n");

const result = template
  .replaceAll("__BUILD_VERSION__", version)
  .replace("__TOOL_IMAGES__", appShellImages);

fs.writeFileSync(outputPath, result);
