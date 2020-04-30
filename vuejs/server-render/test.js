// 创建一个vue实例
const Vue = require('vue')
const app = new Vue({
  template: '<div>hello vue-server-renderer</div>'
})

// 创建一个renderer
const renderer = require('vue-server-renderer').createRenderer()

// 将vue实例渲染为html
renderer.renderToString(app, (err, html) => {
  if(err) throw err
  console.log(html) // <div data-server-rendered="true">hello vue-server-renderer</div>
})