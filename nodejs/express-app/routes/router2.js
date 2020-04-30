const express = require('express');
const router = express.Router();
router.get('/a', (req, res, next) => {
	res.render('index', {title: 'epxress 路由2'})
})

module.exports = router;