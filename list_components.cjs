const fs = require('fs');
console.log('Components:');
if (fs.existsSync('src/components')) {
  fs.readdirSync('src/components').forEach(f => console.log(' - ' + f));
}
console.log('Data:');
if (fs.existsSync('src/data')) {
  fs.readdirSync('src/data').forEach(f => console.log(' - ' + f));
}
