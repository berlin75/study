// polyfill
import 'babel-polyfill';

import Vue from 'vue';
import App from './App';
import store from './store';

Vue.config.devtools = true;

const vm = new Vue({
    el: 'body',
    components: { App },
    store: store
});
