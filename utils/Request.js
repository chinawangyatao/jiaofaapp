import {
	urls
} from '../config/UrlKey.js'
import {
	keys
} from '../config/StorageKey.js'


const request2 = {
	send(param, backpage, backtype) {
		let baseAjax = urls.base
		let baseAjaxAxios = uni.getStorageSync("baseAjax")
		if(baseAjaxAxios){
			baseAjax=baseAjaxAxios
		}
		let http = ''
		if (param.http) {
			http = param.http
		}else{
			http = baseAjax
		}
		var _self = this,
			url = param.url,
			method = param.method,
			header = {},
			data = param.data || {},
			hideLoading = param.hideLoading || false;
		//拼接完整请求地址  
		var requestUrl = http + url;
		// console.log(requestUrl,"requestUrl")
		// if (!param.useIdFlag) {
		// 	data["shopId"] = uni.getStorageSync('shopId');
		// 	if (uni.getStorageSync('storeId') && uni.getStorageSync('storeId') != 'undefined' && uni.getStorageSync(
		// 			'storeId') !=
		// 		'null') {
		// 		data["storeId"] = uni.getStorageSync('storeId');
		// 	}
		// }
		var timestamp = Date.parse(new Date()); //时间戳
		data["timestamp"] = timestamp;
		// #ifdef MP-WEIXIN
		data["device"] = "wxapp";
		data["ver"] = "0.0.1";
		// #endif
		// #ifdef APP-PLUS || H5
		data["device"] = "iosapp";
		data["ver"] = "1.0.0";
		// #endif
		if (method) {
			method = method.toUpperCase(); //小写改为大写
			if (method == "POST") {
				header = {
					'content-type': "application/json;charset=UTF-8"
				};
			} else {
				data = {}
				header = {
					'content-type': "application/json"
				};
			}
		} else {
			method = "GET";
			header = {
				'content-type': "application/json"
			};
		}
		//网络请求，正式上线注释下边一句,下句是便于调试打印请求参数
		//console.log(requestUrl, JSON.stringify(data),"++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
		header['hi-auth-token'] = uni.getStorageSync(keys.token)
		// header['hi-auth-token'] = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdWJqZWN0IiwicGF5bG9hZCI6IntcImFjY291bnROb25FeHBpcmVkXCI6dHJ1ZSxcImFjY291bnROb25Mb2NrZWRcIjp0cnVlLFwiYXV0aG9yaXRpZXNcIjpbe1wiYXV0aG9yaXR5XCI6XCIxMjEyXCJ9LHtcImF1dGhvcml0eVwiOlwiUk9MRV8xMjEyXCJ9XSxcImNyZWRlbnRpYWxzTm9uRXhwaXJlZFwiOnRydWUsXCJlbmFibGVkXCI6dHJ1ZSxcImlkXCI6XCIxNDU1ODE5Mzg3NzEwODUzMTIyXCIsXCJwYXNzd29yZFwiOlwiJDJhJDEwJEFIdTZzeElWeVFOVXVrU0t4YkZhTi53elI3XC9PTWlSUFlXYzJKSS5cL2oxeVBHd1F6RFQ3Wm1cIixcInVzZXJuYW1lXCI6XCJ0ZXN0XCJ9IiwiZXhwIjoxNjM3NjU3MDM0fQ.eQu0jh7Y0SoQwWHXzODAQ53expYlOJXGc76E49l9B2w'
		return new Promise((resolve, reject) => {
			uni.request({				
				url: requestUrl,
				method: method,
				header: header,
				data: data,
				success: res => {
					if (res.data.status === 401) {
						uni.navigateTo({
							url: '/pages/index/index'
						})
					}
			
					if (res.statusCode == 500 || res.statusCode == 503 || res.statusCode == 404 ) {
						uni.showToast({
							title: '系统异常，请联系管理员！',
							icon: 'none',
							duration: 3000
						})
					}
					if (res.code && res.code != 200) { //api错误
						uni.showModal({
							content: "请求错误"
						});
					}
					typeof param.success == "function" && param.success(res.data);
					resolve(res)
					
				},
				fail: (e) => {
					if (!hideLoading) {
						uni.hideLoading();
					}
			
					uni.showToast({
						title: '系统异常，请联系管理员！',
						icon: 'none',
						duration: 3000
					})
					
					typeof param.fail == "function" && param.fail(e.data);
					reject(e)
				},
				complete: () => {
					typeof param.complete == "function" && param.complete();
					return;
				}
			});
		})
		
	}
}

export default request2
