<template>
	<div>
		<AgentSelector  :showCancel="false" :showClose="false" :visible="true" v-on:updateDialogStatus="updateDialogStatus" :checkState="true"></AgentSelector>
	</div>
</template>

<script>
import AgentSelector from '@/components/agent/agentSelector'

export default {
	components: {
		AgentSelector
	},
	methods: {
		updateDialogStatus (status) {
			this.visible = status
		}
	}
}
</script>
