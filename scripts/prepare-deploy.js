const fs = require("fs");
const path = require("path");

const deployDir = "deploy";

// Clean previous deployment
fs.rmSync(deployDir, {
  recursive: true,
  force: true,
});

if (!fs.existsSync(".next/standalone")) {
  throw new Error("Standalone build not found. Run `next build` first.");
}

if (!fs.existsSync(".next/static")) {
  throw new Error("Static assets not found.");
}

// Copy standalone output
fs.cpSync(".next/standalone", deployDir, {
  recursive: true,
});

// Copy static assets
const sorceDir = path.join(".next", "static");
const destinationDir = path.join(deployDir, ".next", "static");

fs.cpSync(sorceDir, destinationDir, {
  recursive: true,
});

if (fs.existsSync("public")) {
  fs.cpSync("public", `${deployDir}/public`, {
    recursive: true,
  });
}

if (fs.existsSync("web.config")) {
  fs.copyFileSync("web.config", `${deployDir}/web.config`);
}

if (fs.existsSync("package.json")) {
  fs.copyFileSync(
    "package.json",
    path.join(deployDir, "package.json")
  );
}