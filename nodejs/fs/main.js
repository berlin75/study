var fs = require('fs');
console.log(typeof fs);
console.log('------------------------------------------');
console.log(fs);
var data = fs.readFileSync('input.txt');
console.log('------------------------------------------');
console.log(typeof data);
console.log('------------------------------------------');
console.log(data);
console.log('------------------------------------------');
console.log(data.toString());
console.log('------------------------------------------');
console.log('code end!');