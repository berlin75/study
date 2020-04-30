// 异常处理：对req的异常处理和对res的异常处理

// 如果访问的url是需要登录的才能下载的（返回重定向305到登陆界面）,可以用http请求模拟浏览器的登陆操作，这里涉及到cookie和session的一些知识

(function() {
  "use strict";
  const http = require("http");
  const fs = require("fs");
  const path = require("path");

  const urlList = [ 
  'http://pickeke3.ke12345.net/picss/2017/allimg/171022/22125111-1-12217.jpg',
  'http://pickeke3.ke12345.net/picss/2017/allimg/171022/22125111-1-23215.jpg',
  'http://pickeke3.ke12345.net/picss/2017/allimg/171022/22125111-1-3N92.jpg',
  'http://pickeke3.ke12345.net/picss/2017/allimg/171022/22125111-1-46362.jpg',
  'http://pickeke3.ke12345.net/picss/2017/allimg/171022/22125111-1-51348.jpg',
  'http://pickeke3.ke12345.net/picss/2017/allimg/171022/22125111-1-Cb6.jpg',
  'http://pickeke3.ke12345.net/picss/2017/allimg/171022/22125111-1-I109.jpg',
  'http://pickeke3.ke12345.net/picss/2017/allimg/171022/22125111-1-W4S.jpg' ];

/*
作为http.request的回调函数callback，它的声明原型决定的它只可以接受唯一一个参数res，
但是在callback函数中我们需要明确知道下载下来的数据在硬盘上存放的路径，
这个路径取决于startDownloadTask的入参dirName和index。
所以函数getHttpReqCallback就是用于创建一个闭包，将dirName和index的值写入这个闭包中。
其实我们原本并不需要getHttpReqCallback这个函数来显示的返回一个闭包，
而是可以直接使用内联匿名函数的方法实现http.request的callback
这样写的问题在于，一段异步代码强行插入原本连贯的同步代码中，但是后面加入了异常处理的代码，这一块看起来就会非常糟糕了
*/
  function getHttpReqCallback(imgSrc, dirName, index) {
    var fileName = index + "-" + path.basename(imgSrc);
    var callback = function(res) {
      // 非200处理
      console.log("request: " + imgSrc + " return status: " + res.statusCode);
      // 首先需要获取包体的总长度
      var contentLength = parseInt(res.headers['content-length']);
      var fileBuff = [];
      res.on('data', chunk => fileBuff.push(new Buffer(chunk)));
      res.on('end', () => {
        console.log("end downloading " + imgSrc);
        if (isNaN(contentLength)) {
          console.log(imgSrc + " content length error");
          return;
        }
        var totalBuff = Buffer.concat(fileBuff);
        console.log("totalBuff.length = " + totalBuff.length + " " + "contentLength = " + contentLength);
        // 在end事件的回调中，用接收到的数据总长度和响应头中的包体长度进行比较，验证响应信息是否接收完全
        // 如果收到的响应数据的长度比content-length中标记的短，通常是由于请求超时造成的，在这里我重新发起了一次请求，你也可以根据你的实际情况采取其他的做法
        if (totalBuff.length < contentLength) {
          console.log(imgSrc + " download error, try again");
          startDownloadTask(imgSrc, dirName, index);
          return;
        }
        fs.appendFile(dirName + "/" + fileName, totalBuff, function(err){});
      });
    };

    return callback;
  }

  var startDownloadTask = function(imgSrc, dirName, index) {
    console.log("start downloading " + imgSrc);
    var req = http.request(imgSrc, getHttpReqCallback(imgSrc, dirName, index));
    req.on('error', function(e){
      console.log("request " + imgSrc + " error, try again");
      // 一旦在请求阶段出现异常会自动重新发起请求,也可以在这里自行添加重试次数retryTimes上限
      // 给src容个错，传错的地址就不要下载了
      startDownloadTask(imgSrc, dirName, index);
    });
    req.end();

    // 给请求设置了一个一分钟的超时时间
    // 一旦在一分钟之内下载还没有完成，则会强制终止此次请求，这会立即触发res的end事件
    req.setTimeout(60 * 1000, function() {
      console.log("reqeust " + imgSrc " timeout, abort this reqeust");
      req.abort();
    })
  }

  urlList.forEach(function(item, index, array) {
    startDownloadTask(item, './crawler-pic4/', index);
  })
})();

// 用一个Promise开始重构,Promise封装后的结构更贴近同步代码的思维模式
// 对http.request的调用被放到了Promise的主体里面，而http.request的回调放到了Promise的then函数里
// 进一步的实现了请求的发起和请求结果处理之间的解耦
// 最终的结果就是这样，我们有了三个各自独立的函数：startRequest、solveResponse、solveResData，每一个函数各自处理从请求的发起，到接收响应，到保存最终响应结果中的某一个阶段。由于拆成了3个函数，所以每一个函数的结构都不是很复杂难懂。最后通过一组Promise链式调用将3个实际是并发执行的过程用一个看似串联的结构组织起来

(function() {
  "use strict";
  const http = require("http");
  const fs = require("fs");
  const path = require("path");

  const urlList = [
    "http://content.battlenet.com.cn/wow/media/wallpapers/patch/fall-of-the-lich-king/fall-of-the-lich-king-1920x1080.jpg",
    "http://content.battlenet.com.cn/wow/media/wallpapers/patch/black-temple/black-temple-1920x1200.jpg",
    "http://content.battlenet.com.cn/wow/media/wallpapers/patch/zandalari/zandalari-1920x1200.jpg",
    "http://content.battlenet.com.cn/wow/media/wallpapers/patch/rage-of-the-firelands/rage-of-the-firelands-1920x1200.jpg",
    "http://content.battlenet.com.cn/wow/media/wallpapers/patch/fury-of-hellfire/fury-of-hellfire-3840x2160.jpg",
  ];

  function getHttpReqCallback(imgSrc, dirName, index) {
    var fileName = index + "-" + path.basename(imgSrc);
    var callback = function(res) {
      console.log("request: " + imgSrc + " return status: " + res.statusCode);
      var contentLength = parseInt(res.headers['content-length']);
      var fileBuff = [];
      res.on('data', function (chunk) {
        var buffer = new Buffer(chunk);
        fileBuff.push(buffer);
      });
      res.on('end', function() {
        console.log("end downloading " + imgSrc);
        if (isNaN(contentLength)) {
          console.log(imgSrc + " content length error");
          return;
        }
        var totalBuff = Buffer.concat(fileBuff);
        console.log("totalBuff.length = " + totalBuff.length + " " + "contentLength = " + contentLength);
        if (totalBuff.length < contentLength) {
          console.log(imgSrc + " download error, try again");
          startDownloadTask(imgSrc, dirName, index);
          return;
        }
        fs.appendFile(dirName + "/" + fileName, totalBuff, function(err){});
      });
    };

    return callback;
  }

  var startDownloadTask = function(imgSrc, dirName, index) {

    function startRequest(imgSrc) {
      return new Promise(function(resolve, rej) {
        var req = http.request(imgSrc, resolve);
        req.on('error', function(e){
          console.log("request " + imgSrc + " error, try again");
          startDownloadTask(imgSrc, dirName, index);
        });
        req.end();
      });
    }

    function solveResponse(res) {
      console.log("request: " + imgSrc + " return status: " + res.statusCode);
      var contentLength = parseInt(res.headers['content-length']);
      var fileBuff = [];
      return new Promise(function(resolve, rej){
        res.on('data', function (chunk) {
          var buffer = new Buffer(chunk);
          fileBuff.push(buffer);
        });
        res.on('end', function() {
          resolve({"contentLength": contentLength, "fileBuff": fileBuff})
        });
      });
    }

    function solveResData(data) {
      var contentLength = data.contentLength;
      var fileBuff = data.fileBuff;
      var fileName = index + "-" + path.basename(imgSrc);
      console.log("end downloading " + imgSrc);
      if (isNaN(contentLength)) {
        console.log(imgSrc + " content length error");
        return;
      }
      var totalBuff = Buffer.concat(fileBuff);
      console.log("totalBuff.length = " + totalBuff.length + " " + "contentLength = " + contentLength);
      if (totalBuff.length < contentLength) {
        console.log(imgSrc + " download error, try again");
        startDownloadTask(imgSrc, dirName, index);
        return;
      }
      fs.appendFile(dirName + "/" + fileName, totalBuff, function(err){});
    }

    console.log("start downloading " + imgSrc);

    startRequest(imgSrc)
      .then(solveResponse)
      .then(solveResData);

  }

  urlList.forEach(function(item, index, array) {
    startDownloadTask(item, './', index);
  })
})();

