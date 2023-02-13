<template>
	<view class="screen">
		<view class="screen_props" @click="screenTrue" :style="text===''?'background:rgb(224,224,224)':'background:#fff'">
			<image src="../../static/screen/search.png"></image>
			<text :style="text===''?'color: rgb(179,179,179);':'color:#000'">{{text===''?searchTip:text}}</text>			
		</view>
	</view>
</template>



<script>
	export default{
		props:{
			text:{
				type:String,
				default:''
			},
			searchTip:{
				type:String,
				default:'搜索'
			}
		},
		methods:{
			screenTrue(){
				this.$emit('screenTrue')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.screen {
		padding-top: 24upx;
		position: fixed;
		height: 60upx;
		width: 702upx;
		left: 20upx;
		background: #F3F3F3;
		z-index: 9;
		box-sizing: border-box;
		.screen_props {
			align-items: center;
			display: flex;
			justify-content: center;
			height: 60upx;
			z-index: 90;
			text-align: center;
			line-height: 60upx;
			width: calc(100vw - 44upx);
			border-radius: 16upx;
			// background: #E0E0E0;
			border: 2upx solid #E0E0E0;
			image {
				width: 28upx;
				height: 27upx;
			}
			text{
				font-size: 28upx;
			}
		}
	}
</style>
