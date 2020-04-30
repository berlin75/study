// index.js 是整个模块的出口，这样就可以通过 require("stuwebfk").App 和 require("stuwebfk").static 访问了
// 框架默认加载执行的模块,导出函数则要等调用才会执行

exports.App = require('./lib/App');
exports.static = require('./lib/static');       // 静态资源
exports.query = require('./lib/query');
exports.post = require('./lib/post');           // post方法
exports.text = require("./lib/text");           // 渲染文本
exports.redirect = require("./lib/redirect");   // 页面跳转
exports.download = require("./lib/download");   // 下载插件
exports.view = require("./lib/view");           // 模板渲染插件
exports.session = require("./lib/session");     // session插件