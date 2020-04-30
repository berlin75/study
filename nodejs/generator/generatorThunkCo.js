const fs = require('fs');
const thunkify = require('thunkify');
const co = require('co');

var readFileThunk = thunkify(fs.readFile);

var gen = function* () {
  var f1 = yield readFileThunk('data.json');
  var f2 = yield readFileThunk('order.json');
  console.log(f1.toString());
  console.log(f2.toString());
};

co(gen).then(() => console.log('程序执行完毕'));