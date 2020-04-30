const fs = require('fs');
const thunkify = require('thunkify');

const readFile = thunkify(fs.readFile);
readFile('data.json')((err, data) => {
	if(err) return console.log(err);
	console.log(data.toString());
})