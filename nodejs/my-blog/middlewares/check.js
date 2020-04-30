module.exports = {
	checkLogin: function checkLogin(req, res, next){
		if(!req.session.user){
			req.flash('error', '未登录');
			return res.redirect('/singn');
		}
		next()
	},
	checkNotLogin: function checkNotLogin(req, res, next){
		if(req.session.user){
			req.flash('error', '已登录');
			return res.redirect('back');  // 返回原页面
		}
		next()
	}
}