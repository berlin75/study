module.exports = {
	checkLogin: function checkLogin(req, res, next){
		if(!req.session.user){
			req.flash('error', '未登录');
			return res.redirect('/signin');
		}
		next();
	},
	checkNotLogin: function checkNotLogin(req, res, next){
		if(req.session.user){
			req.flash('error', '已登录');  // 已登录用户就禁止访问登录、注册页面
			return res.redirect('back');
		}
		next();
	}
}