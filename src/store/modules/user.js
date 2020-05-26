import { UserApi } from '@/api/index'
// import { UserMock } from '@/mock/index'
import Common from '@/utils/common'
import { USER_TOKEN, USER_INFO } from '@/maps/constants'

// import permission from './permission'
function getButtonList (menuList) {
	let result = []
	menuList.forEach(menu => {
		if (menu.buttonList && menu.buttonList.length) {
			menu.buttonList.forEach(button => {
				result.push(button.buttonCode)
			})
		}
		if (menu.menuList && menu.menuList) {
			result = result.concat(getButtonList(menu.menuList))
		}
	})
	return result
}
const User = {
	namespaced: true,
	state: {
		token: Common.getCookie(USER_TOKEN),
		information: { ...JSON.parse(Common.getSession(USER_INFO)) },
		permission: [],
		buttonList: [],
		permissionLoaded: false
	},
	getters: {
		getUserToken (state) {
			return state.token
		},
		userInfo (state) {
			return state.information
		}
	},
	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_ROLES: (state, roles) => {
			state.roles = roles
		},
		SET_PERMISSION: (state, permission) => {
			state.permission = permission
			state.permissionLoaded = true
			state.buttonList = getButtonList(permission)
			// window.sessionStorage.setItem('PERMISSION', JSON.stringify(permission))
			// window.sessionStorage.setItem('PERMISSION_STATUS', 1)
		},
		SET_INFO: (state, information) => {
			state.information = information
		}
	},
	actions: {
		// 登录
		login ({ commit }, userInfo) {
			// console.log(userInfo)
			const username = userInfo.username.trim()
			return new Promise((resolve, reject) => {
				// UserMock.loginMock()
				UserApi.login({
					userAccount: username,
					userPassword: userInfo.password,
					verifyCode: userInfo.checkcode,
					verifyCodeKey: userInfo.verifyCodeKey
				}, response => {
					// console.log(response)
					// 判断登录成功才设置cookie,否则不设置
					const userToken = response.body.sessionId
					// console.log(userToken)
					if (userToken) {
						Common.setCookie(USER_TOKEN, userToken, 10)
						commit('SET_TOKEN', userToken)
					}
					resolve(response)
				}).catch((error) => {
					reject(error)
				})
			})
		},
		// 获取用户信息
		getUserInfo ({ commit, state }) {
			return new Promise((resolve, reject) => {
				// UserMock.getUserInfoMock()
				UserApi.getUserInfo({}, response => {
					if (response.code === 10000) {
						Common.setSession(USER_TOKEN, JSON.stringify(response.body), 10)
						commit('SET_INFO', response.body)
					}
					resolve(response)
				}).catch((error) => {
					reject(error)
				})
			})
		},
		/**
		 * 获取用户权限
		 * @param commit
		 * @param state
		 */
		getPermission ({ commit, state }) {
			return new Promise((resolve, reject) => {
				// UserMock.getUserPermissionMock()
				UserApi.getUserPermission({}, response => {
					commit('SET_PERMISSION', response.body.menuList)
					resolve(response)
				}).catch(error => {
					commit('SET_PERMISSION', [])
					reject(error)
				})
			})
		},
		// 登出
		logout ({ commit, state }) {
			return new Promise((resolve, reject) => {
				// UserMock.logoutMock()
				UserApi.logout({}, response => {
					commit('SET_TOKEN', '')
					Common.removeCookie(USER_TOKEN)
					window.sessionStorage.removeItem('tabs_list')
					window.sessionStorage.removeItem('tabs_path_list')
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},
		// 前端 登出
		fedLogOut ({ commit }) {
			return new Promise(resolve => {
				commit('SET_TOKEN', '')
				Common.removeCookie(USER_TOKEN)
				window.sessionStorage.removeItem('tabs_list')
				window.sessionStorage.removeItem('tabs_path_list')
				resolve()
			})
		},
		// 修改密码
		changePassword ({ commit }, params) {
			return new Promise((resolve, reject) => {
				// OrganizationMock.getChildrenRoleMock()
				UserApi.changePassword(params, response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}
export default User
