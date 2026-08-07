const fs = require('fs');
const path = require('path');

const workerPath = path.join('.open-next', 'worker.js');
const targetPath = path.join('.open-next', '_worker.js');

if (fs.existsSync(workerPath)) {
  fs.copyFileSync(workerPath, targetPath);
}

if (fs.existsSync('.next/cache')) {
  fs.rmSync('.next/cache', { recursive: true, force: true });
}
