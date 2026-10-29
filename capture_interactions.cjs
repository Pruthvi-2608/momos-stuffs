const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\0a5ca531-464f-465d-bd68-04996e89c470';
const tempProfile = path.join(os.tmpdir(), 'chrome_cdp_profile_' + Date.now());

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function httpGet(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    }).on('error', reject);
  });
}

async function captureInteractions() {
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    `--user-data-dir=${tempProfile}`,
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1440,900',
    'about:blank'
  ], { stdio: 'ignore' });

  let retries = 20;
  let targets = null;
  while (retries > 0) {
    await sleep(400);
    try {
      targets = await httpGet('http://127.0.0.1:9222/json/list');
      if (Array.isArray(targets) && targets.length > 0 && targets[0].webSocketDebuggerUrl) break;
    } catch (e) {
      retries--;
    }
  }

  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  let msgId = 1;
  const callbacks = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && callbacks.has(msg.id)) {
      callbacks.get(msg.id)(msg.result);
      callbacks.delete(msg.id);
    }
  };

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const id = msgId++;
      callbacks.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await new Promise(res => ws.onopen = res);
  await send('Runtime.enable');
  await send('Page.enable');
  await send('Page.navigate', { url: 'http://127.0.0.1:3000' });
  await sleep(3500);

  // 1. Signature section scroll
  console.log('Capturing Signature Spotlight Section...');
  await send('Runtime.evaluate', {
    expression: `
      const el = document.getElementById('signature');
      window.scrollTo(0, el.offsetTop - 50);
    `
  });
  await sleep(1000);
  const snapSig = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'signature_spotlight.png'), Buffer.from(snapSig.data, 'base64'));
  console.log('Saved signature_spotlight.png');

  // 2. Open dish detail modal
  console.log('Clicking first dish details button...');
  await send('Runtime.evaluate', {
    expression: `
      const detailBtn = Array.from(document.querySelectorAll('#menu button')).find(b => b.textContent.includes('Details'));
      if (detailBtn) detailBtn.click();
    `
  });
  await sleep(1000);
  const snapModal = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(path.join(artifactDir, 'dish_modal_view.png'), Buffer.from(snapModal.data, 'base64'));
  console.log('Saved dish_modal_view.png');

  ws.close();
  chromeProc.kill();
  console.log('Done!');
}

captureInteractions();
