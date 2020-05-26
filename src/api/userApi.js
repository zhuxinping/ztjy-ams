import { API } from './api'
import { SYSTEM } from './apiMaps'

export default {
	// 登录接口
	login (params, callback) {
		return API.post(SYSTEM.USER.LOGIN, params, callback)
	},
	// 获取短信验证码接口
	setPhoneVerify (params, callback) {
		return API.post(SYSTEM.USER.PHONEVERIFY, params, callback)
	},
	// 校验短信验证码接口
	checkPhoneVerify (params, callback) {
		return API.post(SYSTEM.USER.CHECKPHONEVERIFY, params, callback)
	},
	getImgCodeUrl () {
		return SYSTEM.USER.GETIMGCODE
	},
	getUserInfo (params, callback) {
		return API.get(SYSTEM.USER.INFO, params, callback)
	},
	getUserPermission (params, callback) {
		return API.get(SYSTEM.USER.PERMISSION, params, callback)
	},
	logout (params, callback) {
		return API.post(SYSTEM.USER.LOGOUT, params, callback)
	},
	// 修改密码
	changePassword (params, callback) {
		return API.post(SYSTEM.USER.CHANGEPASSWORD, params, callback)
	}
}
