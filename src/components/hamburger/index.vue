<template>
	<div @click="toggleClick">
		<svg t="1492500959545" class="hamburger" :class="{'is-active':isActive}" style=""
			viewBox="0 0 1024 1024"
			version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1691" xmlns:xlink="http://www.w3.org/1999/xlink"
			width="44" height="44">
			<g>
				<path
					d="M191.5,64v897c0,34.9-28.6,63.5-63.5,63.5h0c-34.9,0-63.5-28.6-63.5-63.5V64c0-34.9,28.6-63.5,63.5-63.5h0
		C162.9,0.5,191.5,29.1,191.5,64z"
					p-id="1692"></path>
			</g>
			<g>
				<path
					d="M574.5,64v897c0,34.9-28.6,63.5-63.5,63.5h0c-34.9,0-63.5-28.6-63.5-63.5V64c0-34.9,28.6-63.5,63.5-63.5h0
		C545.9,0.5,574.5,29.1,574.5,64z"
					p-id="1693"></path>
			</g>
			<g>
				<path
					d="M959.5,64v897c0,34.9-28.6,63.5-63.5,63.5h0c-34.9,0-63.5-28.6-63.5-63.5V64c0-34.9,28.6-63.5,63.5-63.5h0
		C930.9,0.5,959.5,29.1,959.5,64z"
					p-id="1694"></path>
			</g>
		</svg>
	</div>
</template>

<script>
export default {
	name: 'hamburger',
	props: {
		isActive: {
			type: Boolean,
			default: false
		},
		toggleClick: {
			type: Function,
			default: null
		}
	}
}
</script>

<style scoped>
	.hamburger {
		display: inline-block;
		cursor: pointer;
		width: 16px;
		height: 16px;
		transform: rotate(0deg);
		transition: .38s;
		transform-origin: 50% 50%;
		margin-top: 17px;
		fill: #fff;
	}

	.hamburger.is-active {
		transform: rotate(90deg);
	}
</style>
