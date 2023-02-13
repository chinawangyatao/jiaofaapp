import Vue from 'vue'
import App from './App'
import api from './utils/Request.js'
import store from './store/store.js'
import headerBar from '@/components/header-bar/index.vue'
Vue.config.productionTip = false
Vue.component('header-bar', headerBar)
Vue.prototype.$api = api;
Vue.prototype.$store = store
App.mpType = 'app'
const app = new Vue({
	...App,
	store
})
app.$mount()
