const _import = require('./_import_' + process.env.NODE_ENV)
const Layout = _import('layout/Layout')

export default [{
	path: '/workbench',
	name: 'workbench',
	meta: {
		title: '工作台'
	},
	hidden: true,
	redirect: '/workbench/overview/school',
	root: true
}, {
	path: '/workbench/overview',
	name: 'WorkbenchOverview',
	component: Layout,
	meta: {
		title: '数据概览'
	},
	icon: 'icon-chart',
	type: 'workbench',
	children: [{
		path: 'school',
		name: 'WorkbenchSchool',
		component: _import('overview/school'),
		meta: {
			title: '学校数据概览'
		}
	}, {
		path: 'user',
		name: 'WorkbenchUser',
		component: _import('overview/user'),
		meta: {
			title: '用户数据概览'
		}
	}, {
		path: 'order',
		name: 'WorkbenchOrder',
		component: _import('overview/order'),
		meta: {
			title: '订单数据概览'
		}
	}]
}, {
	path: '/crm',
	name: 'CRM_MANAGE',
	hidden: true,
	root: true,
	redirect: '/crm/school/list'
}, {
	path: '/crm/school',
	name: 'SCHOOL_INFO_MANAGE',
	component: Layout,
	icon: 'icon-house',
	type: 'CRM_MANAGE',
	children: [{
		path: 'list',
		name: 'SCHOOL_INFO_MENU',
		component: _import('school/list')
	}, {
		path: 'analysis',
		name: 'CrmSchoolAnalysis',
		meta: {
			title: '学校分析'
		},
		component: _import('school/analysis')
	}]
}, {
	path: '/crm/productAuth',
	name: 'CrmProductAuth',
	meta: {
		title: '产品授权管理'
	},
	icon: 'icon-th-large-o',
	component: Layout,
	type: 'CRM_MANAGE',
	children: [{
		path: 'agentProduct',
		name: 'CrmAgentProduct',
		meta: {
			title: '代理商产品管理'
		},
		component: _import('productAuth/agentProduct')
	}, {
		path: 'schoolProduct',
		name: 'CrmSchoolProduct',
		meta: {
			title: '代理商产品管理'
		},
		component: _import('productAuth/schoolProduct')
	}, {
		path: 'schoolFunctionSettingList',
		name: 'CrmSchoolFunctionSettingList',
		meta: {
			title: '学校功能设置查询'
		},
		component: _import('productAuth/schoolFunctionSettingList')
	}]
}, {
	path: '/finance',
	name: 'finance',
	meta: {
		title: '财务管理'
	},
	redirect: '/finance/ca/rechargeList',
	hidden: true,
	root: true
}, {
	path: '/finance/ca',
	name: 'FinanceCa',
	component: Layout,
	icon: 'icon-th-large-o',
	meta: {
		title: '往来款管理'
	},
	type: 'finance',
	children: [{
		path: 'rechargeList',
		name: 'FinanceRechargeList',
		component: _import('ca/rechargeList'),
		meta: {
			title: '学校充值记录'
		}
	}, {
		path: 'cashoutList',
		name: 'FinanceCashoutList',
		component: _import('ca/cashoutList'),
		meta: {
			title: '学校提现记录'
		}
	}]
}, {
	path: '/stock',
	name: 'stock',
	redirect: '/stock/stockManagement/outstock',
	meta: {
		title: '库存管理理'
	},
	hidden: true,
	root: true
}, {
	path: '/stock/stockManagement',
	name: 'StockManagement',
	component: Layout,
	meta: { title: '库存管理' },
	icon: 'icon-th-large-o',
	type: 'stock',
	children: [{
		path: 'outstock',
		name: 'StockOutstock',
		meta: {
			title: '公司出库明细'
		},
		component: _import('stock/outstock')
	}, {
		path: 'installOrder',
		name: 'StockInstallOrder',
		meta: {
			title: '安装确认单'
		},
		component: _import('stock/outstock')
	}]
}, {
	path: '/analysis',
	name: 'analysis',
	redirect: '/analysis',
	meta: {
		title: '运营分析'
	},
	hidden: true,
	root: true
}, {
	path: '/org',
	name: 'SYSTEM_ORGANIZATION_MANAGE',
	redirect: '/org/organization/areaManagement',
	hidden: true,
	root: true
}, {
	path: '/org/organization',
	name: 'ORGANIZATION_MANAGE',
	component: Layout,
	icon: 'icon-structure',
	type: 'SYSTEM_ORGANIZATION_MANAGE',
	children: [{
		path: 'areaManagement',
		name: 'AGENT_CHILD_AREA_MENU',
		meta: {
			title: '管理区域管理'
		},
		component: _import('organization/areaManagement')
	}, {
		path: 'accountManagement',
		name: 'AGENT_CHILD_USER_MENU',
		meta: {
			title: '子账号管理'
		},
		component: _import('organization/accountManagement')
	}, {
		path: 'roleManagement',
		name: 'AGENT_CHILD_ROLE_MENU',
		meta: {
			title: '角色管理'
		},
		component: _import('organization/roleManagement')
	}]
}]
