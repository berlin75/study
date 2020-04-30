const express = require('express');
const router = express.Router();

router.use(function(req, res, next){
	console.log('经过路由12');
	if(req.query.title == 12){
		next();
	}else{
		res.render('index', {title: '路由12提醒：您没有权限访问！'})
	}
})

router.get('/c', function(req, res, next){
	res.render('index', {title: '路由12提醒：访问成功！'})
})

module.exports = router;