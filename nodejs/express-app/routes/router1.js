const express = require('express');
const router = express.Router();

router.use(function(req, res, next){
	console.log('经过router1');
	next();
})

router.get('/a', (req, res, next) => {
	res.render('index', {title: 'epxress 路由1'})
})

const router11 = require('./router11');
router.use(router11);

const router12 = require('./router12');
router.use(router12);

module.exports = router;

/*
串行路由
http://localhost:3000/router1/a 
http://localhost:3000/router1/b
http://localhost:3000/router1/b?data=11 
http://localhost:3000/router1/c
http://localhost:3000/router1/c?data=11
http://localhost:3000/router1/c?data=11&title=12

*/