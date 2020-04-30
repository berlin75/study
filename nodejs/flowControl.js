/* 流程顺序控制 */

const fs = require('fs');
fs.readFile('./generator/order.json', (err, data) => {
	if(err) return console.log(err.message);
	var order = JSON.parse(data.toString());

/* 方法1 多重回调函数 顺序混乱 */
	// readFileCb(order[0], readFileCb(order[1], readFileCb(order[2], readFileCb(order[3], readFileCb(order[4])))))

/* 方法2 多重回调函数串行异步 */
	// readFileCb(order[0], () => {
	// 	readFileCb(order[1], () => {
	// 		readFileCb(order[2], () => {
	// 			readFileCb(order[3], () => {
	// 				readFileCb(order[4], () => {
				
	// 				})
	// 			})
	// 		})
	// 	})
	// })

/* 方法3 数组遍历forEach 并行异步 随机顺序 */
	// order.forEach((item, index) => {
	// 	readFileCb(item)
	// })

/* 方法4 数组遍历map,map()作用在于遍历循环之后返回新数组,此处无意义,须结合promise 随机顺序*/
	// order.map((val, index, arr) => {
	// 	fs.readFile(filename, (err, data) => {
	// 		if(err) return console.log(err.message);
	// 		console.log(data.toString() + '\n');
	// 	})
	// })

	// var mapresult = order.map((val, index, arr) => {
	// 	fs.readFile(filename, (err, data) => {
	// 		if(err) return console.log(err.message);
	// 		return data.toString() + '\n';
	// 	})
	// })

/* 方法5 递归 */
	// !function digui(index){
	// 	fs.readFile(order[index], (err, data) => {
	// 		if(err) return console.log(err.message);
	// 		console.log(data.toString() + '\n');
	// 		index++;
	// 		if(index < order.length) digui(index);
	// 	})
	// }(0);

/* 方法6 promise*/
	// readFilePromise(order[0])
	// 	.then(() => readFilePromise(order[1]))
	// 	.then(() => readFilePromise(order[2]))
	// 	.then(() => readFilePromise(order[3]))
	// 	.then(() => readFilePromise(order[4]))

/* 方法7 arr.reduce + promise 加上catch会提示错误，但不会终止程序*/
	// order.reduce((chain, val) => {
	// 	return chain.then(() => readFilePromise(val)).catch((err) => console.log(err))
	// }, Promise.resolve())

	// 简写
	// order.reduce((chain, val) => chain.then(() => readFilePromise(val)), Promise.resolve())

/* 方法8 Promise.all() 返回resolve的参数组成的数组,有一个错误则终止全部任务*/
	// var promise = order.map((val, index, arr) => {
	// 	return new Promise((resolve, reject) => {
	// 		fs.readFile(val, (err, data) => {
	// 			if(err) return reject(err.message);
	// 			console.log(data.toString() + '\n');
	// 			resolve();
	// 		})
	// 	})
	// })
	// Promise.all(promise)
	// 	// .then(data => console.log(data))
	// 	.catch(err => console.log(err))

	// var promise = order.map((val, index, arr) => {
	// 	return new Promise((resolve, reject) => {
	// 		fs.readFile(val, (err, data) => {
	// 			if(err) return reject(err.message);
	// 			resolve(data.toString());
	// 		})
	// 	})
	// })
	// Promise.all(promise).then(data => {
	// 	console.log(data.join('\n'));
	// }).catch(err => {
	// 	console.log(err);
	// })

/* 方法9 generator 并行异步*/
	// function* gen(){
	// 	for(var i = 0; i < order.length; i++ ){
	// 		yield readFileCb(order[i]);
	// 	}		
	// }
	// var g = gen();
	// var res = g.next();
	// while(!res.done){
	// 	res = g.next();
	// }

/* 方法10 async 串行异步*/
	// console.time('async1')                 // async1: 30.001ms
	// !async function logInOrder(order) {
	//     for (const filename of order) {
	//         console.log(await readFilePromise1(filename));   // string
	//     }
	// }(order).then(() => console.log('done'));
	// console.timeEnd('async1')

/* 方法10：async 并行异步串行输出 */	
	console.time('async2')                   // async2: 0.605ms
	!async function InOrder(order) {
	    const contentArr = order.map(async filename => {   
	        return await readFilePromise1(filename);       // string
	    });

	    for (const content of contentArr) {                // 按次序输出
	    	console.log(content instanceof Promise)        // true
	       await content.then(data => console.log(data))
	    }
	}(order).then(() => console.log('done'));
	console.timeEnd('async2')

})

function readFilePromise(filename){
	return new Promise((resolve, reject) => {
		fs.readFile(`nodejs/${filename}`, (err, data) => {
			if(err) return reject(err.message);
			console.log(data.toString() + '\n');
			resolve();
		})
	})
}

function readFilePromise1(filename){
	return new Promise((resolve, reject) => {
		fs.readFile(`nodejs/${filename}`, (err, data) => {
			if(err) return reject(err.message);
			resolve(data.toString());
		})
	})
}

function readFileCb(filename, cb){
	fs.readFile(`nodejs/${filename}`, (err, data) => {
		if(err) return console.log(err.message);
		console.log(data.toString() + '\n');
		cb && cb();
	})
}

