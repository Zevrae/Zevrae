import https from 'https';

const urls = [
  'https://ibb.co/8gvc7Db2',
  'https://ibb.co/S4NNhKht',
  'https://ibb.co/XfYbKC7S',
  'https://ibb.co/Rp8cYN40'
];

urls.forEach(url => {
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const match = data.match(/https:\/\/i\.ibb\.co\/[^"']+/);
      if (match) {
        console.log(url, '->', match[0]);
      } else {
        console.log(url, '-> Not found');
      }
    });
  });
});
