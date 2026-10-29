const fs = require('fs');
const detailed = JSON.parse(fs.readFileSync('posts_detailed.json', 'utf8'));

detailed.forEach((p, idx) => {
  console.log(`--- [${idx}] ${p.shortCode} | ${p.timestamp.slice(0, 10)} | ${p.owner} | ${p.location || 'N/A'}`);
  console.log(`Type: ${p.type} | Likes: ${p.likes} | Comments: ${p.comments} | Imgs: ${p.imagesCount} | Vid: ${!!p.videoUrl}`);
  console.log(`Caption: ${p.caption ? p.caption.trim().replace(/\n+/g, ' / ') : 'No caption'}\n`);
});
