import {urls} from '@/config/UrlKey.js'

export const version= {
	data(){
		return {
			res:{
				version:'',
				versionCode:''
			},
			isPress:false,
			score:0
		}
	},
	methods: {
		getNewVersion() {
			// if(process.env.NODE_ENV !== 'development'){
				plus.runtime.getProperty(plus.runtime.appid, (inf) => {
					this.res.version = inf.version
					this.$api.send({
						url: '/app/version/getNewVersion?versionCode=' + this.res.version,
						method: 'get',
						success: (res) => {
							if (res.code === 200) {
								if (res.data.needUp) {
									this.res.versionCode = res.data.versionCode
									this.CheckForUpdates()
								}
							}
						}
					})
				});
			// }
			
		},
		CheckForUpdates() {
			let _this = this;
			uni.getSystemInfo({ //获取设备信息
				success: (res) => {
					if (res.platform == "android") {
						if (this.res.version.slice(0, 1) !== this.res.versionCode.slice(0, 1)) {
							//大更新需要打apk
							this.AndroidCheckUpdate()
						} else {
							//需要打wag
							this.AndroidChecWgt()
						}
					}
				}
			})

		},
		AndroidCheckUpdate() {
			let _this = this;
			uni.getNetworkType({ //获取网络信息
				success: (res) => {
					if (res.networkType === 'wifi') {
						uni.showModal({
							title: '提示',
							content: '有新的版本发布，检测到您目前为Wifi连接，是否确认更新。',
							success: function(res) {
								if (res.confirm) {
									_this.initDowg()
								} else if (res.cancel) {
									_this.request()
								}
							}
						})
					} else {
						uni.showModal({
							title: '提示',
							content: '有新的版本发布,检测到您目前非Wifi连接,是否确认更新。',
							success: function(res) {
								if (res.confirm) {
									_this.initDowg()
								} else if (res.cancel) {
									_this.request()
								}
							}
						})
					}
				}
			})
		},
		initDowg() {
			this.isPress = true
			let partitionDesc = urls.apk
			let downloadTask = uni.downloadFile({
				url: partitionDesc, //仅为示例，并非真实的资源
				success: (res) => {
					if (res.statusCode === 200) {
						plus.runtime.install(plus.io.convertLocalFileSystemURL(res.tempFilePath), {}, {},
							function(error) {
								uni.showToast({
									title: '安装失败',
									mask: false,
									duration: 1500
								});
							})

					} else {
						uni.showToast({
							title: '更新失败',
							mask: false,
							duration: 1500
						});
					}
				}
			});

			downloadTask.onProgressUpdate((res) => {
				if (res.progress === 100) {
					this.isPress = false
				} else {
					this.score = res.progress 
				}
			})
		},
		AndroidChecWgt() {
			let _this = this;
			uni.getNetworkType({ //获取网络信息
				success: (res) => {
					if (res.networkType === 'wifi') {
						uni.showModal({
							title: '提示',
							content: '有新的版本发布，检测到您目前为Wifi连接，是否确认更新。',
							success: function(res) {
								if (res.confirm) {
									_this.initDowgs()
								}else{
									_this.request()
								}
							}
						})
					} else {
						uni.showModal({
							title: '提示',
							content: '有新的版本发布,检测到您目前非Wifi连接,是否确认更新。',
							success: function(res) {
								if (res.confirm) {
									_this.initDowgs()
								}else{
									_this.request()
								}
							}
						})
					}
				}
			})
		},
		initDowgs() {
			let _this = this
			let wgtUrl = urls.wgt
			this.isPress = true
			let downloadTask = uni.downloadFile({
				url: wgtUrl, //仅为示例，并非真实的资源
				success: (res) => {
					if (res.statusCode === 200) {
						_this.installWgt(res.tempFilePath);
					} else {
						uni.showToast({
							title: '下载wgt失败！',
							mask: false,
							duration: 1500
						});
					}
				}
			});

			downloadTask.onProgressUpdate((res) => {
				if (res.progress === 100) {
					this.isPress = false
				} else {
					this.score = res.progress 
				}
			})
		},
		installWgt(path) {
			plus.nativeUI.showWaiting("安装wgt文件...");
			plus.runtime.install(path, {
				force: true
			}, function() {
				plus.nativeUI.closeWaiting();
				// console.log("安装wgt文件成功！");
				plus.nativeUI.alert("应用资源更新完成！", function() {
					plus.runtime.restart();
				});
			}, function(e) {
				plus.nativeUI.closeWaiting();
				// console.log("安装wgt文件失败[" + e.code + "]：" + e.message);
				plus.nativeUI.alert("安装wgt文件失败[" + e.code + "]：" + e.message);
			});
		},
		request(){
			// if(process.env.NODE_ENV !== 'development'){
				// #ifdef APP-PLUS
				if (plus.os.name.toLowerCase() === 'android') {
					plus.runtime.quit();
				} else {
					const threadClass = plus.ios.importClass("NSThread");
					const mainThread = plus.ios.invoke(threadClass, "mainThread");
					plus.ios.invoke(mainThread, "exit");
				}
				// #endif
			// }
			
		}
	}
}
