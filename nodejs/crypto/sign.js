// 使用“符号”对象作为流:

// const crypto = require('crypto');
// const sign = crypto.createSign('SHA256');

// sign.write('some data to sign');
// sign.end();

// const privateKey = getPrivateKeySomehow();
// console.log(sign.sign(privateKey, 'hex'));


// 使用sign.update()和sign.sign()方法：

const crypto = require('crypto');
const sign = crypto.createSign('SHA256');

sign.update('some data to sign');

const privateKey = getPrivateKeySomehow();
console.log(sign.sign(privateKey, 'hex'));