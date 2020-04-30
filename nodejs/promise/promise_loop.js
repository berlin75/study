/*
场景：按照章节顺序下载合并
*/

var fs = require("fs");
var basepath = './testdir/';

console.time('loop');

function promiseReadFile(filename){
	return new Promise(function(resolve, reject){
		fs.stat(`${basepath}${filename}`, function(err, stats){
			if(err) return reject(err);
			if(stats.isFile()){
				fs.readFile(`${basepath}${filename}`, function(err, data){
					if(err) reject(new Error(`错误: ${filename}`));
					fs.appendFile('promise_loop.txt', data.toString() + '\n\n\n', function () {
						console.log(filename, data.length);
					  	resolve(filename);
					});
				})
			}
		})
	})
}

fs.readdir(basepath, function(err, files){
	if(err) return console.log(err); 
    files.reduce((chain, val) => {
        console.log(chain, val);
        return chain.then(() => promiseReadFile(val));
    }, Promise.resolve())
	.then(() => console.log('done'))
    .catch((err) => console.log(err))
})

console.timeEnd('loop');
