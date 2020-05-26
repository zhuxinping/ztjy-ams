import { AgentApi } from '@/api/index'
// import { AgentMock } from '@/mock/index'

const Agent = {
	namespaced: true,
	state: {
	},
	getters: {
	},
	mutations: {
	},
	actions: {
		// 查询代理商
		getList ({ commit }, params) {
			return new Promise((resolve, reject) => {
				// AgentMock.getListMock()
				AgentApi.getList(params, response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		// 选择代理商
		change ({ commit }, params) {
			return new Promise((resolve, reject) => {
				// AgentMock.changeMock()
				AgentApi.change(params, response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		qrcode ({ commit }) {
			return new Promise((resolve, reject) => {
				// AgentMock.changeMock()
				AgentApi.qrcode(response => {
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}

export default Agent
