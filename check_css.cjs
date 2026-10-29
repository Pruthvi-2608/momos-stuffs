const http = require('http');

http.get('http://127.0.0.1:3000/src/index.css', (res) => {
  console.log('/src/index.css status:', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('index.css bytes:', data.length);
    console.log('Sample:', data.slice(0, 300));
  });
});
