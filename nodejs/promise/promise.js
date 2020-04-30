const fs = require('fs');
const path = require('path');

fs.readdir('.', function(err, files){
	if(err) return console.log(err.stack);
	console.log(files);
	// files.forEach(function(file){
	// 	var pathname = path.normalize(__dirname+ '/' + file);
	// 	fs.stat(pathname, function(err, stats){
	// 		if(stats.isFile()) console.log(pathname, stats.size);
	// 	})
	// })
	for(var file of files){
		var pathname = path.normalize(__dirname+ '/' + file);
		fs.stat(pathname, function(err, stats){
			if(stats.isFile()) console.log(pathname, stats.size);
		})
	}
})