// App.js 应用程序类,通过new App可以创建一个应用程序

var http = require("http");
var url = require('url');
var pathRegexp = require('./pathRegexp');

module.exports = App;

function App(){
    var self = this;
    this._middleList = [];          // 插件有序列表
    this._route_post_handles = [];  // 所有post请求的处理函数列表
    this._route_get_handles = [];

    // 每次触发request事件响应函数
    function handle(req,res){   
    	console.log('request: ', req.url);  

    	req.params = {};

        var middleIndex = 0;        // 插件索引
 
        // 执行这个函数时,会自动执行下一个middle插件,至于这个函数的执行,是由插件所控制
        function next(){
            middleIndex++;
            execMiddle();
        }

        execMiddle();
        // 先递归循环执行插件函数,包括静态资源中间件,静态资源存在则响应结束,否则继续执行插件至循环结束,然后根据请求方法发送响应
        function execMiddle(){
        	console.log('list: ', self._middleList);
            var middle = self._middleList[middleIndex];
            if(middle){
            	middle(req, res, next);
            	// console.log('调用了插件函数', middle)
            }else{
            	var handle;
            	var path = url.parse(req.url).pathname;    // 不带参数路径

            	// 找到路由对应的路由处理器
                function findHandle(route_handles){ 
                    for(var i=0, len=route_handles.length; i<len ; i++){
                        var route_handle = route_handles[i];
                        var pass = route_handle.route.test(path);
                        if(pass){
                            // 得到URL中对应 :XXX 的值，并保存在req.params中。
				            route_handle.route.paramNames.forEach(function(name,index){
				                req.params[name] = RegExp["$"+(index+1)];
				            })
				            handle = route_handle.handle;
                            break;
                        }
                    }    
                }
                console.log(self._route_get_handles, self._route_get_handles);
            	switch(req.method){
            		case 'GET': findHandle(self._route_get_handles); break;
            		case 'POST': findHandle(self._route_post_handles); break;
            	}
            	// console.log('post处理：', self._route_post_handles, handle);
            	if(handle){
            		handle(req, res);
            	}else{
            		res.statusCode = 404;      // 没找到指定处理器，返回404
                   	res.end(); 
            	}
            }
        }      
    }
    this._server = http.createServer(handle);
}

App.prototype.use = function(middle){         // 加入功能栈
    this._middleList.push(middle);
}

App.prototype.listen = function(){            // 监听端口
    this._server.listen.apply(this._server, arguments);
}

App.prototype.get = function(route, handle){   // 返回get请求的处理函数
    this._route_get_handles.push({route: pathRegexp(route), handle: handle})
}

App.prototype.post = function(route, handle){  // 返回post请求的处理函数
    this._route_post_handles.push({route: pathRegexp(route), handle: handle})
}

App.prototype.address = function(){
    return this._server.address();
}