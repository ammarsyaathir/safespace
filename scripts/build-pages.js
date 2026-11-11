/**
 * SafeSpace MY - Build script for Cloudflare Pages (dist/ + dist/_worker.js)
 * Copies public/ static assets and bundles HTML view imports into dist/_worker.js.
 */

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const distDir = path.join(root, "dist");
const publicDir = path.join(root, "public");
const workerSrcPath = path.join(root, "src", "worker.js");

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });
fs.cpSync(publicDir, distDir, { recursive: true });

let workerCode = fs.readFileSync(workerSrcPath, "utf8");
workerCode = workerCode.replace(
  /^import\s+(\w+)\s+from\s+"([^"]+\.html)";\r?$/gm,
  (_, varName, relPath) => {
    const absPath = path.resolve(path.dirname(workerSrcPath), relPath);
    const html = fs.readFileSync(absPath, "utf8");
    return `const ${varName} = ${JSON.stringify(html)};`;
  }
);

fs.writeFileSync(path.join(distDir, "_worker.js"), workerCode, "utf8");
console.log("Built Cloudflare Pages output in dist/ (assets + _worker.js).");
