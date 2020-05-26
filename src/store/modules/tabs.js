const tabsList = window.sessionStorage.getItem('tabs_list')
const tabsPathList = window.sessionStorage.getItem('tabs_path_list')
const Tabs = {
	namespaced: true,
	state: {
		// 活动窗口值，或者为路由path值，此值需要在APP组件根据当前路由实时更新
		current: '',
		// 当前已经打开的窗口列表
		list: tabsList ? JSON.parse(tabsList) : [],
		pathList: tabsPathList ? JSON.parse(tabsPathList) : []
	},
	getters: {
		getCurrentTab (state) {
			return state.current
		},
		getTabList (state) {
			return state.list
		}
	},
	mutations: {
		UPDATE_TABS (state, { route }) {
			state.current = route.path
			if (route.path !== '/login' && route.path !== '/dashboard') {
				if (state.pathList.indexOf(route.path) === -1) {
					state.pathList.push(route.path)
					state.list.push({
						name: route.name,
						path: route.path,
						params: route.params,
						query: route.query,
						hash: route.hash,
						title: route.meta.title
					})
					window.sessionStorage.setItem('tabs_list', JSON.stringify(state.list))
					window.sessionStorage.setItem('tabs_path_list', JSON.stringify(state.pathList))
				}
			}
		},
		REMOVE_TABS (state, { path }) {
			const index = state.pathList.indexOf(path)
			if (index === -1) {
				console.error('没有在缓存的tabs中找到path：', path)
			} else {
				// 临时处理：当大于1个时才能移除
				if (state.list.length > 1) {
					state.pathList.splice(index, 1)
					state.list.splice(index, 1)
					window.sessionStorage.setItem('tabs_list', JSON.stringify(state.list))
					window.sessionStorage.setItem('tabs_path_list', JSON.stringify(state.pathList))
				}
			}
		},
		REMOVE_ALL_TABS (state) {
			window.sessionStorage.removeItem('tabs_list')
			window.sessionStorage.removeItem('tabs_path_list')
		}
	},
	actions: {
		update_tabs: ({ commit }, { route }) => {
			return new Promise((resolve, reject) => {
				commit('UPDATE_TABS', { route })
				resolve()
			})
		},
		remove_tabs: ({ commit }, { path }) => {
			return new Promise((resolve, reject) => {
				commit('REMOVE_TABS', { path })
				resolve()
			})
		},
		remove_all_tabs: ({ commit }) => {
			return new Promise((resolve, reject) => {
				commit('REMOVE_ALL_TABS')
				resolve()
			})
		}
	}
}
export default Tabs
