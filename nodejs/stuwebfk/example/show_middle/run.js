// run.js 是启动文件

var {App} = require('../..');           // ../../index.js
var app = new App();

var middle01 = require('./middle01');
var middle02 = require('./middle02');
app.use(middle01);
app.use(middle02);

app.get((req, res, next) => {
	console.log('get method request')
})

app.post((req, res, next) => {
	console.log('post method request')
})

app.listen(8888, () => console.log("server start at http://%s:%s", app.address().address, app.address().port));
