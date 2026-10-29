const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'assets', 'food');
const files = fs.readdirSync(dir);
console.log('Food assets found:', files);
