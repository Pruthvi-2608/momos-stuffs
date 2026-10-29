const fs = require('fs');
const summary = JSON.parse(fs.readFileSync('dataset_summary.json', 'utf8'));

const detailed = summary.map(p => {
  // Extract all media URLs (displayUrl, childPosts displayUrls, videoUrl)
  const images = [];
  if (p.displayUrl) images.push(p.displayUrl);
  p.childPosts.forEach(cp => {
    if (cp.key.endsWith('/displayUrl') && cp.val) {
      if (!images.includes(cp.val)) images.push(cp.val);
    }
  });

  return {
    index: p.index,
    shortCode: p.shortCode,
    type: p.type,
    productType: p.productType,
    owner: p.ownerUsername,
    timestamp: p.timestamp,
    location: p.locationName,
    caption: p.fullCaption,
    likes: p.likesCount,
    comments: p.commentsCount,
    videoUrl: p.videoUrl,
    imagesCount: images.length,
    images: images
  };
});

fs.writeFileSync('posts_detailed.json', JSON.stringify(detailed, null, 2), 'utf8');

detailed.forEach(p => {
  console.log(`\n=== Post #${p.index} [${p.type}] (${p.owner}) ShortCode: ${p.shortCode} Location: ${p.location} Likes: ${p.likes} ===`);
  console.log(`Caption: ${p.caption}`);
  console.log(`Images: ${p.imagesCount}, Has Video: ${!!p.videoUrl}`);
  if (p.videoUrl) console.log(`Video URL: ${p.videoUrl}`);
});
