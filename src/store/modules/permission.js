// import { routerMap, constantRouterMap } from '@/router'
import dynamicRouterMap from '@/router/dynamic'
import constantRouterMap from '@/router/constant'

/**
 * 判断codeId是否匹配
 * @param menuList
 * @param route
 */
function hasPermission (menuList, route) {
	let result = false
	for (let i = 0; i < menuList.length; i++) {
		const menu = menuList[i]
		const meta = { title: menu.menuName }
		if (menu.codeId === route.name) {
			route.meta = meta
			return true
		}
		if (menu.menuList && menu.menuList.length) {
			result = hasPermission(menu.menuList, route)
			if (result) {
				break
			}
		}
	}
	return result
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param menuList
 */
function filterAsyncRouter (asyncRouterMap, menuList) {
	const accessedRouters = asyncRouterMap.filter(route => {
		if (hasPermission(menuList, route)) {
			const children = route.children
			if (children && children.length) {
				route.children = filterAsyncRouter(children, menuList)
			}
			return true
		}
		return false
	})
	return accessedRouters
}

function buildRouterRedirect (routers) {
	routers.forEach(route => {
		if (route.root) {
			routers.forEach(r => {
				if (route.name === r.type) {
					if (r.children && r.children.length) {
						route.redirect = r.path + '/' + r.children[0].path
					}
				}
			})
		}
	})
	return routers
}

const permission = {
	state: {
		routers: [],
		addRouters: [],
		leftRouters: []
	},
	mutations: {
		SET_ROUTERS: (state, routers) => {
			state.addRouters = routers
			state.routers = constantRouterMap.concat(routers)
			// window.sessionStorage.setItem('ROUTERS', JSON.stringify(state.routers))
			// window.sessionStorage.setItem('ADD_ROUTERS', JSON.stringify(state.addRouters))
		},
		SET_LEFT_ROUTERS: (state, routers) => {
			state.leftRouters.splice(0, state.leftRouters.length)
			state.leftRouters = state.leftRouters.concat(routers)
		}
	},
	actions: {
		GenerateRoutes ({ commit }, data) {
			return new Promise(resolve => {
				const { menuList } = data
				// 需要过滤整个菜单
				let accessedRouters = []
				// 菜单的默认子菜单是可变的
				accessedRouters = buildRouterRedirect(filterAsyncRouter(dynamicRouterMap, menuList))
				console.log('accessedRouters:')
				console.log(accessedRouters)
				commit('SET_ROUTERS', accessedRouters)
				resolve()
			})
		},
		GenerateLeftRoutes ({ commit, state }, type) {
			// 查找根路由的二级路由目录
			const routes = state.routers
			let children = []
			for (let i = 0; i < routes.length; i++) {
				const route = routes[i]
				if (type && type === route.type) {
					children.push(route)
				}
			}
			commit('SET_LEFT_ROUTERS', children)
		}
	}
}

export default permission
