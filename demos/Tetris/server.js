require('http').createServer((req,res) => {
  require('fs').readFile('index.html', (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading');
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    if(req.url == 'buffer'){
      res.write(data);
    }else{
      res.write(data.toString());
    }
    res.end();
  });
}).listen(8888);