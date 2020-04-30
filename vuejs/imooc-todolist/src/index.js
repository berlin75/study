import Vue from 'vue'
import App from './app.vue'

import './assets/styles/global.styl'

console.log("index.js > env: ", process.env.NODE_ENV);
console.log("index.js > hot: ", module.hot);

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
    render: h => h(App)
}).$mount(root)


// new Vue({
// 	el: root,
//     render: h => h(App)
// })