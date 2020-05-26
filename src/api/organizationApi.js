import { API } from './api'
import { SYSTEM } from './apiMaps'

export default {
	// 管理区域管理树结构
	areaList (params, callback) {
		return API.post(SYSTEM.ORGANIZATION.AREALIST, params, callback)
	},
	// 添加、修改管理区域管理树结构
	addUpdateArea (params, callback) {
		return API.post(SYSTEM.ORGANIZATION.ADDUPDATEAREA, params, callback)
	},
	// 删除管理区域管理树结构
	deleteArea (params, callback) {
		return API.post(SYSTEM.ORGANIZATION.DELETEAREA, params, callback)
	},
	// 子账号列表
	childrenList (params, callback) {
		return API.get(SYSTEM.ORGANIZATION.CHILDRENLIST, params, callback)
	},
	// 修改子账号需要获取基本信息回填
	getChildren (params, callback) {
		return API.post(SYSTEM.ORGANIZATION.GETCHILDREN, params, callback)
	},
	// 添加、修改子账号
	addUpdateChildren (params, callback) {
		return API.post(SYSTEM.ORGANIZATION.ADDUPDATECHILDREN, params, callback)
	},
	// 获取子账号区域列表
	getChildrenAreaList (params, callback) {
		return API.post(SYSTEM.ORGANIZATION.GETAREALIST, params, callback)
	},
	// 提交子账号管理区域分配信息
	submitChildrenArea (params, callback) {
		return API.post(SYSTEM.ORGANIZATION.SUBMITCHILDRENAREA, params, callback)
	},
	// 禁用子账号
	forbidChildren (params, callback) {
		return API.post(SYSTEM.ORGANIZATION.FORBIDCHILDREN, params, callback)
	},
	// 子账号角色列表
	numberList (params, callback) {
		return API.get(SYSTEM.ORGANIZATION.NUMBERLIST, params, callback)
	},
	// 获取子账号角色列表
	getChildrenRole (params, callback) {
		return API.post(SYSTEM.ORGANIZATION.CHILDRENROLE, params, callback)
	},
	// 添加、修改子账号角色列表
	addUpdateNumber (params, callback) {
		return API.post(SYSTEM.ORGANIZATION.ADDUPDATENUMBER, params, callback)
	},
	// 禁用子账号角色
	forbidNumber (params, callback) {
		return API.post(SYSTEM.ORGANIZATION.FORBIDNUMBER, params, callback)
	},
	// 子账号角色web功能授权
	webPowerNumber (params, callback) {
		return API.post(SYSTEM.ORGANIZATION.WEBPOWERNUMBER, params, callback)
	},
	// 保存子账号角色web功能授权
	submitWebPowerNumber (params, callback) {
		return API.post(SYSTEM.ORGANIZATION.SUBMITWEBPOWERNUMBER, params, callback)
	},
	// 子账号角色数据授权
	shuziPowerNumber (params, callback) {
		return API.post(SYSTEM.ORGANIZATION.SHUZIPOWERNUMBER, params, callback)
	},
	// 保存子账号角色数据授权
	submitShuziPowerNumber (params, callback) {
		return API.post(SYSTEM.ORGANIZATION.SUBMITSHUZIPOWERNUMBER, params, callback)
	},
	// 获取钉钉权限列表
	getDingDingAction (params, callback) {
		return API.post(SYSTEM.ORGANIZATION.GETDINGDINGACTION, params, callback)
	},
	// 保存钉钉权限
	submitDingDingAction (params, callback) {
		return API.post(SYSTEM.ORGANIZATION.SUBMITDINGDINGACTION, params, callback)
	}
}
