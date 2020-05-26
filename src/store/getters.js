const getters = {
	permission: state => state.User.permission,
	permissionLoaded: state => state.User.permissionLoaded,
	addRouters: state => state.Permission.addRouters,
	routers: state => state.Permission.routers,
	leftRouters: state => state.Permission.leftRouters,
	token: state => state.User.token,
	information: state => state.User.information,
	buttonList: state => state.User.buttonList
}
export default getters
