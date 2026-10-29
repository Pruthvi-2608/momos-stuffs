const fs = require('fs');

console.log('Listing all images in public/assets/food and public/assets/gallery:');
['public/assets/food', 'public/assets/gallery'].forEach(d => {
  fs.readdirSync(d).forEach(f => console.log(d + '/' + f));
});
