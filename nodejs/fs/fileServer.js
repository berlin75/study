/* 缺陷是没有根据文件名设置HTTP的Content-Type头部 */

// 引入http模块
var http = require("http"); 
var fs = require("fs");

// 创建server，指定处理客户端请求的函数
http.createServer(
    function(request, response) {
        //判断HTTP方法，只处理GET  
        if(request.method != "GET"){
            response.writeHead(403);
            response.end();
            return null;
        }

        //此处也可使用URL模块来分析URL(https://nodejs.org/api/url.html)
        var sep = request.url.indexOf('?');
        var filePath = sep < 0 ? request.url : request.url.slice(0, sep);
        console.log("GET file: " + filePath);

        //当文件存在时发送数据给客户端，否则404
        var fileStat = fs.stat("."+filePath, 
            function(err, stats){
                if(err) {
                    response.writeHead(404);
                    response.end();
                    return null;
                }
                //TODO:Content-Type应该根据文件类型设置
                response.writeHead(200, {"Content-Type": "text/plain", "Content-Length": stats.size});

                //使用Stream
                var stream = fs.createReadStream("."+filePath);

                stream.on('data',function(chunk){
                    response.write(chunk);
                });

                stream.on('end',function(){
                    response.end();
                });

                stream.on('error',function(){
                    response.end();
                });
            }
        );
    }
).listen(8000); 

console.log("Hello World start listen on port 8000");