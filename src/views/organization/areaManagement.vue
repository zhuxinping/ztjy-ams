<template>
	<div class="area-top">
		<p class="remark">说明: 给某个节点新增子节点后，归属于该节点的幼儿园的管理区域将被置为“默认区域”；且需重新设置子账号（授权为该节点的子账号）的管理区域权限。<br><span style="margin-left: 30px">不可删除节点情况：当前管理区域已被子账号授权 & 当前管理区域已被学校使用，不能删除节点！</span></p>
		<ul class="operation">
			<li class="operation-area" @click="append(treeNode, parentTreeNode)" v-has="'AGENT_CHILD_AREA_ADD'">新增子节点</li>
			<li class="operation-area" @click="insertAfter(treeNode, parentTreeNode)" v-has="'AGENT_AREA_ADD'">新增同级节点</li>
			<li class="operation-area" @click="removeTreeNode(treeNode)" v-has="'AGENT_AREA_DEL'">删除节点</li>
		</ul>
		<div class="bottom">
			<div class="left">
				<el-tree
					:render-content = renderContent
					:data="areaList"
					:highlight-current="true"
					default-expand-all
					ref="tree"
					node-key="id"
					:props="defaultProps"
					@node-click="getChecked">
				</el-tree>
			</div>
			<div class="right">
				<el-form :label-position="labelPosition" label-width="85px" ref="formLabelAlign" :model="formLabelAlign" size="small">
					<el-form-item prop="parentName" :rules="rules.parentName" label="上级区域">
						<el-input :disabled="true" v-model="formLabelAlign.parentName"></el-input>
					</el-form-item>
					<el-form-item  prop="name"  label="区域名称" :rules="rules.name">
						<el-input :disabled="treeFlag" v-model="formLabelAlign.name" maxlength="32"></el-input>
					</el-form-item>
					<el-form-item label="区域序号" prop="sno" :rules="rules.sno">
						<el-input :disabled="treeFlag" v-model="formLabelAlign.sno" maxlength="2"></el-input>
					</el-form-item>
					<el-form-item label="备注" prop="remark" :rules="rules.remark">
						<el-input :disabled="treeFlag" type="textarea" v-model="formLabelAlign.remark" :maxlength="256"></el-input>
					</el-form-item>
					<span class="tongji">{{textarealength}}/256</span>
					<el-form-item>
						<el-button type="primary" @click="submitForm('formLabelAlign')" v-has="'AGENT_CHILD_AREA_SAVE'">保存</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<el-dialog
			title="提示"
			:visible.sync="centerDialogVisible"
			width="400px"
			:close-on-click-modal="false"
			>
			<span>删除节点将删除它的子节点，确认删除吗？</span>
			<span slot="footer" class="dialog-footer">
				<el-button class="primary-elbutton" type="primary" @click="sureRemove(treeNode, parentTreeNode)">确 定</el-button>
				<el-button  class="elbutton" @click="centerDialogVisible = false">取 消</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import { headFor } from '@/utils/tree'
export default {
	name: 'area-management',
	data () {
		return {
			areaList: [],
			defaultProps: {
				children: 'list',
				label: 'name'
			},
			labelPosition: 'right',
			treeFlag: false,
			formLabelAlign: {
				id: '',
				parentName: '',
				name: '',
				parentId: '',
				sno: '',
				remark: ''
			},
			deleteFlag: true,
			textarealength: 0,
			treeNode: {},
			parentTreeNode: {},
			stateFlag: '',
			centerDialogVisible: false,
			rules: {
				parentName: [{required: true, message: '请输入上级区域', trigger: 'blur'}, { pattern: /^[^'"?/\\<>]*$/, message: '不允许输入\' "?/\\<>' }],
				name: [
					{required: true, message: '请输入区域名称', trigger: 'blur'},
					{ pattern: /^[^'"?/\\<>]*$/, message: '不允许输入\' "?/\\<>' }],
				sno: [{required: true, message: '请输入区域序号', trigger: 'blur'}, { pattern: /^[1-9]([0-9])*$/, message: '请输入正整数', trigger: ['blur'] }],
				remark: [
					{ required: false, message: '' },
					{ pattern: /^[^'"?/\\<>]*$/, message: '不允许输入\' "?/\\<>' }
				]
			}
		}
	},
	// mounted () {
	// 	this.getData()
	// },
	activated () {
		this.deleteFlag = true
		this.stateFlag = ''
		this.getData()
		this.forMatter()
		this.treeNode = {}
		this.parentTreeNode = {}
	},
	methods: {
		...mapActions({
			getAreaList: 'Organization/areaList',
			addUpdateArea: 'Organization/addUpdateArea',
			deleteArea: 'Organization/deleteArea'
		}),
		forMatter () {
			for (let key in this.formLabelAlign) {
				this.formLabelAlign[key] = ''
			}
		},
		renderContent (h, { node, data, store }) {
			return (<span class= 'span' title={node.label}>{node.label}</span>)
		},
		getChecked (data, leafNode) {
			this.stateFlag = ''
			if (data.id === 1) {
				this.treeFlag = true
			} else {
				this.treeFlag = false
			}
			this.treeNode = data
			this.parentTreeNode = leafNode
			this.formLabelAlign.name = this.treeNode.name.trim()
			this.formLabelAlign.parentName = this.parentTreeNode.parent.data.name
			this.formLabelAlign.id = this.treeNode.id
			this.formLabelAlign.sno = this.treeNode.sno
			this.formLabelAlign.remark = this.treeNode.remark ? this.treeNode.remark.trim() : ''
			this.formLabelAlign.parentId = this.parentTreeNode.parent.data.id
			this.textarealength = this.treeNode.remark ? this.treeNode.remark.trim().length : 0
		},
		submitForm (formLabelAlign) {
			if (this.formLabelAlign.name.trim() === '') {
				this.$message({type: 'error', message: '请输入区域名称！'})
				return
			}
			let params = {}
			params.id = this.formLabelAlign.id ? ~~this.formLabelAlign.id : null
			params.name = this.formLabelAlign.name.trim()
			params.parentId = this.formLabelAlign.parentId ? ~~this.formLabelAlign.parentId : null
			params.sno = this.formLabelAlign.sno ? ~~this.formLabelAlign.sno : null
			params.remark = this.formLabelAlign.remark.trim()
			this.$refs[formLabelAlign].validate((valid) => {
				if (valid) {
					this.addUpdateArea(params).then(res => {
						if (res.code === 10000) {
							const that = this
							const newChild = { id: res.body.id, name: this.formLabelAlign.name, list: [], parentId: this.formLabelAlign.parentId, sno: this.formLabelAlign.sno, remark: this.formLabelAlign.remark }
							if (this.stateFlag === true) {
								if (!this.parentTreeNode.parent.data.list) {
									this.$set(this.parentTreeNode.parent.data, 'list', [])
								}
								this.parentTreeNode.parent.data.list.push(newChild)
							} else if (this.stateFlag === false) {
								if (!this.treeNode.list) {
									this.$set(this.treeNode, 'list', [])
								}
								this.treeNode.list.push(newChild)
							} else {
								headFor(that.areaList, function (o) {
									if (o.id === that.treeNode.id) {
										that.$set(o, 'name', that.formLabelAlign.name.trim())
										that.$set(o, 'id', that.formLabelAlign.id)
										that.$set(o, 'sno', that.formLabelAlign.sno)
										that.$set(o, 'parentId', that.formLabelAlign.parentId)
										that.$set(o, 'remark', that.formLabelAlign.remark.trim())
									}
								})
							}
							this.formLabelAlign.name = this.treeNode.name
							this.formLabelAlign.parentName = this.parentTreeNode.parent.data.name
							this.formLabelAlign.id = this.treeNode.id
							this.formLabelAlign.sno = this.treeNode.sno
							this.formLabelAlign.remark = this.treeNode.remark ? this.treeNode.remark.trim() : ''
							this.formLabelAlign.parentId = this.parentTreeNode.parent.data.id
							this.textarealength = this.treeNode.remark ? this.treeNode.remark.trim().length : 0
							this.stateFlag = ''
							this.$message({type: 'success', message: res.message})
						} else {
							this.$message({type: 'error', message: res.message})
						}
					}).catch(() => {
						console.log('网络错误！')
						// this.$message({type: 'error', message: '数据加载失败！'})
					})
				} else {
					// this.$message({type: 'error', message: '数据提交失败！'})
					console.log('数据提交失败！')
					return false
				}
			})
		},
		append (treeNode, parentTreeNode) {
			if (treeNode.id === undefined) {
				this.$message({type: 'warning', message: '请选择一个节点！'})
				return
			}
			if (parentTreeNode.level >= 6) {
				this.$message({type: 'warning', message: '最多添加五级节点！'})
				return
			}
			this.treeFlag = false
			this.stateFlag = false
			this.textarealength = 0
			this.forMatter()
			this.formLabelAlign.parentId = treeNode.id
			this.formLabelAlign.parentName = treeNode.name
		},
		insertAfter (treeNode, parentTreeNode) {
			if (treeNode.id === undefined) {
				this.$message({type: 'warning', message: '请选择一个节点！'})
			}
			if (treeNode.id === 1) {
				this.treeFlag = true
				this.$message({type: 'warning', message: '根节点不能添加同级节点！'})
			}
			if (parentTreeNode.parent) {
				this.stateFlag = true
				this.forMatter()
				this.textarealength = 0
				this.formLabelAlign.parentId = parentTreeNode.parent.data.id
				this.formLabelAlign.parentName = parentTreeNode.parent.data.name
			}
		},
		removeTreeNode (treeNode) {
			if (treeNode.id === undefined) {
				this.$message({type: 'warning', message: '请选择一个节点！'})
				return
			}
			if (treeNode.id === 1) {
				this.$message({type: 'warning', message: '不能删除根节点！'})
				return
			}
			this.centerDialogVisible = true
			this.deleteFlag = true
		},
		sureRemove (treeNode, parentTreeNode) {
			if (this.deleteFlag) {
				this.deleteFlag = false
				let params = {}
				params.id = treeNode.id
				this.deleteArea(params).then(res => {
					if (res.code === 10000) {
						const parent = parentTreeNode.parent
						const children = parent.data.list || parent.data
						const index = children.findIndex(d => d.id === treeNode.id)
						children.splice(index, 1)
						this.forMatter()
						this.treeNode = {}
						this.parentTreeNode = {}
						this.textarealength = 0
						this.$message({type: 'success', message: res.message})
					} else {
						this.deleteFlag = true
						this.$message({type: 'error', message: res.message})
					}
					this.centerDialogVisible = false
				}).catch(() => {
					console.log('网络错误！')
					// this.$message({type: 'error', message: '数据加载失败！'})
				})
			}
		},
		getData () {
			let params = {}
			this.getAreaList(params).then(res => {
				this.areaList = res.body.list
			}).catch(() => {
				console.log('网络错误！')
				// this.$message({type: 'error', message: '数据加载失败！'})
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
</style>
