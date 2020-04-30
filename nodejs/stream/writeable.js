var Writable = require('stream').Writable;

console.log('请输入：');

var ws = new Writable();
ws._write = function (chunk, enc, next) {
    console.dir(chunk.toString());
    next();
};

process.stdin.pipe(ws);