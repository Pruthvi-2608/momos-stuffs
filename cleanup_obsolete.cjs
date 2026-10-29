const fs = require('fs');
const files = [
  'src/components/MenuCard.jsx',
  'src/components/BrandHighlights.jsx',
  'src/components/FeaturedFood.jsx',
  'src/components/VideoSection.jsx'
];
files.forEach(f => {
  if (fs.existsSync(f)) {
    fs.unlinkSync(f);
    console.log('Removed obsolete file:', f);
  }
});
