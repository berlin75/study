const fs = require('fs');
const thunkify = require('thunkify');
var readFileThunk = thunkify(fs.readFile);

function* gen (){
	var r1 = yield readFileThunk('data.json');
	console.log(r1.toString());
	var r2 = yield readFileThunk('order.json');
	console.log(r2.toString());
}

// 手动执行
// var g = gen();
// var r1 = g.next();
// r1.value((err, data) => {
// 	if(err) return console.log(err);
// 	var r2 = g.next(data);
// 	r2.value((err, data) => {
// 		if(err) return console.log(err);
// 		g.next(data);
// 	})
// })

// 自动执行
// 基于Thunk函数的 Generator 执行器
function run(fn) {
  	var g = fn();
  	!function next(err, data) {      // 内部的next函是Thunk的回调函数
    	var result = g.next(data);
    	if (result.done) return;
    	result.value(next);           // 递归
  	}();
}

run(gen);