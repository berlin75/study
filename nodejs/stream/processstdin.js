const fs = require('fs');
const ws = fs.createWriteStream('stdin.txt');
console.log('请输入：');
process.stdin.pipe(ws);