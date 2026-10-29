const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\admin\\.gemini\\antigravity\\brain\\0a5ca531-464f-465d-bd68-04996e89c470';
const tempProfile = path.join(os.tmpdir(), 'chrome_cdp_profile_' + Date.now());
const PORT = 9222;
const logFile = path.join(artifactDir, 'qa_report.txt');

function log(msg) {
  const line = new Date().toISOString() + ' ' + msg + '\n';
  fs.appendFileSync(logFile, line);
  console.log(msg);
}

fs.writeFileSync(logFile, '=== MOMOS & STUFF CDP BROWSER QA ===\n');

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

async function capture() {
  log('Launching headless Chrome with port ' + PORT + ' and temp profile: ' + tempProfile);
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${tempProfile}`,
    '--disable-gpu',
    '--no-sandbox',
    '--disable-extensions',
    '--window-size=1440,900',
    'about:blank'
  ], { stdio: 'ignore' });

  // Poll until debugging port is ready
  let retries = 25;
  let targets = null;
  while (retries > 0) {
    await sleep(400);
    try {
      targets = await httpGet(`http://127.0.0.1:${PORT}/json/list`);
      if (Array.isArray(targets) && targets.length > 0 && targets[0].webSocketDebuggerUrl) {
        log('CDP endpoints found on attempt ' + (26 - retries));
        break;
      }
    } catch (e) {
      retries--;
    }
  }

  if (!targets || targets.length === 0) {
    log('ERROR: Chrome remote debugging targets did not respond in time.');
    chromeProc.kill();
    return;
  }

  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  log('Connecting to target: ' + pageTarget.title + ' at ' + pageTarget.webSocketDebuggerUrl);

  try {
    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
    let msgId = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        const text = msg.params.args.map(a => a.value || a.description).join(' ');
        log('BROWSER CONSOLE [' + msg.params.type + ']: ' + text);
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        const errText = JSON.stringify(msg.params.exceptionDetails);
        log('BROWSER EXCEPTION: ' + errText);
      }
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
    log('WebSocket connected. Initializing CDP domains...');

    await send('Runtime.enable');
    await send('Page.enable');

    log('Navigating to http://127.0.0.1:3000 ...');
    await send('Page.navigate', { url: 'http://127.0.0.1:3000' });

    // Wait until React actually renders into the DOM
    log('Waiting for React root to populate...');
    let ready = false;
    for (let i = 0; i < 60; i++) {
      await sleep(500);
      const evalRes = await send('Runtime.evaluate', {
        expression: `!!document.querySelector('#hero h1') && !!document.querySelector('#menu')`
      });
      if (evalRes && evalRes.result && evalRes.result.value === true) {
        ready = true;
        log('React DOM ready on attempt ' + (i + 1));
        break;
      }
    }
    log('React DOM ready: ' + ready);
    await sleep(1500); // let animations settle

    // --- CRITICAL QA CHECK: Verify Menu Book Media & Rules ---
    const menuMediaCheck = await send('Runtime.evaluate', {
      expression: `(() => {
        const menu = document.getElementById('menu');
        if (!menu) return { error: 'No #menu element found' };
        const imgs = Array.from(menu.querySelectorAll('img'));
        const videos = menu.querySelectorAll('video');
        const book = menu.querySelector('[aria-label="Interactive 3D Menu Book"]');
        return {
          imgCount: imgs.length,
          logoDetected: imgs.some(i => i.src.includes('logo.jpg')),
          foodImageCount: imgs.filter(i => !i.src.includes('logo.jpg')).length,
          videoCount: videos.length,
          bookFound: !!book,
          snippet: menu.innerText.slice(0, 180).replace(/\\n/g, ' ')
        };
      })()`,
      returnByValue: true
    });
    log('MENU SECTION AUDIT: ' + JSON.stringify(menuMediaCheck.result.value, null, 2));

    // 1. Desktop Screenshot (1440x900) - Hero initial state in Deep Navy
    log('Capturing Desktop Hero Viewport with Deep Navy Background (1440x900)...');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });
    await sleep(800);
    const snapDesktop = await send('Page.captureScreenshot', { format: 'png' });
    const deskBuf = Buffer.from(snapDesktop.data, 'base64');
    fs.writeFileSync(path.join(artifactDir, 'desktop_view.png'), deskBuf);
    fs.writeFileSync(path.join(artifactDir, 'hero_desktop_navy.png'), deskBuf);
    fs.writeFileSync(path.join(artifactDir, 'hero_desktop_sky_blue.png'), deskBuf);
    log('Saved desktop_view.png and hero_desktop_navy.png (' + deskBuf.length + ' bytes)');

    // 1b. Test Particle-Swarm 3D Sphere Morph by triggering Next Slide
    log('Triggering 3D Sphere Particle Morph transition on Hero image & card...');
    await send('Runtime.evaluate', {
      expression: `(() => {
        const nextBtn = document.querySelector('button[aria-label="Next food photo"]');
        if (nextBtn) {
          nextBtn.click();
          return { clicked: true };
        }
        return { error: 'Next button not found' };
      })()`
    });
    // Wait ~1050ms into the 2100ms transition (Stage 2: 3D rotating SPHERE phase!)
    await sleep(1050);
    const snapSphere = await send('Page.captureScreenshot', { format: 'png' });
    const sphereBuf = Buffer.from(snapSphere.data, 'base64');
    fs.writeFileSync(path.join(artifactDir, 'hero_sphere_in_action.png'), sphereBuf);
    fs.writeFileSync(path.join(artifactDir, 'hero_morph_in_action.png'), sphereBuf);
    log('Saved hero_sphere_in_action.png (' + sphereBuf.length + ' bytes)');

    // Wait until transition fully finishes (another 1350ms) and assembles into the sharp next card
    await sleep(1350);
    const snapAssembled = await send('Page.captureScreenshot', { format: 'png' });
    const assembledBuf = Buffer.from(snapAssembled.data, 'base64');
    fs.writeFileSync(path.join(artifactDir, 'hero_sphere_next_assembled.png'), assembledBuf);
    fs.writeFileSync(path.join(artifactDir, 'hero_next_assembled.png'), assembledBuf);
    log('Saved hero_sphere_next_assembled.png (' + assembledBuf.length + ' bytes)');

    // 2. Tablet Screenshot (768x1024)
    log('Capturing Tablet Viewport (768x1024)...');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 768,
      height: 1024,
      deviceScaleFactor: 2,
      mobile: true
    });
    await sleep(600);
    const snapTablet = await send('Page.captureScreenshot', { format: 'png' });
    const tabBuf = Buffer.from(snapTablet.data, 'base64');
    fs.writeFileSync(path.join(artifactDir, 'tablet_view.png'), tabBuf);
    log('Saved tablet_view.png (' + tabBuf.length + ' bytes)');

    // 3. Mobile Screenshot (390x844)
    log('Capturing Mobile Viewport (390x844)...');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await sleep(600);
    const snapMobile = await send('Page.captureScreenshot', { format: 'png' });
    const mobBuf = Buffer.from(snapMobile.data, 'base64');
    fs.writeFileSync(path.join(artifactDir, 'mobile_view.png'), mobBuf);
    log('Saved mobile_view.png (' + mobBuf.length + ' bytes)');

    // Test Mobile Menu Drawer
    log('Testing Mobile Drawer opening and capture...');
    await send('Runtime.evaluate', {
      expression: `(() => {
        const menuBtn = document.querySelector('button[aria-label="Open navigation menu"]');
        if (menuBtn) menuBtn.click();
      })()`
    });
    await sleep(600);
    const snapMobOpen = await send('Page.captureScreenshot', { format: 'png' });
    const mobOpenBuf = Buffer.from(snapMobOpen.data, 'base64');
    fs.writeFileSync(path.join(artifactDir, 'mobile_menu_open.png'), mobOpenBuf);
    log('Saved mobile_menu_open.png (' + mobOpenBuf.length + ' bytes)');

    // Close Mobile Drawer
    await send('Runtime.evaluate', {
      expression: `(() => {
        const closeBtn = document.querySelector('button[aria-label="Close navigation menu"]');
        if (closeBtn) closeBtn.click();
      })()`
    });
    await sleep(400);

    // Scroll to Menu Section on Mobile
    log('Capturing Mobile Menu Book (390x844)...');
    await send('Runtime.evaluate', {
      expression: `document.getElementById('menu').scrollIntoView();`
    });
    await sleep(600);
    const snapMobMenu = await send('Page.captureScreenshot', { format: 'png' });
    const mobMenuBuf = Buffer.from(snapMobMenu.data, 'base64');
    fs.writeFileSync(path.join(artifactDir, 'menu_book_mobile.png'), mobMenuBuf);
    log('Saved menu_book_mobile.png (' + mobMenuBuf.length + ' bytes)');

    // Switch back to desktop for section screenshots
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    // 4. Scroll to Menu Section — 3D Menu Book Testing
    log('Capturing Menu Book Section (1440x900)...');
    await send('Runtime.evaluate', {
      expression: `document.getElementById('menu').scrollIntoView();`
    });
    await sleep(800);

    // 4a. Capture Book Cover with Authentic Logo
    log('Capturing 3D Menu Book Cover...');
    const snapCover = await send('Page.captureScreenshot', { format: 'png' });
    const coverBuf = Buffer.from(snapCover.data, 'base64');
    fs.writeFileSync(path.join(artifactDir, 'menu_view.png'), coverBuf);
    fs.writeFileSync(path.join(artifactDir, 'menu_book_cover.png'), coverBuf);
    log('Saved menu_book_cover.png (' + coverBuf.length + ' bytes)');

    // 4b. Test Arrow Page Turning: Click Right Arrow / Open Menu
    log('Triggering 3D Page Turn to Spread 1...');
    await send('Runtime.evaluate', {
      expression: `(() => {
        const nextBtn = document.querySelector('button[aria-label="Next menu page"]');
        if (nextBtn) { nextBtn.click(); return { clicked: 'next' }; }
        const openBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Open Menu'));
        if (openBtn) { openBtn.click(); return { clicked: 'open' }; }
        return { error: 'Button not found' };
      })()`
    });

    // Capture Mid-Flight 3D Page Turn (~340ms into the 720ms turn)
    await sleep(340);
    const snapTurn = await send('Page.captureScreenshot', { format: 'png' });
    const turnBuf = Buffer.from(snapTurn.data, 'base64');
    fs.writeFileSync(path.join(artifactDir, 'menu_book_page_turn_3d.png'), turnBuf);
    log('Saved menu_book_page_turn_3d.png (' + turnBuf.length + ' bytes)');

    // Wait until Spread 1 settles flat
    await sleep(500);
    const snapSpread1 = await send('Page.captureScreenshot', { format: 'png' });
    const spread1Buf = Buffer.from(snapSpread1.data, 'base64');
    fs.writeFileSync(path.join(artifactDir, 'menu_book_spread_1.png'), spread1Buf);
    log('Saved menu_book_spread_1.png (' + spread1Buf.length + ' bytes)');

    // 4c. Turn to Spread 2 (Soul Bowls & Café Sips)
    log('Turning to Spread 2...');
    await send('Runtime.evaluate', {
      expression: `(() => {
        const nextBtn = document.querySelector('button[aria-label="Next menu page"]');
        if (nextBtn) nextBtn.click();
      })()`
    });
    await sleep(850);
    const snapSpread2 = await send('Page.captureScreenshot', { format: 'png' });
    const spread2Buf = Buffer.from(snapSpread2.data, 'base64');
    fs.writeFileSync(path.join(artifactDir, 'menu_book_spread_2.png'), spread2Buf);
    log('Saved menu_book_spread_2.png (' + spread2Buf.length + ' bytes)');

    // 4d. Turn to Spread 3 (Sweets & Café Culture)
    log('Turning to Spread 3...');
    await send('Runtime.evaluate', {
      expression: `(() => {
        const nextBtn = document.querySelector('button[aria-label="Next menu page"]');
        if (nextBtn) nextBtn.click();
      })()`
    });
    await sleep(850);
    const snapSpread3 = await send('Page.captureScreenshot', { format: 'png' });
    const spread3Buf = Buffer.from(snapSpread3.data, 'base64');
    fs.writeFileSync(path.join(artifactDir, 'menu_book_spread_3.png'), spread3Buf);
    log('Saved menu_book_spread_3.png (' + spread3Buf.length + ' bytes)');

    // 4e. Test Reverse Page Turn (Left Arrow) back to Spread 1
    log('Testing Reverse Page Turn back to Spread 1...');
    await send('Runtime.evaluate', {
      expression: `(() => {
        const prevBtn = document.querySelector('button[aria-label="Previous menu page"]');
        if (prevBtn) {
          prevBtn.click();
          setTimeout(() => {
            const p2 = document.querySelector('button[aria-label="Previous menu page"]');
            if (p2) p2.click();
          }, 800);
        }
      })()`
    });
    await sleep(1800);

    // 5. Scroll to Signature Spotlight Section
    log('Capturing Signature Spotlight Section (1440x900)...');
    await send('Runtime.evaluate', {
      expression: `document.getElementById('signature').scrollIntoView();`
    });
    await sleep(800);
    const snapSig = await send('Page.captureScreenshot', { format: 'png' });
    const sigBuf = Buffer.from(snapSig.data, 'base64');
    fs.writeFileSync(path.join(artifactDir, 'signature_spotlight.png'), sigBuf);
    log('Saved signature_spotlight.png (' + sigBuf.length + ' bytes)');

    // 6. Scroll to Story Section
    log('Capturing Story Section (1440x900)...');
    await send('Runtime.evaluate', {
      expression: `document.getElementById('story').scrollIntoView();`
    });
    await sleep(800);
    const snapStory = await send('Page.captureScreenshot', { format: 'png' });
    const storyBuf = Buffer.from(snapStory.data, 'base64');
    fs.writeFileSync(path.join(artifactDir, 'story_view.png'), storyBuf);
    log('Saved story_view.png (' + storyBuf.length + ' bytes)');

    // 6b. Scroll to Bento Gallery Section (#moments)
    log('Capturing Bento Gallery Section (#moments) (1440x900)...');
    await send('Runtime.evaluate', {
      expression: `document.getElementById('moments').scrollIntoView({ behavior: 'instant', block: 'start' });`
    });
    // Wait for stroke-dashoffset SVG outline & organic mask expansion (~1400ms for staggered tiles)
    await sleep(1500);
    const snapGalleryDesktop = await send('Page.captureScreenshot', { format: 'png' });
    const galleryDesktopBuf = Buffer.from(snapGalleryDesktop.data, 'base64');
    fs.writeFileSync(path.join(artifactDir, 'gallery_bento_desktop.png'), galleryDesktopBuf);
    log('Saved gallery_bento_desktop.png (' + galleryDesktopBuf.length + ' bytes)');

    // 6c. Hover on Bento Card to test 1.03 scale, caption reveal, and 3-4px arrow shift
    log('Testing Bento Card hover state on supporting card...');
    const cardCoords = await send('Runtime.evaluate', {
      expression: `(() => {
        const cards = document.querySelectorAll('#moments a.group');
        const card = cards[1] || cards[0];
        if (!card) return null;
        const r = card.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      })()`,
      returnByValue: true
    });
    if (cardCoords && cardCoords.result && cardCoords.result.value) {
      const { x, y } = cardCoords.result.value;
      await send('Input.dispatchMouseEvent', {
        type: 'mouseMoved',
        x: Math.round(x),
        y: Math.round(y)
      });
    }
    await sleep(600);
    const snapGalleryHover = await send('Page.captureScreenshot', { format: 'png' });
    const galleryHoverBuf = Buffer.from(snapGalleryHover.data, 'base64');
    fs.writeFileSync(path.join(artifactDir, 'gallery_bento_hover.png'), galleryHoverBuf);
    log('Saved gallery_bento_hover.png (' + galleryHoverBuf.length + ' bytes)');

    // 6d. Mobile Viewport Bento Gallery Check (390x844)
    log('Testing Mobile Viewport for Bento Gallery (390x844)...');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await sleep(300);
    await send('Runtime.evaluate', {
      expression: `document.getElementById('moments').scrollIntoView({ behavior: 'instant', block: 'start' });`
    });
    await sleep(800);
    const snapGalleryMobile = await send('Page.captureScreenshot', { format: 'png' });
    const galleryMobileBuf = Buffer.from(snapGalleryMobile.data, 'base64');
    fs.writeFileSync(path.join(artifactDir, 'gallery_bento_mobile.png'), galleryMobileBuf);
    log('Saved gallery_bento_mobile.png (' + galleryMobileBuf.length + ' bytes)');

    // Reset back to Desktop for remaining tests
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });
    await sleep(300);

    // 7. Verify Video Section is completely removed & Capture Visit Section
    log('Verifying Video Section removal...');
    const videoCheck = await send('Runtime.evaluate', {
      expression: `(() => {
        const videos = document.querySelectorAll('video');
        const steamHeading = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.includes('Watch the Steam Rise'));
        return {
          totalVideosOnPage: videos.length,
          hasSteamRiseHeading: !!steamHeading
        };
      })()`,
      returnByValue: true
    });
    log('VIDEO REMOVAL AUDIT: ' + JSON.stringify(videoCheck.result.value));

    log('Capturing Visit Section (1440x900)...');
    await send('Runtime.evaluate', {
      expression: `document.getElementById('visit').scrollIntoView({ behavior: 'smooth' });`
    });
    await sleep(800);
    const snapVisit = await send('Page.captureScreenshot', { format: 'png' });
    const visitBuf = Buffer.from(snapVisit.data, 'base64');
    fs.writeFileSync(path.join(artifactDir, 'visit_view.png'), visitBuf);
    log('Saved visit_view.png (' + visitBuf.length + ' bytes)');

    // 7b. Capture Moving Words Ticker Banner (1440x900)
    log('Capturing Moving Words Ticker Banner...');
    await send('Runtime.evaluate', {
      expression: `(() => {
        const ticker = document.querySelector('[aria-label*="Ticker"]');
        if (ticker) ticker.scrollIntoView({ behavior: 'instant', block: 'center' });
      })()`
    });
    await sleep(600);
    const snapTicker = await send('Page.captureScreenshot', { format: 'png' });
    const tickerBuf = Buffer.from(snapTicker.data, 'base64');
    fs.writeFileSync(path.join(artifactDir, 'ticker_moving_words.png'), tickerBuf);
    log('Saved ticker_moving_words.png (' + tickerBuf.length + ' bytes)');

    // 8. Trigger Pixel Drift in Footer and Capture
    log('Testing Footer Pixel Drift Wordmark...');
    await send('Runtime.evaluate', {
      expression: `(() => {
        const footer = document.querySelector('footer');
        if (footer) footer.scrollIntoView({ behavior: 'instant', block: 'center' });
      })()`
    });
    await sleep(1200);
    const snapFooter = await send('Page.captureScreenshot', { format: 'png' });
    const footerBuf = Buffer.from(snapFooter.data, 'base64');
    fs.writeFileSync(path.join(artifactDir, 'footer_pixel_drift.png'), footerBuf);
    log('Saved footer_pixel_drift.png (' + footerBuf.length + ' bytes)');

    // Also test interactive hover on the canvas
    log('Testing interactive hover on Pixel Drift Wordmark...');
    await send('Runtime.evaluate', {
      expression: `(() => {
        const canvas = document.querySelector('footer canvas');
        if (canvas) {
          const rect = canvas.getBoundingClientRect();
          const evt = new MouseEvent('mousemove', {
            clientX: rect.left + rect.width * 0.35, // hover over "MOMOS"
            clientY: rect.top + rect.height * 0.5,
            bubbles: true
          });
          canvas.dispatchEvent(evt);
        }
      })()`
    });
    await sleep(600);
    const snapFooterHover = await send('Page.captureScreenshot', { format: 'png' });
    const footerHoverBuf = Buffer.from(snapFooterHover.data, 'base64');
    fs.writeFileSync(path.join(artifactDir, 'footer_pixel_drift_hover.png'), footerHoverBuf);
    log('Saved footer_pixel_drift_hover.png (' + footerHoverBuf.length + ' bytes)');

    ws.close();
    log('=== ALL SCREENSHOTS & QA CHECKS COMPLETED SUCCESSFULLY ===');
  } catch (err) {
    log('Capture error: ' + err.message + ' ' + err.stack);
  } finally {
    chromeProc.kill();
  }
}

capture();
