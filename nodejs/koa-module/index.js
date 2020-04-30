const crypto = require('crypto');

crypto.pbkdf2('secret', 'salt', 100000, 64, 'sha512', (err, derivedKey) => {
  if (err) throw err;
  console.log(derivedKey.toString('hex'));  // '3745e48...08d59ae'
});

return

crypto.randomBytes(128, (err, salt) => {
  if (err) throw err;
  salt = new Buffer(salt).toString('hex');
  crypto.pbkdf2('123456', salt, 7000, 256, (err, hash) => {
    if (err) throw err;
    hash = new Buffer(hash).toString('hex');
    console.log(hash);
  })
})
