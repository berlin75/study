models: 存放操作数据库的文件
public: 存放静态文件，如样式、图片等
routes: 存放路由文件
views: 存放模板文件
index.js: 程序主文件
package.json: 存储项目名、描述、作者、依赖等等信息


遵循了 MVC（模型(model)－视图(view)－控制器(controller/route)） 的开发模式

npm i config-lite connect-flash connect-mongo ejs express express-formidable express-session marked moment mongolass objectid-to-timestamp sha1 winston express-winston --save

express: web 框架
express-session: session 中间件
connect-mongo: 将 session 存储于 mongodb，结合 express-session 使用
connect-flash: 页面通知的中间件，基于 session 实现
ejs: 模板
express-formidable: 接收表单及文件上传的中间件
config-lite: 读取配置文件
marked: markdown 解析
moment: 时间格式化
mongolass: mongodb 驱动
objectid-to-timestamp: 根据 ObjectId 生成时间戳
sha1: sha1 加密，用于密码加密
winston: 日志
express-winston: express 的 winston 日志中间件


配置与代码分离是一个非常好的做法。我们通常将配置写到一个配置文件里，如 config.js 或 config.json ，并放到项目的根目录下
本地开发环境、测试环境和线上环境等，不同环境的配置不同（如：MongoDB 的地址），我们不可能每次部署时都要去修改引用 config.test.js 或者 config.production.js。config-lite 模块正是你需要的

config-lite 是一个轻量的读取配置文件的模块。config-lite 会根据环境变量（NODE_ENV）的不同加载 config 目录下不同的配置文件。如果不设置 NODE_ENV，则读取默认的 default 配置文件，如果设置了 NODE_ENV，则会合并指定的配置文件和 default 配置文件作为配置，config-lite 支持 .js、.json、.node、.yml、.yaml 后缀的文件。

如果程序以 NODE_ENV=test node app 启动，则 config-lite 会依次降级查找 config/test.js、config/test.json、config/test.node、config/test.yml、config/test.yaml 并合并 default 配置; 如果程序以 NODE_ENV=production node app 启动，则 config-lite 会依次降级查找 config/production.js、config/production.json、config/production.node、config/production.yml、config/production.yaml 并合并 default 配置。

config-lite 还支持冒泡查找配置，即从传入的路径开始，从该目录不断往上一级目录查找 config 目录，直到找到或者到达根目录为止。

【功能和路由设计】
只实现了博客最基本的功能，其余的功能（如归档、标签、分页等等）读者可自行实现

通过引入 express-session 中间件实现对会话的支持：
app.use(session(options))
session 中间件会在 req 上添加 session 对象，即 req.session 初始值为 {}，当我们登录后设置 req.session.user = 用户信息，返回浏览器的头信息中会带上 set-cookie 将 session id 写到浏览器 cookie 中，那么该用户下次请求时，通过带上来的 cookie 中的 session id 我们就可以查找到该用户，并将用户信息保存到 req.session.user

通知只显示一次，刷新后消失，我们可以通过 connect-flash 中间件实现这个功能。

connect-flash 是基于 session 实现的，它的原理很简单：设置初始值 req.session.flash={}，通过 req.flash(name, value) 设置这个对象下的字段和值，通过 req.flash(name) 获取这个对象下的值，同时删除这个字段，实现了只显示一次刷新后消失的功能。

【权限控制】

不管是论坛还是博客网站，我们没有登录的话只能浏览，登陆后才能发帖或写文章，即使登录了你也不能修改或删除其他人的文章，这就是权限控制。我们也来给博客添加权限控制，如何实现页面的权限控制呢？我们可以把用户状态的检查封装成一个中间件，在每个需要权限控制的路由加载该中间件，即可实现页面的权限控制


将 blog 变量挂载到 app.locals 下，将 user、success、error 挂载到 res.locals 下
优先级：res.render 传入的对象> res.locals 对象 > app.locals 对象
都用来渲染模板，使用上的区别在于：app.locals 上通常挂载常量信息（如博客名、描述、作者这种不会变的信息），res.locals 上通常挂载变量信息，即每次请求可能的值都不一样（如请求者信息，res.locals.user = req.session.user）

我们使用 express-formidable 处理表单的上传，表单普通字段挂载到 req.fields 上，表单上传后的文件挂载到 req.files 上，文件存储在 public/img 目录下。然后校验了参数，校验通过后将用户信息插入到 MongoDB 中，成功则跳转到主页并显示『注册成功』的通知，失败（如用户名被占用）则跳转回注册页面并显示『用户名已被占用』的通知。

req.files 
{ avatar:
   File {
     domain: null,
     _events: {},
     _eventsCount: 0,
     _maxListeners: undefined,
     size: 153936,
     path: 'E:\\wamp64\\www\\study\\nodejs\\myblog\\public\\img\\upload_639870c78769f283627e22794f823eec.jpg',
     name: '1545334.jpg',
     type: 'image/jpeg',
     hash: null,
     lastModifiedDate: 2017-12-07T11:18:11.745Z,
     _writeStream:
      WriteStream {
        _writableState: [Object],
        writable: false,
        domain: null,
        _events: {},
        _eventsCount: 0,
        _maxListeners: undefined,
        path: 'E:\\wamp64\\www\\study\\nodejs\\myblog\\public\\img\\upload_639870c78769f283627e22794f823eec.jpg',
        fd: null,
        flags: 'w',
        mode: 438,
        start: undefined,
        autoClose: true,
        pos: undefined,
        bytesWritten: 153936,
        closed: true 
      } 
    } 
}

注意：我们使用 sha1 加密用户的密码，sha1 并不是一种十分安全的加密方式，实际开发中可以使用更安全的 bcrypt 或 scrypt 加密。 注意：注册失败时（参数校验失败或者存数据库时出错）删除已经上传到 public/img 目录下的头像

