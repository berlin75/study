const fs = require('fs');

var filename = 'data.json';

var callback = (err, data) => {
	if(err) return console.log(err);
	console.log(data.toString());
}

const Thunk = function(fn){
	return function(...args){
		return function(callback){
			return fn.call(this, ...args, callback);
		}
	}
}

var readFileThunk = Thunk(fs.readFile);
readFileThunk(filename)(callback)