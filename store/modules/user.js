import {
		urls
	} from '@/config/UrlKey.js'

const user = {
	state:{
		urlList: [{
				id: '1',
				name: "地址:" + urls.base,
				url: urls.base
			},
			{
				id: '2',
				name: "地址:" + urls.baseQd,
				url: urls.baseQd
			},
			{
				id: '3',
				name: "地址:http://27.223.99.186:8080",
				url: 'http://27.223.99.186:8080'
			},
			{
				id: '4',
				name: "地址:http://10.16.1.64:8080",
				url: 'http://10.16.1.64:8080'
			}
		],
	},
	mutations:{
		
	},
	namespaced: true
}

export default user