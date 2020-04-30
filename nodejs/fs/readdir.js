const fs = require('fs');
const path = require('path');

fs.readdir(__dirname + '/testdir/', function (err, files) {
  if(err)  return console.error(err);  
  console.log(files);
  files.forEach(function (file) {
    var filePath = path.normalize(__dirname + '/testdir/' + file); 
    fs.stat(filePath, function (err, stat) {
      if(stat.isFile())  console.log(filePath + ' is: ' + 'file');
      if(stat.isDirectory())  console.log(filePath + ' is: ' + 'dir');
    });
  });

  for (let i = 0; i < files.length; i++) {   
    var filePath = path.normalize(__dirname + '/fsDir/' + files[i]);
    fs.stat(filePath, function (err, stat) {
      console.log('let ' + i);
      console.log('let fs' + filePath);
      if(stat.isFile()) console.log(filePath + ' is: ' + 'file');
      if(stat.isDirectory()) console.log(filePath + ' is: ' + 'dir');
    });
  }

  for (var i = 0; i < files.length; i++) {
    console.log(i);
    var filePath = path.normalize(__dirname + '/fsDir/' + files[i]);
    console.log('for ' + filePath);
    fs.stat(filePath, function (err, stat) {
      if(stat.isFile()) console.log(filePath + ' is: ' + 'file');
      if(stat.isDirectory()) console.log(filePath + ' is: ' + 'dir');
    });
  }

  for (var i = 0; i < files.length; i++) {
    //使用闭包无法保证读取文件的顺序与数组中保存的致
    (function () {
      console.log('for 闭包 ' + i);
      var filePath = path.normalize(__dirname + '/fsDir/' + files[i]);
      console.log('for 闭包 ' + filePath);
      fs.stat(filePath, function (err, stat) {
        if(stat.isFile()) console.log(filePath + ' is: ' + 'file');
        if(stat.isDirectory()) console.log(filePath + ' is: ' + 'dir');
      });
    })(i);
  }
});

var arr = [1,2,3,4];
arr.forEach(function(item, index){
  setTimeout(function(){
    console.log(item);
  },1000)
})
var arr = [1,2,3,4];
for (var i = 0; i < arr.length; i++) {
  setTimeout(function(){
    console.log(i, arr[i]);
  },1000)
}