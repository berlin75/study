var fs = require("fs");
var basepath = './testdir/';

function readfile(filename, cb){ 
	fs.stat(`${basepath}${filename}`, function(err, stats){
		if(err) return console.log(err);
		if(stats.isFile()){
			fs.readFile(`${basepath}${filename}`, function(err, data){
				if(err) return console.log(err);
				console.log(filename, data.length);
				cb && cb();
			})
		}
	})
}

fs.readdir(basepath, function(err, files){ 
	if(err) return console.log(err);
	readfile(files[0], function(){
		readfile(files[1], function(){
			readfile(files[2], function(){
				readfile(files[5], function(){
					readfile(files[3], function(){
						readfile(files[4], function(){
						});
					});
				});
			});
		});
	});
})
