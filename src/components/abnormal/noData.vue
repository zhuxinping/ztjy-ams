<template>
	<div class="no-data">
		<div class="no-inner">
			<div class="no-img">
				<img src="../../assets/images/errImage/Nodata_bg.png" alt="">
			</div>
			<div class="no-title">抱歉！查询暂无数据</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	name: 'noData',
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
.no-data{
	width: 100%;
	height: 100%;
	position: relative;
	.no-inner{
		width: 266px;
		height: 210px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -133px;
		margin-top: -105px;
		.no-img{
			width: 266px;
			height: 149px;
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
