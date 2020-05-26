<template>
	<div class="no-data-permission">
		<div class="no-inner">
			<div class="no-img">
				<img src="../../assets/images/errImage/Nopermission_bg.png" alt="">
			</div>
			<div class="no-title">当前用户账号，无任何数据权限，请联系管理员。 <el-button @click="handleLogout" size="small" type="primary">返回登录页</el-button></div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	name: 'noDataPermission',
	methods: {
		...mapActions({
			logout: 'User/logout',
			fedLogOut: 'User/fedLogOut'
		}),
		handleLogout () {
			this.logout().then(() => {
				window.location.href = '/login'
			}).catch(() => {
				this.fedLogOut().then(() => {
					window.location.href = '/login'
				})
			})
		}
	}
}
</script>
<style lang="scss">
	html, body{
		height: 100%;
	}
	.no-data-permission{
		width: 100%;
		height: 100%;
		position: relative;
		.no-inner{
			text-align: center;
			position: absolute;
			width: 100%;
			top: 50%;
			transform: translateY(-50%);
			.no-title{
				font-size:16px;
				color:#2e84f3;
				text-align: center;
				margin-top: 40px;
				.el-button--primary {
					margin-left: 20px;
				}
			}
		}
	}
</style>
