const fetch = require('node-fetch');
var url = 'https://api.github.com/users/github';

// fetch(url)
// 	.then(res => res.json())
// 	.then(json => console.log(json))
// 	.catch(err => console.log(err))

//**************************************************

function* gen(){
	var result = yield fetch(url);
	console.log(result.bio);
}

var g = gen();
var result = g.next();
console.log(result.value);

result.value
	.then(data => data.json())
	.then(data => {
		console.log(data);
		g.next(data)
	})
	.catch(err => console.log(err))
