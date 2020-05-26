<template>
	<div>
		<el-menu class="navbar" mode="horizontal">
			<hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
			<topbar></topbar>
			<div class="shortcut">
				<!--<el-menu-item index="">-->
					<!--<i class="icon icon-cash-o"></i>-->
				<!--</el-menu-item>-->
				<!--<el-menu-item index="" class="notification">-->
				<!--<span class="icon icon-bell" v-if="newMessage">-->
					<!--<i>{{messageCount}}</i>-->
				<!--</span>-->
				<!--</el-menu-item>-->
				<!--<el-menu-item index="">-->
					<!--<i class="icon icon-headphone"></i>-->
				<!--</el-menu-item>-->
				<!--<el-menu-item index="" route="">-->
					<!--<i class="icon icon-help"></i>-->
				<!--</el-menu-item>-->
				<el-dropdown class="userboard" trigger="click">
					<div class="username">
						<i class="icon icon-member"></i>
						<span :title="userInfo.trueName">{{userInfo.trueName}}</span>
						<i class="el-icon-caret-bottom"></i>
					</div>
					<el-dropdown-menu class="user-dropdown" slot="dropdown">
						<el-dropdown-item>
							<span @click="logoutHandler" style="display:block;">退出登录</span>
						</el-dropdown-item>
						<el-dropdown-item divided>
							<span @click="changePasswordFlag = true" style="display:block;">修改密码</span>
						</el-dropdown-item>
						<!--<router-link class="inlineBlock" to="/bindPhone">-->
							<!--<el-dropdown-item>绑定手机号码验证</el-dropdown-item>-->
						<!--</router-link>-->
						<!--<el-dropdown-item>-->
							<!--<span @click="handleQrcode">园所注册邀请二维码</span>-->
						<!--</el-dropdown-item>-->
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</el-menu>
		<el-dialog title="修改密码" :visible.sync="changePasswordFlag" :close-on-click-modal="false">
			<div class="password-require">
				<span class="password-span">密码策略:</span>
				<div class="div">
					<p>1、6-16位</p>
					<p>2、数字、字母、字符三者可自由组合（特殊字符除外）；</p>
					<p>3、密码中至少包含数字、字母。</p>
				</div>
			</div>
			<el-form class = 'elform' :label-position="labelPosition" label-width="80px" ref="password" :model="password" size="small">
				<el-form-item class="required1" label="旧密码" prop="oldPassword" :rules="rules.oldPassword">
					<el-input type="passWord" v-model="password.oldPassword" maxlength="16" placeholder="忘记密码？请联系公司客服..."></el-input>
				</el-form-item>
				<el-form-item class="required1" label="新密码" prop="newPassword" :rules="rules.newPassword">
					<el-input type="passWord" v-model="password.newPassword" maxlength="16"></el-input>
				</el-form-item>
				<el-form-item class="required1" label="确认密码" prop="repeatPassword" :rules="rules.repeatPassword">
					<el-input type="passWord" v-model="password.repeatPassword" maxlength="16"></el-input>
				</el-form-item>
				<el-form-item class="elbutton">
					<el-button type="primary" @click="submitForm('password')">确定</el-button>
					<el-button class="daochu" @click="resetForm('password')">取消</el-button>
				</el-form-item>
			</el-form>
			<!--<el-dialog-->
				<!--class="dialog"-->
				<!--width="400px"-->
				<!--title="退出登录"-->
				<!--:visible.sync="innerVisible"-->
				<!--:close-on-click-modal="false"-->
				<!--:show-close=false-->
				<!--append-to-body>-->
				<!--<el-button type="primary" style="float: right; margin-top: -20px" @click="loginOut">确认</el-button>-->
			<!--</el-dialog>-->
		</el-dialog>
		<el-dialog title="校园邀请二维码" :visible.sync="qrcodeDialog.visible" :close-on-click-modal="false">
			<div style="text-align: center;">
				<img :src="qrcodeDialog.url" alt="">
			</div>
		</el-dialog>
	</div>
</template>

<script>
import Hamburger from '@/components/hamburger'
import Topbar from '@/views/layout/components/Topbar/index.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
	data () {
		let validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'))
			} else if (value === this.password.oldPassword) {
				callback(new Error('新密码与旧密码一致!'))
			} else {
				callback()
			}
		}
		let validateRepeatPass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'))
			} else if (value !== this.password.newPassword) {
				callback(new Error('两次输入密码不一致!'))
			} else {
				callback()
			}
		}
		return {
			newMessage: false,
			messageCount: 0,
			changePasswordFlag: false,
			labelPosition: 'right',
			password: {
				oldPassword: '',
				newPassword: '',
				repeatPassword: ''
			},
			rules: {
				oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' },
					{ min: 6, max: 16, message: '密码长度在6到16个字符', trigger: 'blur' },
					{ pattern: /^[^'"?/\\<>]*$/, message: '不允许输入\' "?/<>' },
					{pattern: /^[^\u4e00-\u9fa5]+$/, message: '不允许输入中文'},
					{ pattern: /^[^\s]+$/, message: '不允许输入\' "?/<>' },
					{
						pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)(?!\W+$)(?![\Wa-zA-Z]+$)(?![\W0-9]+$)[0-9A-Za-z\W]{6,16}$/,
						message: '6-16位，至少包含数字、字母',
						trigger: ['blur']
					}],
				newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' },
					{ min: 6, max: 16, message: '密码长度在6到16个字符', trigger: 'blur' },
					{ pattern: /^[^'"?/\\<>]*$/, message: '不允许输入\' "?/<>' },
					{pattern: /^[^\u4e00-\u9fa5]+$/, message: '不允许输入中文'},
					{ pattern: /^[^\s]+$/, message: '不允许输入\' "?/<>' },
					{
						pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)(?!\W+$)(?![\Wa-zA-Z]+$)(?![\W0-9]+$)[0-9A-Za-z\W]{6,16}$/,
						message: '6-16位，至少包含数字、字母',
						trigger: ['blur']
					},
					{ validator: validatePass, trigger: 'blur' }],
				repeatPassword: [{ required: true, message: '请输入确认密码', trigger: 'blur' },
					{ min: 6, max: 16, message: '密码长度在6到16个字符', trigger: 'blur' },
					{ pattern: /^[^'"?/\\<>]*$/, message: '不允许输入\' "?/<>' },
					{ pattern: /^[^\s]+$/, message: '不允许输入\' "?/<>' },
					{
						pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)(?!\W+$)(?![\Wa-zA-Z]+$)(?![\W0-9]+$)[0-9A-Za-z\W]{6,16}$/,
						message: '6-16位，至少包含数字、字母',
						trigger: ['blur']
					},
					{ validator: validateRepeatPass, trigger: 'blur' }]
			},
			qrcodeDialog: {
				visible: false,
				url: ''
			}
		}
	},
	components: {
		Topbar,
		Hamburger
	},
	mounted () {
		this.username = this.userInfo.username
	},
	methods: {
		...mapActions({
			toggleSideBar: 'SideBar/toggleSideBar',
			logout: 'User/logout',
			changePassword: 'User/changePassword',
			qrcode: 'Agent/qrcode'
		}),
		logoutHandler () {
			this.logout().then(() => {
				window.location.href = '/login'
			})
		},
		submitForm (password) {
			let params = {}
			params.oldPassword = this.password.oldPassword
			params.password = this.password.newPassword
			this.$refs[password].validate((valid) => {
				if (valid) {
					this.changePassword(params).then(res => {
						if (res.code === 10000) {
							this.changePasswordFlag = false
							this.$message({ type: 'success', message: '修改密码成功，请重新登录!' })
							this.logoutHandler()
						} else {
							this.$message({ type: 'error', message: res.message })
						}
					}).catch(() => {
						console.log('网络错误！')
						// this.$message({ type: 'error', message: '网络错误！' })
					})
				} else {
					return false
				}
			})
		},
		resetForm (password) {
			this.$refs[password].resetFields()
			this.changePasswordFlag = false
		},
		handleQrcode () {
			this.qrcodeDialog.visible = true
			this.qrcode().then(response => {
				if (response.code === 10000) {
					this.qrcodeDialog.url = response.body.QRCodeUrl
				}
			})
		}
	},
	computed: {
		...mapGetters({
			sidebar: 'SideBar/getSidebar',
			userInfo: 'User/userInfo'
		})
	}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.navbar {
		height: 50px;
		line-height: 50px;
		border-radius: 0 !important;
		position: relative;
		background: #468cde;
		z-index: 10;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-around;
		&:after {
			content: '';
			display: block;
			position: absolute;
			top: 50px;
			left: 0;
			right: 0;
			height: 1px;
			background: #eee;
		}
		.hamburger-container {
			flex: 0 0 50px;
			line-height: 50px;
			height: 50px;
			padding: 0 15px;
			background: #468cde;
			border-left: 1px solid #649de0;
			border-right: 1px solid #649de0;
			&:hover {
				background: rgba(0, 0, 0, 0.10);
			}
		}
		.screenfull {
			position: absolute;
			right: 90px;
			top: 16px;
			color: red;
		}
		.shortcut {
			.userboard {
				.username {
					cursor: pointer;
					position: relative;
					color: #fff;
					padding-right: 15px;
					span{
						display: inline-block;
						max-width: 80px;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						vertical-align: middle;
					}
					.icon {
						position: relative;
						display: inline-block;
						vertical-align: middle;
						padding-left: 8px;
						border-left: 1px solid #649de0;
						i {
							position: absolute;
							top: -5px;
							right: -5px;
							font-size: 12px;
							color: #fff;
							background: #f00;
							display: inline-block;
						}
					}
					.el-icon-caret-bottom {
						font-size: 12px;
					}
				}
				&:hover {
					background: rgba(0, 0, 0, 0.1);
				}
			}
		}
	}

	.el-menu--horizontal {
		border-bottom: none;
		.el-menu-item {
			height: 50px;
			line-height: 50px;
		}
	}
	.elform{
		margin-top: 24px;
		margin-left: 36px;
		width: 300px;
		.elbutton{
			/*margin-left: 12px;*/
			margin-top: 24px;
			margin-bottom: 4px;
		}
	}
	.password-require{
		background:rgba(70,140,222,0.06);
		border:1px solid #cee3fc;
		border-radius:2px;
		font-size: 12px;
		width:386px;
		height:66px;
		.password-span {
			float: left;
			margin-left: 11px;
			margin-top: 7px;
		}
		.div{
			float: left;
			margin: 7px 0px 0px 7px;
		}
	}
</style>
<style>
	.navbar.el-menu--horizontal {
		background-color: #468cde;
	}

	.navbar.el-menu--horizontal .el-menu-item {
		height: 50px;
		line-height: 50px;
		background: #468cde;
		color: #fff;
		float: left;
		padding: 0 25px;
	}

	.navbar.el-menu--horizontal .el-menu-item:focus, .navbar.el-menu--horizontal .el-menu-item:hover, .navbar.el-menu--horizontal .el-submenu__title:hover {
		background: rgba(0, 0, 0, 0.10);
		color: #fff;
	}

	.navbar .shortcut .el-menu-item {
		padding: 0;
	}

	.shortcut .el-menu-item .icon {
		display: inline-block;
		border-left: 1px solid #649de0;
		padding: 0 8px;
	}

	.shortcut .el-menu-item:first-child i {
		border-left: 0;
	}

	.shortcut .el-menu-item {
		z-index: 1;
	}

	.shortcut .el-menu-item.notification {
		z-index: 10;
	}

	.shortcut .el-menu-item .icon-bell {
		position: relative;
	}

	.shortcut .el-menu-item .icon > i {
		position: absolute;
		top: -5px;
		right: 1px;
		height: 12px;
		line-height: 12px;
		background: #fc6e00;
		-wekbit-border-radius: 12px;
		-moz-border-radius: 12px;
		-o-border-radius: 12px;
		border-radius: 12px;
		-webkit-text-size-adjust: none;
		font-size: 10px;
		font-family: Arial;
		padding: 0 2px;
	}
	.el-dialog__body {
		padding: 20px 16px;
	}
	.el-dialog {
		width: 418px
	}
	.el-dialog .el-dialog__header{
		height: 42px;
		border-bottom:1px solid #eeeeee;
	}
	.el-dialog .el-dialog__header .el-dialog__title{
		line-height: 0px;
		font-family:MicrosoftYaHei;
		font-size:14px;
		color:#333333;
		letter-spacing:0;
		text-align:left;
	}
	.el-dialog .el-form-item__label{
		font-size: 12px;
	}
	.el-input--small .el-input__inner{
		font-size: 12px;
	}
	/*.el-input__inner{*/
	/*background:#ffffff;*/
	/*border:1px solid #c6c6c6;*/
	/*border-radius:2px;*/
	/*width:214px;*/
	/*height:30px;*/
	/*}*/
</style>
