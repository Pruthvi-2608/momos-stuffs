const fs = require('fs');
const size = fs.statSync('logo.jpg').size;
console.log('logo.jpg size:', size, 'bytes');
