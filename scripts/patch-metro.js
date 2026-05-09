const fs = require('fs');
const path = require('path');

const metroRoot = path.join(__dirname, '..', 'node_modules', 'metro');
const metroPkgPath = path.join(metroRoot, 'package.json');
const metroPkg = JSON.parse(fs.readFileSync(metroPkgPath, 'utf8'));

// Step 1: Remove restrictive exports so @expo/cli can access metro/src/* directly
if (metroPkg.exports) {
  delete metroPkg.exports;
  fs.writeFileSync(metroPkgPath, JSON.stringify(metroPkg, null, 2));
  console.log('Patched metro: removed restrictive exports field');
}

// Step 2: Mirror entire metro/src/ tree under metro/private/ so all metro/private/* imports resolve
function mirrorDir(srcDir, privateDir, depth) {
  if (!fs.existsSync(srcDir)) return 0;
  fs.mkdirSync(privateDir, { recursive: true });
  let count = 0;
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(privateDir, entry.name);
    if (entry.isDirectory()) {
      const back = '../'.repeat(depth + 1);
      count += mirrorDir(srcPath, destPath, depth + 1);
    } else if (entry.name.endsWith('.js') && !fs.existsSync(destPath)) {
      const back = '../'.repeat(depth) + 'src/';
      const rel = path.relative(path.join(metroRoot, 'src'), srcPath).replace(/\\/g, '/');
      fs.writeFileSync(destPath, `module.exports = require('${back}${rel}');\n`);
      count++;
    }
  }
  return count;
}

const total = mirrorDir(
  path.join(metroRoot, 'src'),
  path.join(metroRoot, 'private'),
  1
);
console.log(`Created ${total} shims mirroring metro/src/ → metro/private/`);
