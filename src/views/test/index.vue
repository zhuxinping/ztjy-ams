<template>
	<div class="app-container">
		<el-form ref="form" :model="form" label-width="120px">
			<el-form-item :label="path"></el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	data () {
		return {
			form: {}
		}
	},
	computed: {
		path () {
			return this.$route.meta.title
		}
	}
}
</script>
