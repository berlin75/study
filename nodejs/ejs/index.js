const ejs = require('ejs');
const http =require('http');
const fs = require('fs');
const path = require('path');
var server = http.createServer((req,res)=>{
    var dictionary = {
        a:'ejs',
        list:['apple','banana','pear','tomato']
    };
    var target = path.join(__dirname,'./index.html');
    fs.readFile(target,(err,data)=>{
        if(err) throw err;
        var template = data.toString();
        var html = ejs.render(template,dictionary);
        res.writeHead(200,{"Content-Type":"text/html;charset=UTF8"});
        res.end(html);
    });
});
server.listen(8888,'127.0.0.1');