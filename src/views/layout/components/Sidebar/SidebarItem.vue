<template>
	<div class="menu-wrapper">
		<template v-for="item in routes" v-if="!item.hidden && item.children">
			<el-submenu :index="item.path" :key="item.name">
				<template slot="title">
					<i v-if="item.icon" :class="item.icon"></i>
					<span v-if="item.meta && item.meta.title" class="text">{{item.meta.title}}</span>
				</template>

				<template v-for="child in item.children" v-if="!child.hidden">
					<sidebar-item :is-nest="true" class="nest-menu" v-if="child.children && child.children.length > 0"
						:routes="[child]" :key="child.path"></sidebar-item>
					<router-link  :to="item.path + '/' + child.path" :key="item.path + '/' + child.path">
						<el-menu-item class="item" :index="item.path + '/' + child.path" :path="item.path + '/' + child.path"
							:key="child.name">
							<span v-if="child.meta && child.meta.title">{{child.meta.title}}</span>
						</el-menu-item>
					</router-link>
				</template>
			</el-submenu>

		</template>
	</div>
</template>

<script>
export default {
	name: 'SidebarItem',
	props: {
		routes: {
			type: Array
		}
	}
}
</script>

<style lang="scss" scoped>
	.hide-sidebar .menu-indent {
		display: block;
		text-indent: 10px;
	}

	.text {
		margin-left: 14px;
	}
</style>
