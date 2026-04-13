import https from 'https';

https.get('https://dlss5.app/sitemap.xml', (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Body:', data.substring(0, 500)));
}).on('error', err => console.error(err));
