var fs = require('fs');
var zlib = require('zlib');

var readStream = fs.createReadStream('input.txt');
var writeStream = fs.createWriteStream('output.txt');
readStream.pipe(writeStream);

readtxt('output.txt');

var res = fs.createReadStream('output.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('output.txt.gz'));
console.log(res);
console.log('compressed');

// fs.createReadStream('output.txt.gz').pipe(zlib.createGunzip()).pipe(fs.createWriteStream('uncompress.txt'));
// console.log('uncompressed');

// readtxt('uncompress.txt');

console.log('code end');

function readtxt(filename){
	fs.readFile(filename, function(err, data){
		if(err) return console.error(err.stack);
		console.log('readfile:');
		console.log(data.toString());
	});
}