<template>
	<view class="agreement">
		<view class="content">
			<view class="main">
				<view class="title">服务协议与隐私政策</view>
				<view class="body" v-html="text">
					<!-- {{text}} -->
				</view>
			</view>
			<view class="display alert_item_center" style="margin-bottom: 40upx;margin-left: 30upx;">
				<view :class="isBasicPassword?'jpassword_icon_tick':'jpassword_icon'"></view>
				<view style="font-size: 26upx;color: #999;" @click="isBasicPassword=!isBasicPassword">我已阅读并同意《隐私政策》和《用户协议》</view>
			</view>
			<view class="bottoms">
				<view class="button" style="border-right: 1px solid #edeeee;color: #222222;" @click="noAgree">拒绝</view>
				<view v-if="isBasicPassword" class="button" style="color: #008ef2;" @click="agree">同意</view>
				<view v-else class="button" style="color: #999999;">同意</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				text:"请您务必审慎阅读服务协议与隐私政策服务协议与隐私政策服务协议与隐私政策服务协议与隐私政策服务协议与隐私政策服务协议与隐私政策服可阅读<view ref='context' style='color:#008ef2'>用户协议</view>、<view ref='context' style='color:#008ef2'>隐私政策</view>了解详细信息，务协议与隐私政策服务隐私政策服务协议与隐私，你可阅读具体信息去了解细信息，政策服务隐私政策服务协议与隐私政策服务政策服务隐私政策服政策服务隐政策服务隐私政策服务协议与隐私政策服务政策服务隐私政策服政策服务隐私政策服政策服务隐私政策服。请您务必审慎阅读服务协议与隐私政策服务协议与隐私政策服务协议与隐私政策服务协议与隐私政策服务协议与隐私政策服务协议与隐私政策服可阅读用户协议、隐私政策了解详细信息，务协议与隐私政策服务隐私政策服务协议与隐私，你可阅读具体信息去了解细信息，政策服务隐私政策服务协议与隐私政策服务政策服务隐私政策服政策服务隐政策服务隐私政策服务协议与隐私政策服务政策服务隐私政策服政策服务隐私政策服政策服务隐私政策服。",
				isBasicPassword:false
			}
		},
		methods: {
			// RegExp("用户协议", "g")
			// let text = this.text.replace("用户协议", "<view ref='context' style='color:#008ef2'>用户协议</view>").replace("隐私政策", "<view ref='context' style='color:#008ef2'>隐私政策</view>");
			// this.text = text
			noAgree(){
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
			agree(){
				this.$emit('agree')
			}
		}
	}
</script>


<style scoped lang="scss">
	.agreement {
		position: fixed;
		top: 0;
		height: 100vh;
		width: 100vw;
		background: rgba(0, 0, 0, 0.6);
		z-index: 99;

	}

	.content {
		width: 630upx;
		height: 810upx;
		background: #ffffff;
		margin: 300upx auto 0;
		border-radius: 20upx;
	}

	.main {
		height: 626upx;
		padding: 44upx 30upx 30upx 30upx;
		box-sizing: border-box;
	}

	.title {
		text-align: center;
		font-size: 34upx;
		color: #222222;
		font-family: 'pingfangMediumBold';
		margin-bottom: 38upx;
	}

	.body {
		font-size: 26upx;
		color: #222222;
		height: 468upx;
		overflow-x: hidden;
		overflow-y: auto;
		line-height: 2;
	}

	.bottoms {
		height: 104upx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-top: 1px solid #edeeee;
	}

	.button {
		font-size: 32upx;
		width: 50%;
		text-align: center;
		height: 103upx;
		line-height: 103upx;
		font-family: 'pingfangMediumBold';
	}
	.jpassword_icon_tick{
		background: url(../../static/login/basic_password_tick.png);
		width: 30upx;
		height: 30upx;
		background-size: 100% 100%;
		margin-right: 12upx;
	}
	.jpassword_icon{
		background: url(../../static/login/basic_password.png);
		width: 30upx;
		height: 30upx;
		background-size: 100% 100%;
		margin-right: 12upx;
	}
</style>
