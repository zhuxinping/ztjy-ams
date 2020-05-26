// 引入szyutils公用工具库
const getCookie = require('szyutils/modules/getCookie')
const setCookie = require('szyutils/modules/setCookie')
const removeCookie = require('szyutils/modules/removeCookie')
const isPhoneNum = require('szyutils/modules/isPhoneNum')
const formatFixedDate = require('szyutils/modules/formatFixedDate')
export default {
	getCookie (name) {
		return getCookie(name)
	},

	setCookie (name, value, days) {
		return setCookie(name, value, days)
	},

	removeCookie (name) {
		return removeCookie(name, {
			expires: -1
		})
	},
	isPhoneNum (str) {
		return isPhoneNum(str)
	},
	setSession (key, value) {
		sessionStorage.setItem(key, value)
	},
	getSession (key) {
		return sessionStorage.getItem(key)
	},
	removeSession (key) {
		sessionStorage.removeItem(key)
	},
	getRandomNum () {
		let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
		let nums = ''
		for (let i = 0; i < 8; i++) {
			let id = parseInt(Math.random() * 61)
			nums += chars[id]
		}
		return nums
	},
	passWordReg (str) {
		return /^(?![0-9]+$)(?![a-zA-Z]+$)(?!\W+$)(?![\Wa-zA-Z]+$)(?![\W0-9]+$)[0-9A-Za-z\W]{6,16}$/.test(str)
	},
	/**
	 * 时间格式化
	 * @param date
	 * @param fmt
	 * @returns {String}
	 */
	formatFixedDate (date, fmt) {
		return formatFixedDate(date, fmt)
	}
}
