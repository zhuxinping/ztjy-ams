const currentHost = window.location.host
// 测试环境，联调环境，测试环境域名
const hosts = ['10.1.31.73', '10.1.31.71', 'ztjy-ams-web.szy.com', '172.16.10.30', 'amsweb.szy.com:91', 'ztjy-rcams.ztjy61.com', 'dls.ztjy.cn']
let prefix = hosts.find(host => {
	return currentHost.indexOf(host) > -1
})
// 如果是IP地址，并且是172.16.52开头，则默认为开发环境，否则为线上环境
if (!prefix && currentHost.indexOf('172.16.52') > -1) {
	prefix = 'dev'
}
let BASE_API = ''
switch (prefix) {
case 'dev':
	// BASE_API = 'http://172.16.52.125:8088/amsserver'
	BASE_API = 'http://10.1.31.69:8088/amsserver'
	break
case '10.1.31.71':
	BASE_API = 'http://10.1.31.69:8088/amsserver'
	break
case '10.1.31.73':
case 'ztjy-ams-web.szy.com':
case 'amsweb.szy.com:91':
case '172.16.10.30':
	BASE_API = 'http://ztjy-ams-server.szy.com:8080/amsserver'
	break
case 'ztjy-rcams.ztjy61.com':
	BASE_API = '//47.97.78.30:8389/amsserver'
	break
default:
	BASE_API = '//amsserver.ztjy.cn/amsserver'
	break
}

const path = _path => BASE_API + _path

export const SYSTEM = {
	// 用户相关
	USER: {
		// 登录url
		LOGIN: path('/sys/login/v1.0'),
		// 获取短信验证码url
		PHONEVERIFY: path('/sys/sms/phoneverify/v1.0'),
		// 短信验证码校验url
		CHECKPHONEVERIFY: path('/sys/sms/checkphoneverify/v1.0'),
		// 获取图片验证码url
		GETIMGCODE: path('/sys/createimage/v1.0'),
		// 用户信息
		INFO: path('/sys/session/v1.0'),
		PERMISSION: path('/sys/authority/menulist/v1.0'),
		// 登出
		LOGOUT: path('/sys/loginout/v1.0'),
		// 修改密码
		CHANGEPASSWORD: path('/sys/updateuserpass/v1.0')
	},
	// 组织管理
	ORGANIZATION: {
		// 管理区域管理
		// 管理区域管理树结构
		AREALIST: path('/agent/agentmanagearealist/v1.0'),
		// 添加、修改管理区域管理树结构
		ADDUPDATEAREA: path('/agent/saveagentmanagearea/v1.0'),
		// 删除管理区域管理树结构
		DELETEAREA: path('/agent/delagentmanagearea/v1.0'),
		// 子账号管理
		// 子账号列表
		CHILDRENLIST: path('/agent/agentchildaccountpage/v1.0'),
		// 修改子账号需要获取基本信息回填
		GETCHILDREN: path('/agent/getagentchildaccount/v1.0'),
		// 添加、修改子账号
		ADDUPDATECHILDREN: path('/agent/saveagentchildaccount/v1.0'),
		// 获取代理商子账号区域列表
		GETAREALIST: path('/agent/childarealist/v1.0'),
		// 提交子账号管理区域分配信息
		SUBMITCHILDRENAREA: path('/agent/savechildareaauth/v1.0'),
		// 禁用子账号
		FORBIDCHILDREN: path('/agent/childuserswitch/v1.0'),
		// 获取代理商子账号角色列表
		CHILDRENROLE: path('/agent/agentchildrolelist/v1.0'),
		// 子账号角色管理
		// 子账号角色列表
		NUMBERLIST: path('/agent/childrolepage/v1.0'),
		// 添加、修改子账号角色列表
		ADDUPDATENUMBER: path('/agent/savechildrole/v1.0'),
		// 禁用子账号角色
		FORBIDNUMBER: path('/agent/childroleswitch/v1.0'),
		// 子账号角色web功能授权
		WEBPOWERNUMBER: path('/sys/webchildmenubuttonlist/v1.0'),
		// 保存子账号角色web功能授权
		SUBMITWEBPOWERNUMBER: path('/sys/savewebchildmenubuttonlist/v1.0'),
		// 子账号角色数据授权
		SHUZIPOWERNUMBER: path('/sys/sensitivedatalist/v1.0'),
		// 保存子账号角色数据授权
		SUBMITSHUZIPOWERNUMBER: path('/sys/saverolesensitivelist/v1.0'),
		// 钉钉权限获取
		GETDINGDINGACTION: path('/sys/dingdingchildmenubuttonlist/v1.0'),
		// 保存钉钉权限
		SUBMITDINGDINGACTION: path('/sys/savedingdingchildmenubuttonlist/v1.0')
	},
	AGENT: {
		LIST: path('/agent/getagentpage/v1.0'),
		CHANGE: path('/agent/changeagent/v1.0'),
		QRCODE: path('/sys/selfregisterqrcode/v1.0')
	}
}
