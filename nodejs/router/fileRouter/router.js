//获取http模块
var http = require("http");
//文件模块
var fs = require('fs');

//主页路由模块,file文件夹里的index.js文件
var index = require('./file/index');
//错误处理文件路径
var error = "./file/error404.html";
//春晓页面路径
var cx = "./file/cunxiao.html";

//函数Response，将HTML、css、js等文件响应给客户端
var Response = function(res,filePath){
    //读取文件，读取完成后给客户端响应
    fs.readFile(filePath,function(err,data){
        if(err){                        //如果失败，就返回错误文件
            if(filePath != error)       //如果失败的不是错误文件，才返回错误文件
                Response(res,error);
        }else{
            res.writeHead(200,{'Content-type':"text/html"}); //响应客户端，将文件内容发回去
            res.end(data);
        }
    });
};
//404错误响应文件
var error404 = function(res){
   Response(res,error);
};

//创建HTTP服务器
var server = http.createServer(function(req,res){
   console.log(req.url);               //在控制台打印请求
    //判断URL，提供不同的路由
    if(req.url == '/index' || req.url == '/') {    //主页
        index.index(res);
    }
    else if(req.url == '/chunxiao') {   //访问cunxiao.html（特意使用中文命名）
       Response(res,cx);
    }
    else {                              //访问其它静态文件，如/stylesheets/index.css
        Response(res,"./file"+req.url);
    }
});

//启动服务器
server.listen(8888,function(){
    console.log("Server 127.0.0.1:8888 starting ... ");
});