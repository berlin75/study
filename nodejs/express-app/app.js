// 加载依赖库
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 加载路由控制
var index = require('./routes/index');
var users = require('./routes/users');
var router1 = require('./routes/router1');
var router2 = require('./routes/router2');

// 创建项目实例
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 取消响应的x-powered-by字段
// app.set('x-powered-by', false);
app.disable('x-powered-by');

app.use((req, res, next)=>{
	if(req.url == '/')
	require('fs').writeFile('recode_req.js', require('util').inspect(req,{depth:null}), (err)=>console.log('ok'));
	next();
})

// uncomment(取消注释) after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// 定义日志和输出级别
app.use(logger('dev'));
// create a write stream (in append mode)
// var accessLogStream = require('fs').createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
// app.use(logger('combined', {stream: accessLogStream}))

// 定义数据解析器
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 定义cookie解析器
app.use(cookieParser());
// 定义静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
// 加载bootstrap
app.use(express.static(path.join(__dirname, 'node_modules')));

// 匹配路径和路由
app.use('/', index);       // 把index作为一个中间件，挂载到了“/”路径上
app.use('/users', users);
app.use('/router1', router1);
app.use('/router2', router2);

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
  res.render('error');
});

module.exports = app;
