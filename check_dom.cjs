const { execSync } = require('child_process');

const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';
const cmd = `${chrome} --headless=new --dump-dom http://127.0.0.1:3000`;

try {
  const dom = execSync(cmd, { encoding: 'utf8' });
  console.log('DOM output length:', dom.length);
  console.log('DOM preview:');
  console.log(dom.slice(0, 1000));
  if (dom.includes('<div id="root"></div>')) {
    console.log('Root is still empty! React failed to mount.');
  } else {
    console.log('Root has rendered content!');
  }
} catch (e) {
  console.error('Error:', e.message);
}
