const nunjucks = require('nunjucks');

function createEnv(path, opts) {
    var autoescape = opts.autoescape === undefined ? true : opts.autoescape;
    var noCache = opts.noCache || false;
    var watch = opts.watch || false;
    var throwOnUndefined = opts.throwOnUndefined || false;
    var env = new nunjucks.Environment(
        // 创建一个文件系统加载器，从views目录读取模板
        new nunjucks.FileSystemLoader('views', {
            noCache: noCache,
            watch: watch,
        }), {
            autoescape: autoescape,
            throwOnUndefined: throwOnUndefined
        }
    );
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

var env = createEnv('views', {
    watch: true,
    filters: { hex: n => '0x' + n.toString(16) }
});

var fruits = ['apple', 'banana'];
var s = env.render('hello.html', { name: '小明', fruits: fruits});
console.log(s); // <h1>Hello 小明</h1>
var s = env.render('hello.html', { name: '<script>alert("小明")</script>' });
console.log(s); // <h1>Hello &lt;script&gt;alert(&quot;小明&quot;)&lt;/script&gt;</h1>
var s = env.render('extend.html', { header: 'Hello', body: 'bla bla bla...' })
console.log(s);