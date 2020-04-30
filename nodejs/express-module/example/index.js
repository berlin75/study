var express = require('express');
// console.log(express);
var app = express();
// console.log(app);
var fs = require('fs');


// 设置静态文件路径
app.use(express.static('public'));  

//  主页输出 "Hello World"
app.get('/', function (req, res) {
   console.log("主页 GET 请求");
   res.send('Hello GET');
})
 
//  POST 请求
app.post('/', function (req, res) {
   console.log("主页 POST 请求");
   res.send('Hello POST');
})
 
//  /list_user 页面 GET 请求
app.get('/list_user', function (req, res) {
   console.log("/list_user GET 请求");
   fs.readFile(__dirname + '/' + 'user.json', 'utf-8', function(err, data){
   		if(err) return console.log(err.stack);
   		console.log(typeof data, data);
   		res.send(data);
   })
})

//  /add_user 页面响应
var user = {
	'user4': { 'name': 'mohit', 'password': 'password4', 'profession': 'teacher', 'id': 4 }
};

app.get('/add_user', function(req, res){
	console.log('request for add_user');
	fs.readFile( __dirname + "/" + "user.json", 'utf8', function (err, data) {
		if(err) return console.log(err.stack);
       	data = JSON.parse( data );
       	data["user4"] = user["user4"];
       	console.log( data );
       	res.end(JSON.stringify(data));
   	});
});

//  /del_user 页面响应
app.get('/del_user', function (req, res) {
   	fs.readFile( __dirname + "/" + "user.json", 'utf8', function (err, data) {
   		if(err) return console.log(err.stack);
   		console.log("/del_user 响应 DELETE 请求");
       	data = JSON.parse( data );
       	delete data["user" + 2];      
       	console.log(data);
       	res.end(JSON.stringify(data));
   	});
})

// /:id 显示用户信息
app.get('/:id(\\d+)', function (req, res) {
	console.log('request for :id');
   	// 首先我们读取已存在的用户
   	fs.readFile( __dirname + "/" + "user.json", 'utf8', function (err, data) {
   		console.log('request for index.html');
       	data = JSON.parse( data );
       	var user = data["user" + req.params.id] 
       	console.log( user );
       	res.end( JSON.stringify(user));
   });
})
 
// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function(req, res) {   
   console.log("/ab*cd GET 请求");
   res.send('正则匹配');
})

var cookieParser = require('cookie-parser');
app.use(cookieParser());

// GET方法和cookie
app.get('/index.html', function (req, res){
	console.log('request for index.html');
	console.log('Cookies: ', req.cookies);
    res.sendFile( __dirname + "/" + "index.html" );
})
 
app.get('/process_get', function (req, res){
   	// 输出 JSON 格式
   	var response = {
       	"first_name":req.query.first_name,
       	"last_name":req.query.last_name
   	};
   	console.log(response);
   	res.end(JSON.stringify(response));
})

//POST 方法
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/process_post', urlencodedParser, function (req, res) {
 
   // 输出 JSON 格式
   var response = {
       "first_name":req.body.first_name,
       "last_name":req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

//upload
var multer  = require('multer');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));

app.post('/file_upload', function(req, res) {
   console.log(req.files[0]);  // 上传的文件信息
 
   	var des_file = __dirname + "/public/upload/" + req.files[0].originalname;
   	fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
         	if(err){
              	console.log(err.stack);
         	}else{
               	response = {
                   	message:'File uploaded successfully', 
                   	filename:req.files[0].originalname
              	};
              	console.log(response);
          		res.end( JSON.stringify(response) );
          	}          	
       });
   });
})


var server = app.listen(8888, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('应用实例，访问地址为 http://%s:%s', host, port);
	console.log(server.address());
	console.log('http://127.0.0.1:8888/images/dog.jpg');
});