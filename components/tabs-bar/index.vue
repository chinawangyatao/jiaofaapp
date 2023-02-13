<template>
	<view class="bg">
		<view class="headerBar">
			<image  @click="headerUni" v-show="left" src="../../static/page/hou_icon.png"></image>
			<view style="width: 34upx;" v-show="!left"></view>
			<view class="title">{{title}}</view>
			<view style="width: 20upx;"><slot></slot></view>
		</view>
		<view class="display alert_item_center space-between tabs">
			<view class="display">
				<view @click="tavbar(item.id)" class="text" :class="item.id===tabsValue?'text_true':''" v-for="item in tabs" :key="item.id">{{item.name}}</view>
			</view>
			<view @click="screen" v-show="right">
				<image src="../../static/sele.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			title:{
				type:String,
				default:''
			},
			tabs:{
				type:Array,
				default:()=>{
					return []
				}
			},
			tabsValue:{
				type:Number,
				default:1
			},
			left: {
				type: Boolean,
				default: true
			},
			right: {
				type: Boolean,
				default: true
			},
		},
		methods:{
			screen(){
				this.$emit('screen')
			},
			tavbar(id){
				//alert("tabs-bar id="+id)
				this.$emit('tavbar',id)
			},
			headerUni() {
				uni.navigateBack()
			}
		}
	}
</script>

<style scoped lang="scss">
	.bg {
		background: url(../../static/header-bg.png);
		background-size: 100% 100%;
		width: 100vw;
		height: 228upx;
		text-align: center;
		padding-top: 66upx;
		color: $font-color1;
		font-size: 48rpx;
		box-sizing: border-box;
		.tabs{
			width: 95vw;
			margin: 26upx auto 0; 
			.text {
				min-width: 140rpx;
				padding: 0 10rpx;
				height: 50rpx;
				line-height: 50rpx;
				color: #fff;
				text-align: center;
				font-size: 30upx;
				margin-right: 20upx;
				
			}
			.text_true{
				background-color: #fff;
				border-radius: 25rpx;
				color: #1c82d4;
			}
			
			image {
				height: 50upx;
				width: 50upx;
			}
		}
	}

	.headerBar {
		color: $font-color1;
		text-align: center; 
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 24upx;
		
		image {
			height: 34upx;
			width: 19upx;
		}
		
		.title {
			font-size: 38upx;
			color: $font-color1;
			text-align: center;
		}
	}
</style>
