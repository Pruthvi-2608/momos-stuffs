const fs = require('fs');

console.log('Testing image existence in public/assets/food/:');
const imgs = [
  'public/assets/food/post_2_carousel_2.jpg',
  'public/assets/food/post_0_carousel_1.jpg',
  'public/assets/food/post_0_carousel_2.jpg',
  'public/assets/food/post_6_carousel_0.jpg'
];

imgs.forEach(img => {
  console.log(img, fs.existsSync(img) ? 'EXISTS (' + fs.statSync(img).size + ' bytes)' : 'MISSING');
});
