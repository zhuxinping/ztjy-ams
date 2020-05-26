const _import = require('./_import_' + process.env.NODE_ENV)
// const Layout = _import('layout/Layout')

export default [{
	path: '/login',
	name: 'login',
	component: _import('login/index'),
	hidden: true
}, {
	path: '/reset',
	name: 'reset',
	component: _import('login/reset'),
	hidden: true
}, {
	path: '/404',
	name: '404',
	component: _import('errorPage/404'),
	hidden: true
}, {
	path: '/401',
	name: '401',
	component: _import('errorPage/401'),
	hidden: true
}, {
	path: '/403',
	name: '403',
	component: _import('errorPage/403'),
	hidden: true
}, {
	path: '/',
	redirect: {
		name: 'dashboard'
	}
}, {
	path: '/dashboard',
	name: 'dashboard',
	component: _import('dashboard/index'),
	hidden: true
}, {
	path: '/selectAgent',
	name: 'selectAgent',
	component: _import('selectAgent/index'),
	hidden: true
}]
