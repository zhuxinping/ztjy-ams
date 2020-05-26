<template>
	<div class='tabs' v-if="$store.state.Tabs.list.length">
		<el-tabs
			v-model="$store.state.Tabs.current"
			type="card"
			closable
			@tab-click="onTabClick"
			@tab-remove="onRemoveTab">
			<el-tab-pane
				v-for="route in $store.state.Tabs.list"
				:key="route.path"
				:label="route.title"
				:name="route.path">
			</el-tab-pane>
		</el-tabs>
		<div class="tabs-view">
			<transition name="fade" mode="out-in">
				<keep-alive>
					<router-view></router-view>
				</keep-alive>
			</transition>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	name: 'Tabs',
	data () {
		return {
			visible: false,
			top: 0,
			left: 0,
			selectedTag: {}
		}
	},
	computed: {
		...mapGetters({
			tabList: 'Tabs/getTabList'
		})
	},
	methods: {
		...mapActions({
			remove: 'Tabs/remove_tabs'
		}),
		onTabClick (tab, e) {
			console.log(e)
			let index = this.$store.state.Tabs.pathList.indexOf(tab.name)
			if (index !== -1) {
				this.$router.push(this.$store.state.Tabs.list[index])
			}
		},
		onRemoveTab (path) {
			this.remove({
				path: path
			}).then(() => {
				if (this.$route.path === path) {
					if (this.$store.state.Tabs.list.length) {
						this.$router.push({
							path: this.$store.state.Tabs.list[0].path,
							params: this.$store.state.Tabs.list[0].params,
							query: this.$store.state.Tabs.list[0].query
						})
					} else {
						this.$router.push('/')
					}
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
	.contextmenu {
		margin: 0;
		background: #fff;
		z-index: 100;
		position: absolute;
		list-style-type: none;
		padding: 5px 0;
		border-radius: 4px;
		font-size: 12px;
		font-weight: 400;
		color: #333;
		box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
		li {
			margin: 0;
			padding: 7px 16px;
			cursor: pointer;
			&:hover {
				background: #eee;
			}
		}
	}
</style>
<style>
	.tabs .el-tabs__nav, .tabs .el-tabs__content .el-tab-pane {
		background-color: #fff;
	}

	.tabs .tabs-view{
		padding: 20px;
		background-color: #fff;
		border: 1px solid #e4e7ed;
		border-top: 0 none;
	}

	.tabs .el-tabs__nav .el-tabs__item:after {
		content: '';
		background-color: #e4e7ed;
		width: 100%;
		height: 1px;
		position: absolute;
		left: 0;
		top: 39px;
	}

	.tabs .el-tabs__nav .el-tabs__item.is-active:after {
		display: none;
	}
</style>
