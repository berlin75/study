https://github.com/BlueSimle/RestfulApi

restful
资源
users
articles

http动词
get
post
put
delete

过滤信息
文章分页

状态码
200 
204 删除文章返回空的响应体
400
401 无授权
403 权限不足
404
500

错误处理
返回用户未登录
无权操作

返回结果
用户注册时返回用户信息
返回文章的json对象
返回文章的数组列表

api目录
.htaccess是apache的重写文件,将所有的请求转发到api/index.php中

RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(.*)$ index.php/$1 [L]
请求api目录中不存在的文件、目录,全部转发到index.php中

http://localhost/study/restful/api/articles
api目录中无articles,但是因为apache的重写,所有这些请求全部转发到index.php中

GET http://localhost/study/restful/api/articles
GET http://localhost/study/restful/api/articles/6