var fs = require("fs");

// console.log("创建目录 ./tmp/test/");
// fs.mkdir("./tmp/test/",function(err){
//    if (err) return console.error(err);
//    console.log("目录创建成功。");
// });

var res = fs.mkdirSync("./tmp/");
console.log(res);
console.log("目录创建成功。");