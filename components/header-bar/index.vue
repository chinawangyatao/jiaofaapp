<template>

	<view class="title-header-bar">
		<view class="title-bar">
			<view class="title-bar-btn-box-left">
				<view>
					<image @click="headerUni" v-show="left" src="../../static/page/hou_icon.png"></image>
				</view>
			</view>
			<text class="title-bar-title">{{name}}</text>
			<view class="title-bar-btn-box-right">
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "header-bar",
		props: {
			name: String,
			left: {
				type: Boolean,
				default: true
			},
			right: {
				type: Boolean,
				default: false
			},
			leftText: {
				type: String,
				default: ''
			},
			leftFunIs: {
				type: Boolean,
				default: false
			},
			leftFun: Function,
			navigateToSetting: Function,
		},
		methods: {
			navigateToS() {
				this.navigateToSetting()
			},
			headerUni() {
				// uni.navigateBack()
				if (this.leftFunIs) {
					this.leftFun()
				} else {
					uni.navigateBack()
				}

			}
		}
	}
</script>

<style scoped lang="scss">
	
	.title-header-bar {
		background-image:url(../../static/header/header_a.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 99999;
	}
	.title-header-bar image {
		height: 34upx;
		width: 19upx;
	}
	.title-bar {
		padding: 67rpx 24rpx 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.title-bar-btn-box-left {
		width: 80rpx;
		height: 60rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	
	.title-bar-btn-box-right {
		width: 80rpx;
		height: 60rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.title-bar .title-bar-title {
		font-size: 36rpx;
		color: #fff;
	}
</style>
