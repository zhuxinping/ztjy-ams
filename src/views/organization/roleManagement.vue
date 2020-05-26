<template>
	<div class="pc-wrapper">
		<div class="top">
			<span v-has="'AGENT_CHILD_ROLE_SEARCH'" class="search"><label class="label">角色名称</label><el-input class="elinput" placeholder="请输入" v-model="roleName" size="small" @keydown.native.enter="search"></el-input></span>
			<el-button v-has="'AGENT_CHILD_ROLE_SEARCH'" class="primary-elbutton elbutton" type="primary" size="small" @click="search">搜索</el-button>
			<!--<el-button class="elbutton daochu" type="primary" size="small">导出</el-button>-->
		</div>
		<div class="table">
			<el-button v-has="'AGENT_CHILD_ROLE_ADD'" class="elbutton" type="primary" size="small" @click="addChildrenList('新增子账号角色')">新增</el-button>
			<el-table
				ref="multipleTable"
				border
				:data="accountRoleList"
				tooltip-effect="dark"
				style="width: 100%"
				:header-cell-style = "headerStyle"
				:cell-style="rowStyle"
			>
				<el-table-column
					prop="name"
					label="角色名称"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column
					label="描述"
					show-overflow-tooltip>
					<template slot-scope="scope">
						<span>{{scope.row.remark ? scope.row.remark: '--'}}</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="stateType"
					label="状态"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column
					label="操作"
					show-overflow-tooltip>
					<template slot-scope="scope">
						<span v-has="'AGENT_CHILD_ROLE_EDIT'" class="operation" @click="handleEdit(scope.$index, scope.row, '修改子账号角色' )">修改</span>
						<span v-has="'AGENT_CHILD_ROLE_FUNCTION_AUTHORIZE'" class="operation" @click="handleEdit(scope.$index, scope.row, 'web功能授权')">web功能授权</span>
						<span v-has="'DINGDING_CHILD_ROLE_FUNCTION_AUTHORIZE'" class="operation" @click="handleEdit(scope.$index, scope.row, '钉钉功能授权')">钉钉功能授权</span>
						<span v-has="'CHILD_ROLE_DATA_AUTHORIZE'" class="operation" @click="handleEdit(scope.$index, scope.row, '数据授权')">数据授权</span>
						<span v-has="'AGENT_CHILD_ROLE_SWITCH'" class="operation" @click="handleOpen(scope.$index, scope.row)">{{accountRoleList[scope.$index].object}}</span>
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
				<el-form v-if="boxtitle == '修改子账号角色' || boxtitle == '新增子账号角色'" :label-position="labelPosition" label-width="85px" ref="formLabelAlign" :model="formLabelAlign" size="small">
					<el-form-item class="required" label="角色名称" prop="name" :rules="rules.name">
						<el-input type="name" v-model="formLabelAlign.name" maxlength="20"></el-input>
					</el-form-item>
					<el-form-item label="角色描述" prop="remark" :rules="rules.remark">
						<el-input type="textarea" v-model="formLabelAlign.remark" maxlength="250"></el-input>
					</el-form-item>
					<span class="tongji">{{textarealength}}/250</span>
					<el-form-item>
						<el-button type="primary" @click="submitForm('formLabelAlign')">确认</el-button>
						<el-button class="bottom elbutton" @click="resetForm('formLabelAlign')">取消</el-button>
					</el-form-item>
				</el-form>
				<el-tree v-if="boxtitle == 'web功能授权' || boxtitle == '钉钉功能授权'"
					:data="actionList"
					:default-checked-keys = "actionListId"
					:check-on-click-node = "true"
					ref="tree"
					node-key="code"
					empty-text
					show-checkbox
					default-expand-all
					:props="defaultProps"
				>
				</el-tree>
				<div class="number-secret"  v-if="boxtitle == '数据授权'">
					<div class="secret">
						<p class="numbersecret">客户敏感数据加密：</p>
						<p class="numbersecret">授权：有权限，可以查看和导出完整的信息。</p>
						<p class="numbersecret">不授权：无权限，查询和导出的信息加密，例如：1****5、张*丰、158****5642</p>
						<p class="numbersecret">代理商账号信息 包含：账号、联系人、联系方式、微信号、钉钉手机号</p>
						<p class="numbersecret">幼儿园账号信息 包含：园长姓名、园长联系方式、园长微信、联系老师姓名、联系老师微信</p>
						<p class="numbersecret">家长账号信息 包含：家长账号、家长名称</p>
					</div>
					<div class="secret-operation">
						<div class="secret-o" :key="index" v-for="(item, index) in secretList"><el-checkbox @change="checkboxEven(item)" v-model="item.isChecked">{{item.dataName}}</el-checkbox></div>
					</div>
				</div>
			</div>
			<div class="area-sure" v-if="boxtitle != '修改子账号角色' && boxtitle != '新增子账号角色'">
				<el-button class="area area1" type="primary" size="small" @click="sureAction(boxtitle)">确定</el-button>
				<el-button class="area bottom elbutton" type="button" size="small" @click="editFlag = false">取消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { headFor } from '@/utils/tree'
export default {
	name: 'area-management',
	data () {
		return {
			accountNumber: '',
			accountName: '',
			accountRoleList: [],
			type: '',
			pageNo: 1,
			totalList: 0,
			pageSizes: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
			pageSize: 10,
			editFlag: false,
			boxtitle: '',
			// 提交对象的参数
			labelPosition: 'right',
			roleName: '',
			formLabelAlign: {
				id: '',
				appRoleId: '',
				amsWebRoleId: '',
				name: '',
				remark: '',
				state: '',
				stateType: '',
				agentId: '',
				agentName: ''
			},
			textarealength: 0,
			defaultProps: {
				children: 'list',
				label: 'name'
			},
			actionList: [],
			actionListId: [],
			secretList: [],
			secretListId: [],
			editId: {
				amsWebRoleId: '',
				roleId: '',
				appRoleId: ''
			},
			rules: {
				name: [
					{ required: true, message: '请输入角色名称' },
					{ pattern: /^[^'"?/\\<>]*$/, message: '不允许输入\' "?/\\<>' }
				],
				remark: [
					{ required: false, message: '请输入角色名称' },
					{ pattern: /^[^'"?/\\<>]*$/, message: '不允许输入\' "?/\\<>' }
				]
			},
			templateRoleName: ''
		}
	},
	activated () {
		this.roleName = ''
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
			accountList: 'Organization/accountList',
			forbidNumber: 'Organization/forbidNumber',
			addUpdateNumber: 'Organization/addUpdateNumber',
			shuziPowerNumber: 'Organization/shuziPowerNumber',
			submitShuziPowerNumber: 'Organization/submitShuziPowerNumber',
			webPowerNumber: 'Organization/webPowerNumber',
			submitWebPowerNumber: 'Organization/submitWebPowerNumber',
			getDingDingAction: 'Organization/getDingDingAction',
			submitDingDingAction: 'Organization/submitDingDingAction'
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
				'line-height': '40px',
				'font-weight': 'normal',
				'border': '0px ',
				'color': '#333333',
				'font-size': '12px',
				'border-bottom': '1px solid #e3e7ed ',
				'text-align': 'center',
				'padding': '0px'
			}
		},
		rowStyle ({row, column, rowIndex, columnIndex}) {
			if (rowIndex % 2 !== 0) {
				return {
					'background-color': '#f8f9fa',
					'height': '40px',
					'line-height': '40px',
					'color': '#666666',
					'font-size': '12px',
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
		forMatter () {
			for (let key in this.formLabelAlign) {
				this.formLabelAlign[key] = ''
			}
		},
		addChildrenList (title) {
			this.boxtitle = title
			this.$nextTick(() => {
				this.$refs['formLabelAlign'].resetFields()
				this.forMatter()
			})
			this.textarealength = 0
			this.editFlag = true
		},
		handleEdit (index, row, title) {
			this.editFlag = true
			this.boxtitle = title
			if (title === '修改子账号角色') {
				this.formLabelAlign.name = row.name
				this.templateRoleName = row.name
				this.formLabelAlign.remark = row.remark
				this.formLabelAlign.id = row.id
				// console.log(this.formLabelAlign)
			} else if (title === 'web功能授权') {
				this.editId.amsWebRoleId = row.amsWebRoleId
				this.actionData(row.amsWebRoleId)
			} else if (title === '数据授权') {
				this.editId.roleId = row.id
				this.secretData(row.id)
			} else {
				this.editId.appRoleId = row.appRoleId
				this.dingdingData(row.appRoleId)
			}
		},
		handleOpen (index, row) {
			let i = ''
			if (row.object === '启用') {
				row.object = '禁用'
				row.stateType = '启用'
				i = 1
			} else {
				row.object = '启用'
				row.stateType = '禁用'
				i = 0
			}
			this.formLabelAlign.state = i
			let params = {}
			params.id = row.id
			params.state = i
			this.forbidNumber(params).then(res => {
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
			if (!this.formLabelAlign.name.trim()) {
				this.$message({type: 'error', message: '角色名称不能为空！'})
				return false
			}
			let params = {}
			params.id = this.formLabelAlign.id
			params.agentId = this.userInfo.agentId
			// 配合后台角色名不能重复
			if (this.templateRoleName !== this.formLabelAlign.name.trim()) {
				params.name = this.formLabelAlign.name.trim()
			} else {
				if (this.boxtitle === '新增子账号角色') {
					params.name = this.formLabelAlign.name.trim()
				}
			}
			params.remark = this.formLabelAlign.remark.trim()
			this.$refs[formLabelAlign].validate((valid) => {
				if (valid) {
					this.addUpdateNumber(params).then(res => {
						if (res.code === 10000) {
							this.$refs[formLabelAlign].resetFields()
							this.editFlag = false
							this.forMatter()
							this.getData()
						} else {
							this.$message({type: 'error', message: res.message})
						}
					}).catch(() => {
						console.log('网络错误！')
						// this.$message({type: 'error', message: '网络错误！'})
					})
				} else {
					console.log('数据提交失败！')
					return false
				}
			})
		},
		resetForm (formLabelAlign) {
			this.$refs[formLabelAlign].resetFields()
			this.forMatter()
			this.editFlag = false
		},
		search () {
			this.pageNo = 1
			this.pageSize = 10
			this.getData()
		},
		sureAction (title) {
			if (title === 'web功能授权') {
				let tempArray = this.$refs.tree.getHalfCheckedNodes().concat(this.$refs.tree.getCheckedNodes())
				let powerJson = []
				tempArray.forEach(item => {
					powerJson.push(JSON.parse(item.powerJson))
				})
				let params = {}
				params.amsWebRoleId = this.editId.amsWebRoleId
				params.buttonIdSet = powerJson
				this.submitWebPowerNumber(params).then(res => {
					if (res.code === 10000) {
						this.$message({type: 'success', message: res.message})
					} else {
						this.$message({type: 'error', message: res.message})
					}
				}).catch(() => {
					console.log('网络错误！')
					// this.$message({type: 'error', message: '网络错误！'})
				})
			} else if (title === '数据授权') {
				let params = {}
				params.roleId = this.editId.roleId
				params.dataIdSet = this.secretListId
				this.submitShuziPowerNumber(params).then(res => {
					if (res.code === 10000) {
						this.$message({type: 'success', message: res.message})
					} else {
						this.$message({type: 'error', message: res.message})
					}
				}).catch(() => {
					console.log('网络错误！')
					// this.$message({type: 'error', message: '网络错误！'})
				})
			} else if (title === '钉钉功能授权') {
				let tempArray = this.$refs.tree.getHalfCheckedNodes().concat(this.$refs.tree.getCheckedNodes())
				let powerJson = []
				tempArray.forEach(item => {
					powerJson.push(JSON.parse(item.powerJson))
				})
				let params = {}
				params.appRoleId = this.editId.appRoleId
				params.buttonIdSet = powerJson
				this.submitDingDingAction(params).then(res => {
					if (res.code === 10000) {
						this.$message({type: 'success', message: res.message})
					} else {
						this.$message({type: 'error', message: res.message})
					}
				}).catch(() => {
					console.log('网络错误！')
					// this.$message({type: 'error', message: '网络错误！'})
				})
			}
			this.editFlag = false
		},
		checkboxEven (data) {
			this.secretListId = []
			this.secretList.forEach(item => {
				if (item.isChecked) {
					this.secretListId.push(item.dataId)
				}
			})
		},
		dingdingData (id) {
			const that = this
			let params = {}
			params.appRoleId = id
			this.getDingDingAction(params).then(res => {
				if (res.code === 10000) {
					this.actionListId = []
					this.actionList = res.body.list
					let i = 0
					headFor(that.actionList, function (o) {
						if (!o.isParent && o.checked) {
							o.code = i++
							that.actionListId.push(o.code)
						}
					})
				} else {
					this.$message({type: 'error', message: res.message})
				}
			}).catch(() => {
				console.log('网络错误！')
				// this.$message({type: 'error', message: '网络错误！'})
			})
		},
		secretData (id) {
			let params = {}
			params.roleId = id
			this.shuziPowerNumber(params).then(res => {
				if (res.code === 10000) {
					this.secretListId = []
					this.secretList = res.body.list
				} else {
					this.$message({type: 'error', message: res.message})
				}
			}).catch(() => {
				console.log('网络错误！')
				// this.$message({type: 'error', message: '数据加密失败！'})
			})
		},
		actionData (id) {
			const that = this
			let params = {}
			params.amsWebRoleId = id
			this.webPowerNumber(params).then(res => {
				if (res.code === 10000) {
					this.actionListId = []
					this.actionList = res.body.list
					let i = 0
					headFor(that.actionList, function (o) {
						o.code = i++
						if (!o.isParent && o.checked) {
							that.actionListId.push(o.code)
						}
					})
				} else {
					this.$message({type: 'error', message: res.message})
				}
			}).catch(() => {
				console.log('网络错误！')
				// this.$message({type: 'error', message: '数据加密失败！'})
			})
		},
		getData () {
			let params = {}
			params.roleName = this.roleName
			params.pageNo = this.pageNo
			params.pageSize = this.pageSize
			this.accountList(params).then(res => {
				if (res.code === 10000) {
					this.totalList = res.body.totalCount
					res.body.list.forEach((item, i) => {
						if (item.state) {
							item.object = '禁用'
						} else {
							item.object = '启用'
						}
					})
					this.accountRoleList = res.body.list
				} else {
					this.$message({type: 'error', message: res.message})
				}
			}).catch(() => {
				console.log('网络错误！')
				// this.$message({type: 'error', message: '网络错误！'})
			})
		}
	},
	watch: {
		'formLabelAlign.remark' (newV, oldV) {
			this.textarealength = newV.length
		}
	}
}
</script>

<style rel="stylesheet/scss" lang="scss">
	@import "accountManagement.scss";
	@import "../../assets/scss/pagination.scss";
</style>
