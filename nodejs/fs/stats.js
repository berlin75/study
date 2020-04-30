const fs = require('fs');
fs.exists(__dirname + '/te', function (exists) {
    console.log(exists);
    console.log(__dirname + '/te' + (exists ? '文件存在' : '文件不存在'));
});

fs.stat('../input.txt', function(err, stats){
	if(err) return console.log(err);
	console.log(stats);
	console.log("是否为文件(isFile) ? " + stats.isFile());
    console.log("是否为目录(isDirectory) ? " + stats.isDirectory());
    for(var pro in stats) console.log(`${pro} : ${stats[pro]}`);
})

fs.utimes('../input.txt', new Date(), new Date(), function (err) {
  if(err) throw err;
  fs.stat('../input.txt', function (err, stat) {
    console.log('访问时间: ' + stat.atime.toString() + '; \n修改时间：' + stat.mtime);
    console.log(stat.mode);
  })
});