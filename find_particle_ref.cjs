const fs = require('fs');
const path = require('path');

const lines = [];

function searchDir(dir, depth = 0) {
  if (depth > 5) return;
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') continue;
      const fullPath = path.join(dir, entry.name);
      const relPath = path.relative('.', fullPath);
      lines.push((entry.isDirectory() ? '[DIR]  ' : '[FILE] ') + relPath);
      if (entry.isDirectory()) {
        searchDir(fullPath, depth + 1);
      }
    }
  } catch (e) {
    lines.push('Error reading ' + dir + ': ' + e.message);
  }
}

lines.push('=== PROJECT DIRECTORY SCAN ===');
searchDir('.');
fs.writeFileSync('project_scan.txt', lines.join('\n'), 'utf8');
console.log('Wrote ' + lines.length + ' entries to project_scan.txt');
