module.exports = {
	'GET /': async (ctx, next) => {
        let user = ctx.state.user;
        user ? ctx.render('room.html', {user: user}) : ctx.response.redirect('/signin');
    }
}