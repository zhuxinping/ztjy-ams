import Mock from 'mockjs'
import * as ApiMaps from '@/api/apiMaps'

// 管理区域管理树结构
export const areaListMock = () => {
	Mock.mock(ApiMaps.SYSTEM.ORGANIZATION.AREALIST, {
		'code': 10000,
		'message': 'success',
		'body': {
			'list': [{
				'list|2': [{
					'list|3': [{
						'list|5': [{
							// 'areaList': [{}],
							'id': '@id',
							'name': '@string(7, 10)',
							'parentId': '@id',
							'sno': '@id',
							'remark': '@string(7, 10)',
							'agentId': '@id',
							'createrId': '@id',
							'createTime': '@date("yyyy-MM-dd")',
							'updateId': '@id',
							'updateTime': '@date("yyyy-MM-dd")',
							'isParent': 0
						}],
						'id': '@id',
						'name': '@string(7, 10)',
						'parentId': '@id',
						'sno': '@id',
						'remark': '@string(7, 10)',
						'agentId': '@id',
						'createrId': '@id',
						'createTime': '@date("yyyy-MM-dd")',
						'updateId': '@id',
						'updateTime': '@date("yyyy-MM-dd")',
						'isParent': 0
					}],
					'id': '@id',
					'name': '@string(7, 10)',
					'parentId': '@id',
					'sno': '@id',
					'remark': '@string(7, 10)',
					'agentId': '@id',
					'createrId': '@id',
					'createTime': '@date("yyyy-MM-dd")',
					'updateId': '@id',
					'updateTime': '@date("yyyy-MM-dd")',
					'isParent': 0
				}],
				'id': '@id',
				'name': '@string(7, 10)',
				'parentId': '@id',
				'sno': '@id',
				'remark': '@string(7, 10)',
				'agentId': '@id',
				'createrId': '@id',
				'createTime': '@date("yyyy-MM-dd")',
				'updateId': '@id',
				'updateTime': '@date("yyyy-MM-dd")',
				'isParent': 1
			}]
		}
	})
}

// 添加、修改管理区域管理树结构
export const addUpdateAreaMock = () => {
	Mock.mock(ApiMaps.SYSTEM.ORGANIZATION.ADDUPDATEAREA, {
		'code': 10000,
		'message': 'success',
		'body': {
			'id': '@id'
		}
	})
}

// 删除管理区域管理树结构
export const deleteAreaMock = () => {
	Mock.mock(ApiMaps.SYSTEM.ORGANIZATION.DELETEAREA, {
		'code': 10000,
		'message': 'success',
		'body': {}
	})
}

// 子账号列表
export const childrenListMock = () => {
	Mock.mock(ApiMaps.SYSTEM.ORGANIZATION.CHILDRENLIST, {
		'code': 10000,
		'message': 'success',
		'body': {
			'totalCount': 100,
			'list|10': [{
				'id': '@id',
				'accountName|1-3': '子账号',
				'name|1-3': '子名称',
				'agentId': '@agentId',
				'agentName|1-3': '代商名称',
				'userPhone': /^((11[0-2])|(13[0-9])|(14[0-9])|(15[0-9])|166|(17[0-9])|(18[0-9])|(19[8-9]))\d{8}$/,
				'dingdingAccount': /^((11[0-2])|(13[0-9])|(14[0-9])|(15[0-9])|166|(17[0-9])|(18[0-9])|(19[8-9]))\d{8}$/,
				'isFlag|0-1': true,
				'type': function () {
					if (this.isFlag) {
						return '启用'
					} else {
						return '禁用'
					}
				},
				'roleId': 'roleId',
				'roleName|1-3': '角色1'
			}]
		}
	})
}

// 修改子账号需要获取基本信息回填
export const getChildrenMock = () => {
	Mock.mock(ApiMaps.SYSTEM.ORGANIZATION.GETCHILDREN, {
		'code': 10000,
		'message': 'success',
		'body': {
			'id': '@id',
			'accountName|1-3': '子账号',
			'name|1-3': '子名称',
			'passWord': '@passWord',
			'childRoleId': '@childRoleId',
			'agentId': '@agentId',
			'isFlag|0-1': true,
			'isSendSms|0-1': 0,
			'isVerify|0-1': 0,
			'userPhone': /^((11[0-2])|(13[0-9])|(14[0-9])|(15[0-9])|166|(17[0-9])|(18[0-9])|(19[8-9]))\d{8}$/,
			'dingdingAccount': /^((11[0-2])|(13[0-9])|(14[0-9])|(15[0-9])|166|(17[0-9])|(18[0-9])|(19[8-9]))\d{8}$/,
			'lastPassTime': '@date("yyyy-MM-dd")'
		}
	})
}

// 添加、修改子账号
export const addUpdateChildrenMock = () => {
	Mock.mock(ApiMaps.SYSTEM.ORGANIZATION.ADDUPDATECHILDREN, {
		'code': 10000,
		'message': 'success',
		'body': {}
	})
}

// 获取子账号管理区域分配信息
export const getChildrenAreaListMock = () => {
	Mock.mock(ApiMaps.SYSTEM.ORGANIZATION.GETAREALIST, {
		'code': 10000,
		'message': 'success',
		'body': {
			'list': [{
				'list|2': [{
					'list|3': [{
						'list|5': [{
							// 'areaList': [{}],
							'id': '@id',
							'name|1-2': 'menuList',
							'parentId': '@id',
							'isParent|0-1': false,
							'checked|1-2': true
						}],
						// 'areaList': [{}],
						'id': '@id',
						'name|1-2': 'menuList',
						'parentId': '@id',
						'isParent|0-1': false,
						'checked|1-2': true
					}],
					// 'areaList': [{}],
					'id': '@id',
					'name|1-2': 'menuList',
					'parentId': '@id',
					'isParent|0-1': false,
					'checked|1-2': true
				}],
				// 'areaList': [{}],
				'id': '@id',
				'name|1-2': 'menuList',
				'parentId': '@id',
				'isParent|0-1': false,
				'checked|1-2': true
			}]
		}
	})
}

// 提交子账号管理区域分配信息
export const submitChildrenAreaMock = () => {
	Mock.mock(ApiMaps.SYSTEM.ORGANIZATION.SUBMITCHILDRENAREA, {
		'code': 10000,
		'message': 'success',
		'body': {}
	})
}

// 禁用子账号
export const forbidChildrenMock = () => {
	Mock.mock(ApiMaps.SYSTEM.ORGANIZATION.FORBIDCHILDREN, {
		'code': 10000,
		'message': 'success',
		'body': {}
	})
}

// 获取子账号角色列表
export const getChildrenRoleMock = () => {
	Mock.mock(ApiMaps.SYSTEM.ORGANIZATION.CHILDRENROLE, {
		'code': 10000,
		'message': 'success',
		'body': {
			'childRoleList|10': [{
				'name|1-3': '子名称',
				'id': '@id'
			}]
		}
	})
}

// 子账号角色列表
export const numberListMock = () => {
	Mock.mock(ApiMaps.SYSTEM.ORGANIZATION.NUMBERLIST, {
		'code': 10000,
		'message': 'success',
		'body': {
			'totalCount': 100,
			'list|10': [{
				'id': '@id',
				'appRoleId': '@id',
				'amsWebRoleId': '@id',
				'name|1-3': '角色名称',
				'remark|1-3': '角色备注',
				'state|0-1': 0,
				'stateType': function () {
					if (this.state) {
						return '启用'
					} else {
						return '禁用'
					}
				},
				'agentId': '@id',
				'agentName|1-3': '代理名字'
			}]
		}
	})
}

// 添加、修改子账号角色列表
export const addUpdateNumberMock = () => {
	Mock.mock(ApiMaps.SYSTEM.ORGANIZATION.ADDUPDATENUMBER, {
		'code': 10000,
		'message': 'success',
		'body': {}
	})
}

// 禁用子账号角色
export const forbidNumberMock = () => {
	Mock.mock(ApiMaps.SYSTEM.ORGANIZATION.FORBIDNUMBER, {
		'code': 10000,
		'message': 'success',
		'body': {}
	})
}

// 子账号角色web功能授权
export const webPowerNumberMock = () => {
	Mock.mock(ApiMaps.SYSTEM.ORGANIZATION.WEBPOWERNUMBER, {
		'code': 10000,
		'message': 'success',
		'body': {
			'list': [{
				'list|2': [{
					'list|3': [{
						'list|5': [{
							// 'areaList': [{}],
							'id': '@id',
							'name|1-2': 'menuList',
							'level': '@id',
							'checked|0-1': false,
							'isParent|0-1': true,
							'powerJson': '@string(5,12)'
						}],
						'id': '@id',
						'name|1-2': 'menuList',
						'level': '@id',
						'checked|0-1': false,
						'isParent|0-1': true,
						'powerJson': '@string(5,12)'
					}],
					'id': '@id',
					'name|1-2': 'menuList',
					'level': '@id',
					'checked|0-1': true,
					'isParent|0-1': true,
					'powerJson': '@string(5,12)'
				}],
				'id': '@id',
				'name|1-2': 'menuList',
				'level': '@id',
				'checked|0-1': true,
				'isParent|0-1': true,
				'powerJson': '@string(5,12)'
			}]
		}
	})
}

// 保存子账号角色web功能授权
export const submitWebPowerNumberMock = () => {
	Mock.mock(ApiMaps.SYSTEM.ORGANIZATION.SUBMITWEBPOWERNUMBER, {
		'code': 10000,
		'message': 'success',
		'body': {}
	})
}

// 获取敏感数字加密授权
export const shuziPowerNumberMock = () => {
	Mock.mock(ApiMaps.SYSTEM.ORGANIZATION.SHUZIPOWERNUMBER, {
		'code': 10000,
		'message': 'success',
		'body': {
			'list|5': [{
				'dataId': '@id',
				'dataName|1-3': '家长信息',
				'isChecked|0-1': true,
				'roleId': '@id'
			}]
		}
	})
}

// 保存敏感数字加密授权
export const submitShuziPowerNumberMock = () => {
	Mock.mock(ApiMaps.SYSTEM.ORGANIZATION.SUBMITSHUZIPOWERNUMBER, {
		'code': 10000,
		'message': 'success',
		'body': {}
	})
}

// 获取钉钉权限列表
export const getDingDingActionMock = () => {
	Mock.mock(ApiMaps.SYSTEM.ORGANIZATION.GETDINGDINGACTION, {
		'code': 10000,
		'message': 'success',
		'body': {
			'list': [{
				'list|2': [{
					'list|3': [{
						'list|5': [{
							// 'areaList': [{}],
							'id': '@id',
							'name': '@string(5,12)',
							'level': '@id',
							'checked|0-1': false,
							'isParent|0-1': true,
							'powerJson': '@string(5,12)'
						}],
						'id': '@id',
						'name': '@string(5,12)',
						'level': '@id',
						'checked|0-1': false,
						'isParent|0-1': true,
						'powerJson': '@string(5,12)'
					}],
					'id': '@id',
					'name': '@string(5,12)',
					'level': '@id',
					'checked|0-1': true,
					'isParent|0-1': true,
					'powerJson': '@string(5,12)'
				}],
				'id': '@id',
				'name': '@string(5,12)',
				'level': '@id',
				'checked|0-1': true,
				'isParent|0-1': true,
				'powerJson': '@string(5,12)'
			}]
		}
	})
}

// 保存钉钉权限列表
export const submitDingDingActionMock = () => {
	Mock.mock(ApiMaps.SYSTEM.ORGANIZATION.SUBMITDINGDINGACTION, {
		'code': 10000,
		'message': 'success',
		'body': {}
	})
}
