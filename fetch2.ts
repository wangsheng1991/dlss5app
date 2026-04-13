import https from 'https';

https.get('https://ais-dev-fr35qljugawsriz5nbf2b2-696351670055.asia-east1.run.app/sitemap.xml', (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Body:', data.substring(0, 500)));
}).on('error', err => console.error(err));
