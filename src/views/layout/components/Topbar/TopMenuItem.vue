<template>
	<div class="el-menu-item-main">
		<template v-for="(item, i) in routes" v-if="item.root">
			<el-menu-item v-if="item.redirect" :index="item.redirect" class="submenu-title-no-ropdown" :key="item.name" :type="item.name" v-show="i < showNum">
				<i v-if="item.icon" :class="item.icon"></i>
				<span class="text" v-if="item.meta && item.meta.title">{{item.meta.title}}</span>
			</el-menu-item>
		</template>
	</div>
</template>

<script>
export default {
	name: 'TopMenuItem',
	props: {
		routes: {
			type: Array
		},
		showNum: {
			type: Number
		}
	},
	mounted () {
	//	console.log(this.$route.path)
	},

	method: {

	}
}
</script>
<style scoped>
	.el-menu-item-main{
		float: left;
	}
</style>
