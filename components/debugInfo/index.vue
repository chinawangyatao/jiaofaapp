<template>
	<view class="debugInfo">
		<view class="bg">
			<view class="headerBar">
				<view></view>
				<view class="title">选择服务器</view>
				<view style="width: 40upx;" @click="$emit('debgClick')">
					<image src="../../static/close.png"></image>
				</view>
			</view>
		</view>
		<view class="main">
			<view @click="$emit('clickUrl',item)" class="border display alert_item_center space-between" v-for="item in $store.state.user.urlList" :key="item.name">
				<view style="width: 85%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.name}}</view> 
				<image v-if="id===item.id" src="../../static/selected.png" style="width:38upx;height: 38upx;" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			id:{
				type:String,
				default:''
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.debugInfo{
		position: fixed;
		height: 100vh;
		width: 100vw;
		background: #ffffff;
		top: 0;
		left: 0;
	}
	.bg{
		background: #ffffff;
		width: 100vw;
		height: 228upx;
		text-align: center;
		padding-top: 67upx;
		font-size: 48rpx;
		box-sizing: border-box;
		.headerBar{
			width: 95vw;
			margin: 26upx auto 0; 
			display: flex;
			align-items: center;
			justify-content: space-between;
			.title {
				font-size: 38upx;
				color:#000;
				text-align: center;
			}
			image{
				height: 36upx;
				width: 36upx;
			}
		}
		
	}
	.main{
		height: calc(100vh - 228upx);
		box-sizing: border-box;
		padding: 0 24upx;
		overflow-x: hidden;
		overflow: auto;
		.border{
			box-shadow: 0upx 3upx 23upx 1upx rgba(0, 0, 0, 0.05);
			height: 120upx;
			line-height: 120upx;
			padding: 0 20upx;
			flex-wrap: nowrap;
		}
	}
</style>
