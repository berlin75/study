var util = require('util');

var buf1 = new Buffer(10);
var buf2 = new Buffer([10, 20, 30, 40, 50]);
var buf3 = new Buffer('www.baidu.com', 'utf-8');

console.log('isBuffer:', Buffer.isBuffer(buf1));
console.log('isBuffer:', util.isBuffer(buf1));

console.log(buf1, buf1.toString()); 
//<Buffer 00 00 00 00 00 00 00 00 12 00> '\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0012\u0000'
console.log(buf2, buf2.toString());
//<Buffer 0a 14 1e 28 32> '\n\u0014\u001e(2'
console.log(buf3, buf3.toString());
//<Buffer 77 77 77 2e 62 61 69 64 75 2e 63 6f 6d> 'www.baidu.com'

var buf4 = Buffer.concat([buf2,buf3]);
console.log(buf4, buf4.toString());
//<Buffer 0a 14 1e 28 32 77 77 77 2e 62 61 69 64 75 2e 63 6f 6d> '\n\u0014\u001e(2www.baidu.com'

var buf5 = buf2 + buf3;
console.log(buf5, buf5.toString());
//(2www.baidu.com
//(2www.baidu.com


var buf = new Buffer(256);
var len = buf.write('www.baidu.com');
console.log(len);
var res = buf.toString();
console.log(res);

var buf = new Buffer(26);
for (var i = 0 ; i < 26 ; i++) {
  	buf[i] = i + 97;
}
console.log( buf.toString());

var buf = new Buffer('www.runoob.com');
var json = buf.toJSON();

console.log(json);