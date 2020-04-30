var http = require('http');

var request_timer = null, req = null;
// 请求5秒超时
request_timer = setTimeout(function() {
    req.abort();
    console.log('Request Timeout.');
}, 5000);

var options = {
    host: 'www.google.com',
    port: 80,
    path: '/'
};
req = http.get(options, function(res) {
    clearTimeout(request_timer);

    // 等待响应60秒超时
    var response_timer = setTimeout(function() {
        res.destroy();
        console.log('Response Timeout.');
    }, 60000);

    console.log("Got response: " + res.statusCode);
    var chunks = [], length = 0;
    res.on('data', function(chunk) {
        length += chunk.length;
        chunks.push(chunk);
    });
    res.on('end', function() {
        clearTimeout(response_timer);
        var data = new Buffer(length);
        // 延后copy
        for(var i=0, pos=0, size=chunks.length; i


// 同一个服务端接口， 使用nodejs http request请求响应的时间（154ms） 是 在前端使用ajax请求响应时间（15ms）的10倍， 有哪些因素可以导致这样的情况？

request: function (params, call, err, cookie) {
if (this.option.isCookieNeeded === true && cookie === undefined) {
throw new Error('This request is cookie needed, you must set a cookie for it before request. id = ' + this.option.id)
}

    err = typeof err !== 'function' ? function (e) {
        console.error(e)
    } : err;

    if (this.option.status === STATUS_MOCK || this.option.status === STATUS_MOCK_ERR) {
        this._mock(params, call, err);
        return;
    }

    this.option.method = this.option.method.toLocaleUpperCase();

    var self = this, options = {
        hostname: self.option.hostname,
        port: self.option.port,
        path: self.option.path,
        method: self.option.method,
        headers: {
            Cookie: cookie
        }
    }, querystr;

    if (self.option.method === 'POST') {
        querystr = JSON.stringify(params);
        options.headers['Content-Type'] = 'application/json;charset=utf-8';
    } else if (self.option.method === 'GET') {
        querystr = self._stringify(params);
        options.path += '?' + querystr
    }
    var req = http.request(options, function (res) {
        var timer = setTimeout(function () {
            err(new Error('timeout'))
        }, self.option.timeout || 5000);

        var bufferHelper = new BufferHelper();

        res.on('data', function (chunk) {
            bufferHelper.concat(chunk);
        });

        res.on('end', function () {
            var buffer = bufferHelper.toBuffer(), result;
            try {
                result = self.option.encoding === ENCODING_RAW ? buffer :
                    (self.option.dataType !== 'json' ? iconv.fromEncoding(buffer, self.option.encoding) :
                        JSON.parse(iconv.fromEncoding(buffer, self.option.encoding)))
            } catch (e) {
                clearTimeout(timer);
                err(new Error('The result has syntax error. ' + e));
                return;
            }
            clearTimeout(timer);
            call(result, res.headers['set-cookie'])
        })
    });

    self.option.method !== 'POST' || req.write(querystr);
    req.on('error', function (e) {
        err(e)
    });
    req.end()
},