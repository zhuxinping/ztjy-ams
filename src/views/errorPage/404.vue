<template>
	<div class="err-container">
		<div class="err clearfix">
			<div class="err-left">
				<img src="../../assets/images/errImage/404_bg.png" alt="">
			</div>
			<div class="err-right">
				<ul class="tab clearfix">
					<li @click="toLink('1')" :class="{active:isActive === '1'}">刷新页面</li>
					<li @click="toLink('2')" :class="{active:isActive === '2'}">返回首页</li>
					<li @click="toLink('3')" class="cur" :class="{active:isActive === '3'}">联系客服</li>
				</ul>
				<div class="reason">没找到您要访问的网页，原因可能如下：</div>
				<ul class="reason-list">
					<li> <i class="dot"></i>可能是网宿过慢，或者网络中断</li>
					<li><i class="dot"></i>可能是页面已被删除</li>
					<li><i class="dot"></i>这个网页太受欢迎了，太多人在访问</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			isActive: '1'
		}
	},
	components: {
	},
	methods: {
		toLink (index) {
			this.isActive = index
			if (index === 1) {
				this.$router.go(0)
			} else if (index === 2) {
				this.$router.push('/login')
			} else {
				this.$router.push('/service')
			}
		}
	}
}
</script>
<style lang="scss">
	html, body{
		height: 100%;
	}
	.err-container{
		width: 100%;
		height: 100%;
		background: #fff;
		position: relative;
		.err{
			width: 772px;
			height: 317px;
			top: 50%;
			left: 50%;
			margin-top: -158.5px;
			margin-left: -386px;
			position: absolute;
		}
		.err-left{
			float: left;
			width: 376px;
			height: 317px;
		}
		.err-right{
			width: 296px;
			height: 317px;
			float: right;
			margin-left: 100px;
			.reason{
				font-size:14px;
				color:#666666;
				margin: 32px 0 16px 0;
			}
			.reason-list{
				li{
					height: 26px;
					line-height: 26px;
					font-size:12px;
					color:#666666;
					i.dot{
						background:#999999;
						width:4px;
						height:4px;
						border-radius:50%;
						display: inline-block;
						vertical-align: middle;
						margin-right: 8px;
					}
				}
			}
			.tab{
				li{
					float: left;
					background:#ffffff;
					border:1px solid #468cde;
					border-radius:2px;
					width:86px;
					height:30px;
					line-height: 30px;
					text-align: center;
					font-size:14px;
					color:#468cde;
					margin-right: 16px;
					cursor: pointer;
				}
				li.active{
					background:#468cde;
					border-radius:2px;
					width:88px;
					height:32px;
					color:#fff;
				}
				li.cur{
					margin-right: 0;
				}
			}
		}
	}
</style>
