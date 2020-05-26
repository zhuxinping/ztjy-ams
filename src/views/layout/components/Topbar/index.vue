<template>
	<div class="app-topbar">
		<div class="app-topbar-wrapper">
			<!--大菜单-->
			<el-menu mode="horizontal" router @select="handleSelect" :default-active="$route.path">
				<top-menu-item :routes="routes" :showNum="showNum"></top-menu-item>
				<top-more-menu-item v-if="showNum > 0 && showNum !== routes.length"
					:routes="moreRoutes" :showNum="showNum"></top-more-menu-item>
			</el-menu>
		</div>
	</div>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex'
import store from '@/store'
// import ResizeHandler from '@/mixins/ResizeHandler'
import TopMenuItem from './TopMenuItem.vue'
import TopMoreMenuItem from './TopMoreMenuItem.vue'

export default {
	data () {
		return {
			showNum: 0,
			menuList: null,
			moreRoutes: []
		}
	},
	components: {
		TopMoreMenuItem,
		TopMenuItem
	},
	name: 'Topbar',
	// mixins: [ResizeHandler],
	beforeMount () {
		window.addEventListener('resize', this.resizeHandler)
	},
	mounted () {
		const menuContainer = this.$el.querySelector('.el-menu--horizontal')
		this.menuList = menuContainer.querySelector('.el-menu-item-main').querySelectorAll('.el-menu-item')

		this.moreRoutes = this.routes.slice(0, this.showNum)
		this.resizeHandler()
	},
	methods: {
		handleSelect (key, keyPath, e) {
			store.dispatch('GenerateLeftRoutes', e.$el.getAttribute('type'))
		},
		// 会有到一定概率展示错误和出现闪烁的问题
		resizeHandler () {
			const rect = this.$el.getBoundingClientRect()
			const menuList = this.menuList
			const menuMoreWidth = 54
			const restWidth = rect.width - menuMoreWidth
			let width = 0
			let i = 0

			for (; i < menuList.length; i++) {
				const menu = menuList[i]
				let menuWidth = 0

				menu.style.display = 'block'
				menuWidth = menu.getBoundingClientRect().width

				if (restWidth > width + menuWidth) {
					width += menuWidth
					this.showNum = i + 1
				} else {
					menu.style.display = 'none'
				}
			}
		}
	},
	computed: {
		routes () {
			const routers = store.getters.routers.filter(route => route.root)
			// this.showNum = routers.length
			return routers
		}
	}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	.app-topbar {
		font-size: 24px;
		text-align: left;
		color: #fff;
		flex: 1;
		background: #468cde;
		height: 50px;
		line-height: 50px;
		.avatar-container {
			height: 40px;
			display: inline-block;
			position: absolute;
			right: 35px;
			top: 10px;
			.avatar-wrapper {
				cursor: pointer;
				position: relative;
				.user-avatar {
					width: 40px;
					height: 40px;
					border-radius: 10px;
				}
				.el-icon-caret-bottom {
					position: absolute;
					right: -20px;
					top: 25px;
					font-size: 12px;
				}
			}
		}

		.el-icon-more {
			transform: rotate(90deg);
		}
		.el-submenu__icon-arrow {
			display: none;
		}
	}
</style>
<style>
	.app-topbar .el-menu--horizontal {
		background-color: #468cde;
		float: left;
	}

	.app-topbar .el-menu--horizontal .el-menu-item {
		height: 50px;
		line-height: 50px;
		background-color: #468cde;
		color: #fff;
		/*width: 96px;*/
		text-align: center;
	}
	.app-topbar .el-menu--horizontal .el-menu-item.is-active,
	.app-topbar .el-menu--horizontal .el-menu-item:focus,
	.app-topbar .el-menu--horizontal .el-menu-item:hover,
	.app-topbar .el-menu--horizontal .el-submenu__title:hover {
		background-color: rgba(0, 0, 0, 0.10);
		color: #fff;
	}

	.app-topbar .el-menu--horizontal .el-menu-item-more {
		float: left;
		border-left: 1px solid #649de0;
		border-right: 1px solid #649de0;
	}

	.app-topbar .el-menu--horizontal .el-menu-item-more .el-submenu__title {
		height: 50px;
		line-height: 50px;
		color: #fff;
		background-color: #468cde;
	}

	.app-topbar .el-menu--horizontal .el-menu-item-more .el-submenu__icon-arrow {
		display: none;
		margin-left: 0;
	}

	.app-topbar .el-menu--horizontal .el-menu-item-more .el-submenu>.el-menu{
		top: 50px;
		padding: 0;
		background: #468cde;
		position: absolute;
	}
	.app-topbar .el-menu--horizontal .el-menu-item-more .el-submenu>.el-menu .el-menu-item{
		border-top: 1px solid #649de0;
		min-width: inherit;
		float: none;
	}
</style>
