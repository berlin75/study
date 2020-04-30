var fs = require('fs');
fs.createReadStream('luky.mp4').pipe(fs.createWriteStream('luky_copy.mp4'));