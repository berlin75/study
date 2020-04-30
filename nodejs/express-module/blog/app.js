// 加载依赖库
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
 
// 设定port变量，意为访问端口
app.set('port', process.env.PORT || 8888);
 
// 设定views变量，意为视图存放的目录
app.set('views', path.join(__dirname, 'views'));
 
// 设定view engine变量，意为网页模板引擎
app.set('view engine', 'ejs');
 
// uncomment after placing your favicon in /public
// 定义icon图标
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
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

var blog_data = require('./blog_data');
app.get('/', (req, res)=>{
	res.render('index', {title: '首页', entries: blog_data.getBlogEntries()})
})

app.get('/article/:id', (req, res)=>{
	var id = req.params.id;
	if(id){
		res.render('article', {title: '内容页', entry: blog_data.getBlogEntry(id)})
	}else{
		res.redirect("/");
	}
	
})
 
// 设定静态文件目录，比如本地文件
// 目录为demo/public/images，访问网址则显示为http://localhost:3000/images
app.use(express.static(path.join(__dirname, 'public')));
// 调用实例方法listen，让其监听事先设定的端口
app.listen(app.get('port'));