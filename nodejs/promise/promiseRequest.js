const http = require('http');

function sendRequest(){
    return new Promise(function(resolve, reject){
        var req = http.request(options, function(res){
            var data = '';
            res.on('data', function(chunk){
                data += chunk;
            });
            res.on('end', function(){
                resolve(data);          //成功后调用
            });
        });
        req.on('error', function(err){
            reject(err);                 //失败后调用
        });
        req.end();
    });
}

sendRequest().then(function(data){
    console.log(data);
}).catch(function(err){
    console.log(err);
});