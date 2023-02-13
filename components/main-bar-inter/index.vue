<template>
	<view class="dis" :style="isDis?'padding:0 24upx 0':'display:flex'" :class="{disTop:isTop,disBottom:isDisBottom}" @click="$emit('commit')">
		<view class="title" :style="isDis?{'min-height': '70upx','width':vw}:{'width':vw}">{{name}}</view>
		<slot></slot>
	</view>
</template>

<script>
	export default{
		props:{
			name:{
				type:String,
				default:''
			},
			isDis:{
				type:Boolean,
				default:false
			},
			vw:{
				type:String,
				default:''
			},
			isTop:{
				type:Boolean,
				default:false
			},
			isDisBottom:{
				type:Boolean,
				default:true
			},
		}
	}
</script>

<style scoped lang="scss">
	.dis{
		align-items: center;
		min-height: 110upx;
	
	}
	.disBottom{
		border-bottom: 1upx solid rgb(213,213,213);
	}
	.disTop{
		border-top: 1upx solid rgb(213,213,213);
	}
	.title{
		font-size: 30upx;
		/* color: rgb(56,56,56); */
		color: #767676;
		width: 200upx;
		margin: 24upx 0;
	}
</style>
