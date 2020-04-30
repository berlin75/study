var exec = require("child_process").exec;
var child = exec("dir",function(err,stdout,stderr){
    console.log(stdout);
});

//例
// var cdr = require("child_process");
// cdr.exec("start https://www.baidu.com")

//例
// var exec = require("child_process").exec;
// exec('"/path/to/test file/test.sh" arg1 arg2'); // 使用双引号这样路径中的空格就不会被解释为多个参数
// exec('echo "The \\$HOME variable is $HOME"');   // 第一个 $HOME 被转义了，但第二个没有

//例
// const { exec } = require('child_process');
// exec('cat *.js bad_file | wc -l', (error, stdout, stderr) => {
//   if (error) {
//     console.error(`exec error: ${error}`);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   console.log(`stderr: ${stderr}`);
// });