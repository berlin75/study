/*
import 'regenerator-runtime/runtime'
(async()=>{
const Vue = await import('vue')
const store = await import('./store')
const App = await import('./components/App.vue')
})()
*/

import Vue from 'vue'
import store from './store'
import App from './components/App.vue'

new Vue({
  store, // inject store to all children
  el: '#app',
  render: h => h(App)
})

