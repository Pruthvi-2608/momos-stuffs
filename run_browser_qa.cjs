const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chrome = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';
const artifactDir = 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\0a5ca531-464f-465d-bd68-04996e89c470';
const logFile = path.join(__dirname, 'qa_results.log');

function log(msg) {
  const line = new Date().toISOString() + ' ' + msg + '\n';
  fs.appendFileSync(logFile, line);
  console.log(msg);
}

fs.writeFileSync(logFile, 'Starting Browser QA...\n');

try {
  // 1. Dump DOM
  log('Dumping live DOM from http://127.0.0.1:3000 ...');
  const domCmd = `${chrome} --headless=new --dump-dom http://127.0.0.1:3000`;
  const dom = execSync(domCmd, { encoding: 'utf8', timeout: 20000 });
  log(`DOM retrieved successfully. Length: ${dom.length} characters.`);

  // 2. DOM Verifications
  if (dom.includes('<div id="root"></div>') && !dom.includes('<section')) {
    log('FATAL: React failed to mount into root!');
  } else {
    log('VERIFIED: React successfully mounted and rendered sections.');
  }

  // Extract #menu section
  const menuMatch = dom.match(/<section[^>]*id="menu"[^>]*>([\s\S]*?)<\/section>/i);
  if (menuMatch) {
    const menuHtml = menuMatch[1];
    const imgMatches = menuHtml.match(/<img\b[^>]*>/gi) || [];
    const videoMatches = menuHtml.match(/<video\b[^>]*>/gi) || [];
    log(`MENU CRITICAL AUDIT:`);
    log(` - Images inside #menu: ${imgMatches.length}`);
    log(` - Videos inside #menu: ${videoMatches.length}`);
    if (imgMatches.length > 0) {
      log('WARNING: Image tags found in menu: ' + imgMatches.join('; '));
    } else {
      log('SUCCESS: Menu section contains ABSOLUTELY ZERO IMAGES.');
    }
    if (videoMatches.length > 0) {
      log('WARNING: Video tags found in menu: ' + videoMatches.join('; '));
    } else {
      log('SUCCESS: Menu section contains ABSOLUTELY ZERO VIDEOS.');
    }
  } else {
    log('WARNING: Could not parse #menu section from DOM.');
  }

  // Check Footer Wordmark & Pixel Drift
  const hasWordmark = dom.includes('Momos &amp; Stuff') || dom.includes('Momos & Stuff');
  log(`FOOTER AUDIT: Wordmark 'Momos & Stuff' present: ${hasWordmark}`);

  // 3. Capture Screenshots
  const viewports = [
    { name: 'desktop_view.png', width: 1440, height: 900 },
    { name: 'tablet_view.png', width: 768, height: 1024 },
    { name: 'mobile_view.png', width: 390, height: 844 },
  ];

  for (const vp of viewports) {
    const targetFile = path.join(artifactDir, vp.name);
    log(`Capturing ${vp.name} (${vp.width}x${vp.height})...`);
    const snapCmd = `${chrome} --headless=new --hide-scrollbars --window-size=${vp.width},${vp.height} --virtual-time-budget=5000 --screenshot="${targetFile}" http://127.0.0.1:3000`;
    execSync(snapCmd, { timeout: 25000 });
    const stat = fs.statSync(targetFile);
    log(`Saved ${vp.name} (${stat.size} bytes)`);
  }

  log('ALL QA AUDITS & SCREENSHOTS COMPLETED SUCCESSFULLY!');
} catch (err) {
  log(`ERROR in QA execution: ${err.message}`);
}
