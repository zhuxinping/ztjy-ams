import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/user'
import SideBar from './modules/sidebar'
import Tabs from './modules/tabs'
import Permission from './modules/permission'
import getters from './getters'
import Organization from './modules/organization'
import Agent from './modules/agent'

Vue.use(Vuex)
export default new Vuex.Store({
	modules: {
		User,
		SideBar,
		Tabs,
		Permission,
		Organization,
		Agent
	},
	getters
})
