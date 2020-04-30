import Vue from 'vue'
import Favlist from './components/Favlist.vue'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
    el: root,
    // components: { Favlist }
    render: h => h(Favlist)
})