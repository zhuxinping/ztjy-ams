import { OrganizationApi } from '@/api/index'
// import { OrganizationMock } from '@/mock/index'

const Organization = {
	namespaced: true,
	state: {
		treeData: [],
		childrenInfo: {}
	},
	mutations: {
		SET_TREEDATA: (state, treeData) => {
			state.treeData = treeData
		}
	},

	actions: {
		// 管理区域管理树结构
		areaList ({ commit }, params) {
			return new Promise((resolve, reject) => {
				// OrganizationMock.areaListMock()
				OrganizationApi.areaList(params, response => {
					commit('SET_TREEDATA')
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 添加、修改管理区域管理树结构
		addUpdateArea ({ commit }, params) {
			return new Promise((resolve, reject) => {
				// OrganizationMock.addUpdateAreaMock()
				OrganizationApi.addUpdateArea(params, response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 删除管理区域管理树结构
		deleteArea ({ commit }, params) {
			return new Promise((resolve, reject) => {
				// OrganizationMock.deleteAreaMock()
				OrganizationApi.deleteArea(params, response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 子账号列表
		childrenList ({ commit }, params) {
			return new Promise((resolve, reject) => {
				// OrganizationMock.childrenListMock()
				OrganizationApi.childrenList(params, response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 修改子账号需要获取基本信息回填
		getChildren ({ commit }, params) {
			return new Promise((resolve, reject) => {
				// OrganizationMock.getChildrenMock()
				OrganizationApi.getChildren(params, response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		// 添加、修改子账号
		addUpdateChildren ({ commit }, params) {
			return new Promise((resolve, reject) => {
				// OrganizationMock.addUpdateChildrenMock()
				OrganizationApi.addUpdateChildren(params, response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		// 获取代理商子账号区域
		getChildrenAreaList ({ commit }, params) {
			return new Promise((resolve, reject) => {
				// OrganizationMock.getChildrenAreaListMock()
				OrganizationApi.getChildrenAreaList(params, response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 提交子账号管理区域分配信息
		submitChildrenArea ({ commit }, params) {
			return new Promise((resolve, reject) => {
				// OrganizationMock.submitChildrenAreaMock()
				OrganizationApi.submitChildrenArea(params, response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 禁用子账号
		forbidChildren ({ commit }, params) {
			return new Promise((resolve, reject) => {
				// OrganizationMock.forbidChildrenMock()
				OrganizationApi.forbidChildren(params, response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		// 获取子账号角色列表
		getChildrenRole ({commit}, params) {
			return new Promise((resolve, reject) => {
				// OrganizationMock.getChildrenRoleMock()
				OrganizationApi.getChildrenRole(params, response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 子账号角色列表
		accountList ({ commit }, params) {
			return new Promise((resolve, reject) => {
				// OrganizationMock.numberListMock()
				OrganizationApi.numberList(params, response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 添加、修改子账号角色列表
		addUpdateNumber ({ commit }, params) {
			return new Promise((resolve, reject) => {
				// OrganizationMock.addUpdateNumberMock()
				OrganizationApi.addUpdateNumber(params, response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 禁用子账号角色
		forbidNumber ({ commit }, params) {
			return new Promise((resolve, reject) => {
				// OrganizationMock.forbidNumberMock()
				OrganizationApi.forbidNumber(params, response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 子账号角色web功能授权
		webPowerNumber ({ commit }, params) {
			return new Promise((resolve, reject) => {
				// OrganizationMock.webPowerNumberMock()
				OrganizationApi.webPowerNumber(params, response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 保存子账号角色web功能授权
		submitWebPowerNumber ({ commit }, params) {
			return new Promise((resolve, reject) => {
				// OrganizationMock.submitWebPowerNumberMock()
				OrganizationApi.submitWebPowerNumber(params, response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 数字敏感处理获取
		shuziPowerNumber ({ commit }, params) {
			return new Promise((resolve, reject) => {
				// OrganizationMock.shuziPowerNumberMock()
				OrganizationApi.shuziPowerNumber(params, response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 数字敏感保存
		submitShuziPowerNumber ({ commit }, params) {
			return new Promise((resolve, reject) => {
				// OrganizationMock.submitShuziPowerNumberMock()
				OrganizationApi.submitShuziPowerNumber(params, response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 获取钉钉权限列表
		getDingDingAction ({ commit }, params) {
			return new Promise((resolve, reject) => {
				// OrganizationMock.getDingDingActionMock()
				OrganizationApi.getDingDingAction(params, response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},

		// 获取钉钉权限列表
		submitDingDingAction ({ commit }, params) {
			return new Promise((resolve, reject) => {
				// OrganizationMock.submitDingDingActionMock()
				OrganizationApi.submitDingDingAction(params, response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}

export default Organization
