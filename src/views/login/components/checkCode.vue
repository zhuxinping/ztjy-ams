<template>
	<div class="container">
		<input :class="{cur:time}" v-on:click="run" :disabled="disabled || time > 0" v-model="text">
	</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	name: 'reset',
	props: {
		second: {
			type: Number,
			default: 50
		}
	},
	data () {
		return {
			disabled: false,
			time: 0,
			Time: null,
			tips: '发送验证码'
		}
	},
	methods: {
		...mapActions({}),
		run () {
			this.$emit('run')
		},
		start () {
			clearTimeout(this.Time)
			this.time = this.second
			this.timer()
			this.tips = '重新发送'
		},
		stop () {
			this.time = 0
			this.disabled = false
		},
		setDisabled (val) {
			this.disabled = val
		},
		timer () {
			if (this.time > 0) {
				this.time--
				this.disabled = true
				clearTimeout(this.Time)
				this.Time = setTimeout(this.timer, 1000)
			} else if (this.time === 0) {
				this.disabled = false
				clearTimeout(this.Time)
			}
		}
	},
	computed: {
		text () {
			return this.time > 0 ? this.time + 's' : this.tips
		}
	}
}
</script>
<style lang="scss">
	.container input {
		background: none;
		outline: none;
		border: 1px solid #468cde;
		color: #468cde;
		float: right;
		border-radius: 20px;
		width: 86px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-size: 12px;
		cursor: pointer;
	}

	input.cur {
		border: 1px solid #c6c6c6;
		color: #666666;
	}
</style>
