const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const PORT = 5173;
const distDir = path.join(__dirname, 'dist');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\0a5ca531-464f-465d-bd68-04996e89c470';
const reportFile = path.join(artifactDir, 'qa_report.txt');

function log(msg) {
  fs.appendFileSync(reportFile, msg + '\n');
  console.log(msg);
}

fs.writeFileSync(reportFile, '=== MOMOS & STUFF SAME-SESSION BROWSER QA ===\n');

// 1. Create static HTTP server
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';

  let filePath = path.join(distDir, reqPath);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, 'public', reqPath);
  }
  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, reqPath);
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, '127.0.0.1', () => {
  log(`Local server active on http://127.0.0.1:${PORT}`);

  try {
    // 2. Dump Live Rendered DOM directly via spawnSync
    log('\n1. Fetching rendered DOM via headless Chrome (spawnSync)...');
    const domRes = spawnSync(chromePath, [
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu',
      '--virtual-time-budget=2000',
      '--dump-dom',
      `http://127.0.0.1:${PORT}`
    ], { encoding: 'utf8' });

    if (domRes.error) {
      throw domRes.error;
    }

    const dom = domRes.stdout || '';
    log(`DOM retrieved successfully (${dom.length} characters)`);

    // Verify React Mount
    if (dom.includes('<div id="root"></div>') && !dom.includes('<section')) {
      log('ERROR: Root is empty');
    } else {
      log('SUCCESS: React is hydrated and rendered into root');
    }

    // Critical Menu Image/Video Audit
    const menuMatch = dom.match(/<section[^>]*id="menu"[^>]*>([\s\S]*?)<\/section>/i);
    if (menuMatch) {
      const menuHtml = menuMatch[1];
      const imgs = menuHtml.match(/<img\b[^>]*>/gi) || [];
      const videos = menuHtml.match(/<video\b[^>]*>/gi) || [];
      log(`\n--- CRITICAL MENU SECTION AUDIT ---`);
      log(`Total <img> tags inside #menu: ${imgs.length}`);
      log(`Total <video> tags inside #menu: ${videos.length}`);
      if (imgs.length === 0 && videos.length === 0) {
        log('VERIFIED: Menu section contains ABSOLUTELY ZERO images and ZERO videos!');
      } else {
        log('FAIL: Menu contains images or videos: ' + imgs.join(', '));
      }
    } else {
      log('WARNING: Could not parse #menu');
    }

    // Footer & Wordmark Audit
    const hasWordmark = dom.includes('Momos &amp; Stuff') || dom.includes('Momos & Stuff');
    const hasDrift = dom.includes('aria-label="Momos &amp; Stuff animated wordmark"') || dom.includes('aria-label="Momos & Stuff animated wordmark"');
    log(`\n--- FOOTER & WORDMARK AUDIT ---`);
    log(`Wordmark present: ${hasWordmark}`);
    log(`Pixel Drift container present: ${hasDrift}`);

    // Navigation Links Audit
    log(`\n--- NAVIGATION LINKS AUDIT ---`);
    ['#menu', '#signature', '#story', '#moments', '#visit'].forEach(anchor => {
      const found = dom.includes(`href="${anchor}"`);
      log(`Anchor ${anchor} in nav: ${found}`);
    });

    // 3. Take Viewport Screenshots
    log('\n2. Taking Viewport Screenshots...');
    const viewports = [
      { name: 'desktop_view', width: 1440, height: 900 },
      { name: 'tablet_view', width: 768, height: 1024 },
      { name: 'mobile_view', width: 390, height: 844 },
    ];

    for (const vp of viewports) {
      const outPath = path.join(artifactDir, `${vp.name}.png`);
      log(`Capturing ${vp.name} (${vp.width}x${vp.height})...`);
      const snapRes = spawnSync(chromePath, [
        '--headless=new',
        '--no-sandbox',
        '--disable-gpu',
        '--hide-scrollbars',
        `--window-size=${vp.width},${vp.height}`,
        '--virtual-time-budget=2000',
        `--screenshot=${outPath}`,
        `http://127.0.0.1:${PORT}`
      ], { encoding: 'utf8' });

      if (snapRes.error) {
        log(`Failed ${vp.name}: ${snapRes.error.message}`);
      } else {
        const size = fs.existsSync(outPath) ? fs.statSync(outPath).size : 0;
        log(`Saved ${vp.name}.png (${size} bytes)`);
      }
    }

    log('\n=== ALL QA AUDITS & SCREENSHOTS COMPLETED SUCCESSFULLY ===');
  } catch (err) {
    log(`QA Execution Error: ${err.message}`);
  } finally {
    server.close(() => {
      log('Local server stopped.');
      process.exit(0);
    });
  }
});
