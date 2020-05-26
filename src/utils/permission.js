import router from '@/router/index'
import store from '@/store/index'
// Progress 进度条
import NProgress from 'nprogress'
// Progress 进度条样式
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import Common from '@/utils/common'
import { USER_TOKEN } from '@/maps/constants'
import { USER_TYPE } from '../maps/constants'

const whiteList = ['/login', '/reset', '/403', '/401'] // 不重定向白名单
router.beforeEach((to, from, next) => {
	NProgress.start()
	if (Common.getCookie(USER_TOKEN)) {
		const getters = store.getters
		const information = getters.information
		// 新窗口session会丢失，可以在打开时获取到用户信息
		if (Object.keys(information).length === 0) {
			store.dispatch('User/getUserInfo').then(res => {
				if (res.code === 10000) {
					checkNextRoute(to, from, next, res.body)
				} else {
					next({ path: '/login' })
				}
			}).catch((error) => {
				console.log(error)
				store.dispatch('User/fedLogOut').then(() => {
					Message.error('验证失败,请重新登录')
					next({ path: '/login' })
				})
			})
		} else {
			checkNextRoute(to, from, next, information)
		}
	} else {
		if (whiteList.indexOf(to.path) !== -1) {
			next()
		} else {
			next('/login')
			NProgress.done()
		}
	}
})
router.afterEach(() => {
	console.log(store.getters.permission)
	// 结束Progress
	NProgress.done()
})
function checkNextRoute (to, from, next, userInfo) {
	const getters = store.getters
	// 运维人员登录进入选择代理商页
	if (userInfo && userInfo.userType === USER_TYPE.Manager && !userInfo.agentId) {
		if (to.path === '/selectAgent') {
			next()
		} else {
			next({ path: '/selectAgent', replace: true })
		}
	} else if (to.path === '/selectAgent' || to.path === '/login') { // 已选择代理商或者非运维人员登录后
		next({ path: '/', replace: true })
	} else if (!getters.permissionLoaded) { // 权限未加载
		// 拉取用户权限
		// 1.返回用户权限为空
		// 2.返回没有角色权限的错误
		store.dispatch('User/getPermission').then(res => {
			const menuList = res.body.menuList
			generateRoutes(menuList, to.path).then((toPath) => {
				if (toPath) {
					next({ path: toPath, replace: true })
				} else {
					next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
				}
			}).catch(() => {
				// 没有数据权限
				next({ path: '/401', replace: true })
			})
		}).catch((error) => {
			console.log(error)
			// 没有菜单，其他路由要正常运转
			generateRoutes([], to.path).catch(() => {
				if (error.code === 3901) {
					// Message.error(error.message)
					next({ path: '/selectAgent', replace: true })
				} else if (error.code === 3902) {
					// Message.error(error.message)
					next({ path: '/403', replace: true })
				} else {
					store.dispatch('User/fedLogOut').then(() => {
						// Message.error('验证失败,请重新登录')
						next({ path: '/login' })
					})
				}
			})
		})
	} else {
		// 这里的to的matched为空，name也为空，没办法通过这两个来判断，所以只能用path
		// 验证权限
		// 如果是根目录，跳转到第一个菜单的子菜单
		if (!checkPermission(to.path, getters.routers)) {
			next({ path: '/404', replace: true })
		} else {
			next()
		}
	}
}
function generateRoutes (menuList, path) {
	const getters = store.getters
	return new Promise((resolve, reject) => {
		// 获取用户权限，然后设置当前用户路由，公共路由+异步路由
		store.dispatch('GenerateRoutes', { menuList }).then(() => { // 根据权限生成可访问的路由表
			// 获取需要跳转的第一个菜单
			let toPath = ''
			for (let i = 0; i < getters.routers.length; i++) {
				if (getters.routers[i].root && getters.routers[i].redirect) {
					toPath = getters.routers[i].redirect
				}
			}
			const route = getters.routers.find(route => toPath.indexOf(route.path) > -1 && !route.root && route.path !== '/')
			router.addRoutes(getters.addRouters) // 动态添加可访问路由表
			if (route) {
				store.dispatch('GenerateLeftRoutes', route.type)
			}
			if (!menuList || menuList.length === 0) {
				reject()
			} else {
				resolve(toPath)
			}
		})
	})
}
function checkPermission (path, routers) {
	let ret = false
	let i = 0
	for (; i < routers.length; i++) {
		const route = routers[i]
		const routePath = route.path
		const routePattern = new RegExp(routePath + '(?:\\/(?=$))?$')
		if (path.match(routePattern)) {
			ret = true
			break
		}
		if (path.indexOf(routePath) > -1 && route.children && route.children.length > 0) {
			ret = checkPermission(path, route.children)
		}
	}
	return ret
}
