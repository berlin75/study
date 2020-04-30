const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const os = require('os');

http.createServer((req, res) => {
    if(req.url == '/'){
        var updatahtml = `
<!doctype html>
<html>
    <head><title>post</title></head>
    <body>
        <form action="http://localhost:8888/postfile" enctype="multipart/form-data" method="post">
            <p><input type="text" name="title" placeholder="title"/></p>
            <p><input type="text" name="content" placeholder="content"/></p>
            <p><input type="file" name="imgs[]"/ multiple="multiple" accept></p>
            <input  type="submit" value="postfile"/>
        </form>
        <form action="http://localhost:8888/post" method="post">
            <p><input type="text" name="title" placeholder="title"/></p>
            <p><input type="text" name="content" placeholder="content"/></p>
            <input  type="submit" value="post"/>
        </form>
    </body>
</html>
        `;
        res.end(updatahtml);
    }else if(req.url === '/postfile' || req.url === '/post'){
        var bodys = {};  
        var files = {};     // 保存请求体内容

        var chunks = [];
        var size = 0;
        req.on('data', chunk => {
            chunks.push(chunk);
            size += chunk.length;
        })
        req.on('end', () => {
            var body_data = Buffer.concat(chunks, size);
            body_data = body_data.toString();
            console.log(body_data);
            var contentType = req.headers["content-type"];
            var isMulti = /(boundary=)/gi.test(contentType);     // 判断是否有文件上传
            if(isMulti){
                var boundary = RegExp["$'"];                     // 获取边界字符串
                var boundaryStandard = "--"+boundary+os.EOL;
                var boundaryEnd = boundaryStandard+"--";         // 去掉头尾边界字符串
                body_data = body_data.substring(boundaryStandard.length,body_data.length-boundaryEnd.length);
                var fields = body_data.split(boundaryStandard);  // 利用边界字符串分割获得字段信息数组,信息头和字段以\r\n\r\n分隔

                var RN = os.EOL+os.EOL;
                fields.forEach(field => {
                    var index = field.indexOf(RN);
                    var header = field.substring(0, index);              // 获得信息头
                    /name=\"(.*?)\"/g.test(header);
                    var fieldName = RegExp.$1;                           // 获得字段名
                                           
                    var body = field.substring(index + RN.length);
                    body = body.substring(0, body.length - RN.length/2); // 获取数据体

                    var isFile = /filename=\"(.+?)\"/g.test(header);     // 判断是文件字段还是普通表单字段
                    if(isFile){
                        var onefile = {"filename": RegExp.$1, "content": body};
                        files[fieldName] ? files[fieldName].push(onefile) : files[fieldName] = [onefile];
                    }else{
                        bodys[fieldName] = body;                         // 普通字段和文件字段分开
                    } 
                })
            }else{
                bodys = querystring.parse(body_data);
            }
            console.log(files);
            console.log(bodys);
            res.end();
        })
    }
    
}).listen(8888)