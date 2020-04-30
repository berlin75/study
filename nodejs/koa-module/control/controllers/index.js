var fn_index = async (ctx, next) => {
    ctx.response.body = `<p><a href="hello/koa">hello</a></p><p><a href="signin">signin</a></p>`;
};

module.exports = {
    'GET /': fn_index,
    'GET /index': fn_index
};