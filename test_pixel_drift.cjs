const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const http = require('http');
const os = require('os');

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body {
    margin: 0;
    padding: 40px;
    background: #0B1B2B;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    font-family: system-ui, sans-serif;
  }
  h2 {
    color: #EAF7F8;
    margin-bottom: 20px;
    font-size: 16px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
  #canvas-container {
    background: #0F2338;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
  }
  canvas {
    display: block;
  }
</style>
</head>
<body>
  <h2>Momos & Stuff — Pixel Drift Reference Test</h2>
  <div id="canvas-container">
    <canvas id="driftCanvas" width="960" height="220"></canvas>
  </div>

  <script>
    const canvas = document.getElementById('driftCanvas');
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    const off = document.createElement('canvas');
    off.width = W;
    off.height = H;
    const octx = off.getContext('2d');

    const fontSize = 84;
    octx.fillStyle = '#FFFFFF';
    octx.font = '900 ' + fontSize + 'px "Arial Black", "Plus Jakarta Sans", Impact, sans-serif';
    octx.textAlign = 'center';
    octx.textBaseline = 'middle';
    octx.letterSpacing = '3px';
    octx.fillText('MOMOS & STUFF', W / 2, H / 2);

    const imgData = octx.getImageData(0, 0, W, H).data;

    const step = 5;
    const particles = [];
    for (let y = 0; y < H; y += step) {
      for (let x = 0; x < W; x += step) {
        const idx = (y * W + x) * 4;
        if (imgData[idx + 3] > 120) {
          const nx = Math.floor(x / step);
          const ny = Math.floor(y / step);
          const seed = Math.sin(nx * 12.9898 + ny * 78.233) * 43758.5453;
          const rand = seed - Math.floor(seed);
          const isOrange = rand > 0.77;

          particles.push({
            ox: x,
            oy: y,
            x: x,
            y: y,
            size: 3.5,
            color: isOrange ? '#F07050' : '#FFF9F0'
          });
        }
      }
    }

    const spheres = [
      { cx: 620, cy: H / 2, r: 85, strength: 1.0 },
      { cx: 775, cy: H / 2, r: 88, strength: 1.0 }
    ];

    function render(time) {
      ctx.clearRect(0, 0, W, H);

      const s1x = spheres[0].cx;
      const s1y = spheres[0].cy;
      const s2x = spheres[1].cx;
      const s2y = spheres[1].cy;

      const activeSpheres = [
        { cx: s1x, cy: s1y, r: spheres[0].r, strength: spheres[0].strength },
        { cx: s2x, cy: s2y, r: spheres[1].r, strength: spheres[1].strength }
      ];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let dxTotal = 0;
        let dyTotal = 0;
        let scale = 1.0;

        for (let s = 0; s < activeSpheres.length; s++) {
          const sph = activeSpheres[s];
          const dx = p.ox - sph.cx;
          const dy = p.oy - sph.cy;
          const d = Math.sqrt(dx * dx + dy * dy);

          if (d < sph.r && d > 0.001) {
            const u = d / sph.r;
            const uPrime = Math.sin(Math.pow(u, 0.78) * (Math.PI / 2));
            const newD = sph.r * uPrime;
            const delta = (newD - d) * sph.strength;

            dxTotal += (dx / d) * delta;
            dyTotal += (dy / d) * delta;

            if (u > 0.85) {
              scale = 1.15;
            }
          }
        }

        const fx = p.ox + dxTotal;
        const fy = p.oy + dyTotal;
        const s = p.size * scale;

        ctx.fillStyle = p.color;
        ctx.fillRect(Math.round(fx - s / 2), Math.round(fy - s / 2), Math.round(s), Math.round(s));
      }
    }

    render(0);
  </script>
</body>
</html>
`;

const tempHtml = path.join(os.tmpdir(), 'test_drift.html');
fs.writeFileSync(tempHtml, htmlContent);

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\0a5ca531-464f-465d-bd68-04996e89c470';
const PORT = 9333;
const tempProfile = path.join(os.tmpdir(), 'chrome_drift_profile_' + Date.now());

async function run() {
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=' + PORT,
    '--user-data-dir=' + tempProfile,
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1200,600',
    'about:blank'
  ], { stdio: 'ignore' });

  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
  function httpGet(url) {
    return new Promise((resolve, reject) => {
      http.get(url, res => {
        let d = '';
        res.on('data', c => d += c);
        res.on('end', () => resolve(JSON.parse(d)));
      }).on('error', reject);
    });
  }

  let targets = null;
  for (let i = 0; i < 20; i++) {
    await sleep(300);
    try {
      targets = await httpGet('http://127.0.0.1:' + PORT + '/json/list');
      if (Array.isArray(targets) && targets[0] && targets[0].webSocketDebuggerUrl) break;
    } catch (e) {}
  }

  if (!targets) {
    console.error('Failed to get targets');
    chromeProc.kill();
    return;
  }

  const wsUrl = targets[0].webSocketDebuggerUrl;
  const ws = new WebSocket(wsUrl);
  let id = 1;
  const cbs = new Map();
  ws.onmessage = e => {
    const m = JSON.parse(e.data);
    if (m.id && cbs.has(m.id)) {
      cbs.get(m.id)(m.result);
      cbs.delete(m.id);
    }
  };
  function send(method, params = {}) {
    return new Promise(r => {
      const curId = id++;
      cbs.set(curId, r);
      ws.send(JSON.stringify({ id: curId, method, params }));
    });
  }
  await new Promise(r => ws.onopen = r);
  await send('Page.enable');
  await send('Page.navigate', { url: 'file:///' + tempHtml.replace(/\\/g, '/') });
  await sleep(1000);

  const snap = await send('Page.captureScreenshot', { format: 'png' });
  const outPath = path.join(artifactDir, 'test_drift_output.png');
  fs.writeFileSync(outPath, Buffer.from(snap.data, 'base64'));
  console.log('Saved test_drift_output.png to ' + outPath);
  ws.close();
  chromeProc.kill();
}

run();
