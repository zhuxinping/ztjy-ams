<template>
	<div>
		<el-row>
			<el-button size="small">默认按钮</el-button>
			<el-button type="primary" size="small">主要按钮</el-button>
			<el-button type="success" size="small">成功按钮</el-button>
			<el-button type="info" size="small">信息按钮</el-button>
			<el-button type="warning" size="small">警告按钮</el-button>
			<el-button type="danger" size="small">危险按钮</el-button>
			<el-button size="small" disabled>禁用按钮</el-button>
		</el-row>

		<el-row>
			<el-button plain size="small">朴素按钮</el-button>
			<el-button type="primary" plain size="small">主要按钮</el-button>
			<el-button type="success" plain size="small">成功按钮</el-button>
			<el-button type="info" plain size="small">信息按钮</el-button>
			<el-button type="warning" plain size="small">警告按钮</el-button>
			<el-button type="danger" plain size="small">危险按钮</el-button>
		</el-row>

		<el-row>
			<el-button round size="small">圆角按钮</el-button>
			<el-button type="primary" round size="small">主要按钮</el-button>
			<el-button type="success" round size="small">成功按钮</el-button>
			<el-button type="info" round size="small">信息按钮</el-button>
			<el-button type="warning" round size="small">警告按钮</el-button>
			<el-button type="danger" round size="small">危险按钮</el-button>
		</el-row>

		<el-row>
			<el-button icon="el-icon-search" circle size="small"></el-button>
			<el-button type="primary" icon="el-icon-edit" circle size="small"></el-button>
			<el-button type="success" icon="el-icon-check" circle size="small"></el-button>
			<el-button type="info" icon="el-icon-message" circle size="small"></el-button>
			<el-button type="warning" icon="el-icon-star-off" circle size="small"></el-button>
			<el-button type="danger" icon="el-icon-delete" circle size="small"></el-button>
		</el-row>
	</div>
</template>

<script>

export default {
	data () {
		return {}
	}
}
</script>
<style scoped>
	.el-row{
		margin-bottom: 20px;
	}
</style>
