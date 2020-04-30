const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const sha1 = require('sha1');
const UserModel = require('../models/users');
const checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signup
router.get('/', checkNotLogin, (req, res, next) => {
	res.render('signup');
})

// POST /signup
router.post('/', checkNotLogin, (req, res, next) => {
	// console.log(req.fields, req.files);
	const name = req.fields.name;
	let password = req.fields.password;
	const repassword = req.fields.repassword;
	const gender = req.fields.gender;
	const avatar = req.files.avatar;
	const bio = req.fields.bio;

	try{
		if(name.length < 1 || name.length > 10)       throw new Error('名字只能限制在 1-10个字符');
		else if(password.length < 5)                  throw new Error('密码至少 5 个字符');	
		else if(password !== repassword)              throw new Error('两次输入的密码不一致');	
		else if(['m','f','x'].indexOf(gender) === -1) throw new Error('性别只能是男、女或保密');
		else if(bio.length < 1 || name.length > 30)   throw new Error('简介只能限制在 1-30个字符');
		else if(!avatar.name)                         throw new Error('请上传头像');
	}catch(e){
		fs.unlink(avatar.path, err=> err && console.log(err));
		req.flash('error', e.message);
		return res.redirect('/signup');
	}

	let user = {
		name: name,
		password: sha1(password),
		avatar: avatar.path.split(path.sep).pop(),
		gender: gender,
		bio: bio 
	}
	UserModel.create(user)
		.then(result => {
			// console.log(result);
			user = result.ops[0];
			delete user.password;
			req.session.user = user;
			console.log(req.session)
			req.flash('success', '注册成功');
			res.redirect('/posts');
		})
		.catch(e => {
			// console.log(e);
			fs.unlink(avatar.path, err=> err && console.log(err));
			if(e.message.match('duplicate key')){
				req.flash('error', '用户名已被占用');
				return res.redirect('/signup');
			}
			next(e);
		})
})

module.exports = router;