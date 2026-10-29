const http = require('http');

http.get('http://127.0.0.1:3000/src/main.jsx', (res) => {
  console.log('/src/main.jsx status:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('main.jsx compiled bytes:', data.length);
    if (res.statusCode !== 200) console.log('Error content:', data);
  });
}).on('error', (e) => {
  console.error('Error fetching main.jsx:', e.message);
});
