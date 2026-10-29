const http = require('http');

http.get('http://127.0.0.1:3000/src/App.jsx', (res) => {
  console.log('/src/App.jsx status:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('App.jsx compiled bytes:', data.length);
    if (res.statusCode !== 200) console.log('Error content:', data);
  });
}).on('error', (e) => {
  console.error('Error fetching App.jsx:', e.message);
});
