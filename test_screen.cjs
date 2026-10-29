const { execSync } = require('child_process');

const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';
const cmd = `${chrome} --headless=new --screenshot="screen_real.png" --window-size=1440,900 http://127.0.0.1:3000`;

console.log('Running chrome screenshot without virtual time budget...');
execSync(cmd, { stdio: 'inherit' });
console.log('Done!');
