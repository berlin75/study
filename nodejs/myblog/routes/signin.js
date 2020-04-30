const express = require('express');
const router = express.Router();
const sha1 = require('sha1');
const UserModel = require('../models/users');
const checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signin
router.get('/', checkNotLogin, (req, res, next) => {
	res.render('signin');
})

// POST /signin
router.post('/', checkNotLogin, (req, res, next) => {
	const name = req.fields.name;
	let password = req.fields.password;
	try{
		if(!name.length)           throw new Error('请填写用户名');
		else if(!password.length)  throw new Error('请填写密码');	
	}catch(e){
		req.flash('error', e.message);
		return res.redirect('back');
	}

	UserModel.getUserByName(name)
		.then(user => {
			if(!user){
				req.flash('error', '用户名不存在');
				return res.redirect('back');
			}
			if(sha1(password) !== user.password){
				req.flash('error', '用户名或密码错误');
				return res.redirect('back');
			}
			req.flash('success', '登录成功');
			delete user.password;
			req.session.user = user;
			res.redirect('/posts');
		})
		.catch(next)
})

module.exports = router;