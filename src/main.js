// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'animate.css/animate.min.css'
import 'element-ui/'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
	loading: '/static/pic-load.svg',
	preLoad: 1
})
import Axios from 'axios'

import msg from '@/assets/message'
Vue.use(msg)

// let axios = Axios.create({
// 	baseURL: 'http://127.0.0.1:3000',
// 	headers: {
// 		"Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
// 	},
// 	timeout: 60000
// })
Vue.mixin({
	data() {
		return {
			Axios: Axios
		}
	}
})

import router from './router'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
