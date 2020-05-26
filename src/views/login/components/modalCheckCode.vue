<template>
	<div class="modal-box" v-show="show">
		<div class="modal-inner">
			<div class="modal-title">
				<p>为了您的账号安全，首次或异地登录需要安全验证：您绑定的手机号为：{{cellPhone}}</p>
			</div>
			<div class="modal-content">
				<el-form autoComplete="on" :model="loginForm" ref="loginForm" label-position="left">
					<div class="check-code active">
						<el-form-item prop="checkcode" class="login-form-item code">
							<el-input name="checkcode" type="text" v-model="loginForm.checkcode"
								v-on:focus="handleFocus" autoComplete="on" placeholder="请输入验证码"
								class="login-form-input"/>
						</el-form-item>
						<!--<span>验证码</span>-->
						<checkCode :second="second" ref="timerbtn" v-on:run="sendCode"></checkCode>
					</div>
				</el-form>
				<div class="err-info">
					<div class="err-msg" v-if="errInfo">{{errInfo}}</div>
				</div>
			</div>
			<div class="modal-footer">
				<div class="buttom-btn">
					<el-button type="primary" @click.native.prevent="submitForm('loginForm')" :loading="loading">确定
					</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapMutations } from 'vuex'
import Common from '@/utils/common'
import checkCode from './checkCode'
import { UserApi } from '@/api/index'
import { USER_INFO, USER_TYPE } from '@/maps/constants'

export default {
	name: 'modalCheckCode',
	components: {
		checkCode
	},
	props: {
		cellPhone: {
			type: String,
			default () {
				return ''
			}
		},
		second: {
			type: Number,
			default: 50
		}
	},
	data () {
		// 自定义验证码验证规则
		// const validateCheckCode = (rule, value, callback) => {
		// 	// console.log(this.identifyCheckCode)
		// 	if (this.smsMsg) {
		// 		callback(new Error(this.smsMsg))
		// 	} else {
		// 		callback() // 这里必须要要有回调否则表单无法提交
		// 	}
		// }
		return {
			loginForm: {
				checkcode: ''
			},
			// loginRules: {
			// 	checkcode: [
			// 		{ required: true, trigger: 'blur', message: '请输入验证码' },
			// 		{ validator: validateCheckCode, trigger: 'blur' }]
			// },
			identifyCheckCode: '',
			loading: false,
			show: false,
			// smsMsg: '',
			transactionindex: '',
			errInfo: ''
		}
	},
	methods: {
		...mapMutations({
			setUserInfo: 'User/SET_INFO'
		}),
		handleFocus () {
			this.errInfo = ''
		},
		submitForm (formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					if (!this.loginForm.checkcode) {
						this.errInfo = '请输入验证码'
						return
					}
					if (!/^\d{4}$/.test(this.loginForm.checkcode)) {
						this.errInfo = '验证码不正确'
						return
					}
					// 验短信验证码是否正确
					UserApi.checkPhoneVerify({
						transactionindex: this.transactionindex,
						checkid: this.loginForm.checkcode,
						verifyType: '1'
					}, response => {
						if (response.code === 10000) {
							// 关闭弹窗并且跳转到对应的主页面
							this.show = false
							this.setUserInfo(response.body)
							Common.setSession(USER_INFO, JSON.stringify(response.body), 10)
							// this.$router.push({ path: '/crm/school' })
							if (response.body.userType === USER_TYPE.Manager) {
								this.$router.push({ path: '/selectAgent' })
							} else {
								this.$router.push({ path: '/org/organization/areaManagement' })
							}
						} else {
							// 短信验证失败提示验证码错误
							this.errInfo = response.message
						}
					})
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},
		// 点击验证码按钮发送验证码请求
		sendCode () {
			this.$refs.timerbtn.setDisabled(true) // 设置按钮不可用
			// 验证码接口请求验证码
			// 开始倒计时
			this.$refs.timerbtn.start()
			UserApi.setPhoneVerify({}, response => {
				// console.log(response)
				if (response.code === 10000) {
					this.transactionindex = response.body.transactionindex
				} else if (response.code === 3901) {
					this.errInfo = response.message
				}
			})
		},
		// 弹窗关闭和显示函数
		closeModel () {
			this.show = false
		},
		showModel () {
			this.show = true
		}
	}
}
</script>
<style lang="scss">
	.modal-box {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.40);
		.modal-inner {
			background: #ffffff;
			box-shadow: 0 2px 20px 0 rgba(81, 149, 243, 0.11);
			border-radius: 10px;
			width: 364px;
			height: 258px;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-top: -129px;
			margin-left: -182px;
			padding: 32px 32px 40px 32px;
			.modal-title {
				p {
					line-height: 32px;
					font-size: 14px;
					color: #333333;
					text-align: left;
				}
			}
		}
	}

	.check-code.active {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.el-form-item {
			margin: 0;
		}
	}

	.modal-footer {
		button {
			background: #468cde;
			border-radius: 21px;
			width: 304px;
			height: 42px;
			border: none;
			outline: none;
			font-size: 18px;
			color: #ffffff;
		}
	}

	.err-info {
		height: 18px;
		margin-bottom: 22px;
	}

	.err-msg {
		font-family: MicrosoftYaHei;
		font-size: 12px;
		color: #ff3d3d;
	}
</style>
