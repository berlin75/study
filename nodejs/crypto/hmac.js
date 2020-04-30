// var crypto = require('crypto');
// var fs = require('fs');

// function hmacAlgorithm(algorithm, key){
// 	var t =new Date();
// 	var file = 'md5.js';
// 	var rs = fs.createReadStream(file);
// 	var shasum = crypto.createHmac(algorithm, key);
// 	rs.on('data', data => shasum.update(data));
// 	rs.on('end', () => {
// 		var res = shasum.digest('hex');
// 		console.log(algorithm + ', ' + (new Date() - t) + ', ' + res);
// 	})
// }

// function doHmac(hashs, key){
// 	console.log(`\nKey : ${key} \n===============================`);
// 	hashs.forEach(hash => hmacAlgorithm(hash, key))
// }

// var hashs = [ 'md5','sha','sha1','sha256','sha512','RSA-SHA','RSA-SHA1','RSA-SHA256','RSA-SHA512'];

// // 短key测试
// setTimeout(() => doHmac(hashs, 'abc'), 1);
// // 长key测试
// setTimeout(() => doHmac(hashs, 'jifdkd;adkfaj^&fjdifefdafda,ijjifdkd;adkfaj^&fjdifefdafdaljifdkd;adkfaj^&fjdifefdafda'), 2*1000);

/*
Key : abc
===============================
md5, 6, d839b63bb37b1f8ca1a559957f93fc2b
sha, 7, 2fbc426f327260d7930b000074b102d90d959898
sha1, 8, d3b6bfa87d35926a57d8b1f1004e6507ef5aadb5
sha256, 8, b72b1ea0c751e2153cd95e4e477572adf8d1af81baaf66ac917875823620fe79
sha512, 10, 7dad7f82e880dae5fbef7a429006ea20a82d0558a74d8655e85c981f007701473800ad375ad2ac7f4fbc4ad7197efa02c8e185978220fe8b98899b434a9027fd
RSA-SHA, 11, 2fbc426f327260d7930b000074b102d90d959898
RSA-SHA1, 12, d3b6bfa87d35926a57d8b1f1004e6507ef5aadb5
RSA-SHA256, 12, b72b1ea0c751e2153cd95e4e477572adf8d1af81baaf66ac917875823620fe79
RSA-SHA512, 13, 7dad7f82e880dae5fbef7a429006ea20a82d0558a74d8655e85c981f007701473800ad375ad2ac7f4fbc4ad7197efa02c8e185978220fe8b98899b434a9027fd

Key : jifdkd;adkfaj^&fjdifefdafda,ijjifdkd;adkfaj^&fjdifefdafdaljifdkd;adkfaj^&fjdifefdafda
===============================
md5, 2, 9292ab58eaa3a42a7c03b78edc133f09
sha, 2, 8cd5fa5be4d092fe45cf0d2421f79f8d50963b1e
sha1, 3, 338aac61a72190b2e68b897190163ac5fe53e8de
sha256, 4, 0b5cb71b67c2fbfbd191d39fbe8b7f00172b468ec1c17b9a520d9e3f318f994b
sha512, 5, 5664e7adecc33a412ae20040801241c05c97a94f9b5ee968bb714234dedc6f759642798401f5f3198c2fd361b94a4c4c1c1bc28d7b3e77ab9e0f2d74adc8045d
RSA-SHA, 6, 8cd5fa5be4d092fe45cf0d2421f79f8d50963b1e
RSA-SHA1, 7, 338aac61a72190b2e68b897190163ac5fe53e8de
RSA-SHA256, 9, 0b5cb71b67c2fbfbd191d39fbe8b7f00172b468ec1c17b9a520d9e3f318f994b
RSA-SHA512, 10, 5664e7adecc33a412ae20040801241c05c97a94f9b5ee968bb714234dedc6f759642798401f5f3198c2fd361b94a4c4c1c1bc28d7b3e77ab9e0f2d74adc8045d
*/

// generating the sha256 HMAC of a file

const filename = process.argv[2];
const crypto = require('crypto');
const fs = require('fs');

const hmac = crypto.createHmac('sha256', 'a secret');

const input = fs.createReadStream(filename);
input.on('readable', () => {
  const data = input.read();
  if (data)
    hmac.update(data);
  else {
    console.log(`${hmac.digest('hex')} ${filename}`);
  }
});