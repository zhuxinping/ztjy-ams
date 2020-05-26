<template>
	<div class="login-container">
		<div class="login-body">
			<div class="login-bg">
				<el-form id="reset" class="card-box login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
					<div class="login-in clearfix">
						<div class="login-left">
							<h3 class="title">
								<span class="logo"></span>
							</h3>
							<img src="../../assets/images/login/bg_login.png" alt="">
						</div>
						<div class="login-right">
							<el-form-item  class="login-form-item">
								<span class="login-title cur">用手机号码重设密码</span>
							</el-form-item>
							<!--<div class="err-msg">用户名或密码错误，您今日还有5次机会</div>-->
							<el-form-item prop="cellphone" class="login-form-item">
								<el-input name="cellphone" type="text" v-model="loginForm.cellphone" autoComplete="on" placeholder="请输入手机号码" class="login-form-input" />
							</el-form-item>
							<div class="check-code clearfix">
								<el-form-item prop="checkcode" class="login-form-item code">
									<el-input name="checkcode" type="text" v-model="loginForm.checkcode" autoComplete="on" placeholder="请输入验证码" class="login-form-input" />
								</el-form-item>
								<!--<span>验证码</span>-->
								<checkCode ref="timerbtn"  v-on:run="sendCode"></checkCode>
							</div>
							<el-form-item prop="password" class="login-form-item">
								<el-input name="password" :type="pwdType" v-model="loginForm.password" autoComplete="on" placeholder="请输入新密码" class="login-form-input" @keyup.enter.native="submitForm('loginForm')"/>
							</el-form-item>
							<el-form-item prop="passwordagain" class="login-form-item cur">
								<el-input name="passwordagain" :type="pwdType" v-model="loginForm.passwordagain" autoComplete="on" placeholder="请再输入一次新密码" class="login-form-input" @keyup.enter.native="submitForm('loginForm')"/>
							</el-form-item>
							<div class="buttom-btn">
								<el-button type="primary" @click="submitForm('loginForm')" :loading="loading">重置密码</el-button>
							</div>
							<div class="back-btn" @click="backLogin">
								<i class="icon-back"></i>
								返回登录
							</div>
						</div>
					</div>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import checkCode from './components/checkCode'
import Common from '../../utils/common'
import { UserApi } from '@/api/index'
export default {
	name: 'reset',
	components: {
		checkCode
	},
	data () {
		// 手机号码校验
		const validateCellPhone = (rule, value, callback) => {
			// console.log(this.value)
			if (!Common.isPhoneNum(value)) {
				callback(new Error('手机号码格式有误，请重新输入！'))
			} else {
				callback()
			}
		}
		// 自定义验证码验证规则
		const validateCheckCode = (rule, value, callback) => {
			// console.log(this.identifyCheckCode)
			if (value !== this.identifyCheckCode) {
				callback(new Error('验证码输入错误，请重新输入！'))
			} else {
				callback() // 这里必须要要有回调否则表单无法提交
			}
		}
		// 校验密码强度
		const validatePass = (rule, value, callback) => {
			if (!Common.passWordReg(value)) {
				callback(new Error('6-16位，密码中至少包含数字、字符！'))
			} else {
				callback()
			}
		}
		// 校验两次输入密码是否一致
		const validatePassAgain = (rule, value, callback) => {
			if (value !== this.loginForm.password) {
				callback(new Error('两次输入密码不一致！'))
			} else {
				callback()
			}
		}
		return {
			loginForm: {
				cellphone: '',
				password: '',
				passwordagain: '',
				checkcode: ''
			},
			loginRules: {
				cellphone: [{ required: true, trigger: 'blur', message: '请输入手机号' }, {validator: validateCellPhone, trigger: 'blur'}],
				checkcode: [{ required: true, trigger: 'blur', message: '请输入验证码' }, { validator: validateCheckCode, trigger: 'blur' }],
				password: [{ required: true, trigger: 'blur', message: '请输入新密码' }, { validator: validatePass, trigger: 'blur' }],
				passwordagain: [{ required: true, trigger: 'blur', message: '请再输入一次新密码' }, { validator: validatePassAgain, trigger: 'blur' }]
			},
			loading: false,
			identifyCheckCode: '1379',
			pwdType: 'password',
			transactionindex: ''
		}
	},
	methods: {
		...mapActions({
			login: 'User/login'
		}),
		showPwd () {
			if (this.pwdType === 'password') {
				this.pwdType = ''
			} else {
				this.pwdType = 'password'
			}
		},
		resetForm (formName) {
			// this.$refs[formName].resetFields()
			this.loginForm.username = ''
			this.loginForm.password = ''
		},
		// 返回登录页
		backLogin () {
			this.$router.push('/login')
		},
		// 点击验证码按钮发送请求
		// 点击验证码按钮发送验证码请求
		sendCode () {
			this.$refs.timerbtn.setDisabled(true) // 设置按钮不可用
			//	验证码接口请求验证码
			// 开始倒计时
			this.$refs.timerbtn.start()
			UserApi.setPhoneVerify({telphone: this.loginForm.cellphone}, response => {
				// console.log(response)
				if (response.code === 10000) {
					this.transactionindex = response.body.transactionindex
				} else if (response.code === 3901) {
					// 这里如果有错就弹窗提示
					this.$message({
						message: response.message,
						type: 'warning'
					})
					// this.$refs.timerbtn.stop()
				}
			})
		},
		submitForm (formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					// 验短信验证码是否正确
					this.loading = true
					UserApi.checkPhoneVerify({
						transactionindex: this.transactionindex,
						telphone: this.loginForm.cellphone,
						checkid: this.loginForm.checkcode,
						newPassword: this.loginForm.passwordagain,
						verifyType: '2'
					}, response => {
						// 这里判断校验是否正确
						// console.log(response)
						if (response.code === 10000) {
							// 短信验证成功
							// 关闭弹窗并且跳转到对应的登录页面
							this.show = false
							this.$router.push({ path: '/login' })
						} else if (response.code === 3901) {
							// 短信验证失败提示验证码错误
							this.smsMsg = this.response.message
							this.$refs[formName].validateField('checkcode')
						}
					})
				} else {
					console.log('error submit!!')
					return false
				}
			})
		}
	}
}
</script>
<style lang="scss">
	html, body{
		height: 100%;
	}
	#app{
		height: 100%;
	}
	.login-container {
		height: 100%;
		min-height: 617px;
		_height:617px;
		background-color: #F5F5F6;
		.login-form {
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			margin: auto;
			background:#ffffff;
			box-shadow:0 2px 20px 0 rgba(81,149,243,0.11);
			border-radius:10px;
			width:766px;
			height:451px;
			padding: 48px 48px 0 48px;

			.title{
				.logo{
					width: 216px;
					height: 29px;
					background: url("../../assets/images/login/logo.png") no-repeat;
					display: inline-block;
					margin-bottom: 73px;
				}
			}
			.login-left{
				float: left;
			}
			.login-right{
				float: right;
				.err-msg{
					font-family:MicrosoftYaHei;
					font-size:12px;
					color:#ff3d3d;
					margin-bottom: 22px;
				}
				.login-btn{
					background:#468cde;
					border-radius:21px;
					width:280px;
					height:42px;
				}
			}
			.login-form-item {
				border-bottom: 1px solid #e3e7ed;
				background: #fff;
				border-radius: 5px;
				color: #454545;
				width: 280px;
				.login-title{
					margin: 0 auto;
					font-family:MicrosoftYaHei;
					font-size:16px;
					color:#468cde;
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
				.login-title.active:after {
					margin-left: -140px;
					width: 280px;
				}
				.el-form-item__content{
					display: flex;
					align-items: center;
				}
			}
			.login-form-item.code{
				float: left;
				width: 192px;
				margin-bottom: 32px;
			}
			.login-form-input {
				display: inline-block;
				height: 40px;
				width: 80%;

				.el-input__inner{
					background: transparent !important;
					border: 0px;
					-webkit-appearance: none;
					border-radius: 0px;
					font-size:14px;
					color:#999999;
					padding: 12px 5px 12px 15px;
					height: 40px;
				}
				&:-webkit-autofill{
					-webkit-box-shadow: 0 0 0px 1000px white inset;
					-webkit-text-fill-color: #333;
				}
			}
			.buttom-btn{
				display: flex;
				justify-content: space-between;

				.el-button{
					background:#468cde;
					border-radius:21px;
					width:100%;
					height:42px;
					font-size: 18px;
				}
			}
		}
	}
	.login-body {
		background-image:linear-gradient(-225deg, #468cde 0%, #4b7ff7 100%);
		width:100%;
		height:52%;
		margin: 0 auto;
		position: relative;
		.login-bg {
			width: 1114px;
			height: 345px;
			background: url("../../assets/images/login/login_bg.png") no-repeat;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-left: -557px;
			margin-top: -172.5px;
		}
	}
	#reset .el-form-item {
		margin-bottom: 16px;
	}
	#reset .el-form-item.cur {
		margin-bottom: 32px;
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
	.back-btn{
		font-size:12px;
		color:#468cde;
		text-align: center;
		margin-top: 9px;
		cursor: pointer;
		.icon-back{
			color:#468cde;
			font-size: 14px;
			margin-right: 8px;
		}
	}
</style>
