<template>
	<section class="app-main">
		<tabs></tabs>
	</section>
</template>

<script>
import Tabs from '@/views/layout/components/Tabs.vue'
import { mapActions } from 'vuex'

export default {
	name: 'AppMain',
	components: {
		Tabs
	},
	methods: {
		...mapActions({
			update: 'Tabs/update_tabs'
		}),
		onUpdateTabs () {
			this.update({
				route: this.$route
			})
		}
	},
	mounted () {
		this.onUpdateTabs()
	},
	watch: {
		$route (to, from) {
			this.onUpdateTabs()
		}
	}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	.app-main{
		padding: 15px;
	}
</style>
<style>
	.el-tabs__header{
		margin-bottom: 0;
	}

</style>
