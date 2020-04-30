var fs = require("fs");
var basepath = './testdir/';

function promiseReadFile(filename){
	return new Promise(function(resolve, reject){
		fs.stat(`${basepath}${filename}`, function(err, stats){
			if(err) return reject(err);
			if(stats.isFile()){
				fs.readFile(`${basepath}${filename}`, function(err, data){
					if(err) reject(new Error(`错误: ${filename}`));
					console.log(filename, data.length);
					resolve();
				})
			}
		})
	})
}

fs.readdir(basepath, function(err, files){
	if(err) return console.log(err);
	promiseReadFile(files[0])
		.then(() => promiseReadFile(files[1]))
		.then(() => promiseReadFile(files[2]))
		.then(() => promiseReadFile(files[5]))
		.then(() => promiseReadFile(files[3]))
		.then(() => promiseReadFile(files[4]))
		.catch((err) => {console.log(err.message)})
})
