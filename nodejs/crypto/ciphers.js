var crypto = require('crypto');
// console.log(crypto.getCiphers());

/*
[ 'aes-128-cbc',
  'aes-128-cbc-hmac-sh
  'aes-128-cbc-hmac-sh
  'aes-128-ccm',
  'aes-128-cfb',
  'aes-128-cfb1',
  'aes-128-cfb8',
  'aes-128-ctr',
  'aes-128-ecb',
  'aes-128-gcm',
  'aes-128-ofb',
  'aes-128-xts',
  'aes-192-cbc',
  'aes-192-ccm',
  'aes-192-cfb',
  'aes-192-cfb1',
  'aes-192-cfb8',
  'aes-192-ctr',
  'aes-192-ecb',
  'aes-192-gcm',
  'aes-192-ofb',
  'aes-256-cbc',
  'aes-256-cbc-hmac-sh
  'aes-256-cbc-hmac-sh
  'aes-256-ccm',
  'aes-256-cfb',
  'aes-256-cfb1',
  'aes-256-cfb8',
  'aes-256-ctr',
  'aes-256-ecb',
  'aes-256-gcm',
  'aes-256-ofb',
  'aes-256-xts',
  'aes128',
  'aes192',
  'aes256',
  'bf',
  'bf-cbc',
  'bf-cfb',
  'bf-ecb',
  'bf-ofb',
  'blowfish',
  'camellia-128-cbc',
  'camellia-128-cfb',
  'camellia-128-cfb1',
  'camellia-128-cfb8',
  'camellia-128-ecb',
  'camellia-128-ofb',
  'camellia-192-cbc',
  'camellia-192-cfb',
  'camellia-192-cfb1',
  'camellia-192-cfb8',
  'camellia-192-ecb',
  'camellia-192-ofb',
  'camellia-256-cbc',
  'camellia-256-cfb',
  'camellia-256-cfb1',
  'camellia-256-cfb8',
  'camellia-256-ecb',
  'camellia-256-ofb',
  'camellia128',
  'camellia192',
  'camellia256',
  'cast',
  'cast-cbc',
  'cast5-cbc',
  'cast5-cfb',
  'cast5-ecb',
  'cast5-ofb',
  'des',
  'des-cbc',
  'des-cfb',
  'des-cfb1',
  'des-cfb8',
  'des-ecb',
  'des-ede',
  'des-ede-cbc',
  'des-ede-cfb',
  'des-ede-ofb',
  'des-ede3',
  'des-ede3-cbc',
  'des-ede3-cfb',
  'des-ede3-cfb1',
  'des-ede3-cfb8',
  'des-ede3-ofb',
  'des-ofb',
  'des3',
  'desx',
  'desx-cbc',
  'id-aes128-CCM',
  'id-aes128-GCM',
  'id-aes128-wrap',
  'id-aes192-CCM',
  'id-aes192-GCM',
  'id-aes192-wrap',
  'id-aes256-CCM',
  'id-aes256-GCM',
  'id-aes256-wrap',
  'id-smime-alg-CMS3DE
  'idea',
  ... 19 more items ]
*/

// 测试ciphers加密解密的计算时间

var fs = require('fs');

//加密
function cipher(algorithm, key, buf ,cb){
    var encrypted = "";
    var cip = crypto.createCipher(algorithm, key);
    encrypted += cip.update(buf, 'binary', 'hex');
    encrypted += cip.final('hex');
    cb(encrypted);
}

//解密
function decipher(algorithm, key, encrypted,cb){
    var decrypted = "";
    var decipher = crypto.createDecipher(algorithm, key);
    decrypted += decipher.update(encrypted, 'hex', 'binary');
    decrypted += decipher.final('binary');
    cb(decrypted);
}

function cipherDecipherFile(filename,algorithm, key){
    fs.readFile(filename, "utf-8",function (err, data) {
        if (err) throw err;
        var s1 = new Date();
        cipher(algorithm, key, data, function(encrypted){
            var s2 = new Date();
            console.log('cipher: '+algorithm+', '+(s2-s1));
            decipher(algorithm, key,encrypted,function(txt){
                var s3 = new Date();
                console.log('decipher: '+algorithm+', '+(s3-s2));
                if(algorithm == 'rc4'){
                	console.log(typeof encrypted, encrypted.length);       // string 83660
                    console.log(typeof txt, txt.length);                   // string 41830
                }
            });
        });
    });
}

var algs = ['blowfish','aes-256-cbc','cast','des','des3','idea','rc2','seed','rc4'];
var key = "abc";
var filename = "test.txt";
algs.forEach(function(name){
    cipherDecipherFile(filename,name,key);
})

/*
cipher: blowfish, 2
decipher: blowfish, 5
cipher: cast, 1
decipher: cast, 3
cipher: aes-256-cbc, 1
decipher: aes-256-cbc, 1
cipher: des3, 3
decipher: des3, 4
cipher: des, 1
decipher: des, 3
cipher: idea, 1
decipher: idea, 3
cipher: rc2, 1
decipher: rc2, 3
cipher: seed, 2
decipher: seed, 2
cipher: rc4, 0
decipher: rc4, 2
*/