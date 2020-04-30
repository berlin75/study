const http = require("http");
const fs = require("fs");
const path = require("path");
var imgSrc = 'http://pickeke3.ke12345.net/picss/2017/allimg/171022/22125111-1-W4S.jpg';

function getHttpReqCallback(imgSrc, dirName) {
    var fileName = path.basename(imgSrc);
    var callback = function(res) {
      	console.log("request: " + imgSrc + " return status: " + res.statusCode);
      	var contentLength = parseInt(res.headers['content-length']);
      	console.log(res.req.agent.options);
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
          	startDownloadTask(imgSrc, dirName);
          	return;
        }
        fs.appendFile(dirName + "/" + fileName, totalBuff, function(err){});
      });
    };
    return callback;
}

var startDownloadTask = function(imgSrc, dirName) {
	console.log("start downloading " + imgSrc);
	var req = http.request(imgSrc, getHttpReqCallback(imgSrc, dirName));
	req.on('error', function(e){
	  	console.log("request " + imgSrc + " error, try again");
	  	startDownloadTask(imgSrc, dirName);
	});
	req.end();
}

startDownloadTask(imgSrc, './');