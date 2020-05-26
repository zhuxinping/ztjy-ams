import Vue from 'vue'
import Router from 'vue-router'
import Constant from './constant'

const routes = [...Constant]

Vue.use(Router)

// 路由是通过用户登录后获取数据时才加载的
// 路由定义好之后，通过用户返回的权限菜单来展示
// 路由还需要根据切换大菜单来做左侧菜单切换，但是不能把右侧的选项卡去掉
// 需要做两个界面，一个是有左侧菜单的框架，一个是没有左侧菜单的页面，没有左侧菜单的界面展示的都是一些基础数据和图表
export default new Router({
	mode: 'history',
	routes: [
		...routes
	]
})
