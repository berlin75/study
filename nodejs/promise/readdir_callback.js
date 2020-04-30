var fs = require("fs");

console.time('read promise.js');
var n = 0;
var c = '';
function readfile(){
	fs.readFile('promise.js',function(err,f1){
	    c += f1.toString();
	    n++;
		if(n<100){
			readfile();
		}
	})	
}
readfile();
console.log(n, c);

console.timeEnd('read promise.js');