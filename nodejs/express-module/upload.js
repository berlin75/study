var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var multer  = require('multer');
 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));
 
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "upload-index.htm" );
})
 
app.post('/file_upload', function (req, res) {
   console.log(req.files[0]);                    // 上传的文件信息
   var des_file = __dirname + "/" + req.files[0].originalname;
   fs.readFile( req.files[0].path, function (err, data) {
      fs.writeFile(des_file, data, function (err) {
        if(err) return console.log( err );
        response = {
          message:'File uploaded successfully', 
          filename:req.files[0].originalname
        };
        res.end( JSON.stringify( response ) );
      });
   });
})
 
var server = app.listen(8888, () => console.log("地址为 http://%s:%s", server.address().address, server.address().port))

/*
{ fieldname: 'image',
  originalname: 'ajax-loader.gif',
  encoding: '7bit',
  mimetype: 'image/gif',
  destination: '/tmp/',
  filename: '57b35d635efebab049e6b38c12f246f3',
  path: '\\tmp\\57b35d635efebab049e6b38c12f246f3',
  size: 3951 
}
*/