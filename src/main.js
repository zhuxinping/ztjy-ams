import Vue from 'vue'
import ElementUI from 'element-ui'
// 全局样式
import '../theme/index.css'
import App from './App'
import router from './router'
import store from './store'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import '@/assets/scss/index.scss'
// 路由鉴权
import '@/utils/permission'
// 按钮权限
import '@/directives/has'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
})
