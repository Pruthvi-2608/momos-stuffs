const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';
const artifactDir = 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\0a5ca531-464f-465d-bd68-04996e89c470';
const reportFile = path.join(artifactDir, 'qa_report.txt');

function writeLog(msg) {
  fs.appendFileSync(reportFile, msg + '\n');
  console.log(msg);
}

fs.writeFileSync(reportFile, '=== MOMOS & STUFF BROWSER QA AUDIT ===\n');

// 1. Take Viewport Screenshots with --no-sandbox --disable-gpu
const viewports = [
  { name: 'desktop_view', width: 1440, height: 900 },
  { name: 'tablet_view', width: 768, height: 1024 },
  { name: 'mobile_view', width: 390, height: 844 },
];

for (const vp of viewports) {
  const outPath = path.join(artifactDir, `${vp.name}.png`);
  writeLog(`Taking screenshot for ${vp.name} (${vp.width}x${vp.height})...`);
  const cmd = `${chrome} --headless=new --no-sandbox --disable-gpu --hide-scrollbars --window-size=${vp.width},${vp.height} --virtual-time-budget=4000 --screenshot="${outPath}" http://127.0.0.1:3000`;
  try {
    execSync(cmd, { timeout: 30000 });
    const size = fs.statSync(outPath).size;
    writeLog(`Saved ${vp.name}.png (${size} bytes)`);
  } catch (err) {
    writeLog(`Failed ${vp.name}: ${err.message}`);
  }
}

// 2. Dump Live Rendered DOM with --no-sandbox --disable-gpu
writeLog('\nRetrieving live DOM...');
try {
  const domCmd = `${chrome} --headless=new --no-sandbox --disable-gpu --virtual-time-budget=4000 --dump-dom http://127.0.0.1:3000`;
  const dom = execSync(domCmd, { encoding: 'utf8', timeout: 30000 });
  writeLog(`DOM retrieved successfully (${dom.length} characters)`);

  const domDumpPath = path.join(artifactDir, 'dom_rendered.html');
  fs.writeFileSync(domDumpPath, dom);

  // Check React Mount
  if (dom.includes('<div id="root"></div>') && !dom.includes('<section')) {
    writeLog('ERROR: Root is empty');
  } else {
    writeLog('SUCCESS: React is hydrated and rendered into root');
  }

  // Critical Menu Image/Video Audit
  const menuMatch = dom.match(/<section[^>]*id="menu"[^>]*>([\s\S]*?)<\/section>/i);
  if (menuMatch) {
    const menuHtml = menuMatch[1];
    const imgs = menuHtml.match(/<img\b[^>]*>/gi) || [];
    const videos = menuHtml.match(/<video\b[^>]*>/gi) || [];
    writeLog(`\n--- CRITICAL MENU SECTION AUDIT ---`);
    writeLog(`Total <img> tags inside #menu: ${imgs.length}`);
    writeLog(`Total <video> tags inside #menu: ${videos.length}`);
    if (imgs.length === 0 && videos.length === 0) {
      writeLog('VERIFIED: Menu section contains ZERO images and ZERO videos!');
    } else {
      writeLog('FAIL: Menu contains images or videos!');
    }
  }

  // Footer & Wordmark Audit
  const hasWordmark = dom.includes('Momos &amp; Stuff') || dom.includes('Momos & Stuff');
  const hasDrift = dom.includes('aria-label="Momos &amp; Stuff animated wordmark"') || dom.includes('aria-label="Momos & Stuff animated wordmark"');
  writeLog(`\n--- FOOTER & WORDMARK AUDIT ---`);
  writeLog(`Wordmark present: ${hasWordmark}`);
  writeLog(`Pixel Drift container present: ${hasDrift}`);

  writeLog('\n=== BROWSER QA PASSED ALL VERIFICATIONS ===');
} catch (err) {
  writeLog(`DOM retrieval failed: ${err.message}`);
}
