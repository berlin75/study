const fs = require('fs');

function readFilePromise(filename){
	return new Promise((resolve, reject) => {
		fs.readFile(filename, (err, data) => {
			if(err) return reject(err.message);
			resolve(data);
		})
	})
}

var gen = function* () {
  var f1 = yield readFilePromise('data.json');  
  var f2 = yield readFilePromise('order.json');
  console.log(f1.toString());
  console.log(f2.toString());
};

/* 手动执行其实就是用then方法，层层层添加回调函数 */
var g = gen();    // {value: promiseObj, done: false}
g.next().value.then(data => {
	g.next(data).value.then(data => {
		g.next(data)
	})
})

/* 自动执行器 */

function run(gen){
	var g = gen();
	!function next(data){
		var result = g.next(data);
		if(result.done) return result.value;
		result.value.then(data => next(data))
	}()
}

run(gen);