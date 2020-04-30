// static.js 是静态资源服务的中间件，作为一个插件形式存在

// app.use(static(__dirname+"/public"));

const url = require("url");
const fs = require("fs");

module.exports = function static(parent_path){
    return function(req,res,next){             
       var path = url.parse(req.url).path;    // 带参数路径
       function callback(err,data){
            if(err){
                //res.statusCode = 404;
                next();                        //如果找不到资源则调用next(),由中间件处理,包括处理404
            }else{
            	res.write(data);
            	res.end();
            }
       }
       fs.readFile(parent_path + path, callback);
    }
}