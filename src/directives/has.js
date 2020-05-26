import Vue from 'vue'
import store from '@/store'

function has (value) {
	const buttonList = store.getters.buttonList
	if (!buttonList || !Array.isArray(buttonList) || (Array.isArray(buttonList) && buttonList.length === 0)) {
		return false
	}
	return buttonList.indexOf(value) > -1
}

Vue.directive('has', {
	inserted: function (el, binding, vnode) {
		if (!has(binding.value)) {
			el.parentNode.removeChild(el)
		}
	}
})
