const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const summary = JSON.parse(fs.readFileSync('dataset_summary.json', 'utf8'));

// Ensure dirs
const baseDir = path.join(__dirname, 'public', 'assets');
['brand', 'food', 'reels', 'gallery', 'menu'].forEach(dir => {
  fs.mkdirSync(path.join(baseDir, dir), { recursive: true });
});

// Copy logo
fs.copyFileSync(path.join(__dirname, 'logo.jpg'), path.join(baseDir, 'brand', 'logo.jpg'));
console.log('Logo copied to public/assets/brand/logo.jpg');

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
      console.log(`Skipping existing: ${destPath}`);
      return resolve(destPath);
    }

    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`Downloaded: ${destPath} (${fs.statSync(destPath).size} bytes)`);
          resolve(destPath);
        });
      });
    }).on('error', reject);
  });
}

async function run() {
  const downloadedAssets = [];

  // 1. Process posts
  for (const post of summary) {
    const postAssets = {
      index: post.index,
      shortCode: post.shortCode,
      caption: post.fullCaption,
      likes: post.likesCount,
      comments: post.commentsCount,
      timestamp: post.timestamp,
      location: post.locationName,
      owner: post.ownerUsername,
      images: [],
      video: null
    };

    // Download primary displayUrl
    if (post.displayUrl) {
      const ext = 'jpg';
      let folder = 'gallery';
      if ([0, 2, 6, 8, 9, 10, 11, 17].includes(post.index)) {
        folder = 'food';
      }
      const filename = `post_${post.index}_${post.shortCode}_main.${ext}`;
      const dest = path.join(baseDir, folder, filename);
      try {
        await downloadFile(post.displayUrl, dest);
        postAssets.images.push(`/assets/${folder}/${filename}`);
      } catch (e) {
        console.error(`Failed main img for post ${post.index}:`, e.message);
      }
    }

    // Download child posts (carousels)
    const childImgs = post.childPosts.filter(cp => cp.key.endsWith('/displayUrl') && cp.val);
    let childIdx = 0;
    for (const cp of childImgs) {
      const filename = `post_${post.index}_carousel_${childIdx}.jpg`;
      let folder = 'gallery';
      if ([0, 2, 6, 9].includes(post.index)) folder = 'food';
      const dest = path.join(baseDir, folder, filename);
      try {
        await downloadFile(cp.val, dest);
        postAssets.images.push(`/assets/${folder}/${filename}`);
      } catch (e) {
        console.error(`Failed carousel img ${childIdx} for post ${post.index}:`, e.message);
      }
      childIdx++;
    }

    // Download video if available and key post
    // Posts with videos: 1 (ramen & momos), 3 (night 3am opening), 4 (moments), 5 (opening day), 7 (coming to vapi), 8 (cafe date), 9 (korean & ube latte), 10 (sikkim to vapi), 11 (sauce + steam), 18 (momo magic / khau gali)
    if (post.videoUrl) {
      const filename = `post_${post.index}_${post.shortCode}.mp4`;
      const dest = path.join(baseDir, 'reels', filename);
      try {
        await downloadFile(post.videoUrl, dest);
        postAssets.video = `/assets/reels/${filename}`;
      } catch (e) {
        console.error(`Failed video for post ${post.index}:`, e.message);
      }
    }

    downloadedAssets.push(postAssets);
  }

  // Ensure src/data dir
  fs.mkdirSync(path.join(__dirname, 'src', 'data'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'src', 'data', 'instagramContent.json'), JSON.stringify(downloadedAssets, null, 2), 'utf8');
  console.log('Saved instagramContent.json with', downloadedAssets.length, 'posts');
}

run().catch(console.error);
