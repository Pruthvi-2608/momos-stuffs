const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, 'dataset_instagram-scraper_2026-10-27_05-42-47-702.csv');
const content = fs.readFileSync(csvPath, 'utf8');

// Parse CSV with quotes and newlines
function parseCSV(text) {
  const rows = [];
  let currentRow = [];
  let currentField = '';
  let insideQuote = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (insideQuote && nextChar === '"') {
        currentField += '"';
        i++;
      } else {
        insideQuote = !insideQuote;
      }
    } else if (char === ',' && !insideQuote) {
      currentRow.push(currentField);
      currentField = '';
    } else if ((char === '\r' || char === '\n') && !insideQuote) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentField);
      if (currentRow.some(f => f.trim().length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }
  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField);
    if (currentRow.some(f => f.trim().length > 0)) {
      rows.push(currentRow);
    }
  }
  return rows;
}

const parsed = parseCSV(content);
const headers = parsed[0];
console.log('Total rows:', parsed.length - 1);
console.log('Total columns:', headers.length);

const items = [];
for (let i = 1; i < parsed.length; i++) {
  const row = parsed[i];
  const obj = {};
  headers.forEach((h, idx) => {
    if (row[idx] && row[idx].trim() !== '') {
      obj[h] = row[idx];
    }
  });
  items.push(obj);
}

// Print summary of posts
const summary = items.map((item, idx) => {
  return {
    index: idx,
    id: item.id,
    shortCode: item.shortCode,
    type: item.type,
    productType: item.productType,
    caption: item.caption ? item.caption.substring(0, 120).replace(/\n/g, ' ') : '',
    fullCaption: item.caption,
    locationName: item.locationName,
    displayUrl: item.displayUrl,
    videoUrl: item.videoUrl,
    likesCount: item.likesCount,
    commentsCount: item.commentsCount,
    timestamp: item.timestamp,
    ownerUsername: item.ownerUsername,
    childPosts: Object.keys(item).filter(k => k.startsWith('childPosts/')).map(k => ({ key: k, val: item[k] }))
  };
});

fs.writeFileSync(path.join(__dirname, 'dataset_summary.json'), JSON.stringify(summary, null, 2), 'utf8');

console.log('Extracted summary saved to dataset_summary.json');
console.log('Posts count:', items.length);

// Also collect unique locations, mentions, hashtags
const locations = [...new Set(items.map(it => it.locationName).filter(Boolean))];
console.log('Locations:', locations);

const owners = [...new Set(items.map(it => it.ownerUsername).filter(Boolean))];
console.log('Owners:', owners);
