const routerView = (url) => {
	console.log("跳转的页面为:"+url)
	uni.navigateTo({
		url
	})
}

const switchTab = (url)=>{
	uni.switchTab({
		url
	});
}

export {
	routerView,
	switchTab
}