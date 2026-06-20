const fs = require("fs");

const deployDir = "deploy";

// Clean previous deployment
fs.rmSync(deployDir, {
  recursive: true,
  force: true,
});

// Copy standalone output
fs.cpSync(".next/standalone", deployDir, {
  recursive: true,
});

// Copy static assets
fs.cpSync(".next/static", `${deployDir}/.next/static`, {
  recursive: true,
});

// Copy public assets
if (fs.existsSync("public")) {
  fs.cpSync("public", `${deployDir}/public`, {
    recursive: true,
  });
}

// Copy IIS web.config
if (fs.existsSync("web.config")) {
  fs.copyFileSync("web.config", `${deployDir}/web.config`);
}


console.log("Deploy package created successfully.");