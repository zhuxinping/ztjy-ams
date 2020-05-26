import axios from 'axios'
import { MessageBox } from 'element-ui'
import store from '../store'
import Common from '@/utils/common'
import { USER_TOKEN } from '@/maps/constants'

axios.defaults.withCredentials = true
const instance = axios.create({
	timeout: 15000
})
// request拦截器
instance.interceptors.request.use(config => {
	if (store.getters.token) {
		// 请求头带上授权
		config.headers['Authentication-Token'] = 'JSESSIONID=' + Common.getCookie(USER_TOKEN)
	}
	return config
}, error => {
	return Promise.reject(error)
})

// response拦截器
instance.interceptors.response.use(
	response => {
		const res = response.data
		if (res.code !== 10000) {
			// 请求菜单时也会有提示，不同code来区分
			// 3910:您的账号在其他登录，请重新登录
			// 3920:您的登录已过期，请重新登录
			// 3930:短信未验证通过，请重新登录
			if (res.code === 3910 || res.code === 3920 || res.code === 3930) {
				MessageBox.confirm(res.message, '确定登出', {
					confirmButtonText: '重新登录',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					store.dispatch('User/fedLogOut').then(() => {
						// 为了重新实例化vue-router对象 避免bug
						location.reload()
					})
				})
			} else {
				return response
			}
		} else {
			return response
		}
	},
	error => {
		// Message({
		// 	message: error.message,
		// 	type: 'error',
		// 	duration: 3 * 1000
		// })
		console.log(error)
		// 跨域引起的报错会有这个提示，造成与其他提示重复
		if(!error.code){
			MessageBox.confirm('您登录已超时或存在异地登录，如有疑问请联系客服', '确定登出', {
				confirmButtonText: '重新登录',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				store.dispatch('User/fedLogOut').then(() => {
					// 为了重新实例化vue-router对象 避免bug
					location.reload()
				})
			})
		} else {
			return Promise.reject(error)
		}
	}
)
const API = {
	get (url, params, callback) {
		return new Promise((resolve, reject) => {
			instance.get(url, {
				params: params
			}).then((response) => {
				if (response.data.code === 10000) {
					callback && callback(response.data)
					resolve(response.data)
				} else {
					reject(response.data)
				}
			}).catch((error) => {
				reject(error)
			})
		})
	},
	post (url, params, callback) {
		return new Promise((resolve, reject) => {
			instance.post(url, params).then((response) => {
				if (response.data.code === 10000) {
					callback && callback(response.data)
					resolve(response.data)
				} else if (response.data.code >= 3901) {
					callback && callback(response.data)
					resolve(response.data)
				} else {
					reject(response.data)
				}
			}).catch((error) => {
				reject(error)
			})
		})
	},
	upload (url, params, callback) {
		return new Promise((resolve, reject) => {
			instance.post(url, params, { headers: { 'Content-Type': 'multipart/form' } }).then((response) => {
				if (response.data.code === 10000) {
					callback && callback(response.data)
					resolve(response.data)
				} else {
					reject(response.data)
				}
			}).catch((error) => {
				reject(error)
			})
		})
	}
}

export { API }
