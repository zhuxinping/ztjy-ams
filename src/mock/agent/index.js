import Mock from 'mockjs'
import * as ApiMaps from '@/api/apiMaps'

export default getListMock = (params) => {
	Mock.mock(ApiMaps.SYSTEM.AGENT.LIST, {
		'code': 10000,
		'message': 'success',
		'body': {}
	})
}
export default changeMock = (params) => {
	Mock.mock(ApiMaps.SYSTEM.AGENT.LIST, {
		'code': 10000,
		'message': 'success',
		'body': {}
	})
}
