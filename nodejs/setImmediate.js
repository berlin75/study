const http = require('http');
const fs = require('fs');
http.createServer(function(request,response){  
    response.writeHead(200,{"Content-Type":"text/html;charset = utf-8"});  
    if(request.url !== "/favicon.ico"){  
        fs.stat("console.js",function(err,stats){  
            if(stats)  console.log("console.js Exists"); 
        });  
        setImmediate(function(){  
            console.log("Immediate Timer is 1 Executed");  
        });  
        setImmediate(function(){  
            console.log("Immediate Timer is 2 Executed");  
        });  
        process.nextTick(function(){  
            console.log("Next Tick 1 Executed");  
        });  
        process.nextTick(function(){  
            console.log("Next Tick 2 Executed");  
        });  
          
        response.end();  
    }  
}).listen(8888);  
console.log("start running......"); 