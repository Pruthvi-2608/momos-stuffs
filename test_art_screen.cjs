const { execSync } = require('child_process');

const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';
const dest = 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\0a5ca531-464f-465d-bd68-04996e89c470\\preview_desktop.png';

const cmd = `${chrome} --headless=new --screenshot="${dest}" --window-size=1440,900 http://127.0.0.1:3000`;

console.log('Writing screenshot to artifact dir:', dest);
try {
  execSync(cmd, { stdio: 'inherit' });
  console.log('Success! File size:', require('fs').statSync(dest).size);
} catch (e) {
  console.error('Failed:', e.message);
}
