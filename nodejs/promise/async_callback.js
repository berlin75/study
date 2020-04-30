var fs = require("fs");
var basepath = './testdir/';

fs.readdir(basepath,function(err,files){
	if(err) return console.log(err);
    fs.readFile(basepath + files[0],function(err,data){
    	if(err) return console.log(err);
        console.log(files[0], data.length);
        fs.readFile(basepath + files[1],function(err,data){
            console.log(files[1], data.length);
            fs.readFile(basepath + files[2],function(err,data){
                console.log(files[2], data.length);
                fs.readFile(basepath + files[5],function(err,data){
	                console.log(files[5], data.length);
	                fs.readFile(basepath + files[3],function(err,data){
		                console.log(files[3], data.length);
		                fs.readFile(basepath + files[4],function(err,data){
			                console.log(files[4], data.length);
			            })
		            })
	            })
            })
        })
    })
})