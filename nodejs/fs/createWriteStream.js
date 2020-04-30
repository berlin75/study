//监听writeStream对象的drain事件
var fs = require('fs');
var out = fs.createWriteStream('./test1.txt');
for(var i=0;i<10000;i++){
    //返回true或false true代表缓存区已满
    var flag = out.write(i.toString());
    console.log(flag);
}
out.on('drain',function(){
    console.log('操作系统缓存区中的数据已全部输出');
    var out = fs.createWriteStream('./test2.txt');
    for(var i=0;i<10;i++){
        var flag = out.write(i.toString());
        console.log(flag);
    }
    out.on('drain',function(){
        console.log('操作系统缓存区中的数据已全部输出');
    });
});