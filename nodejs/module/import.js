import {fs} from 'fs';
fs.readFile('hello', (err, data) => {
	if(err) return console.log(err);
	console.log(data)
})