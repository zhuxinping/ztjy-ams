<template>
	<div class="dashboard-container">
		<div class="dashboard-text">name: admin</div>
		<a href="/org/organization/areaManagement">系统组织</a>
	</div>
</template>

<script>

export default {
	name: 'dashboard'
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
	&-container {
		margin: 30px;
	}
	&-text {
		text-align: left;
		font-size: 30px;
		line-height: 46px;
	}
}
</style>
