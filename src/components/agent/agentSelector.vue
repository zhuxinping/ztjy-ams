<template>
	<div>
		<el-dialog
			ref="selectAgentDialog"
			title="选择代理商"
			:show-close="showClose"
			:visible.sync="dialogVisible"
			:close-on-click-modal="false"
			:append-to-body="true"
			@close="handleClose"
			:class="'dialog-agent-selector'">
			<el-form :model="searchForm" ref="searchForm" :inline="true" class="searchform" size="small"
				:class="'select-agent-search'" :rules="rules">
				<el-row :gutter="10">
					<el-col :span="6">
						<el-form-item label="代理商编号" prop="agentNumber">
							<el-input v-model="searchForm.agentNumber" placeholder="请输入编号"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="代理商名称" prop="agentName">
							<el-input v-model="searchForm.agentName" placeholder="请输入名称"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="代理商账号" prop="agentAccount">
							<el-input v-model="searchForm.agentAccount" placeholder="请输入账号"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="联系方式" prop="telphone">
							<el-input v-model="searchForm.telphone" placeholder="请输入联系方式"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="10">
					<el-col :span="6">
						<el-form-item label="代理商状态">
							<el-select v-model="searchForm.isFlag" placeholder="请选择">
								<el-option label="请选择" value=""></el-option>
								<el-option label="启用" value="1"></el-option>
								<el-option label="禁用" value="0"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						&nbsp;
					</el-col>
					<el-col :span="6">
						&nbsp;
					</el-col>
					<el-col :span="6" style="text-align: right">
						<el-form-item>
							<el-button type="primary" @click="handleSearch">搜索</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<el-table
				height="250px"
				:highlight-current-row="true"
				:empty-text="'查询无此数据'"
				@current-change="handleTableCurrentChange"
				size="small"
				:data="table.data">
				<el-table-column
					label="操作"
					width="50"
					show-overflow-tooltip>
					<template slot-scope="scope">
						<el-radio v-model="table.agentId" size="medium"
							:label="scope.row.agentId" :disabled="scope.row.isFlag === 0">&thinsp;
						</el-radio>
					</template>
				</el-table-column>
				<el-table-column
					prop="agentNumber"
					label="代理商编号"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column
					prop="agentName"
					label="代理商名称"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column
					prop="agentAccount"
					label="代理商账号"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column
					prop="telphone"
					label="联系方式"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column
					prop="isFlagVal"
					label="代理商状态"
					show-overflow-tooltip>
				</el-table-column>
				<el-table-column
					prop="createTime"
					label="创建日期"
					show-overflow-tooltip>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<span class="totalList">共 {{table.totalList}} 条记录</span>
				<el-pagination
					background
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page.sync="table.pageNo"
					:page-sizes="table.pageSizes"
					:page-size="table.pageSize"
					layout="sizes, prev, pager, next"
					prev-text="上一页"
					next-text="下一页"
					size="small"
					:total="table.totalList">
				</el-pagination>
			</div>
			<div slot="footer" class="dialog-footer">
				<div class="footer-inner">
					<el-button type="primary" @click="handleSubmit">确定</el-button>
					<el-button @click="handleCancel" v-if="showCancel">取消</el-button>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
// import { SYSTEM } from '@/api/apiMaps'
// import axios from 'axios'
import Common from '@/utils/common'
import { USER_INFO, USER_TOKEN } from '@/maps/constants'
import { Message, MessageBox } from 'element-ui'
import store from '@/store/index'

export default {
	name: 'AgentSelector',
	props: {
		showClose: {
			type: Boolean
		},
		showCancel: {
			type: Boolean
		},
		visible: {
			type: Boolean
		},
		checkState: {
			type: Boolean
		}
	},
	data () {
		function validateIllegalChar (rule, value, callback) {
			if (value && /['"?/\\<>]+/.test(value)) {
				callback(new Error('禁止输入\'"?/\\<>'))
			} else {
				callback()
			}
		}

		return {
			searchForm: {
				agentAccount: '',
				agentNumber: '',
				agentName: '',
				telphone: '',
				isFlag: ''
			},
			rules: {
				agentNumber: [{ validator: validateIllegalChar, trigger: 'blur' }],
				agentAccount: [{ validator: validateIllegalChar, trigger: 'blur' }],
				agentName: [{ validator: validateIllegalChar, trigger: 'blur' }],
				telphone: [{ validator: validateIllegalChar, trigger: 'blur' }]
			},
			dialogVisible: false,
			table: {
				data: [],
				agentId: '',
				pageSize: 5,
				pageNo: 1,
				totalList: 0,
				pageSizes: [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
			}
		}
	},
	mounted () {
		this.dialogVisible = this.visible
		this.getData()
	},
	watch: {
		visible (a, b) {
			console.log(a)
			this.dialogVisible = a
		}
	},
	methods: {
		...mapMutations({
			setUserInfo: 'User/SET_INFO'
		}),
		...mapActions({
			getList: 'Agent/getList',
			change: 'Agent/change',
			removeAllTabs: 'Tabs/remove_all_tabs'
		}),
		handleTableCurrentChange (val) {
			if (val && val.isFlag === 1) {
				this.table.agentId = val.agentId
			}
		},
		getData () {
			const params = Object.assign(this.searchForm, {
				pageNo: this.table.pageNo,
				pageSize: this.table.pageSize
			})
			for (let p in params) {
				if (typeof params[p] === 'string') {
					params[p] = params[p].trim()
				}
			}
			this.getList(params).then(response => {
				if (response.code === 10000) {
					this.table.data = response.body.list
					this.table.totalList = response.body.totalCount
				}
			}).catch(() => {
				this.fedLogout()
			})
		},
		// 查询
		handleSearch () {
			this.$refs['searchForm'].validate((valid) => {
				if (!valid) {
					return false
				}
			})
			this.table.pageNo = 1
			this.getData()
		},
		// 获取代理商信息
		handleSubmit () {
			if (!this.table.agentId) {
				if (this.checkState) {
					Message({
						message: '请选择代理商',
						type: 'error',
						duration: 3 * 1000
					})
				} else {
					this.dialogVisible = false
				}
				this.$emit('updateDialogStatus', this.dialogVisible)
				return
			} else {
				let current = this.table.data.find(agent => {
					return agent.agentId === this.table.agentId
				})
				if (current.isFlag === 0) {
					Message({
						message: '请选择开启的代理商',
						type: 'error',
						duration: 3 * 1000
					})
					return
				}
			}
			this.change({ agentId: this.table.agentId }).then(response => {
				this.setUserInfo(response.body)
				Common.setSession(USER_INFO, JSON.stringify(response.body), 10)
				Common.setCookie(USER_TOKEN, response.body.sessionId, 10)
				this.removeAllTabs()
				//				this.$router.push({path:'/org/organization/areaManagement', replace: true})
				window.location.href = '/org/organization/areaManagement'
			}).catch((error) => {
				console.log(error)
				// 角色被禁用
				if (error.code) {
					if (error.code === 3902) {
						this.$router.push('/403')
					} else if (error.code === 3930) {
						this.fedLogout(error.message)
					}
				} else { // 无法判断的错误都退出
					this.fedLogout()
				}
			})
		},
		handleCancel () {
			this.dialogVisible = false
			this.$emit('updateDialogStatus', this.dialogVisible)
		},
		handleSizeChange (val) {
			this.table.pageSize = val
			this.getData()
		},
		handleCurrentChange (val) {
			this.table.pageNo = val
			this.getData()
		},
		fedLogout (message) {
			const that = this
			store.dispatch('User/fedLogOut').then(() => {
				MessageBox.alert(message || '登录超时', '提示', {
					confirmButtonText: '确定',
					callback: action => {
						that.$router.push('/login')
					}
				})
			})
		},
		headerStyle ({ row, rowIndex }) {
			return {
				'background-color': '#f2f7fb',
				'height': '40px',
				'line-height': '40px',
				'border': '0px ',
				'border-bottom': '1px solid #e3e7ed ',
				'text-align': 'center',
				'padding': '0px',
				'font-size': '12px'
			}
		},
		rowStyle ({row, column, rowIndex, columnIndex}) {
			if (rowIndex % 2 !== 0) {
				return {
					'background-color': '#f8f9fa',
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
					'border': '0px',
					'text-align': 'center',
					'padding': '0px'
				}
			}
		},
		handleClose () {
			this.dialogVisible = false
			this.$emit('updateDialogStatus', this.dialogVisible)
		}
	}
}
</script>
<style lang="scss">
	@import "index.scss";
	@import "../../assets/scss/pagination";
</style>
