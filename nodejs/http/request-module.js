var http = require('http');
var url  = require('url');
 
var request = function(reqUrl, data, cb, headers) {
  var dataType = typeof data;
  if(dataType == 'function') {
    headers = cb;
    cb   = data;
    rawData = null;
  }else if(dataType == 'object') {
    rawData = JSON.stringify(data);
  }else{
    rawData = data;
  }
 
  var urlObj = url.parse(reqUrl);
  var options = {
    hostname : urlObj.hostname,
    port   : urlObj.port,
    path   : urlObj.pathname,
    method  : rawData ? 'post' : 'get'
  }
  headers && (options.headers = headers);

  var req = http.request(options, function(res) {
    var chunks = [];
    if (res.statusCode !== 200) {
      cb && cb(new Error(`Request Failed,statusCode: ${res.statusCode} - ${reqUrl}`));
      return;
    }
   
    res.on('data', chunk => chunks.push(chunk));
    res.on('end', () => cb && cb(null, res, Buffer.concat(chunks)));
  })
   
  req.on('error', err => cb && cb(err));
  rawData && req.write(rawData);
  req.end();
}
