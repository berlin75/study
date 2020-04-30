// var crypto = require('crypto');
// var fs = require('fs');

// function hashAlgorithm(algorithm){
// 	var t =new Date();
// 	var file = 'md5.js';
// 	var rs = fs.createReadStream(file);
// 	var shasum = crypto.createHash(algorithm);
// 	rs.on('data', data => shasum.update(data));
// 	rs.on('end', () => {
// 		var res = shasum.digest('hex');
// 		console.log(algorithm + ', ' + (new Date() - t) + ', ' + res);
// 	})
// }

// function dohash(hashs){
// 	hashs.forEach(hash => hashAlgorithm(hash))
// }

// var hashs = [ 'md5','sha','sha1','sha256','sha512','RSA-SHA','RSA-SHA1','RSA-SHA256','RSA-SHA512'];
// dohash(hashs);

/*
md5, 7, 39fb4932cfec812a3a342f90c647bbc6
sha, 9, 30051f783aa122e92b73ce3ab2b4820cd59d2035
sha1, 13, cef34f60d267d2dc8ac1cc347c7ec5dd5b5e9a9a
sha256, 15, 56858efb6859edbaf005276d1b62d91466cc7b8658e018cb1083f3618dd7423b
sha512, 15, 0c4df8cb08c1c80721d9ac271a4567cda8ae5693cab475664ee056a97c2b5de57071b4931b22c6a1bb87ddd08a401f915b0884cd90aeeee1eee90ee0764917d6
RSA-SHA, 18, 30051f783aa122e92b73ce3ab2b4820cd59d2035
RSA-SHA1, 19, cef34f60d267d2dc8ac1cc347c7ec5dd5b5e9a9a
RSA-SHA256, 20, 56858efb6859edbaf005276d1b62d91466cc7b8658e018cb1083f3618dd7423b
RSA-SHA512, 21, 0c4df8cb08c1c80721d9ac271a4567cda8ae5693cab475664ee056a97c2b5de57071b4931b22c6a1bb87ddd08a401f915b0884cd90aeeee1eee90ee0764917d6
*/

// 使用 Hash 和管道流

// const crypto = require('crypto');
// const fs = require('fs');
// const hash = crypto.createHash('sha256');

// const input = fs.createReadStream(process.argv[2]);
// input.pipe(hash).pipe(process.stdout);  // ȶ�1=z� �JA�L�@��D.[۬�w�

// ReadStream
// const filename = process.argv[2];
// const crypto = require('crypto');
// const fs = require('fs');

// const hash = crypto.createHash('sha256');

// const input = fs.createReadStream(filename);
// input.on('readable', () => {
//   const data = input.read();
//   if (data)
//     hash.update(data);
//   else {
//     console.log(`${hash.digest('hex')} ${filename}`);
//   }
// });

// 使用Hash对象作为流:

const crypto = require('crypto');
const hash = crypto.createHash('sha256');

hash.on('readable', () => {
  const data = hash.read();
  if (data) console.log(data.toString('hex'));
});

hash.write('some data to hash');
hash.end();