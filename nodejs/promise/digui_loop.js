var fs = require("fs");
var basepath = './testdir/';

console.time('loop');
function digui(files, index){
    fs.stat(`${basepath}${files[index]}`, function(err, stats){
        if(err) return console.log(err);
        if(stats.isFile()){
            fs.readFile(`${basepath}${files[index]}`, function(err, data){
                if(err) return console.log(new Error(`错误: ${files[index]}`));
                fs.appendFile('promise_loop.txt', data.toString() + '\n\n\n', function (err) {
                    if (err) throw err;
                    console.log(files[index], data.length);
                    var next = index + 1;
                    if(next < files.length) digui(files, next)
                });
            })
        }
    })
}
fs.readdir(basepath, function(err, files){
    if(err) return console.log(err); 
    digui(files, 0);
})
console.timeEnd('loop');