var formidable = require('formidable');
var http = require('http');
var util = require('util');
http.createServer(function(req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = "./databox";
    form.multiples = true;
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.end('success');
      console.log(util.inspect(fields));
      console.log(util.inspect(files));
    });
    return;
  }
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
}).listen(8888);

/*
{ title: '&#26631;&#39064;' }
{ upload:
   [ File {
       domain: null,
       _events: {},
       _eventsCount: 0,
       _maxListeners: undefined,
       size: 172406,
       path: 'databox\\upload_b3aedab0dc77c0dd65ed6a43a7224de3.png',
       name: '4.16check.png',
       type: 'image/png',
       hash: null,
       lastModifiedDate: 2017-12-29T05:24:24.170Z,
       _writeStream: [Object] },
     File {
       domain: null,
       _events: {},
       _eventsCount: 0,
       _maxListeners: undefined,
       size: 3951,
       path: 'databox\\upload_527f2516639c39fd56bc8c6a6b1d0502.gif',
       name: 'ajax-loader.gif',
       type: 'image/gif',
       hash: null,
       lastModifiedDate: 2017-12-29T05:24:24.171Z,
       _writeStream:
      WriteStream {
        _writableState: [Object],
        writable: false,
        domain: null,
        _events: {},
        _eventsCount: 0,
        _maxListeners: undefined,
        path: 'databox\\upload_527f2516639c39fd56bc8c6a6b1d0502.gif',
        fd: null,
        flags: 'w',
        mode: 438,
        start: undefined,
        autoClose: true,
        pos: undefined,
        bytesWritten: 3951,
        closed: true 
      } 
     } 
   ] 
}
*/