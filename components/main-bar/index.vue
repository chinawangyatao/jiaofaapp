<template>
	<view class="body" :style="{'height':height,'overflow-y':overflowY}">
		<view class="title-main" :style="'font-size:'+fontSize">{{name}}</view>
		<view class="main" :style="paddingHidden?'padding: 0 24upx 24upx;':'padding:24upx 0 0 0'">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			name:{
				type:String,
				default:''
			},
			height:{
				type:String,
				default:''
			},
			paddingHidden:{
				type:Boolean,
				default:true
			},
			overflowY:{
				type:String,
				default:'auto'
			},
			fontSize:{
				type:String,
				default:'34upx'
			},
			
		},
	}
	
</script>

<style scoped lang="scss">
	.body {
		margin: 24upx auto 24upx ;
		width: 94vw;
		overflow-x: hidden;
		box-shadow: 0upx 3upx 23upx 1upx rgba(0, 0, 0, 0.05);
		border-radius: 25upx 25upx 0 0;
	}

	.title-main {
		background: $font-color1;
		color: rgb(0,0,0);
		padding-left: 24upx;
		border-radius: 25upx 25upx 0 0;
		line-height: 94upx;
		// font-weight: 700;
		font-family: 'pingfangMediumBold';
	}

	.main {
		background: rgb(246,246,246);
		border-radius: 0 0 25upx 25upx;
	}
</style>
