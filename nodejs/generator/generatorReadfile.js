function readFile(filename){
	const fs = require('fs');
	return new Promise((resolve, reject) => {
		fs.readFile(filename, (err, data) => {
			if(err) return reject(err);
			resolve(data);
		})
	})
}

function* async(){
	var f = yield readFile('./order.json');
	return f;
}

var gen = async();
var res = gen.next();
console.log(res.value);
res.value
	.then((data) => console.log(data.toString()))
	.catch((err) => console.log(err.message))
var res = gen.next('done');
console.log(res.value);