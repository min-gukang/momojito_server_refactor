const fs = require('fs');
const readStream = fs.createReadStream('./s.txt');

let dataArr = [];
readStream.on('data', (chunk) => {
  dataArr.push(chunk);
  console.log('data :', chunk, chunk.length, chunk.toString());
});
readStream.on('end', () => {
  console.log('end :', Buffer.concat(dataArr).toString());
});
//비동기 방식은 에러처리를 항상 해줘야 한다.
readStream.on('error', (err) => {
  console.log('에러', err);
});
