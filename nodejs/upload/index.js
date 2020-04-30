var http = require('http');
var fs = require('fs');

http.createServer(function(req , res){
    var imaps = req.url.split("/"); 
    var maps = [];
    imaps.forEach(function(m){
        if(m){maps.push(m)}
    });
    console.log(maps);

    switch (maps[0]||"index.html"){  // / => index.html
        case "index.html":
            var str = fs.readFileSync("./index.html");
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(str , "utf-8");
            break;

        case "upl":
            var str = fs.readFileSync("./upload.html");
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(str , "utf-8");
            break;

        case "upload":
            /*var chunks = [];
            var size = 0;
            req.on('data' , function(chunk){
                chunks.push(chunk);
                size+=chunk.length;
            });

            req.on("end",function(){
                var buffer = Buffer.concat(chunks , size);
                if(!size){
                    res.writeHead(404);
                    res.end('');
                    return;
                }

                var rems = [];

                //根据\r\n分离数据和报头
                for(var i=0;i<buffer.length;i++){
                    if(buffer[i]==13 && buffer[i+1]==10){
                        rems.push(i);
                    }
                }
                console.log(rems);

                //图片信息
                var picmsg_1 = buffer.slice(rems[0]+2,rems[1]).toString();   console.log(picmsg_1);
                var filename = picmsg_1.match(/filename=".*"/g)[0].split('"')[1];

                //图片数据
                var nbuf = buffer.slice(rems[3]+2,rems[rems.length-2]);

                var path = './databox/'+filename;
                fs.writeFileSync(path , nbuf);
                console.log("保存"+filename+"成功");

                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8'});
                res.end('<div id="path">'+path+'</div>');
            });*/

            /*
            上面是在数据接收完成上进行处理改成在接收数据的时候进行处理；如果上传的数据过大，处理速度慢，太消耗内存
            所以数据应该一边接收一边处理
            */

            var imgsays = [];
            var num = 0;
            var isStart = false;
            var ws;
            var filename;
            var path;
            req.on('data' , function(chunk){
                var start = 0;
                var end = chunk.length;
                var rems = [];

                for(var i=0;i<chunk.length;i++){
                    if(chunk[i]==13 && chunk[i+1]==10){
                        num++;
                        rems.push(i);

                        if(num==4){
                            start = i+2;
                            isStart = true;

                            var str = (new Buffer(imgsays)).toString();
                            filename = str.match(/filename=".*"/g)[0].split('"')[1];
                            path = './databox/'+filename;
                            ws = fs.createWriteStream(path);

                        }else if(i==chunk.length-2){    //说明到了数据尾部的\r\n
                            end = rems[rems.length-2];
                            break;
                        }
                    }

                    if(num<4){
                        imgsays.push(chunk[i])
                    }
                }

                if(isStart){
                    ws.write(chunk.slice(start , end));
                }
            });

            req.on("end",function(){
                ws.end();
                console.log("保存"+filename+"成功");
                res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8'});
                res.end('<div id="path">'+path+'</div>');
            });

            break;

        default :
            var path = maps.join("/");
            var value = "";
            var filename = maps[maps.length-1];
            var checkReg = /^.+.(gif|png|jpg|css|js)+$/;

            if(maps[0]=="databox"){
                checkReg = /.*/
            }

            if(checkReg.test(filename)){
                try{
                    value = fs.readFileSync(path)
                }catch(e){}
            }

            if(value){
                res.end(value);
            }else {
                res.writeHead(404);
                res.end('');
            }
            break;
    }
}).listen(8888);