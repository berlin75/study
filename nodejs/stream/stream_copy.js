const fs = require('fs');
var source = fs.readFileSync('23.jpg');
console.log(Buffer.isBuffer(source));
fs.writeFileSync('23_stream_copy.jpg', source);