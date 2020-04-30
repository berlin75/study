// 加载依赖库
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 创建项目实例
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 定义日志和输出级别
app.use(logger('dev'));
// 定义数据解析器
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 定义cookie解析器
app.use(cookieParser());
// 定义静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
// 加载bootstrap
app.use(express.static(path.join(__dirname, 'node_modules')));

function md5hash(str){
	var crypto = require("crypto");          
	var md5hash = crypto.createHash("md5");  
	md5hash.update(str);                    
	return md5hash.digest("hex"); 
}


// 匹配路径和路由
app.get('/', (req, res)=>{ console.log('1');
	res.render('login_md5_index', {title: '登录页', message: ''})
})

app.post('/login', (req, res)=>{ console.log('1');                   
	var password = md5hash(req.body.password);
	if(req.body.username == 'admin' && password == md5hash('admin')){
		res.send({username: req.body.username, password: password})
	}else{
		res.render('login_md5_index', {title: '登录页', message: '<p class="error">用户名或密码错误！</p>'})
	}      
	
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// 开发环境，500错误处理和错误堆栈跟踪
// 生产环境，500错误处理
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('login_md5_error');
});

app.listen(8888, ()=>console.log('server start'));
