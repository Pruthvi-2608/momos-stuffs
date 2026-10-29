const fs = require('fs');

const chromePaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
];

for (const p of chromePaths) {
  if (fs.existsSync(p)) {
    console.log('Found browser:', p);
  }
}
