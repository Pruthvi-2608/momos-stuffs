const http = require('http');

http.get('http://127.0.0.1:3000', (res) => {
  console.log('Status code:', res.statusCode);
  console.log('Headers:', res.headers['content-type']);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Response length:', data.length);
    console.log('Title found:', data.includes('<title>'));
  });
}).on('error', (e) => {
  console.error('Fetch error:', e.message);
});
