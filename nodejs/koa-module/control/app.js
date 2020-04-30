const Koa = require('koa');
// 注意require('koa-router')返回的是函数,函数调用
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const app = new Koa();

app.use(bodyParser());

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// 导入controller middleware:
const controller = require('./controller');

// add router middleware:
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');