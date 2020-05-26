<template>
	<div class="el-menu-item-more">
		<el-submenu :key="'more'" :index="'topMenuMore'">
			<template slot="title">
				<span class="icon-ellipsis"></span>
			</template>
			<el-menu-item v-for="(item, i) in routes" v-if="i >= showNum" :index="item.redirect" :key="item.name" :type="item.name">
				<span class="text" v-if="item.meta && item.meta.title">{{item.meta.title}}</span>
			</el-menu-item>
		</el-submenu>
	</div>
</template>

<script>

export default {
	name: 'TopMoreMenuItem',
	props: {
		routes: {
			type: Array
		},
		showNum: {
			type: Number
		}
	}
}
</script>
