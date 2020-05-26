<template>
	<div class="app-wrapper" :class="{'hide-sidebar':!sidebar.opened}">
		<div class="app-content">
			<sidebar class="sidebar-container"></sidebar>
			<div class="main-container">
				<navbar></navbar>
				<app-main></app-main>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import store from '@/store'
import Navbar from '@/views/layout/components/Navbar.vue'
import Sidebar from '@/views/layout/components/Sidebar/index.vue'
import AppMain from '@/views/layout/components/AppMain.vue'
// import ResizeHandler from '@/mixins/ResizeHandler'

export default {
	name: 'layout',
	components: {
		Navbar,
		Sidebar,
		AppMain
	},
	//	mixins: [ResizeHandler],
	computed: {
		...mapGetters({
			sidebar: 'SideBar/getSidebar',
			userInfo: 'User/userInfo'
		})
	},
	mounted () {
		if (this.userInfo.userType) {

		}
	},
	methods: {
		...mapActions({
			logout: 'User/logout'
		}),
		logoutHandler () {
			this.logout().then(() => {
				this.$router.push({ path: '/login' })
				// 为了重新实例化vue-router对象 避免bug
				// window.location.reload()
			})
		}
	}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.app-wrapper {
		position: relative;
		height: 100%;
		width: 100%;
		background-color: #f5f5f6;
		&:after {
			content: "";
			display: table;
			clear: both;
		}
	}
</style>
