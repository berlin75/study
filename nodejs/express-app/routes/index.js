var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// http://localhost:3000/query?q=123&w=456
router.get('/query', function (req, res, next) {  
  console.log('get请求参数对象 :',req.query);  
  console.log('post请求参数对象 :',req.body);  
  console.log('q的值为 :',req.query.q);  
  res.end();
});

router.get('/ejs', function (req, res, next) {  
  	req.titles = [  
	    {name:'nodejs官网',url:'http://nodejs.org/'},  
	    {name:'express官网',url:'http://www.expressjs.com.cn/'},  
	    {name:'ejs官网',url:'http://www.embeddedjs.com/'},  
	    {name:'javascript官网',url:'http://www.w3school.com.cn/js/'}  
	];  
 	res.render('ejs',req); 
});


module.exports = router;
