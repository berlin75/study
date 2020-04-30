function routeRegexp (route){
    var reg = route

       // 去掉后缀后面的内容
       .replace(/\?(.*)$/,"")

       // 把所有 * 替换成正则表达式(.*)
       .replace(/((\*{1}(?=\/))|(\*{1}(?=$)))/g,"(.*)")

       // 把所有 :xxx 替换成正则表达式(.*)
       .replace(/(:(.*?(?=\/)))|(:(.*?(?=$)))/g,"(.*)")

       // 把所有 / 路径 变为匹配正则表达式的 \/ 的形式
       .replace(/\//g,"\\\/")

    console.log(reg);

    //通过生成正则表达式,前后的 ^ 和 & 要严格匹配整个路径。  
    return new RegExp("^"+reg+"$");
}

// 测试代码如下：
var url = "/article/324234/dsd/ccc";
console.log(url);
var routeRule = "/article/:id/:name/*";
console.log(routeRule);
var route_regexp = routeRegexp(routeRule);
console.log(route_regexp);             // /^\/article\/(.*)\/(.*)\/(.*)$/
console.log(route_regexp.test(url));   // true