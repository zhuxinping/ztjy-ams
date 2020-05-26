import Common from '@/utils/common'

const SideBar = {
	namespaced: true,
	state: {
		sidebar: {
			opened: !+Common.getCookie('sidebarStatus')
		}
	},
	getters: {
		getSidebar (state) {
			return state.sidebar
		}
	},
	mutations: {
		TOGGLE_SIDEBAR: state => {
			if (state.sidebar.opened) {
				Common.setCookie('sidebarStatus', 1, 10)
			} else {
				Common.setCookie('sidebarStatus', 0, 10)
			}
			state.sidebar.opened = !state.sidebar.opened
		}
	},
	actions: {
		toggleSideBar ({ commit }) {
			commit('TOGGLE_SIDEBAR')
		}
	}
}

export default SideBar
