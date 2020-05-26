
<template>
	<div class="scroll-container">
		<div class="scroll-wrapper">
			<div class="app-header">
				<i :class="sidebar.opened && 'opened'"><img src="/static/images/logo.png" alt=""></i><span
				v-show="sidebar.opened">掌通家园代理商平台</span>
			</div>
			<div class="current-agent">
				<span v-show="sidebar.opened">{{agentName}}</span> <i v-if="isManager" class="icon icon-transfer"
				@click="handleAgentSelector"></i>
			</div>
			<el-menu ref="menu" mode="vertical" unique-opened :default-active="defaultActive" background-color="#424f5a"
				text-color="#ffffff" active-text-color="#20a0ff" :collapse="!sidebar.opened">
				<sidebar-item :routes="routes"></sidebar-item>
			</el-menu>
		</div>
		<AgentSelector :visible="agentDialog" :showCancel="true" :showClose="true"
			v-on:updateDialogStatus="updateDialogStatus"></AgentSelector>
	</div>
</template>

<script>
import AgentSelector from '@/components/agent/agentSelector'
import SidebarItem from './SidebarItem'
import { mapGetters } from 'vuex'
import store from '@/store'
import { USER_TYPE } from '@/maps/constants'

export default {
	name: 'sidebar',
	data () {
		return {
			defaultActive: '',
			isManager: false,
			agentName: '',
			agentDialog: false
		}
	},
	components: {
		SidebarItem,
		AgentSelector
	},
	mounted () {
		console.log(this.userInfo)
		this.defaultActive = this.$route.path
		this.isManager = this.userInfo.userType === USER_TYPE.Manager
		this.agentName = this.userInfo.agentName
	},
	watch: {
		$route (v) {
			setTimeout(() => {
				this.defaultActive = v.path
			}, 200)
		}
	},
	computed: {
		routes () {
			return store.getters.leftRouters
		},
		...mapGetters({
			sidebar: 'SideBar/getSidebar',
			userInfo: 'User/userInfo'
		})
	},
	methods: {
		handleAgentSelector () {
			this.agentDialog = true
		},
		updateDialogStatus (status) {
			this.agentDialog = status
		}
	}
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
	.scroll-container {
		position: relative;
		width: 100%;
		height: 100%;
		background-color: #424f5a;
		.scroll-wrapper {
			position: absolute;
			width: 100% !important;
		}
		.app-header {
			height: 50px;
			line-height: 50px;
			background: #468cde;
			color: #fff;
			font-size: 16px;
			font-weight: bold;
			text-align: center;
			i {
				vertical-align: middle;
				display: inline-block;
				width: 29px;
				height: 29px;
				&.opened {
					margin-right: 5px;
				}
			}
			span {
				vertical-align: middle;
				display: inline-block;
			}
		}
		.current-agent {
			height: 48px;
			line-height: 48px;
			color: #fff;
			font-size: 14px;
			background-color: rgba(0, 0, 0, .2);
			position: relative;
		}
		.current-agent span {
			display: block;
			margin-right: 48px;
			text-align: center;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
		.current-agent .icon {
			position: absolute;
			right: 0;
			top: 0;
			font-size: 14px;
			width: 48px;
			height: 48px;
			padding: 17px;
			cursor: pointer;
		}
	}
</style>
