<template>
	<div class="login-container">
		<div class="login-body">
			<div class="login-bg">
			</div>
		</div>
		<modalCheckCode :second="second" ref="myConfirm" :cellPhone="cellPhone"></modalCheckCode>
		<el-form id="login" class="card-box login-form" autoComplete="false" :model="loginForm" ref="loginForm" label-position="left">
			<div class="login-in clearfix">
				<div class="login-left">
					<h3 class="title">
						<span class="logo"></span>
					</h3>
					<img src="../../assets/images/login/bg_login.png" alt="">
				</div>
				<div class="login-right">
					<el-form-item class="login-form-item active">
						<span class="login-title">登录</span>
					</el-form-item>
					<div class="err-info">
						<div class="err-msg" v-if="errInfo">{{errInfo}}</div>
					</div>
					<el-form-item prop="username" class="login-form-item">
						<i class="icon-member icon-user"></i>
						<el-input name="username" type="text" v-model="loginForm.username" autocomplete="false" @focus="handleFocus" placeholder="请输入账号" class="login-form-input"/>
					</el-form-item>
					<el-form-item prop="verifyCodeKey" class="login-form-item" id="verifyCodeKey">
						<i class="fa fa-user"></i>
						<el-input name="verifyCodeKey" type="hidden" v-model="loginForm.verifyCodeKey" class="login-form-input"/>
					</el-form-item>
					<el-form-item prop="password" class="login-form-item cur">
						<i class="fa fa-lock"></i>
						<el-input name="password" :type="pwdType" v-model="loginForm.password" @focus="handleFocus" autocomplete="false" placeholder="请输入密码" class="login-form-input active" @keyup.enter.native="submitForm('loginForm')"/>
						<!--<i class="fa fa-eye" :class="{'fa-eye-slash': !pwdType}" @click='showPwd'>忘记密码？</i>-->
						<!--<em class="reset" @click="toReset">忘记密码？</em>-->
					</el-form-item>
					<div class="check">
						<div class="check-code clearfix" v-if="showCode">
							<el-form-item prop="checkcode" class="login-form-item code">
								<el-input name="checkcode" type="text" v-model="loginForm.checkcode" @focus="handleFocus" autocomplete="false" placeholder="请输入验证码" class="login-form-input"/>
							</el-form-item>
							<img v-if="imgSrc" @click="refresh" :src="imgSrc" alt="">
						</div>
					</div>
					<div class="buttom-btn">
						<el-button type="primary" @click="submitForm('loginForm')" :loading="loading">登录
						</el-button>
					</div>
				</div>
			</div>
		</el-form>
	</div>
</template>
<script>
import { mapActions, mapMutations } from 'vuex'
import checkCode from './components/checkCode'
import modalCheckCode from './components/modalCheckCode'
import Common from '@/utils/common'
import { USER_INFO, USER_TYPE } from '@/maps/constants'
// import { UserApi } from '@/api/index'
import userApi from '../../api/userApi'

export default {
	name: 'login',
	components: {
		checkCode,
		modalCheckCode
	},
	data () {
		return {
			loginForm: {
				username: '',
				password: '',
				checkcode: '',
				verifyCodeKey: ''
			},
			// loginRulesWithNoCode: {
			// 	username: [{required: true, trigger: 'blur', message: '请输入用户名'}
			// 	],
			// 	password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
			// },
			// loginRulesWithCode: {
			// 	username: [{required: true, trigger: 'blur', message: '请输入用户名'}
			// 	],
			// 	password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
			// 	checkcode: [{ required: true, trigger: 'blur', message: '请输入验证码' }]
			// },
			oldUserName: '',
			errMsg: '',
			loading: false,
			showCode: false,
			errInfo: '',
			cellPhone: '',
			pwdType: 'password',
			second: 50,
			imgSrc: ''
		}
	},
	created () {
	},
	mounted () {
		// this.$refs.myConfirm.closeModel()
		// this.$refs.myConfirm.showModel()
	},
	computed: {
		// ...mapGetters({
		// 	getMessage: 'User/getMessage'
		// }),
		// loginRules: function () {
		// 	if (this.showCode) {
		// 		return this.loginRulesWithCode
		// 	} else {
		// 		return this.loginRulesWithNoCode
		// 	}
		// }
	},
	methods: {
		...mapMutations({
			setUserInfo: 'User/SET_INFO'
		}),
		...mapActions({
			login: 'User/login'
		}),
		handleFocus () {
			this.errInfo = ''
		},
		showPwd () {
			if (this.pwdType === 'password') {
				this.pwdType = ''
			} else {
				this.pwdType = 'password'
			}
		},
		// 用户手动点击图片刷新验证码
		refresh () {
			// 生成16位随机数
			this.loginForm.verifyCodeKey = Common.getRandomNum()
			// 这里获取图片验证码
			let imgUrl = userApi.getImgCodeUrl()
			this.imgSrc = `${imgUrl}?verifyCodeKey=${this.loginForm.verifyCodeKey}`
		},
		toReset () {
			this.$router.push('/reset')
		},
		resetForm (formName) {
			// this.$refs[formName].resetFields()
			this.loginForm.username = ''
			this.loginForm.password = ''
		},
		submitForm (formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					if (!this.loginForm.username && !this.loginForm.password) {
						this.errInfo = '请输入账号和密码'
						return
					}
					if (!this.loginForm.username) {
						this.errInfo = '请输入账号'
						return
					}
					if (!this.loginForm.password) {
						this.errInfo = '请输入密码'
						return
					}
					if (this.showCode) {
						if (!this.loginForm.checkcode) {
							this.errInfo = '请输入图片验证码'
							return
						}
					}
					this.loading = true
					this.login(this.loginForm).then((response) => {
						console.log(this.loginForm)
						if (response.code !== 10000) {
							if (response.code === 3901) { // 用户名或密码错误,还可以再输入 3 次需要输入图片验证码
								this.showCode = true
								this.loading = false
								this.errInfo = response.message
								this.refresh()
							} else if (response.code === 3902) {
								this.loading = false
								this.errInfo = response.message
								this.$router.push({ path: '/401' })
							} else if (response.code === 3903) { // 首次或异地登录需要短信验证码
								this.loading = false
								// this.errInfo = response.message
								this.cellPhone = response.body.userPhone
								this.second = response.body.smsCodeExpTime
								this.$refs.myConfirm.showModel()
							} else if (response.code === 3904) {
								this.loading = false
								this.$router.push({ path: '/403' })
							} else if (response.code === 3905) {
								this.errInfo = response.message
								this.loading = false
								this.refresh()
							} else {
								this.errInfo = response.message
								this.loading = false
								this.showCode = false
							}
						} else {
							this.setUserInfo(response.body)
							Common.setSession(USER_INFO, JSON.stringify(response.body), 10)
							this.loading = false
							if (response.body.userType === USER_TYPE.Manager) {
								this.$router.push({ path: '/selectAgent' })
							} else {
								this.$router.push({ path: '/org/organization/areaManagement' })
							}
						}
					}).catch((error) => {
						console.log(error)
						if (error) {
							this.loading = false
						}
						// reject(error)
					})
				} else {
					this.loading = false
					this.showCode = false
					console.log('error submit!!')
					return false
				}
			})
		}
	}
}
</script>

<style lang="scss">
	html, body {
		height: 100%;
	}

	#app {
		height: 100%;
	}

	.login-container {
		height: 100%;
		min-height: 617px;
		_height: 617px;
		background-color: #F5F5F6;
		.login-form {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			margin: auto;
			background: #ffffff;
			box-shadow: 0 2px 20px 0 rgba(81, 149, 243, 0.11);
			border-radius: 10px;
			width: 766px;
			height: 451px;
			padding: 48px 48px 0 48px;

			.title {
				.logo {
					width: 216px;
					height: 29px;
					background: url("../../assets/images/login/logo.png") no-repeat;
					display: inline-block;
					margin-bottom: 73px;
				}
			}
			.login-left {
				float: left;
				position: relative;
			}
			.login-right {
				float: right;
				.err-info {
					height: 18px;
					margin-bottom: 22px;
				}
				.err-msg {
					font-family: 'Microsoft YaHei';
					font-size: 12px;
					color: #ff3d3d;
				}
				.login-btn {
					background: #468cde;
					border-radius: 21px;
					width: 280px;
					height: 42px;
				}
			}
			.login-left:after{
				content: '';
				position: absolute;
				position: absolute;
				right: -20px;
				top: 50%;
				height: 400px;
				width: 0;
				transform:translateY(-50%);
				border-right: #e3e7ed 1px dashed;
			}
			.login-form-item {
				border-bottom: 1px solid #e3e7ed;
				background: #fff;
				border-radius: 5px;
				color: #454545;
				width: 280px;
				.reset {
					font-family: 'Microsoft YaHei';
					font-size: 14px;
					color: #468cde;
					cursor: pointer;
				}
				.login-title {
					margin: 0 auto;
					font-family: 'Microsoft YaHei';
					font-size: 16px;
					font-family:MicrosoftYaHei;
					color: #468cde;
					position: relative;
				}
				.login-title:after {
					position: absolute;
					left: 50%;
					margin-left: -70px;
					width: 140px;
					height: 2px;
					content: '';
					background: #468cde;
					bottom: -1px;
				}
				.el-form-item__content {
					display: flex;
					align-items: center;
					margin-top: 14px;
				}
			}
			.login-form-item.code {
				float: left;
				width: 192px;
				margin-bottom: 32px;
			}
			.check {
				//height: 65px;
			}
			.check-code img {
				float: right;
				width: 72px;
				height: 32px;
			}
			.login-form-input {
				display: inline-block;
				height: 40px;
				width: 80%;

				.el-input__inner {
					background: transparent !important;
					border: 0;
					-webkit-appearance: none;
					border-radius: 0;
					font-size: 14px;
					color: #999999;
					padding: 12px 5px 12px 15px;
					height: 40px;

					&:-webkit-autofill {
						-webkit-box-shadow: 0 0 0px 1000px white inset;
						-webkit-text-fill-color: #333;
					}
				}
			}
			.login-form-item.code .login-form-input {
				width: 100%;
			}
			.login-form-input.active {
				width: 64%;
			}
			.fa-user,
			.fa-lock,
			.fa-eye {
				padding-left: 15px;
				padding-right: 5px;
				color: #468cde;
				font-size: 14px;
				display: inline-block;
			}

			.fa-eye {
				padding-left: 5px;
				padding-right: 15px;
				cursor: pointer;
			}

			.buttom-btn {
				display: flex;
				justify-content: space-between;
				padding-top: 22px;
				.el-button {
					background: #468cde;
					border-radius: 21px;
					width: 100%;
					height: 42px;
					font-size: 18px;
				}
			}
		}
	}

	.login-body {
		background-image: linear-gradient(-225deg, #468cde 0%, #4b7ff7 100%);
		width: 100%;
		height: 515px;
		margin: 0 auto;
		position: relative;
		.login-bg {
			width: 1920px;
			height: 515px;
			background: url("../../assets/images/login/login_bg.png") no-repeat;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
		}
	}

	#login .el-form-item {
		margin-bottom: 24px;
	}

	#login .el-form-item.active {
		margin-bottom: 8px;
	}

	.el-form-item__error {
		color: #f56c6c;
		font-size: 12px;
		line-height: 1;
		padding-top: 4px;
		position: absolute;
		top: 100%;
		left: 12px;
	}

	.sureBtn {
		background: #468cde;
		border-radius: 21px;
		width: 304px;
		height: 42px;
	}

	.login-container .el-input__inner {
		background: transparent !important;
		border: 0;
		-webkit-appearance: none;
		-webkit-border-radius: 0;
		border-radius: 0;
		font-size: 14px;
		color: #999999;
		padding: 12px 5px 12px 15px;
		height: 40px;
		width: 192px;
		border-bottom: 1px solid #e3e7ed;
	}

	.message-box {
		width: 364px;
		.el-message-box__header {
			padding: 32px 32px 0 32px;
		}
		.el-message-box__title {
			line-height: 32px;
			font-size: 14px;
			color: #333333;
			text-align: left;
		}
		.el-message-box__content {
			display: flex;
			align-items: center;
			padding-right: 32px;
			padding-left: 32px;
		}
	}

	#verifyCodeKey {
		display: none;
	}
	.icon-user{
		padding-left: 15px;
		padding-right: 5px;
		color: #468cde;
		font-size: 14px;
		display: inline-block;
	}
</style>
