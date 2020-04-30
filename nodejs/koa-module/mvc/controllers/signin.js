var get_signin = async (ctx, next) => {
    ctx.render('signin.html');
}

var post_signin = async (ctx, next) => {
    var name = ctx.request.body.name || '';
    var password = ctx.request.body.password || '';
    if(name === 'koa' && password === '123456'){
        // 登录成功:
        ctx.render('signin-ok.html', { title: 'Sign In OK', name: 'Mr Node'});
    }else{
        // 登录失败:
        ctx.render('signin-failed.html', { title: 'Sign In Failed'});
    }
}

module.exports = {
    'GET /signin': get_signin,
    'POST /signin': post_signin
}