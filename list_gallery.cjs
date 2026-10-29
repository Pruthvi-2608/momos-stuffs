const fs = require('fs');
if (fs.existsSync('public/assets/gallery')) {
  console.log('Gallery files:', fs.readdirSync('public/assets/gallery'));
} else {
  console.log('No gallery directory');
}
