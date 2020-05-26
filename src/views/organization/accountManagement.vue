<template>
	<div class="pc-wrapper">
		<div class="top">
			<span class="search" v-has="'AGENT_CHILD_USER_SEARCH'"><label class="label">账号</label><el-input class="elinput" placeholder="请输入" v-model="accountNumber" size="small" @keydown.native.enter="search"></el-input></span>
			<span class="search" v-has="'AGENT_CHILD_USER_SEARCH'"><label class="label">姓名</label><el-input class="elinput" placeholder="请输入" v-model="accountName" size="small" @keydown.native.enter="search"></el-input></span>
			<el-button v-has="'AGENT_CHILD_USER_SEARCH'" class="primary-elbutton elbutton" type="primary" size="small" @click="search">搜索</el-button>
			<!--<el-button class="elbutton daochu" type="button" size="small">导出</el-button>-->
		</div>
		<div class="table">
			<el-button class="elbutton" v-has="'AGENT_CHILD_USER_ADD'"  type="primary" size="small" @click.prevent="addChildrenList('新增代理商子账号')">新增</el-button>
			<el-table
				ref="multipleTable"
				border
				:data="accountList"
				tooltip-effect="dark"
				style="width: 100%"
				:header-cell-style = "headerStyle"
				:cell-style="rowStyle"
				>
				<el-table-column
					prop="accountName"
					label="账号"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column
					prop="name"
					label="姓名"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column
					v-if='show=false'
					prop="agentName"
					label="所属代理商"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column
					prop="roleName"
					label="角色"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column
					prop="userPhone"
					width="180"
					trigger="hover"
					show-overflow-tooltip>
					<template slot="header"  slot-scope="scope">
						<el-popover placement="top" width="410" v-model="visible" trigger="hover" >
							<span style="font-size: 12px; line-height: 20px;">通过扫描二维码在【园所注册邀请】中成功注册后，如果选中“接收”并且手机号码已验证，会发送短信通知给这个号码</span>
							<span slot="reference" class="red-star">?</span>
						</el-popover>
						<span>手机号</span>
					</template>
				</el-table-column>
				<el-table-column
					label="钉钉手机号"
					show-overflow-tooltip>
					<template slot-scope="scope">
						<span>{{scope.row.dingdingAccount ? scope.row.dingdingAccount: '--'}}</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="type"
					label="状态"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column
					label="操作"
					show-overflow-tooltip>
					<template slot-scope="scope">
						<span v-has="'AGENT_CHILD_USER_EDIT'" class="operation" @click="handleEdit(scope.$index, scope.row, '修改代理商子账号' )">修改</span>
						<span v-has="'AGENT_CHILD_AREA_AUTH'" class="operation" @click="handleEdit(scope.$index, scope.row, '管理区域授权')">管理区域</span>
						<span v-has="'AGENT_CHILD_USER_SWITCH'" class="operation" @click="handleOpen(scope.$index, scope.row)">{{accountList[scope.$index].object}}</span>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination">
			<span class="totalList">共 {{totalList}} 条记录</span>
			<el-pagination
				background
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page.sync="pageNo"
				:page-sizes="pageSizes"
				:page-size="pageSize"
				layout="sizes, prev, pager, next"
				prev-text="上一页"
				next-text="下一页"
				:total="totalList">
			</el-pagination>
		</div>
		<el-dialog :title="boxtitle" :visible.sync="editFlag" :close-on-click-modal="false">
			<div class="dialog-section">
				<el-form v-if="boxtitle == '修改代理商子账号' || boxtitle == '新增代理商子账号'" :label-position="labelPosition" label-width="80px" ref="formLabelAlign" :model="formLabelAlign" size="small">
					<el-form-item label="账号" prop="accountName"
						:rules="rules.accountName">
						<el-input :disabled="treeFlag" type="accountName" maxlength="20" v-model="formLabelAlign.accountName"></el-input>
					</el-form-item>
					<el-form-item label="姓名" prop="name" :rules="rules.name">
						<el-input type="name" v-model="formLabelAlign.name" maxlength="20"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="passWord" :rules="rules.password">
						<el-input type="passWord" v-model="formLabelAlign.passWord" maxlength="16"></el-input>
					</el-form-item>
					<el-form-item label="重复密码" prop="repeatPassWord" :rules="rules.repeatPassWord">
						<el-input type="passWord" v-model="formLabelAlign.repeatPassWord" maxlength="16"></el-input>
					</el-form-item>
					<el-form-item label="角色" prop="childRoleId" :rules="rules.childRoleId">
						<el-select v-model="formLabelAlign.childRoleId" placeholder="请选择">
							<el-option :style="boxtitle == '修改代理商子账号'&&index==roleList.length-1?'display:none':''" :key="index" v-for="(item, index) in roleList"  :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="手机号码" prop="userPhone" :rules="rules.userPhone">
						<el-input type="userPhone" v-model="formLabelAlign.userPhone" maxlength="11"></el-input>
						<span class="state-rules">{{formLabelAlign.state}}</span>
					</el-form-item>
					<el-form-item class="button-resource" label="" prop="resource">
						<span class="special">
							<el-popover  placement="top" width="410" v-model="visible1" trigger="hover">
								<span  style="font-size: 12px; line-height: 20px;">通过扫描二维码在【园所注册邀请】中成功注册后，如果选中“接收”并且手机号码已验证，会发送短信通知给这个号码</span>
								<span slot="reference" class="red-star">?</span>
							</el-popover>
							园所自注册短信推送</span>
						<el-radio-group v-model="formLabelAlign.isSendSms">
							<el-radio v-model="formLabelAlign.isSendSms" :label="1">接收</el-radio>
							<el-radio v-model="formLabelAlign.isSendSms" :label="0">不接收</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="钉钉手机号" prop="dingdingAccount" :rules="rules.dingdingAccount">
						<el-input  v-model="formLabelAlign.dingdingAccount" maxlength="11"></el-input>
					</el-form-item>
					<el-form-item class="button-bottom">
						<el-button class="bottom" type="primary" @click="submitForm('formLabelAlign')">确认</el-button>
						<el-button type="primary" class="bottom elbutton"  @click="resetForm('formLabelAlign')">取消</el-button>
					</el-form-item>
				</el-form>
				<el-tree v-if="boxtitle == '管理区域授权'"
					:data="areaList"
					:expand-on-click-node="false"
					:default-checked-keys = "areaListaId"
					:render-content="renderContent"
					ref="tree"
					node-key="id"
					empty-text
					show-checkbox
					default-expand-all
					:props="defaultProps"
					>
				</el-tree>
			</div>
			<div class="area-sure" v-if="boxtitle == '管理区域授权'">
				<el-button class="area area1" type="primary" size="small" @click="sureArea">确定</el-button>
				<el-button class="area bottom elbutton" type="botton" size="small" @click="editFlag = false">取消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { headFor } from '@/utils/tree'
export default {
	name: 'account-management',
	data () {
		return {
			accountNumber: '',
			accountName: '',
			accountList: [],
			type: '',
			pageNo: 1,
			totalList: 0,
			pageSizes: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
			pageSize: 10,
			editFlag: false,
			treeFlag: true,
			boxtitle: '',
			// 提交对象的参数
			labelPosition: 'right',
			formLabelAlign: {
				id: '',
				agentId: '',
				accountName: '',
				name: '',
				passWord: '',
				isVerify: 0,
				state: '未验证',
				repeatPassWord: '',
				roleName: '',
				childRoleId: '',
				childRoleName: '',
				childTempRoleName: '',
				userPhone: '',
				isSendSms: 1,
				dingdingAccount: ''
			},
			roleList: [],
			defaultProps: {
				children: 'list',
				label: 'name'
			},
			visible: false,
			visible1: false,
			areaList: [],
			areaListaId: [],
			templateAccountName: '',
			// 校验规则
			rules: {
				accountName: [{ required: true, message: '请输入账号' },
					{ pattern: /^[a-zA-Z0-9]+$/, message: '仅支持英文数字' }
				],
				name: [{ required: true, message: '请输入姓名' },
					{ pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/, message: '仅支持中文英文数字' }
				],
				password: [{required: true, message: '请输入密码', trigger: 'blur'},
					{ pattern: /^[^\s]+$/, message: '不允许输入\' "?/\\<>' },
					{min: 6, max: 35, message: '密码长度在6到16个字符', trigger: 'blur'},
					{ pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)(?!\W+$)(?![\Wa-zA-Z]+$)(?![\W0-9]+$)[0-9A-Za-z\W]{6,35}$/, message: '6-16位，至少包含数字、字母', trigger: 'blur' },
					{pattern: /^[^\u4e00-\u9fa5]+$/, message: '不允许输入中文'},
					{ pattern: /^[^'"?/\\<>]*$/, message: '不允许输入\' "?/\\<>' }
				],
				repeatPassWord: [{required: true, message: '请输入重复密码', trigger: 'blur'},
					{min: 6, max: 35, message: '密码长度在6到16个字符', trigger: 'blur'},
					{ pattern: /^[^\s]+$/, message: '不允许输入\' "?/\\<>' },
					{ pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)(?!\W+$)(?![\Wa-zA-Z]+$)(?![\W0-9]+$)[0-9A-Za-z\W]{6,35}$/, message: '6-16位，至少包含数字、字母', trigger: 'blur' },
					{validator: this.validatePass(), trigger: 'blur'},
					{ pattern: /^[^'"?/\\<>]*$/, message: '不允许输入\' "?/\\<>' }],
				childRoleId: [{required: true, message: '请选择角色', trigger: 'change'}],
				userPhone: [{ required: true, message: '请输入手机号码' },
					{pattern: /^((11[0-2])|(13[0-9])|(14[0-9])|(15[0-9])|166|(17[0-9])|(18[0-9])|(19[8-9]))\d{8}$/, message: '请输入正确的手机号码', trigger: 'blur'}],
				dingdingAccount: [{ required: false, message: '' },
					{ pattern: /^((11[0-2])|(13[0-9])|(14[0-9])|(15[0-9])|166|(17[0-9])|(18[0-9])|(19[8-9]))\d{8}$/, message: '请输入正确的手机号码', trigger: 'blur' }]
			}
		}
	},
	activated () {
		this.accountNumber = ''
		this.accountName = ''
		this.pageNo = 1
		this.getData()
	},
	computed: {
		...mapGetters({
			userInfo: 'User/userInfo'
		})
	},
	methods: {
		...mapActions({
			getDataList: 'Organization/childrenList',
			getChildren: 'Organization/getChildren',
			forbidChildren: 'Organization/forbidChildren',
			addUpdateChildren: 'Organization/addUpdateChildren',
			getChildrenRole: 'Organization/getChildrenRole',
			getChildrenAreaList: 'Organization/getChildrenAreaList',
			submitChildrenArea: 'Organization/submitChildrenArea'
		}),
		handleSizeChange (val) {
			this.pageSize = val
			this.getData()
		},
		handleCurrentChange (val) {
			this.pageNo = val
			this.getData()
		},
		headerStyle ({row, rowIndex}) {
			return {
				'background-color': '#f2f7fb',
				'height': '40px',
				'font-weight': 'normal',
				'line-height': '40px',
				'color': '#333333',
				'font-size': '12px',
				'border': '0px ',
				'border-bottom': '1px solid #e3e7ed ',
				'text-align': 'center',
				'padding': '0px'
			}
		},
		rowStyle ({row, column, rowIndex, columnIndex}) {
			if (rowIndex % 2 !== 0) {
				return {
					'background-color': '#f8f9fa',
					'color': '#666666',
					'font-size': '12px',
					'height': '40px',
					'line-height': '40px',
					'border': '0px',
					'text-align': 'center',
					'padding': '0px'
				}
			} else {
				return {
					'height': '40px',
					'line-height': '40px',
					'color': '#666666',
					'font-size': '12px',
					'border': '0px',
					'text-align': 'center',
					'padding': '0px'
				}
			}
		},
		renderContent (h, { node, data, store }) {
			return (<span class='span' title={node.label}>{node.label}</span>)
		},
		validatePass (rule, value, callback) {
			if (value) {
				if (this.formLabelAlign.repeatPassWord !== this.formLabelAlign.passWord) {
					callback(new Error('两次输入密码不一致!'))
				} else {
					callback()
				}
			}
		},
		forMatter () {
			for (let key in this.formLabelAlign) {
				this.formLabelAlign[key] = ''
			}
		},
		addChildrenList (title) {
			this.boxtitle = title
			this.getChiledrenRole()
			this.$nextTick(() => {
				this.$refs['formLabelAlign'].resetFields()
			})
			this.forMatter()
			this.treeFlag = false
			this.formLabelAlign.isSendSms = 1
			this.formLabelAlign.state = '未验证'
			// this.roleList.push({id: this.formLabelAlign.childRoleId, name: this.formLabelAlign.childRoleName})
			this.$set(this.rules.accountName[1], 'pattern', /^[a-zA-Z0-9]+$/)
			this.$set(this.rules.repeatPassWord[4], 'validator', this.validatePass)
			this.editFlag = true
		},
		handleEdit (index, row, title) {
			this.editFlag = true
			this.boxtitle = title
			if (title === '修改代理商子账号') {
				this.$set(this.rules.accountName[1], 'pattern', /^[a-zA-Z0-9\u4e00-\u9fa5]+$/)
				this.$set(this.rules.repeatPassWord[4], 'validator', this.validatePass)
				this.treeFlag = true
				let params = {}
				params.id = row.id
				this.getChildren(params).then(res => {
					this.formLabelAlign = res.body
					this.formLabelAlign.repeatPassWord = res.body.passWord
					if (this.formLabelAlign.isVerify) {
						this.formLabelAlign.state = '已验证'
					} else {
						this.formLabelAlign.state = '未验证'
					}
					this.roleList.push({id: this.formLabelAlign.childRoleId, name: this.formLabelAlign.childRoleName})
				}).catch(() => {
					console.log('网络错误！')
					// this.$message({type: 'error', message: '网络错误！'})
				})
				this.getChiledrenRole()
			} else if (title === '管理区域授权') {
				this.getArea(row.accountName)
				this.templateAccountName = row.accountName
			}
		},
		getChiledrenRole () {
			let params = {}
			this.getChildrenRole(params).then(res => {
				if (res.code === 10000) {
					this.roleList = res.body.childRoleList
				} else {
					this.$message({type: 'error', message: res.message})
				}
			})
		},
		handleOpen (index, row) {
			let i = ''
			if (row.object === '启用') {
				row.object = '禁用'
				row.type = '启用'
				i = 1
			} else {
				row.object = '启用'
				row.type = '禁用'
				i = 0
			}
			let params = {}
			params.id = row.id
			params.state = i
			this.forbidChildren(params).then(res => {
				if (res.code === 10000) {
					this.$message({type: 'success', message: res.message})
				} else {
					this.$message({type: 'error', message: res.message})
				}
			}).catch(() => {
				console.log('网络错误！')
				// this.$message({type: 'error', message: '网络错误！'})
			})
		},
		submitForm (formLabelAlign) {
			let params = {}
			params.id = this.formLabelAlign.id
			params.agentId = this.userInfo.agentId
			params.accountName = this.formLabelAlign.accountName
			params.name = this.formLabelAlign.name
			params.passWord = this.formLabelAlign.passWord
			params.childRoleId = this.formLabelAlign.childRoleId
			params.userPhone = this.formLabelAlign.userPhone
			params.isSendSms = this.formLabelAlign.isSendSms
			params.dingdingAccount = this.formLabelAlign.dingdingAccount
			this.$refs[formLabelAlign].validate((valid) => {
				if (valid) {
					this.addUpdateChildren(params).then(res => {
						if (res.code === 10000) {
							this.$refs[formLabelAlign].resetFields()
							this.editFlag = false
							this.getData()
						} else {
							this.$message({type: 'error', message: res.message})
						}
					}).catch(() => {
						console.log('网络错误！')
						// this.$message({type: 'error', message: '数据获取失败！'})
					})
				} else {
					console.log('数据提交失败！')
					// this.$message({type: 'error', message: ''})
					return false
				}
			})
		},
		resetForm (formLabelAlign) {
			this.$refs[formLabelAlign].resetFields()
			this.editFlag = false
		},
		sureArea () {
			let params = {}
			params.accountName = this.templateAccountName
			params.areaIdSet = this.$refs.tree.getHalfCheckedKeys().concat(this.$refs.tree.getCheckedKeys())
			this.submitChildrenArea(params).then(res => {
				if (res.code === 10000) {
					this.$message({type: 'success', message: res.message})
					this.editFlag = false
				} else {
					this.$message({type: 'error', message: res.message})
				}
			}).catch(() => {
				console.log('网络错误！')
				// this.$message({type: 'error', message: '数据保存失败！'})
			})
		},
		search () {
			this.pageNo = 1
			this.pageSize = 10
			this.getData()
		},
		getArea (accountName) {
			const that = this
			let params = {}
			params.accountName = accountName
			this.getChildrenAreaList(params).then(res => {
				if (res.code === 10000) {
					this.areaListaId = []
					this.areaList = res.body.list
					headFor(that.areaList, function (o) {
						if (!o.isParent && o.checked) {
							that.areaListaId.push(o.id)
						}
					})
				} else {
					this.$message({type: 'error', message: res.message})
				}
			}).catch(() => {
				console.log('网络错误！')
				// this.$message({type: 'error', message: '数据获取失败！'})
			})
		},
		getData () {
			let params = {}
			params.accountName = this.accountNumber
			params.name = this.accountName
			params.pageNo = this.pageNo
			params.pageSize = this.pageSize
			this.getDataList(params).then(res => {
				if (res.code === 10000) {
					this.totalList = res.body.totalCount
					res.body.list.forEach((item, i) => {
						if (item.type === '启用') {
							item.object = '禁用'
						} else {
							item.object = '启用'
						}
					})
					this.accountList = res.body.list
				} else {
					this.$message({type: 'error', message: res.message})
				}
			}).catch(() => {
				console.log('网络错误！')
				// this.$message({type: 'error', message: '数据获取失败！'})
			})
		}
	}
}
</script>

<style rel="stylesheet/scss" lang="scss">
	@import "accountManagement.scss";
	@import "../../assets/scss/pagination.scss";
</style>
