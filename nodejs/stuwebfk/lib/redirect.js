// 跳转插件开发
// 跳转功能，顾名思义是打开一个链接，却跳转到另一个网址链接。看起来很神秘，其实都是在响应头信息做文章。
// 响应头的状态码设置为302，那么就表示要客户端进行跳转。而跳转到哪里就需要指定响应头的Location

// http://google.com  直接返回 http://google.com
// /url2 返回 http://xxxxx/url2
// url2 返回 http://xxxxx/url/url2

// var {App, static, post, query, text, redirect} = require("../.."); 
// app.use(redirect)
// app.get("/url1",function(req,res){
//     res.redirect("http://baidu.com");
// })
// app.get("/url2",function(req,res){
//     res.redirect('/1url');
// })
// app.get("/url3",function(req,res){
//     res.redirect("2url")
// })
// app.get("/1url",function(req,res){
//     res.text("1 url");
// })
// app.get("/url3/:u",function(req,res){
//     res.text(req.params.u);
// })


module.exports = function(req,res,next){
    res.redirect = function(url){
        res.writeHead(302,{Location: location(req,url)})
        res.end();
    }
    next();    
}

// 返回要跳转的URL绝对地址
function location(req,url){
    // 如果是完整的网址
    if(/^http:\/\//.test(url)){
        return url;
    }else if(/^\//.test(url)){ // 如果是本地根目录网址
        return 'http://' + req.headers.host + url;
    }else{
        return 'http://' + req.headers.host + '/' + req.url + '/' + url;
    }  
}