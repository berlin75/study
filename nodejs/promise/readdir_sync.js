var fs = require("fs");

console.time('read promise.js');
var c = '';
for (var i = 100; i >= 0; i--) {
	c += fs.readFileSync('promise.js').toString();
}
console.log(c);
console.timeEnd('read promise.js');