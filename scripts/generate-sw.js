const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const version = crypto.randomBytes(8).toString("hex");

const templatePath = path.join(__dirname, "..", "public", "sw.template.js");
const outputPath = path.join(__dirname, "..", "public", "sw.js");

const template = fs.readFileSync(templatePath, "utf8");

const result = template.replaceAll("__BUILD_VERSION__", version);

fs.writeFileSync(outputPath, result);