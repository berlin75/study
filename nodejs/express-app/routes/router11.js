const express = require('express');
const router = express.Router();

router.use(function(req, res, next){
	console.log('经过路由11');
	if(req.query.data == 11){
		next();
	}else{
		res.render('index', {title: '路由11提醒：您没有权限访问！'})
	}
})

router.get('/b', function(req, res, next){
	res.render('index', {title: '路由11提醒：访问成功！'})
})

module.exports = router;

