const http = require('http');
http.get('http://127.0.0.1:3000', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('HTML STATUS:', res.statusCode);
    console.log('HTML SNIPPET:', data.slice(0, 300));
    process.exit(0);
  });
}).on('error', (e) => {
  console.log('ERR:', e.message);
  process.exit(1);
});
