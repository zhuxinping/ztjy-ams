import { API } from './api'
import { SYSTEM } from './apiMaps'

export default {
	// 选择代理商
	getList (params, callback) {
		return API.get(SYSTEM.AGENT.LIST, params, callback)
	},
	change (params, callback) {
		return API.get(SYSTEM.AGENT.CHANGE, params, callback)
	},
	qrcode (callback) {
		return API.get(SYSTEM.AGENT.QRCODE, {}, callback)
	}
}
