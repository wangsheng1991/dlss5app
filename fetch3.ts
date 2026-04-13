import http from 'http';

http.get('http://localhost:3000/sitemap.xml', (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Body:', data.substring(0, 500)));
}).on('error', err => console.error(err));
