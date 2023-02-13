<template>
	<view class="startPatrol header-top-height">
		<header-bar :left="true" :name="'当前版本'"></header-bar>
		<!-- 内容 -->
		<view class="content">
			<image src="../../static/page/myMessage/version-icon.png" mode=""></image>
			<view class="version">
				<text>{{ res.version }}</text>
			</view>
			<view v-if="res.judge" class="message">
				<text>{{ res.tip }}</text>
			</view>
			<button v-if="!res.judge" class="update" type="primary" @tap="logout()">{{ res.btn }}</button>
		</view>
	</view>
</template>

<script>
	import {urls} from '@/config/UrlKey.js'
	export default {
		data() {
			return {
				res: {
					version: '',
					tip: '当前版本为最新版本，暂无其他版本！',
					btn: '请更新最新版本',
					judge: true,
					versionCode:''
				}
			}
		},
		onLoad() {
			//#ifndef H5
			this.getNewVersion()
			//#endif
		},
		methods: {
			logout() {
				uni.removeStorageSync('jurisdiction');
				uni.getStorage({
					key: 'login',
					success: (res) => {
						const { username , password ,isBasicPassword } = JSON.parse(res.data)
						let param = {
							username:username,
							password:password,
							isBasicPassword:isBasicPassword,
							automaticallyLogin:0
						}
						uni.setStorage({
							key:'login',
							data:JSON.stringify(param),
							success:()=>{
								uni.reLaunch({
									url: '/pages/login/index'
								})
							}
						})
					}
				})
			
			},
			getNewVersion() {
				plus.runtime.getProperty(plus.runtime.appid, (inf)=>{
				    this.res.version = inf.version  
					this.$api.send({
						url: '/app/version/getNewVersion?versionCode=' + this.res.version,
						method: 'get',
						success: (res) => {
							if (res.code === 200) {
								this.res.judge = !res.data.needUp
								this.res.versionCode = res.data.versionCode
							}
						}
					})
				});
			},
			CheckForUpdates() {
				let _this = this;
				uni.getSystemInfo({ //获取设备信息
					success: (res) => {
						if (res.platform == "android") {
							console.log('apk',this.res.version.slice(0,1),this.res.versionCode)
							if(this.res.version.slice(0,1)!==this.res.versionCode.slice(0,1)){
								//大更新需要打apk
								this.AndroidCheckUpdate()
							}else{
								//需要打wag
								console.log("wag") 
								this.AndroidChecWgt()
							}
						}
					}
				})

			},
			AndroidCheckUpdate(){
				let _this = this;
				uni.getNetworkType({ //获取网络信息
					success: (res)=> {
						if (res.networkType === 'wifi') {
							uni.showModal({
								title: '提示',
								content: '有新的版本发布，检测到您目前为Wifi连接，是否确认更新。',
								success: function(res) {
									if (res.confirm) {
										_this.initDowg()
									} else if (res.cancel) {
										console.log('用户点击取消');
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
										console.log('用户点击取消');
									}
								}
							})
						}
					}
				})
			},
			initDowg() {
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
					if(res.progress===100){
						plus.nativeUI.closeWaiting();
					}else{
						plus.nativeUI.showWaiting("下载进度..."+res.progress+'%') 
					}
					
				})
			},
			AndroidChecWgt(){
				let _this = this;
				uni.getNetworkType({ //获取网络信息
					success: (res)=> {
						if (res.networkType === 'wifi') {
							uni.showModal({
								title: '提示',
								content: '有新的版本发布，检测到您目前为Wifi连接，是否确认更新。',
								success: function(res) {
									if (res.confirm) {
										_this.initDowgs()
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
					if(res.progress===100){
						plus.nativeUI.closeWaiting();
					}else{
						plus.nativeUI.showWaiting("下载wgt文件..."+res.progress+'%') 
					}
				})
			},
			installWgt(path) {
				plus.nativeUI.showWaiting("安装wgt文件...");
				plus.runtime.install(path, {
					force: true
				}, function() {
					plus.nativeUI.closeWaiting();
					console.log("安装wgt文件成功！");
					plus.nativeUI.alert("应用资源更新完成！", function() {
						plus.runtime.restart();
					});
				}, function(e) {
					plus.nativeUI.closeWaiting();
					console.log("安装wgt文件失败[" + e.code + "]：" + e.message);
					plus.nativeUI.alert("安装wgt文件失败[" + e.code + "]：" + e.message);
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.startPatrol {
		overflow: hidden;
	}

	.content {
		margin-top: 152upx;
		padding-top: 117upx;
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;

		image {
			width: 114upx;
			height: 114upx;
			border-radius: 30upx;
		}

		.version {
			margin-top: 40upx;
			font-size: 48upx;
			color: rgb(83, 83, 83);
		}

		.message {
			margin-top: 135upx;
			font-size: 30upx;
			color: #868686;
			text-align: center;
		}

		.update {
			margin-top: 40upx;
			font-size: 34upx;
			background-color: rgb(52, 159, 229);
			border-radius: 10upx;
			width: 600upx;
			height: 74upx;
			line-height: 74upx;
			text-align: center;
		}
	}
</style>
