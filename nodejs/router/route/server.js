/* server.js 通过请求的 URL 路径来区别不同请求 */
var http=require("http");   
var url=require("url");   
  
function start(route,handle){   
    function onRequest(request,response){   
        var pathname=url.parse(request.url).pathname;   
        console.log("Request for " + pathname);   
        route(handle, pathname, response);      
    }   
    http.createServer(onRequest).listen(8888, () => console.log("Server has started..."));   
}    
exports.start=start;