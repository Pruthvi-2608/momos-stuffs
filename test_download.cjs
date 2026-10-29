const https = require('https');
const fs = require('fs');

const testUrl = "https://scontent-mad2-1.cdninstagram.com/v/t51.82787-15/808729289_17907299391501430_476346369770395843_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=109&ig_cache_key=Mzk4NTM2Nzg1NDkxMDQyNDQyOA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0ueHBpZHMuMjE2MC5zZHIucmVndWxhcl9waG90by5DMyJ9&_nc_ohc=eI4KEuIcNegQ7kNvwF0vRIt&_nc_oc=AdrSVy1AWNGtt7pzZ4pPdVFM8N1aGTEgo8mrqW35fwrhdzTvsKMdyXGNDPAVNFB_I1Q&_nc_ad=z-m&_nc_cid=3033&_nc_zt=23&_nc_ht=scontent-mad2-1.cdninstagram.com&_nc_gid=j4yl0uY82SVjImcg76mv_g&_nc_ss=7a20f&oh=00_AQOjoIyAUNsec869GfqcSUKuCx0NFs5g8qgDCA3L3b4uWg&oe=6AE61653";

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      console.log('Status code:', res.statusCode);
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error('Failed status ' + res.statusCode));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
    }).on('error', reject);
  });
}

download(testUrl, 'test_img.jpg')
  .then(() => console.log('Downloaded successfully! File size:', fs.statSync('test_img.jpg').size))
  .catch(err => console.error('Error:', err.message));
