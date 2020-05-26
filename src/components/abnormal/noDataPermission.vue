<template>
	<div class="no-data-permission">
		<div class="no-inner">
			<div class="no-img">
				<img src="../../assets/images/errImage/Nopermission_bg.png" alt="">
			</div>
			<div class="no-title">当前用户账号，无任何数据权限…</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	name: 'noDataPermission',
	props: {
	},
	data () {
		return {
		}
	},
	methods: {
		...mapActions({
		})
	},
	computed: {
	}
}
</script>
<style lang="scss">
	.no-data-permission{
		width: 100%;
		height: 100%;
		position: relative;
		.no-inner{
			width: 426px;
			height: 296px;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-left: -213px;
			margin-top: -148px;
			.no-img{
				width: 426px;
				height: 235px;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.no-title{
				font-size:16px;
				color:#2e84f3;
				text-align: center;
				margin-top: 40px;
			}
		}
	}
</style>
