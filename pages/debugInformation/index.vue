<template>
	<view style="margin-top: 160upx;">
		<header-bar :name="'调试信息'"></header-bar>
		<view>
			<view class="fca" @click="modeClick(true)">服务器:{{url}}</view>
			<view class="fca">{{personal.deptRootName}}</view>
			<view class="fca">模块: {{personal.deptName}} 版本:({{versionCode}})</view>
			<view class="fca">验证:账号登陆</view>
			<view class="fca">Username - {{personal.username}} trueName - {{personal.trueName}} roleName -
				{{personal.roleName}}
			</view>
			<view class="fca">roleCode - {{personal.roleCode}}</view>
			<view class="fca">DeptId - {{personal.deptId}}</view>
			<view class="fca">customerId - {{personal.customerId}}</view>
			<view class="fca">deptFirstId - {{personal.deptFirstId}}</view>
			<view class="fca">deptRootId - {{personal.deptRootId}}</view>
		</view>
		<models-nav ref='model' :height="'17vh'">
			<view>
				<view class="ba2-color font1-color title">设置服务器地址</view>
				<view class="input_style_was" style="padding: 20px 20px 0;">
					<view class="input_style">
						<input type="text" v-model="exceptionalCaseLTon" placeholder="请输入" />
					</view>
				</view>
				<view>
					<button class="button button_style font1-color ba2-color" @click="showHiddenModel()">确认</button>
					<button class="button button_style font1-color ba2-color" @click="show()">常用地址</button>
					<button class="button button_style font1-color ba2-color" @click="modeClick(false)">取消</button>
				</view>
			</view>
		</models-nav>
		<NTransition ref="lvx" :height="'600upx'" :position="'fixed'" :dispatchx="true" :bottom="'0px'">
			<view class="titlse">请选择</view>
			<view style="padding: 0 20px;">
				<view @click="clecdUrlFun(index)" style="padding: 0 20upx;margin-bottom: 20upx;"
					v-for="(item,index) in urlList" :key="item.id">{{item.name}}</view>
			</view>
		</NTransition>
	</view>
</template>

<script>
	import ModelsNav from '../../components/models-nav/index.vue'
	import NTransition from '../../components/n-transition/n-transition.vue'
	import {
		urls
	} from '../../config/UrlKey.js'
	export default {
		components: {
			ModelsNav,
			NTransition
		},
		data() {
			return {
				url: urls.base,
				exceptionalCaseLTon: urls.base,
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
					}
				],
				personal: {},
				versionCode:''
			}
		},
		onLoad() {
			let personal = uni.getStorageSync('personal')
			this.personal = JSON.parse(personal)
			let baseAjaxAxios = uni.getStorageSync("baseAjax")
			//alert("debug="+baseAjaxAxios)
			if (baseAjaxAxios) {
				this.url = baseAjaxAxios
				this.exceptionalCaseLTon = baseAjaxAxios
			}
			
			
			plus.runtime.getProperty(plus.runtime.appid, (inf)=>{
			    this.versionCode = inf.version  
			})
		},
		methods: {
			modeClick(is) {
				this.$refs.model.show(is)
			},
			showHiddenModel() {
				uni.setStorageSync('baseAjax', this.exceptionalCaseLTon);
				this.url = this.exceptionalCaseLTon
				this.modeClick(false)
				uni.removeStorageSync('login');
				uni.reLaunch({
					url: "/pages/login/index"
				})


				// #ifdef APP-PLUS
				if (plus.os.name.toLowerCase() === 'android') {
					plus.runtime.quit();
				} else {
					const threadClass = plus.ios.importClass("NSThread");
					const mainThread = plus.ios.invoke(threadClass, "mainThread");
					plus.ios.invoke(mainThread, "exit");
				}
				// #endif

				// #ifdef H5
				var userAgent = navigator.userAgent;
				if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") != -1) return window.location.href = "about: blank";
				if (userAgent.indexOf("Android") > -1 || userAgent.indexOf("Linux") > -1) return window.opener = null,
					window.open("about: blank", "_self", "").close();
				return window.opener = null, window.open("about: blank", "_self"), window.close();
				// #endif
			},
			show() {
				this.$refs.lvx.show()
			},
			clecdUrlFun(index) {
				this.exceptionalCaseLTon = this.urlList[index].url
				this.$refs.lvx.hide()
			}
		}
	}
</script>

<style scoped>
	.fca {
		font-size: 32upx;
		border-bottom: 2upx solid #C8C8C8;
		line-height: 80upx;
		padding: 0 20upx;
	}

	.input_style_was {
		height: 80upx;
		margin-bottom: 30upx;
	}

	.button {
		width: 100%;
		color: #FFFFFF;
		background-color: #2C98DE;
	}

	.title {
		text-align: center;
		line-height: 80upx;
		font-size: 37upx;
		font-weight: 700;
		color: #FFFFFF;
		background-color: #2C98DE;
	}

	.titlse {
		text-align: center;
		line-height: 120upx;
		font-size: 30upx;
	}
</style>
