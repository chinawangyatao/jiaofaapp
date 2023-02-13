<template>
	<view class="index">
		<view class="bg">
			<view class="title">我的</view>
		</view>
		<view class="index_bg display alert_item_center" >
			<view>
				<image class="user-head" src="../../static/page/myMessage/my-message.png"></image>
			</view>
			<view class="user-message">
				<view class="user-name">
					<text>{{personal.trueName}}</text>
				</view>
				<view class="company">
					<text>单位：</text>
					<!-- {{personal.deptRootName}} -->
					<text>{{personal.deptFirstName}}</text>
				</view>
			</view>
		</view>

		<view class="version" @tap="routerView(item.url)" v-for="(item, index) in itemList" :key="index">
			<view class="version-logo veisonUp" v-if="item.plate==='版本信息'">
				<image :src="item.src" mode=""></image>
				<view class="dian" v-if="needUp"></view>
			</view>
			<view class="version-logo" v-else>
				<image :src="item.src" mode=""></image>
			</view>
			<view class="version-message">
				<text>{{ item.plate }}</text>
			</view>
			<image class="arrow-right" src="../../static/page/myMessage/right-arrow.png" mode=""></image>
		</view>

		<view class="buttoms1" style="margin-top: 346upx;background: rgb(254, 68, 85);" @tap="logout()">注销</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemList: [/* {
					plate: '管段信息',
					src: '../../static/page/myMessage/regulatoryInformation.png',
					url: '/pages/regulatoryInformation/index'
				}, */ {
					plate: '版本信息',
					src: '../../static/page/myMessage/version.png',
					url: '/pages/versionInformation/index'
				}, {
					plate: '修改密码',
					src: '../../static/page/myMessage/upPassword.png',
					url: '/pages/upPassword/index'
				}],
				personal:{},
				needUp:false
			}
		},
		onLoad() {
			let personal = uni.getStorageSync('personal')
			this.personal = JSON.parse(personal)
			
			//#ifndef H5
			this.getNewVersion()
			setInterval(()=>{
				this.getNewVersion()
			},5*1000*60)
			//#endif
		},
		methods: {
			getNewVersion() {
				plus.runtime.getProperty(plus.runtime.appid, (inf)=>{ 
					this.$api.send({
						url: '/app/version/getNewVersion?versionCode=' + inf.version,
						method: 'get',
						success: (res) => {
							if (res.code === 200) {
								this.needUp = res.data.needUp
							}
						}
					})
				});
			},
			routerView(url) {
				//console.log("跳转的页面为:" + url)
				uni.navigateTo({
					url
				})
			},
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

			}
		}
	}
</script>

<style scoped lang="scss">
	.index {
		background: $font-color3;
		height: 100vh;
		overflow: auto;
	}

	.bg {
		background: url(../../static/header-bg.png);
		background-size: 100% 100%;
		width: 100vw;
		height: 228upx;
		text-align: center;
		padding-top: 66upx;
		color: $font-color1;
		font-size: 48rpx;

		.title {
			font-size: 38upx;
			color: $font-color1;
		}
	}

	.index_bg {
		flex-wrap: wrap;
		height: 190upx;
		width: 702upx;
		margin: -69px auto 0;
		border-radius: 16upx;
		background: $font-color1;
		box-sizing: border-box;
		padding: 0 31upx;

		image {
			width: 103upx;
			height: 97upx;
		}

		.text {
			font-size: 26upx;
			color: $font-color9;
			margin-top: -8upx;
		}
	}

	.message {
		background: $font-color1;
		height: 100upx;
		width: 95vw;
		margin: 20upx auto 0;
		border-radius: 16upx;
	}

	.user-head {
		width: 144upx;
		height: 144upx;
		margin-right: 31upx;
		border-radius: 30upx;
	}

	.user-message {
		width: 429upx;
		.user-name {
			text{
				// font-family: 'pingfangMediumBold';
				font-weight: 700;
				font-size: 40upx;
				color: rgb(63, 63, 63);
			}
		}
		.company {
			margin-top: 10upx;
			font-size: 30upx;
			color: rgb(139, 139, 139);
		}
	}

	.version {
		width: 95vw;
		margin: 30upx auto 0;
		padding: 25upx 32upx;
		background-color: #fff;
		border-radius: 15upx;
		box-shadow: 0 0 10upx 1upx #e6e8e8;
		margin-bottom: 10upx;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;

		.version-message {
			font-size: 32upx;
			color: rgb(59, 59, 59);
			width: 539upx;
			height: 50upx;
			line-height: 50upx;
		}
	}

	.version-logo {
		width: 36upx;
		height: 36upx;
		margin-right: 32upx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.arrow-right {
		width: 13upx;
		height: 24upx;
	}
	.veisonUp{
		position: relative;
		.dian{
			width: 22upx;
			height: 22upx;
			background: red;
			border-radius: 50%;
			position: absolute;
			left: 600upx;
			top: 8upx;
		}
	}
</style>
