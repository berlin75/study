// 给ctx对象绑定一个render(view, model)的方法，这样，后面的Controller就可以调用这个方法来渲染模板了

const nunjucks = require('nunjucks');

function createEnv(path, opts) {
    var autoescape = opts.autoescape === undefined ? true : opts.autoescape;
    var noCache = opts.noCache || false;
    var watch = opts.watch || false;
    var throwOnUndefined = opts.throwOnUndefined || false;
    var env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path || 'views', {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

function templating(path, opts) {
    // 创建Nunjucks的env对象
    var env = createEnv(path, opts);
    return async (ctx, next) => {
        // 给ctx绑定render函数
        ctx.render = function (view, model) {
            // 拷贝对象属性是为了扩展,把一些公共的变量放入ctx.state并传给View
            // 例如，某个middleware负责检查用户权限，它可以把当前用户放入ctx.state中
            // if (user) { ctx.state.user = user; await next();
            // } else { ctx.response.status = 403; }
            // 这样就没有必要在每个Controller的async函数中都把user变量放入model中
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
            // 设置Content-Type
            ctx.response.type = 'text/html';
        };
        // 继续处理请求
        await next();
    };
}

module.exports = templating;