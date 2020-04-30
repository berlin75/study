/* 获取目录下的文件信息，并支持命令行输入索引来查看文件信息 */

var fs = require('fs');
var stdin = process.stdin,
    stdout = process.stdout;

// 异步调用获取当前工作目录下的列表
fs.readdir(__dirname, function(err, files){
    var stats = [];
    if(!files.length) return console.log('不存在任何文件列表!');
    function file(i){
        var filename = files[i];
        fs.stat(__dirname + '/' + filename, function(err, stat){
            // 保存文件属性对象
            stats[i] = stat;
            if(err) return console.log('file read error!');
            stat.isDirectory() ? console.log(`${i}、目录: ${filename}`) : console.log(`${i}、文件: ${filename}`);
            i++;
            i === files.length ? done() : file(i);
        });
    }
    file(0);

    // 列出文件列表之后，提示输入想查看的内容
    function done(){
        stdout.write('\n输入你选择的列表序号: ');
        stdin.resume();
        stdin.setEncoding('utf8');
        stdin.on('data', function(data){
            if(!files[+data]){
                stdout.write('输入你选择的列表序号: ');
            }else{
                stdin.pause();
                // 开始读取选择的文件夹或者文件
                var filename = files[+data];
                if(stats[+data].isDirectory()){
                    // 开始读取文件夹里的内容
                    fs.readdir(__dirname + '/' + filename, function(err, files){
                        if(!err){
                            console.log('\n');
                            console.log('(' + files.length  + '个文件' + ')');
                            files.forEach(function(v){
                                console.log('      -' + v);
                            })
                            console.log('\n');
                        }
                    });
                }else{
                    // 开始读取文件
                    fs.readFile(__dirname + '/' + filename, 'utf8',  function(err, data){
                        console.log('\n');
                        console.log(data.replace(/(.*)g/, '    $1'));
                    });
                }
            }
        });
    }
});