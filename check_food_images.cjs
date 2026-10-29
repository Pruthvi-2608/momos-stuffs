const fs = require('fs');
const path = require('path');

const dir = 'public/assets/food';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));

console.log('Food images found:', files.length);
files.forEach(f => {
  const stat = fs.statSync(path.join(dir, f));
  console.log(f, stat.size + ' bytes');
});
